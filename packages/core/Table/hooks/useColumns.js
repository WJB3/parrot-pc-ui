


import toArray from '@packages/utils/toArray';

export function convertChildrenToColumns(
    children
) {
    return toArray(children)
        .filter(node => React.isValidElement(node))
        .map(({ key, props }) => {
            const { children: nodeChildren, ...restProps } = props;
            const column = {
                key,
                ...restProps
            };
            if (nodeChildren) {
                column.children = convertChildrenToColumns(nodeChildren);
            }
            return column;
        });
}


function useColumns(
    {
        columns
    },
    transformColumns
){

    const baseColumns = React.useMemo(
        () => columns,
        [columns]
    );

    const withExpandColumns = React.useMemo(
        () => baseColumns,
        [baseColumns]
    )

    const mergedColumns = React.useMemo(() => {
        let finalColumns = withExpandColumns;
    }, []);

    const flatternColumns = React.useMemo(
        () => {

        },
        [mergedColumns]
    )

}