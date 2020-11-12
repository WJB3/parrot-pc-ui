import React ,{useContext,useEffect,useLayoutEffect,useState} from 'react';
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
    if(Array.isArray(name)){
        return (name || []).length>0;
    }

    if(typeof name==="object"||!Array.isArray(name) ){
        return (Object.keys(name) || []).length>0;
    }
    //有值且不为空
    
}

//惰性初始 state

let noopArr=[];

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
        treeData=[],
        switcherIcon=<ArrowDown />,
        checkable=false
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Tree",customizePrefixCls);
    //平铺后的数据结构
    const [flattenNodes,setFlattenNodes]=useState([]);

    const [keyEntities,setKeyEntities]=useState({});

    const [expandParent]=useControlled({
        controlled:expandParentProp,
        default:defaultExpandParent
    });

    const [expandedKeys,setExpandedKeys]=useControlled({
        controlled:expandParent?expandedKeysProp:noopArr,
        default:expandParent?defaultExpandedKeys:[]
    }); 

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
        //改变keyEntity
        let newEntitiesMap={};//新的实体分类 

        if(haveValue(treeData)){  

            newEntitiesMap=convertDataToEntities(treeData);

            setKeyEntities({...newEntitiesMap.keyEntities});
        }  

    },[treeData]);

    useEffect(()=>{  
        if(haveValue(keyEntities)){  
            setExpandedKeys(conductExpandParent(expandedKeys,keyEntities));
        }
    },[keyEntities]);

    useEffect(()=>{   
        if(haveValue(expandedKeys)||haveValue(treeData)){
            setFlattenNodes(flattenTreeData(
                treeData,
                expandedKeys
            )); 
        }   
    },[expandedKeys]); 

    
 
    
    return <TreeContext.Provider
        value={{
            keyEntities,
            expandedKeys:expandedKeys,
            prefixCls, 
            switcherIcon,
            checkable,
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