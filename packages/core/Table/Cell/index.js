
import React from 'react';
import classNames from '@packages/utils/classNames';

const Cell=(props)=>{

    const {
        prefixCls,
        component:Component="td",
        children,
        colSpan
    }=props;

    const cellPrefixCls=`${prefixCls}-Cell`;

    //================ Child Node====================
    let cellProps;
    let childNode;

    if(children){
        childNode=children;
    }

    const {
        colSpan: cellColSpan,
    } = cellProps || {};

    const mergedColSpan=cellColSpan!==undefined?cellColSpan:colSpan;

    if(mergedColSpan===0){
        return null;
    }
  
    const componentProps={
        colSpan:mergedColSpan && mergedColSpan!==1 ? mergedColSpan : null,
        className:classNames(
            cellPrefixCls
        )
    }

    return (
        <Component {...componentProps}>
            {childNode}
        </Component>
    )

}

export default Cell;