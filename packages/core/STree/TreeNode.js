

import React,{useContext,useMemo } from 'react';
import TreeContext from './TreeContext';
import Blank from './Blank';
import classNames from '@packages/utils/classNames';
import Loading from '@packages/core/Loading';

const noop=()=>{}

const TreeNode=React.forwardRef((props,ref)=>{

    const {
        eventKey,
        title,
        selectable=true,
        //是否是叶子节点
        isLeaf=false
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
        onNodeSelect,
        loadData,
        loadingKeys,
        loadedKeys
    }=useContext(TreeContext);  

    const { expanded,selected,level,children,prefixCls,loading,loaded }=useMemo(()=>{
   
        return { 
            expanded:expandedKeys.indexOf(eventKey)>-1,
            selected:selectedKeys.indexOf(eventKey)>-1,
            level:keyEntities[eventKey].level,
            children:keyEntities[eventKey].children,
            prefixCls:`${contextPrefixCls}-TreeNode`,
            loading:loadingKeys.indexOf(eventKey)>-1,
            loaded:loadedKeys.indexOf(eventKey)>-1
        }
    },[expandedKeys,selectedKeys,eventKey,keyEntities,contextPrefixCls,loadingKeys,loadedKeys]);  

    const { haveSwitcher }=useMemo(()=>{ 
        let hasSwitcher;
        let hasChildren=(children||[]).length>0;  
 

        if(hasChildren){
            //如果有孩子节点就显示
            hasSwitcher=true;
        }else if(isLeaf){
            hasSwitcher=false;
        }else if(!hasChildren && loadData){ 
            if(loaded){ 
                hasSwitcher=false;
            }else{
                hasSwitcher=true;
            } 
        }   
        return {
            haveSwitcher:hasSwitcher
        }
    },[loadData,children,isLeaf,loaded]);
 
 

    const renderSwitcher=()=>{
 
        let switchNode=null;  

        //如果是叶子节点，前面就没有切换图标
        if(!haveSwitcher){
            switchNode=null;
        }else{
            switchNode= loading?<Loading size={16}/>:typeof switcherIcon==="function"
            ?switcherIcon(props)
            :switcherIcon
        } 

        return (
            <span className={classNames(
                `${prefixCls}-Switcher`,
                `${prefixCls}-Switcher-${expanded?"Open":"Close"}`
            )} onClick={haveSwitcher?onExpand:noop}> 
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