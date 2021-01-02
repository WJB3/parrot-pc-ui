
import React from 'react';
import classNames from '@packages/utils/classNames';
import getPathValue from '@packages/utils/getPathValue';

function isRenderCell(
    data,
){
    return data && typeof data==="object" && !Array.isArray(data) && !React.isValidElement(data);
}

const Cell=(props)=>{

    const {
        prefixCls,
        component:Component="td",
        children,
        colSpan,
        rowSpan,
        className,
        ellipsis,
        align,
        render,
        dataIndex,
        record,
        index
    }=props;

    const cellPrefixCls=`${prefixCls}-Cell`; 
    // ====================== Align =======================
    const alignStyle = {};
    if (align) {
        alignStyle.textAlign = align;
    }

    //================ Child Node====================
    let cellProps;
    let childNode; 

    if(children){
        childNode=children;
    }else{
        const value=getPathValue(record,dataIndex);
        childNode=value;
        if(render){
            const renderData=render(value,record,index);
            if(isRenderCell(renderData)){
                childNode = renderData.children;
                cellProps=renderData.props;
            }else{
                childNode = renderData;
            }
        }
    }
 
    const {
        colSpan: cellColSpan,
        rowSpan: cellRowSpan,
        style:cellStyle,
        className:cellClassName,
        ...restCellProps
    } = cellProps || {};

    const mergedColSpan=cellColSpan!==undefined?cellColSpan:colSpan;
    const mergedRowSpan=cellRowSpan!==undefined?cellRowSpan:rowSpan;

    //==========如果colSpan为0  返回null 直接不渲染
    if(mergedColSpan===0 || mergedRowSpan===0){
        return null;
    }

    //=================================
    let title;
    const ellipsisConfig=ellipsis===true?{showTitle:true}:ellipsis;
    if(ellipsisConfig && (ellipsisConfig.showTitle)){
        if(typeof childNode==='string' || typeof childNode==="number"){
            title=childNode.toString();
        }else if(React.isValidElement(childNode) && typeof childNode.props.children==="string"){
            title=childNode.props.children;
        }
    }
  
    const componentProps={
        title,
        ...restCellProps,
        colSpan:mergedColSpan && mergedColSpan!==1 ? mergedColSpan : 1,
        rowSpan:mergedRowSpan && mergedRowSpan!==1 ? mergedRowSpan : 1,
        className:classNames(
            cellPrefixCls,
            className,
            {
                [`${cellPrefixCls}-Ellipsis`]:ellipsis
            },
            cellClassName
        ),
        style:{...alignStyle}
    }

    return (
        <Component {...componentProps}>
            {childNode}
        </Component>
    )

}

export default Cell;