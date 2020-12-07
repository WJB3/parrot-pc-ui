

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
    flattenTreeData
} from './utils/treeUtils';


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
        //默认展开的keys
        expandedKeys:expandedKeysProp,
        defaultExpandedKeys,
        className
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Tree",customizePrefixCls);

    const [flattenData,setFlattenData]=useState([]);

    const [keyEntities,setKeyEntity]=useState([]);

    const [expandedKeys,setExpandedKeys]=useControlled({
        controlled:expandedKeysProp,
        default:defaultExpandedKeys
    });

    useLayoutEffect(()=>{
        if(haveValue(expandedKeys)||haveValue(treeData)){
            setFlattenData(
                flattenTreeData(
                    treeData,
                    expandedKeys
                )
            )
        }
    },[expandedKeys]);

    useLayoutEffect(()=>{
        //生成keyEntities
        let newEntitiesMap={};//新的实体分类
        if(haveValue){
            newEntitiesMap=convertDataToEntities(treeData);
            setKeyEntity({...newEntitiesMap.keyEntities});
        }
    },[treeData]);

    const [a,setA]=useState(1);
    const [b,setB]=useState(1);
    const [c,setC]=useState(1);
    const [d,setD]=useState(1);

    useEffect(()=>{
        setA(2)
    },[])

    useEffect(()=>{
        setB(a+1)
    },[a]);

    useEffect(()=>{
        setC(b+1)
    },[b]);

    useEffect(()=>{
        setD(c+1)
    },[c]);

    return (
        <div className={
            classNames(
                prefixCls,
                className    
            )
        }>
            <VirtualList
                data={flattenData}    
            >
                
            </VirtualList>
        </div>
    ) 

});

export default Tree;