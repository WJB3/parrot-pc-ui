
import React, { useMemo,useState  } from 'react';
import VirtualList from '@packages/core/VirtualList';
import TreeNode from './TreeNode';

const NodeList=React.forwardRef((props,ref)=>{

    const {
        data
    }=props;

    const [prevData,setPrevData]=useState(data);

    const { transitionData }=useMemo(()=>{
        
        let transitionData=data;

        return {
            transitionData:transitionData
        }

    },[data]);

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