
import React from 'react';
import Cell from '../Cell';
import TableContext from '../context/TableContext';

const ExpandedRow=(props)=>{

    const {
        children,
        component:Component,
        className,
        expanded,
        cellComponent,
        prefixCls,
        colSpan
    }=props;

    return React.useMemo(()=>{

        let contentNode=children;

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
        )
    },[
        children,
        Component,
        expanded,
        className,
        cellComponent,
        prefixCls,
        colSpan
    ]);

};

export default ExpandedRow;