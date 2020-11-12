import React ,{useContext,useEffect,useState} from 'react';
import classNames from '@packages/utils/classNames';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import useControlled from '@packages/hooks/useControlled';
import { TreeContext } from './TreeContext';
import { convertDataToEntities,flattenTreeData } from './utils/treeUtil';
import { conductExpandParent,arrAdd,arrDel } from './utils/helper';
import NodeList from './NodeList';
import {
    ArrowDown
} from '@packages/core/Icon';
import "./index.scss";

//1.useState useRef的惰性加载

function haveValue(name){
    //有值且不为空
    return (name || []).length>0;
}

//惰性初始 state

const Tree=React.forwardRef((props,ref)=>{

    const {
        className,
        prefixCls:customizePrefixCls,
        //展开的Key
        expandedKeys:expandedKeysProp,
        //默认展开的Key
        defaultExpandedKeys=[],
        //展开父节点
        expandParent:expandParentProp,
        //默认展开父节点
        defaultExpandParent=true,
        treeData:treeDataProp=[],
        switcherIcon=<ArrowDown />
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Tree",customizePrefixCls);

    //树形结构数据
    const [treeData,setTreeData]=useState(treeDataProp);
    //平铺后的数据结构
    const [flattenNodes,setFlattenNodes]=useState([]);

    const [keyEntities,setKeyEntities]=useState({});

    const [expandParent]=useControlled({
        controlled:expandParentProp,
        default:defaultExpandParent
    });

    const [expandedKeys,setExpandedKeys]=useControlled({
        controlled:expandParent?expandedKeysProp:[],
        default:expandParent?defaultExpandedKeys:[]
    });

    const [initExpandedKeys]=useState(expandedKeys);

    const onNodeExpand=(e,treeNode)=>{

        const { expanded,key }=treeNode;
        const targetExpanded = !expanded;

        let newExpandedKeys;

        if (targetExpanded) {
            newExpandedKeys = arrAdd(expandedKeys, key);
        }else{
            newExpandedKeys=arrDel(expandedKeys,key);
        } 

        setExpandedKeys(newExpandedKeys);
    }

    useEffect(()=>{
        //改变treeData的值以及keyEntity
        let newEntitiesMap={};//新的实体分类 
        let newTreeData=[];//新的treeData 

        if(haveValue(treeDataProp)){
            newTreeData=[...treeDataProp];
            setTreeData(newTreeData);
            newEntitiesMap=convertDataToEntities(treeDataProp);
            setKeyEntities({...newEntitiesMap.keyEntities});
        }  

    },[treeDataProp]);

    useEffect(()=>{    
        if(haveValue(initExpandedKeys) || haveValue(keyEntities)){ 
            setExpandedKeys(conductExpandParent(initExpandedKeys,keyEntities));
        }
    },[keyEntities,initExpandedKeys]);

    useEffect(()=>{

        if(haveValue(treeData)&&haveValue(expandedKeys)){
            setFlattenNodes(flattenTreeData(
                treeData,
                expandedKeys
            )); 
        }   

    },[treeData,expandedKeys]); 
    
    return <TreeContext.Provider
        value={{
            keyEntities,
            expandedKeys:expandedKeys,
            prefixCls, 
            switcherIcon,
            onNodeExpand
        }}
    >
        <div className={
            classNames(
                prefixCls,
                className
            )
        }>
            <NodeList  
                data={flattenNodes} 
                prefixCls={prefixCls}
            />
        </div>
    </TreeContext.Provider>
    
});

export default Tree;