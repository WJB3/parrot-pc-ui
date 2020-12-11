

import React ,{ useMemo,useContext, useCallback } from 'react';
import TreeContext from './TreeContext';
import { ConfigContext } from '@packages/core/ConfigProvider';
import {
    convertDataToEntities,
    flattenTreeData,
    arrAdd,
    arrDel
} from './util/treeUtils';
import {
    conductExpandParent
} from './util/conductUtils';
import useControlled from '@packages/hooks/useControlled';
import NodeList from './NodeList';
import {
    ArrowDown
} from '@packages/core/Icon';
import useInit from '@packages/hooks/useInit';
import "./index.scss";



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
        multiple,
    }=props;

    //是否初始化
    const isInit=useInit();

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Tree",customizePrefixCls);

    const [ initExpandedKeys,setExpandedKeys ]=useControlled({
        controlled:expandedKeyProps,
        default:defaultExpandedKeys
    });

    const [ selectedKeys,setSelectedKeys  ]=useControlled({
        controlled:selectedKeysProp,
        default:defaultSelectedKeys
    });
 
    const { keyEntities,expandedKeys,flattenData }=useMemo(()=>{
         
        const keyEntities=convertDataToEntities(treeData)?.keyEntities;
        
        let expandedKeys=initExpandedKeys.concat();

        if(!isInit){//如果是初始化
            if(!defaultExpandAll && (expandParent || defaultExpandParent)){
                expandedKeys= conductExpandParent(expandedKeys,keyEntities);
            //如果expandParent和defaultExpandParent都是空，则不栈展开节点
            }else if(!expandParent && !defaultExpandParent && !isInit){
                expandedKeys=[];
            }else{
                const cloneKeyEntities = { ...newKeyEntities };
                const allExpandedKeys = Object.keys(cloneKeyEntities).map(key => cloneKeyEntities[key].key);
                expandedKeys = allExpandedKeys;
            } 
        } 
         
        const flattenData=flattenTreeData(treeData,expandedKeys);

        return {
            keyEntities,
            expandedKeys,
            flattenData
        }
    },[treeData,expandParent,expandedKeyProps,isInit,initExpandedKeys]);  

    const onNodeExpand=useCallback((e,treeNode)=>{ 

        const { expanded,key }=treeNode; 
        const targetExpanded = !expanded; 
        let newExpandedKeys; 
        if (targetExpanded) {
            newExpandedKeys = arrAdd(expandedKeys, key);
        }else{
            newExpandedKeys= arrDel(expandedKeys,key);
        }   
        setExpandedKeys(newExpandedKeys); 
        onExpand?.(e,{expanded,treeNode});
    },[onExpand,expandedKeys])

    const onNodeSelect=useCallback((e,treeNode)=>{
        const { selected,key }=treeNode;
        let newSelectedKeys;
        if(selected){
            newSelectedKeys= arrDel(selectedKeys,key);
        }else{
            newSelectedKeys=arrAdd(selectedKeys,key);
        }
        setSelectedKeys(newSelectedKeys);
        onSelect?.(e)
    },[onSelect,selectedKeys])
 
    console.log(expandedKeys)

    return (
        <TreeContext.Provider
            value={{
                prefixCls,
                keyEntities,
                expandedKeys,
                selectedKeys,
                titleRender,
                switcherIcon,
                blockNode,
                filterTreeNode,
                showIcon,
                onNodeExpand,
                onNodeSelect
            }}
        >
            <div className={prefixCls}> 
                <NodeList 
                    data={flattenData}
                />
            </div>
        </TreeContext.Provider>
    )
});

export default Tree;