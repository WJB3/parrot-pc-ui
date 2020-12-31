import * as React from 'react';
import warning from 'rc-util/lib/warning';  
 
function flatColumns(columns){
  return columns.reduce((list, column) => {
    const { fixed } = column;

    // Convert `fixed='true'` to `fixed='left'` instead
    const parsedFixed = fixed === true ? 'left' : fixed;

    const subColumns = column.children;
    if (subColumns && subColumns.length > 0) {
      return [
        ...list,
        ...flatColumns(subColumns).map(subColum => ({
          fixed: parsedFixed,
          ...subColum,
        })),
      ];
    }
    return [
      ...list,
      {
        ...column,
        fixed: parsedFixed,
      },
    ];
  }, []);
}

function warningFixed(flattenColumns) {
  let allFixLeft = true;
  for (let i = 0; i < flattenColumns.length; i += 1) {
    const col = flattenColumns[i];
    if (allFixLeft && col.fixed !== 'left') {
      allFixLeft = false;
    } else if (!allFixLeft && col.fixed === 'left') {
      warning(false, `Index ${i - 1} of \`columns\` missing \`fixed='left'\` prop.`);
      break;
    }
  }

  let allFixRight = true;
  for (let i = flattenColumns.length - 1; i >= 0; i -= 1) {
    const col = flattenColumns[i];
    if (allFixRight && col.fixed !== 'right') {
      allFixRight = false;
    } else if (!allFixRight && col.fixed === 'right') {
      warning(false, `Index ${i + 1} of \`columns\` missing \`fixed='right'\` prop.`);
      break;
    }
  }
}
 
/**
 * Parse `columns` & `children` into `columns`.
 */
function useColumns(
  {
    prefixCls,
    columns, 
    expandable,
    expandedKeys,
    getRowKey,
    onTriggerExpand,
    expandIcon,
    rowExpandable,
    expandIconColumnIndex,
    expandRowByClick,
    columnWidth,
  },  
)  { 
  const baseColumns = React.useMemo(
    () => columns,
    [columns],
  ); 

  const mergedColumns = React.useMemo(() => {
    let finalColumns = baseColumns; 

    // Always provides at least one column for table display
    if (!finalColumns.length) {
      finalColumns = [
        {
          render: () => null,
        },
      ];
    }
    return finalColumns;
  }, [baseColumns]);

  const flattenColumns = React.useMemo(() => {
    return flatColumns(mergedColumns);
  }, [mergedColumns]); 
  
  return [mergedColumns, flattenColumns];
}

export default useColumns;