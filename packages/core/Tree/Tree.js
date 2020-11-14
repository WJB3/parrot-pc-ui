import React ,{useContext,useEffect,useLayoutEffect,useState} from 'react';
import classNames from '@packages/utils/classNames';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import useControlled from '@packages/hooks/useControlled';
import { TreeContext } from './TreeContext';
import { convertDataToEntities,flattenTreeData } from './utils/treeUtil';
import { conductCheckedKey,conductExpandParent,arrAdd,arrDel } from './utils/helper';
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
        checkable=false,
        blockNode,
        checkedKeys:checkedKeysProp,
        defaultCheckedKeys=[],
        defaultExpandAll=false,
        selectedKeys:selectedKeysProp,
        defaultSelectedKeys=[],
        filterTreeNode,
        ...restProps
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Tree",customizePrefixCls);
    //平铺后的数据结构
    const [flattenNodes,setFlattenNodes]=useState([]);

    const [keyEntities,setKeyEntities]=useState({});

    const [expandParent]=useControlled({
        controlled:expandParentProp,
        default:defaultExpandParent,
    });

    const [controlledExpandKeys,setControlledExpandKeys]=useState(expandedKeysProp);

    const [expandedKeys,setExpandedKeys,isExpandedKeysControlled]=useControlled({
        controlled:expandParent?controlledExpandKeys:noopArr,
        default:expandParent?defaultExpandedKeys:[]
    }); 

    const [controlledCheckedKeys,setControllCheckedKeys]=useState(checkedKeysProp);

    const [halfCheckedKeys,setHalfCheckedKeys]=useState([]);

    const [checkedKeys,setCheckedKeys,isCheckedKeysControlled]=useControlled({
        controlled:controlledCheckedKeys,
        default:defaultCheckedKeys
    }); 

    const [selectedKeys,setSelectedKeys]=useControlled({
        controlled:selectedKeysProp,
        default:defaultSelectedKeys
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

    const onNodeSelect=(e,treeNode)=>{
        const { key }=treeNode;
        setSelectedKeys([key]);
    }

    const onNodeCheck=(flag,treeNode)=>{x
         
        const { key }=treeNode;
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

        if(!isCheckedKeysControlled){
            setHalfCheckedKeys(newHalfCheckedKeys);
        }
        

    }

    useLayoutEffect(()=>{  
        //改变keyEntity
        let newEntitiesMap={};//新的实体分类 

        if(haveValue(treeData)){  

            newEntitiesMap=convertDataToEntities(treeData);

            setKeyEntities({...newEntitiesMap.keyEntities});
        }  

    },[treeData]);

    useLayoutEffect(()=>{  
        if(haveValue(keyEntities)){  
            //针对defaultValue的情况
            if(!defaultExpandAll){
                setExpandedKeys(conductExpandParent(expandedKeys,keyEntities));
            }else{
                const cloneKeyEntities = { ...keyEntities };
                const newExpandKeys=Object.keys(cloneKeyEntities).map(key => cloneKeyEntities[key].key)
                setExpandedKeys(newExpandKeys);
            }
            
            //当expandedKey value 发生变化 
            if(isExpandedKeysControlled && (conductExpandParent(expandedKeys,keyEntities).toString()!==expandedKeys.toString() || conductExpandParent(expandedKeysProp,keyEntities).toString()!==expandedKeys.toString())){
                //如果是受控并且
                setControlledExpandKeys(conductExpandParent(expandedKeysProp,keyEntities));
            }
        }
    },[keyEntities,expandedKeysProp,defaultExpandAll]);

    useLayoutEffect(()=>{   
        if(haveValue(expandedKeys)||haveValue(treeData)){
            setFlattenNodes(flattenTreeData(
                treeData,
                expandedKeys
            )); 
        }   
    },[expandedKeys]);
    
    useLayoutEffect(()=>{ 
        if(haveValue(keyEntities)){  
            //针对defaultValue的情况
            const {checkedKeys:checkedKeysDestruction,halfCheckedKeys:halfCheckedKeysDestruction}=conductCheckedKey(checkedKeys,keyEntities,true); 
            setCheckedKeys(checkedKeysDestruction);
            setHalfCheckedKeys(halfCheckedKeysDestruction);

            //当expandedKey value 发生变化 
            if(isCheckedKeysControlled){
                const {checkedKeys:checkedKeysDestructionProp,halfCheckedKeys:halfCheckedKeysDestructionProp}=conductCheckedKey(checkedKeysProp,keyEntities,true); 

                if(checkedKeysDestructionProp.toString()!==checkedKeysDestruction.toString()){
                    setControllCheckedKeys(checkedKeysDestructionProp);
                    setHalfCheckedKeys(halfCheckedKeysDestructionProp);
                }
            } 

        }
    },[keyEntities,checkedKeysProp]);  

    return <TreeContext.Provider
        value={{
            keyEntities,
            expandedKeys:expandedKeys,
            prefixCls, 
            switcherIcon,
            checkable,
            blockNode,
            checkedKeys,
            halfCheckedKeys,
            selectedKeys,
            filterTreeNode,
            onNodeExpand,
            onNodeCheck,
            onNodeSelect
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
                {...restProps}
                
            />
        </div>
    </TreeContext.Provider>
    
});

export default Tree;