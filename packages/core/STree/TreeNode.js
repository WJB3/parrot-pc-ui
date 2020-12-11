

import React,{useContext,useMemo } from 'react';
import TreeContext from './TreeContext';
import Blank from './Blank';
import classNames from '@packages/utils/classNames';

const noop=()=>{}

const TreeNode=React.forwardRef((props,ref)=>{

    const {
        eventKey,
        title,
        selectable=true
    }=props;

    const {
        expandedKeys,
        selectedKeys,
        prefixCls:contextPrefixCls,
        keyEntities,
        titleRender,
        switcherIcon,
        blockNode,
        filterTreeNode,
        showIcon,
        onNodeExpand,
        onNodeSelect 
    }=useContext(TreeContext); 
 
    const { expanded,selected,level,children,prefixCls }=useMemo(()=>{
        return { 
            expanded:expandedKeys.indexOf(eventKey)>-1,
            selected:selectedKeys.indexOf(eventKey)>-1,
            level:keyEntities[eventKey].level,
            children:keyEntities[eventKey].children,
            prefixCls:`${contextPrefixCls}-TreeNode`
        }
    },[expandedKeys,selectedKeys,eventKey,keyEntities,contextPrefixCls]);
 

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
                `${prefixCls}-Switcher`,
                `${prefixCls}-Switcher-${expanded?"Open":"Close"}`
            )} onClick={hasChildren?onExpand:noop}> 
                {switchNode}
            </span>
        )
    }

    const onExpand=(e)=>{
        onNodeExpand?.(e,{...keyEntities[eventKey],expanded,key:eventKey,expanded})
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
            <span className={classNames(`${prefixCls}-IconEle`)}>
                {iconNode}
            </span>
        )
    }

    const renderTitle=()=>{ 
        let titleNode;
        if(typeof title==="function"){
            titleNode=title(dataProp);
        }else if(titleRender){
            titleNode=titleRender(dataProp);
        }else{
            titleNode=title;
        }

        return <span className={`${prefixCls}-Title`}>{titleNode}</span>
    }

    const onSelect=(e)=>{
        onNodeSelect?.(e,{...keyEntities[eventKey],key:eventKey,selected});
    }


    const renderSelector=()=>{

        return <span className={classNames(`${prefixCls}-Selector`,{
            [`${prefixCls}-Selector-BlockNode`]:blockNode,
            [`${prefixCls}-Selector-Selected`]:selected,
            [`${prefixCls}-Selector-FilterNode`]:filterTreeNode && filterTreeNode({...props})
        })} onClick={selectable?onSelect:noop}>
            {renderIcon()}
            {renderTitle()}
        </span>
    }
 

    return (
        <span 
            title={typeof title==="string"?title:""}
            className={prefixCls}
            ref={ref}
        >
            <Blank prefixCls={prefixCls} level={level} />
            {renderSwitcher()}
            {renderSelector()}
        </span>
    )


});

export default TreeNode;