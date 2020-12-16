

import React,{useContext,useMemo ,useState} from 'react';
import TreeContext from './TreeContext';
import Blank from './Blank';
import classNames from '@packages/utils/classNames';
import Loading from '@packages/core/Loading';
import Checkbox from '@packages/core/Checkbox';
import {
    convertNodePropsToEventData
} from './util/treeUtils';
import { Expand,Shrink,File } from '@packages/core/Icon';

const noop=()=>{}

const TreeNode=React.forwardRef((props,ref)=>{

    const {
        eventKey,
        title,
        selectable=true,
        //是否是叶子节点
        isLeaf=false,
        data
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
        loadedKeys,
        showLine,
        draggable:contextDraggable,
        onNodeContextMenu,
        onNodeDoubleClick,
        onNodeDragStart,
        onNodeDragEnd,
        onNodeDragEnter,
        checkable,
        checkedKeys,
        halfCheckedKeys,
        onNodeCheck
    }=useContext(TreeContext);  

    const { draggable }=useMemo(()=>{
        let isGragge=typeof contextDraggable==="function"?contextDraggable(data):contextDraggable;
        return {
            draggable:isGragge
        }
    },[contextDraggable,data]);

    const [dragNodeHighlight,setDragNodeHighlight]=useState(false);

    const { expanded,selected,level,children,prefixCls,loading,loaded,checked,halfChecked }=useMemo(()=>{
   
        return { 
            expanded:expandedKeys.indexOf(eventKey)>-1,
            selected:selectedKeys.indexOf(eventKey)>-1,
            level:keyEntities[eventKey].level,
            children:keyEntities[eventKey].children,
            prefixCls:`${contextPrefixCls}-TreeNode`,
            loading:loadingKeys.indexOf(eventKey)>-1,
            loaded:loadedKeys.indexOf(eventKey)>-1,
            checked:checkedKeys.indexOf(eventKey)>-1,
            halfChecked:halfCheckedKeys.indexOf(eventKey)>-1
        }
    },[expandedKeys,selectedKeys,eventKey,keyEntities,contextPrefixCls,loadingKeys,loadedKeys,checkedKeys,halfCheckedKeys]);  

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
        if(!haveSwitcher && showLine){ 
            switchNode=<File style={{fontSize:20}}/>;
        }else if(!haveSwitcher){
            switchNode=null;
        }else{
            if(loading){
                switchNode=<Loading size={16}/>
            }else if(showLine){
                if(expanded){
                    switchNode=<Shrink style={{fontSize:18}}/>
                }else{
                    switchNode=<Expand style={{fontSize:18}}/>
                }
            }else{
                switchNode=typeof switcherIcon==="function" ?switcherIcon(props)
                :switcherIcon
            } 
           
        } 

        return (
            <span className={classNames(
                `${prefixCls}-Switcher`,
                `${prefixCls}-Switcher-${showLine?"":expanded?"Open":"Close"}`
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
    
    const onContextMenu = (e) => {//响应右击事件
        onNodeContextMenu?.(e, convertNodePropsToEventData(props),eventKey);
    };

    const onDoubleClick=(e)=>{
        onNodeDoubleClick?.(e,convertNodePropsToEventData(props));
    }

    const onDragStart=(e)=>{
        console.log("onDragStart");
        e.stopPropagation();
        setDragNodeHighlight(true);
        onNodeDragStart?.(e,convertNodePropsToEventData(props))
    }

    const onDragEnd=(e)=>{
        e.stopPropagation();
        setDragNodeHighlight(false);
        onNodeDragEnd?.(e,convertNodePropsToEventData(props));
    }

    const onDragEnter=(e)=>{ 
        e.preventDefault();
        e.stopPropagation();
        onNodeDragEnter?.(e,convertNodePropsToEventData(props));
    }

    const onCheck=(e)=>{
        onNodeCheck?.(e,convertNodePropsToEventData(props));
    }

    const renderCheckbox=()=>{
        console.log(checked);
        if(!checkable) return null;

        return (<Checkbox
            className={classNames(
                `${prefixCls}-Checkbox`
            )} 
            checked={checked}
            indeterminate={halfChecked}
            onChange={onCheck}
        />)
    }

    const renderSelector=()=>{

        return (
            <span 
                className={classNames(`${prefixCls}-Selector`,{
                    [`${prefixCls}-Selector-BlockNode`]:blockNode,
                    [`${prefixCls}-Selector-Selected`]:selected,
                    [`${prefixCls}-Selector-FilterNode`]:(filterTreeNode && filterTreeNode({...props}))||dragNodeHighlight 
                })} 
                onClick={selectable?onSelect:noop}
                draggable={draggable||undefined}
                onContextMenu={draggable?onContextMenu:undefined}
                onDoubleClick={draggable?onDoubleClick:undefined}
                onDragStart={draggable?onDragStart:undefined}
                onDragEnter={draggable?onDragEnter:undefined}
            >
                {renderIcon()}
                {renderTitle()}
            </span>
        )
    }
 

    return (
        <span 
            title={typeof title==="string"?title:""}
            className={prefixCls}
            ref={ref}
            onDragEnd={draggable?onDragEnd:undefined}
            onDragEnter={draggable?onDragEnter:undefined}
        >
            <Blank prefixCls={prefixCls} level={level} showLine={showLine} />
            {renderSwitcher()} 
            {renderCheckbox()}
            {renderSelector()}
        </span>
    )


});

export default React.memo(TreeNode);