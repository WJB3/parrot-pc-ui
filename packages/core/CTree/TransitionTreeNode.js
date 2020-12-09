

import React from 'react';
import { Collpase } from '@packages/core/Transition';
import TreeNode from './TreeNode';


const TransitionTreeNode=(props)=>{

    const {
        transitionNodes
    }=props;

    if(transitionNodes){
        return (
            <Collpase>
                {
                    transitionNodes.map((treeNode)=>{
                        const {

                        }=treeNode;

                        return (<TreeNode
                            data={treeNode.data}
                        />)
                    })
                }
            </Collpase>
        )
    }

    return <TreeNode 
        
    />

}

export default TransitionTreeNode;