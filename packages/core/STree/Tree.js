

import React ,{ useMemo,useContext, useCallback,useState,useEffect,useRef } from 'react';
import TreeContext from './TreeContext';
import { ConfigContext } from '@packages/core/ConfigProvider';
import {
    convertDataToEntities,
    flattenTreeData,
    arrAdd,
    arrDel
} from './util/treeUtils';
import {
    conductExpandParent,
    conductCheckedKey
} from './util/conductUtils';

import useControlled from '@packages/hooks/useControlled';
import NodeList from './NodeList';
import {
    ArrowDown
} from '@packages/core/Icon';
import useInit from '@packages/hooks/useInit';
import { 
    getDragChildrenKeys,
    calcDropPosition
} from './util/dragUtils';
import "./index.scss";

function noop(){}


const Tree=React.forwardRef((props,ref)=>{

    const {
        prefixCls:customizePrefixCls,
        //所需的树形结构
        treeData,
        //是否自动展开父节点（可控属性，如果变为true，将自动展开父节点，如果变为false，将自动关闭父节点）
        expandParent,
        //默认是否展开父节点（初始化值）
        defaultExpandParent=true,
        //展开的keys（可控属性）
        expandedKeys:expandedKeyProps,
        //默认展开的keys（初始化值）
        defaultExpandedKeys=[],
        //默认展开所有
        defaultExpandAll=false,
        selectedKeys:selectedKeysProp,
        defaultSelectedKeys=[],
        titleRender,//自定义渲染节点
        switcherIcon=<ArrowDown />,//	自定义树节点的展开/折叠图标
        blockNode,//是否节点占据一行
        filterTreeNode,//按需筛选树节点（高亮），返回 true
        showIcon,//是否展示 TreeNode title 前的图标，没有默认样式，如设置为 true，需要自行定义图标相关样式
        onExpand,//展开/收起节点时触发
        onSelect,//	点击树节点触发
        multiple=false,
        //设置虚拟滚动容器高度，设置后内部节点不再支持横向滚动
        height,
        //异步加载数据,需要返回一个promise
        loadData,
        //已经加载的节点，需要配合 loadData 使用
        loadedKeys:loadedKeysProp,
        //节点加载完毕时触发
        onLoad,
        showLine,
        //设置节点可拖拽
        draggable,
        onRightClick=noop,
        onDoubleClick=noop,
        onDragStart=noop,
        onDragEnd=noop,
        onDragEnter=noop,
        //是否允许拖拽时放置在该节点
        allowDrop,
        //受控组件
        checkedKeys:checkedKeysProp,
        //默认选中复选框的树节点
        defaultCheckedKeys=[],
        checkable,
        onCheck
    }=props;

    //是否初始化
    const isInit=useInit();

    const dragStartMousePosition=useRef(null);

    const dragNode=useRef(null);

    const [dragging,setDragging]=useState(false);

    const [dragChildrenKeys,setDragChildrenKeys]=useState([]);

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Tree",customizePrefixCls);

    const [ initExpandedKeys,setExpandedKeys ]=useControlled({
        controlled:expandedKeyProps,
        default:defaultExpandedKeys
    });

    const [ initCheckedKeys,setCheckedKeys ]=useControlled({
        controlled:checkedKeysProp,
        default:defaultCheckedKeys
    }); 

    const [ selectedKeys,setSelectedKeys  ]=useControlled({
        controlled:selectedKeysProp,
        default:defaultSelectedKeys
    }); 

    const [loadingKeys,setLoadingKeys]=useState([]);

    const [loadedKeys,setLoadedKeys]=useControlled({
        controlled:loadedKeysProp,
        default:[]
    });
 
    const { keyEntities,expandedKeys,flattenData,checkedKeys,halfCheckedKeys }=useMemo(()=>{ 
        //不可依赖isInit 否则在不改变expanded的情况下 会走进这个逻辑 造成渲染错误
 
        const keyEntities=convertDataToEntities(treeData)?.keyEntities;
        
        let expandedKeys=initExpandedKeys;  

        if(!isInit){//如果是初始化

            expandedKeys=initExpandedKeys.concat();
            if(!defaultExpandAll && (expandParent || defaultExpandParent)){
                expandedKeys= conductExpandParent(expandedKeys,keyEntities);
            //如果expandParent和defaultExpandParent都是空，则不栈展开节点
            }else if(!expandParent && !defaultExpandParent && !isInit){
                expandedKeys=[];
            }else{
                const cloneKeyEntities = { ...keyEntities };
                const allExpandedKeys = Object.keys(cloneKeyEntities).map(key => cloneKeyEntities[key].key);
                expandedKeys = allExpandedKeys;
            } 
        }  
        const { checkedKeys,halfCheckedKeys}=conductCheckedKey(initCheckedKeys,keyEntities,true); 
 
        const flattenData=flattenTreeData(treeData,expandedKeys);

        return {
            keyEntities,
            expandedKeys,
            flattenData,
            checkedKeys,
            halfCheckedKeys
        }
    },[treeData,expandParent,expandedKeyProps,initExpandedKeys,initCheckedKeys]);  

    const onNodeLoad=(treeNode)=>new Promise(resolve=>{
        const { key }=treeNode;
        const promise = loadData(treeNode);  
        promise.then(()=>{ 
            const newLoadedKeys=arrAdd(loadedKeys,key); 
            const newLoadingKeys=arrDel(loadingKeys,key); 
            setLoadedKeys(newLoadedKeys);
            setLoadingKeys(newLoadingKeys);
            resolve();
        });
        setLoadingKeys(arrAdd(loadingKeys,key));
    });

    useEffect(()=>{
        if(isInit && onLoad){
            onLoad(loadedKeys);
        }
    },[loadedKeys,onLoad]);

    const onNodeExpand=useCallback((e,treeNode)=>{  
        const { expanded,key }=treeNode; 
        const targetExpanded = !expanded; 
        let newExpandedKeys; 
        if (targetExpanded) {
            newExpandedKeys = arrAdd(expandedKeys, key);
        }else{
            newExpandedKeys= arrDel(expandedKeys,key);
        } 
        if(targetExpanded && loadData){
            const loadPromise = onNodeLoad(treeNode);
            if(loadPromise){
                loadPromise.then(()=>{
                    setExpandedKeys(newExpandedKeys)
                })
            }
        }else{
            setExpandedKeys(newExpandedKeys); 
        }   
        
        onExpand?.(e,{expanded,treeNode});
    },[onExpand,expandedKeys])

    const onNodeSelect=useCallback((e,treeNode)=>{
        const { selected,key }=treeNode;
        let newSelectedKeys;
        if(selected){
            newSelectedKeys= arrDel(selectedKeys,key);
        }else if(!multiple){
            newSelectedKeys=[key];
        }else{
            newSelectedKeys=arrAdd(selectedKeys,key);
        }
        setSelectedKeys(newSelectedKeys);
        onSelect?.(e)
    },[onSelect,selectedKeys]);

    const onNodeContextMenu=useCallback((event,node)=>{
        if (onRightClick) {
            event.preventDefault();
            onRightClick({ event, node });
        }
    },[onRightClick])

    const onNodeDoubleClick=useCallback((event,node)=>{
        if (onDoubleClick) { 
            onDoubleClick({ event, node });
        }
    },[onDoubleClick]);

    const onNodeDragStart=useCallback((event,node)=>{ 
        const { eventKey }=node;
        dragNode.current=node;
        dragStartMousePosition.current = {
            x: event.clientX,
            y: event.clientY,
        };
        const newExpandedKeys = arrDel(expandedKeys,eventKey); 
        setDragging(true);
        setDragChildrenKeys(getDragChildrenKeys(eventKey,keyEntities));
        setExpandedKeys(newExpandedKeys);
        window.addEventListener('dragend', onWindowDragEnd); 
        onDragStart?.({ event, node });
    },[onDragStart,expandedKeys]);



    const onNodeDragEnd=useCallback((event,node)=>{
        dragNode.current=null;
        onDragEnd?.({event,node});
    },[onDragEnd])

    const onNodeDragEnter=useCallback((event,node)=>{
        onDragEnter?.({event,node});
    },[onDragEnter,flattenData,allowDrop,dragStartMousePosition,keyEntities,expandedKeys]);

    const onWindowDragEnd = event => {
        onNodeDragEnd(event, null, true);
        window.removeEventListener('dragend', this.onWindowDragEnd);
    };

    const onNodeCheck=useCallback((event,node)=>{
        const { key }=node;
        let newCheckedKeys; 
        let newHalfCheckedKeys;

        const {checkedKeys:checkedKeysDestruction,halfCheckedKeys:halfCheckedKeysDestruction}=conductCheckedKey([...checkedKeys,key],keyEntities,true); 
        newCheckedKeys=checkedKeysDestruction;
        newHalfCheckedKeys=halfCheckedKeysDestruction;

        if(!flag){
            const keySet = new Set(checkedKeys);
            keySet.delete(key);
            const {checkedKeys:checkedKeysDestruction,halfCheckedKeys:halfCheckedKeysDestruction}=conductCheckedKey(
                Array.from(keySet),
                keyEntities,
                {checked:false,halfCheckedKeys:newHalfCheckedKeys}
            ); 

            newCheckedKeys=checkedKeysDestruction;
            newHalfCheckedKeys=halfCheckedKeysDestruction;
        }

        setCheckedKeys(newCheckedKeys); 
        
    },[onCheck,checkedKeys,keyEntities]);

    return (
        <TreeContext.Provider
            value={{
                prefixCls,
                keyEntities,
                expandedKeys,
                selectedKeys,
                checkedKeys,
                halfCheckedKeys,
                titleRender,
                switcherIcon,
                blockNode,
                filterTreeNode,
                showIcon,
                onNodeExpand,
                onNodeSelect,
                loadingKeys,
                loadData,
                loadedKeys,
                showLine,
                draggable,
                onNodeContextMenu,
                onNodeDoubleClick,
                onNodeDragStart,
                onNodeDragEnter,
                checkable,
                onNodeCheck
            }}
        >
            <div className={prefixCls}> 
                <NodeList 
                    data={flattenData}
                    expandedKeys={expandedKeys}
                    height={height}
                />
            </div>
        </TreeContext.Provider>
    )
});

export default Tree;