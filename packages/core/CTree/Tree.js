

import React ,{useContext, useEffect, useLayoutEffect, useState} from 'react';
import { ConfigContext } from '@packages/core/ConfigProvider'; 
import classNames from '@packages/utils/classNames';
import VirtualList from '@packages/core/VirtualList';
import useControlled from '@packages/hooks/useControlled';
import {
    haveValue
} from '@packages/utils/validateValue';
import {
    convertDataToEntities,
    flattenTreeData,
    conductExpandParent,
    getKey,
    arrAdd,
    arrDel
} from './utils/treeUtils';
import {
    ArrowDown
} from '@packages/core/Icon';
import TreeNode from './TreeNode';
import useInit from '@packages/hooks/useInit';
import "./index.scss";

function itemKey(item){
    const {
        data: { key },
        pos,
    } = item;
    return getKey(key,pos);
}

const Tree=React.forwardRef(function(props,ref){

    //1.treeData - >flatternData
    //2.expandedKeys && defaultExpandedKeys
    //3.useState useRef的惰性加载
    //4.Set的用法
    //5.convertDataToEntities转数据为实体
    const {
        //传过来的树形结构
        treeData=[],
        prefixCls:customizePrefixCls,
        //展开的keys(可控)
        expandedKeys:expandedKeysProp,
        //默认展开的keys 
        defaultExpandedKeys=[],
        //展开父节点
        expandParent:expandParentProp,
        //默认展开父节点
        defaultExpandParent=true,
        defaultExpandAll=false,
        className,
        switcherIcon=<ArrowDown />,
        showIcon,
        blockNode,
        selectedKeys:selectedKeysProp,
        defaultSelectedKeys=[],
        filterTreeNode,
        icon,
        onSelect,
        titleRender,
        onExpand
    }=props;

    const isInit=useInit();

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Tree",customizePrefixCls);

    const [expandParent]=useControlled({
        controlled:expandParentProp,
        default:defaultExpandParent
    });

    const [flattenData,setFlattenData]=useState([]);

    const [keyEntities,setKeyEntities]=useState([]);

    //控制可控
    const [controlledExpandKeys,setControlledExpandKeys]=useState(expandedKeysProp);
 

    const [expandedKeys,setExpandedKeys,isExpandedKeysControlled]=useControlled({
        controlled:controlledExpandKeys,
        default:defaultExpandedKeys
    });

    //可选key
    const [selectedKeys,setSelectedKeys]=useControlled({
        controlled:selectedKeysProp,
        default:defaultSelectedKeys
    });
 
    useLayoutEffect(()=>{
        let newKeyEntities={};
        let newExpandedKeys=[];
        let newFlattenData=[]; 
        //如果有treeData说明需要树有值则需要更改entity实体
        if(haveValue(treeData)){ 
            newKeyEntities=convertDataToEntities(treeData)?.keyEntities;
        } 
        //如果存在新实体则自然存在treeData，故可以根据实体得到展开的expandkeys
        if(haveValue(newKeyEntities)){
            //如果不是默认展开，则将所有上级expandedKeys放进expandedKeys中
            if(!defaultExpandAll){
                newExpandedKeys=conductExpandParent(expandedKeys,newKeyEntities)
            }else{//如果默认是展开全部的，将所有key放进expandedKeys
                const cloneKeyEntities = { ...newKeyEntities };
                const allExpandedKeys=Object.keys(cloneKeyEntities).map(key => cloneKeyEntities[key].key);
                newExpandedKeys=allExpandedKeys;
            }
        }
        if(haveValue(newExpandedKeys)||haveValue(treeData)){ 
            newFlattenData=flattenTreeData(
                treeData,
                expandedKeys
            ) 
        }
        setKeyEntities(newKeyEntities);
        if(isExpandedKeysControlled){
            setControlledExpandKeys(newExpandedKeys)
        }else{
            setExpandedKeys(newExpandedKeys);
        } 
        setFlattenData(newFlattenData);
        
    },[]); 

    //点击树节点标题部分
    const onNodeSelect=(e,treeNode)=>{
        const { key,selected }=treeNode;
        if(selected){
            setSelectedKeys([]);
        }else{
            setSelectedKeys([key]);
        }
        onSelect?.(e,treeNode);
    }

    //点击树节点的展开/折叠图标
    const onNodeExpand=(e,treeNode)=>{
        const { expanded,key} =treeNode;
        const targetExpanded=!expanded;
        let newExpandedKeys;
        //没有展开点击展开 
        if(targetExpanded){ 
            newExpandedKeys=arrAdd(expandedKeys,key); 
            console.log(newExpandedKeys)
        }else{
            newExpandedKeys=arrDel(expandedKeys,key);
        }  
        setExpandedKeys(newExpandedKeys);
        onExpand?.(expanded,treeNode);
    }

    useEffect(()=>{   
            const newFlattenData=flattenTreeData(
                treeData,
                expandedKeys
            );
            //为了避免与第一次重复渲染 我们在这里判断如果flattenData数组不变 就无需渲染避免重复渲染
            if(haveValue(expandedKeys)||haveValue(treeData)&&
                flattenData.toString()!==newFlattenData.toString()
            ){ 
                setFlattenData(newFlattenData); 
            }   
      
    },[expandedKeys]); 
 

    return (
        <div className={
            classNames(
                prefixCls,
                className    
            )
        }>
            <VirtualList
                prefixCls={`${prefixCls}-NodeList`}
                data={flattenData}   
                itemKey={itemKey} 
            >
                {
                    (treeNodeData)=>{ 
                        const {
                            key
                        }=treeNodeData;
                        
                        return (
                            <TreeNode
                                {...treeNodeData}
                                className={`${prefixCls}-TreeNode`}
                                keyEntities={keyEntities}
                                icon={icon}
                                showIcon={showIcon}
                                onNodeSelect={onNodeSelect}
                                onNodeExpand={onNodeExpand}
                                switcherIcon={switcherIcon}
                                titleRender={titleRender}
                                filterTreeNode={filterTreeNode}
                                blockNode={blockNode}
                                expanded={expandedKeys.indexOf(key)>-1}
                                selected={selectedKeys.indexOf(key)>-1}
                                eventKey={key}
                            />
                        )

                    }
                }
            </VirtualList>
        </div>
    ) 

});

export default Tree;