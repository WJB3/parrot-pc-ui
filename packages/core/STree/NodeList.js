
import React, { useMemo,useState  } from 'react';
import VirtualList from '@packages/core/VirtualList';
import TreeNode from './TreeNode';

const NodeList=React.forwardRef((props,ref)=>{

    const {
        data,
        expandedKeys
    }=props; 

    //上一轮数据
    const [prevData,setPrevData]=useState(data);
    const [prevExpandedKeys,setPrevExpandedKeys]=useState(expandedKeys);

    const { transitionData }=useMemo(()=>{

        const diffExpandedKeys=findExpandedKeys(prevExpandedKeys,expandedKeys);

        let transitionData=data;

        return {
            transitionData:transitionData
        }

    },[expandedKeys,data]);

    return (
        <VirtualList
            data={transitionData}
            itemKey={"key"}
        >
            {
                (treeNode)=>{
 

                    return (
                        <TreeNode 
                            {...treeNode}
                            eventKey={treeNode.key}
                            key={treeNode.key}
                            
                        />
                    )
                }
            }
        </VirtualList>
    )

});

export default NodeList;