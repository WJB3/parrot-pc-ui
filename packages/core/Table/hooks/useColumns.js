import React from 'react';

function flatColumns(columns){
    return columns.reduce((list,column)=>{
        const { fixed,colSpan }=column;
        //将' fixed='true' '转换为' fixed='left' '代替
        const parsedFixed=fixed===true?"left":fixed;
        const transformColspan=(colSpan || colSpan===0)?colSpan:1;
        const subColumns=column.children;
        if(subColumns && subColumns.length>0){
            return [
                ...list,
                ...flatColumns(subColumns).map(subColum => ({
                  fixed: parsedFixed,
                  colSpan:transformColspan,
                  ...subColum,
                })),
            ];
        }
        return [
            ...list,
            {
                ...column,
                fixed:parsedFixed,
                colSpan:transformColspan
            }
        ]
    },[]);
}

function useColumns(
    {
        prefixCls,
        columns,
        children
    },
    transformColumns
) {

    const baseColumns = React.useMemo(() => columns,[columns]); 

    const flattenColumns=React.useMemo(()=>{
        return flatColumns(baseColumns);
    },[baseColumns]);

    return [baseColumns,flattenColumns];

}

export default useColumns;