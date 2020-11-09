import React ,{useContext,useEffect,useState} from 'react';
import classNames from '@packages/utils/classNames';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import useControlled from '@packages/hooks/useControlled';
import { TreeContext } from './TreeContext';
import { convertDataToEntities,flattenTreeData } from './utils/treeUtil';
import { conductExpandParent } from './utils/helper';
import NodeList from './NodeList';

function haveValue(name){
    //有值且不为空
    return (name || []).length>1;
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
        treeData:treeDataProp=[]
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Tree",customizePrefixCls);

    //树形结构数据
    const [treeData,setTreeData]=useState(treeDataProp);
    //平铺后的数据结构
    const [flattenNodes,setFlattenNodes]=useState([]);

    const [keyEntities,setKeyEntities]=useState({});

    const [expandedKeys,setExpandedKeys]=useControlled({
        controlled:expandedKeysProp,
        default:defaultExpandedKeys
    });

    const [expandParent,setExpandParent]=useControlled({
        controlled:expandParentProp,
        default:defaultExpandParent
    });

    useEffect(()=>{

        let newEntitiesMap={};//新的实体分类
        let newExpandedKeys=[];//新的展开key
        let newTreeData=[];//新的treeData
        let newFlattenNodes=[];//新的平铺节点

        if(haveValue(treeDataProp)){

            newTreeData=[...treeDataProp];

            setTreeData(newTreeData);
            newEntitiesMap=convertDataToEntities(treeDataProp);
            setKeyEntities({...newEntitiesMap.keyEntities});
        }

        if(haveValue(expandedKeys)){
            if(expandParent){
                newExpandedKeys=conductExpandParent(expandedKeys,newEntitiesMap.keyEntities);
                setExpandedKeys(newExpandedKeys);
            }
        }

        if(haveValue(newExpandedKeys)){
            newFlattenNodes=flattenTreeData(
                newTreeData,
                newExpandedKeys
            );
            setFlattenNodes(newFlattenNodes);
        }

    },[treeDataProp,expandedKeys,expandParent]);
 
    return <TreeContext.Provider
        value={{
            keyEntities,
            expandedKeys
        }}
    >
        <div className={
            classNames(
                prefixCls,
                className
            )
        }>
            <NodeList 
                prefixCls={prefixCls}
                data={flattenNodes}
                expandedKeys={expandedKeys}
            />
        </div>
    </TreeContext.Provider>
    
});

export default Tree;