
import React from 'react';
import classNames from '@packages/utils/classNames';

//外部遍历避免重复生成 
const noop=()=>{};

const TreeNode=React.forwardRef((props,ref)=>{

    const {
        node:{title},
        level,
        className, 
        children,
        switcherIcon,
        expanded,
        selected,
        showIcon,
        icon
    }=props;

    const renderSwitcher=()=>{
 
        let switchNode=null;

        let hasChildren=(children||[]).length>0;

        //如果是叶子节点，前面就没有切换图标
        if(!hasChildren){
            switchNode=null;
        }else{
            switchNode= typeof switcherIcon==="function"
            ?switcherIcon(props)
            :switcherIcon
        }

        return (
            <span className={classNames(
                `${className}-Switcher`,
                `${className}-Switcher-${expanded?"Open":"Close"}`
            )} onClick={hasChildren?noop:noop}> 
                {switchNode}
            </span>
        )
    }

    const renderIcon=()=>{

        let iconNode=null;
        if(showIcon){
            
            if(typeof icon==="function"){
                iconNode=icon(dataProp);
            }else{
                iconNode=icon;
            }
        }
        
        return (
            <span className={classNames(`${className}-IconEle`)}>
                {iconNode}
            </span>
        )
    }

    const renderSelector=()=>{

        return <span className={classNames(`${className}-Selector`,{
            [`${className}-Selector-BlockNode`]:blockNode,
            [`${className}-Selector-Selected`]:selected,
            [`${className}-Selector-FilterNode`]:filterTreeNode && filterTreeNode({...props})
        })} onClick={onSelect}>
            {renderIcon()}
            {renderTitle()}
        </span>
    }
     

    return (
        <span 
            title={typeof title==="string"?title:""}
            className={className}
            ref={ref}
        >
            <Blank prefixCls={className} level={level} />
            {renderSwitcher()}
            {renderSelector()}
        </span>
    )


});

export default TreeNode;