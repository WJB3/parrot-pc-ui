import * as React from 'react'; 
import Cell from '../Cell';
import TableContext from '../context/TableContext';
 

function ExpandedRow({
  prefixCls,
  children,
  component: Component,
  cellComponent,
  fixHeader,
  fixColumn,
  horizonScroll,
  className,
  expanded,
  componentWidth,
  colSpan,
}) {
  const { scrollbarSize } = React.useContext(TableContext);

  // Cache render node
  return React.useMemo(() => {
    let contentNode = children;

    if (fixColumn) {
      contentNode = (
        <div
          style={{
            width: componentWidth - (fixHeader ? scrollbarSize : 0),
            position: 'sticky',
            left: 0,
            overflow: 'hidden',
          }}
          className={`${prefixCls}-expanded-row-fixed`}
        >
          {contentNode}
        </div>
      );
    }

    return (
      <Component
        className={className}
        style={{
          display: expanded ? null : 'none',
        }}
      >
        <Cell component={cellComponent} prefixCls={prefixCls} colSpan={colSpan}>
          {contentNode}
        </Cell>
      </Component>
    );
  }, [
    children,
    Component,
    fixHeader,
    horizonScroll,
    className,
    expanded,
    componentWidth,
    colSpan,
    scrollbarSize,
  ]);
}

export default ExpandedRow;