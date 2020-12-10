

import React ,{ useMemo } from 'react';
import TreeContext from './TreeContext';
import {
    convertDataToEntities,
    flattenTreeData
} from './util/treeUtils';
import {
    conductExpandParent
} from './util/conductUtils';
import useControlled from '@packages/hooks/useControlled';


const Tree=React.forwardRef((props,ref)=>{

    const {
        //所需的树形结构
        treeData,
        //是否自动展开父节点（可控属性，如果变为true，将自动展开父节点，如果变为false，将自动关闭父节点）
        expandParent,
        //默认是否展开父节点（初始化值）
        defaultExpandParent=true,
        //展开的keys（可控属性）
        expandedKeys:expandedKeyProps,
        //默认展开的keys（初始化值）
        defaultExpandedKeys,
        //默认展开所有
        defaultExpandAll=false
    }=props;

    const [ initExpandedKeys ]=useControlled({
        controlled:expandedKeyProps,
        default:defaultExpandedKeys
    });

    const { keyEntities,expandedKeys,flattenDatas }=useMemo(()=>{
        const keyEntities=convertDataToEntities(treeData)?.keyEntities;
        let expandedKeys=initExpandedKeys.concat();
        //如果不是默认展开所有 并且 exparntDefault或者defaultParent
        if(!defaultExpandAll && (expandParent || defaultExpandParent)){
            expandedKeys= conductExpandParent(expandedKeys,keyEntities);
        //如果expandParent和defaultExpandParent都是空，则不栈展开节点
        }else if(!expandParent && !defaultExpandParent){
            expandedKeys=[];
        }else{
            const cloneKeyEntities = { ...newKeyEntities };
            const allExpandedKeys = Object.keys(cloneKeyEntities).map(key => cloneKeyEntities[key].key);
            expandedKeys = allExpandedKeys;
        }
        const flattenDatas=flattenTreeData(treeData,expandedKeys);
        return {
            keyEntities,
            expandedKeys,
            flattenDatas
        }
    },[treeData,expandParent,expandedKeyProps]); 
    
    console.log(expandedKeys);
    console.log(flattenDatas);
 
    return (
        <TreeContext.Provider
            value={
                keyEntities
            }
        >

        </TreeContext.Provider>
    )
});

export default Tree;