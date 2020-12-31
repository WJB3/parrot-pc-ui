
function flatColumns(columns){
    return columns.reduce((list,column)=>{
        const { fixed }=column;
        //将' fixed='true' '转换为' fixed='left' '代替
        const parsedFixed=fixed===true?"left":fixed;
        const subColumns=column.children;
        if(subColumns && subColumns.length>0){
            return [
                ...list,
                
            ]
        }
        return [
            ...list,
            {
                ...column,
                fixed:parsedFixed
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

    },[baseColumns]);

    return [baseColumns,flattenColumns];

}

export default useColumns;