

import React from 'react';
import { Collapse } from '@packages/core/Transition';
import TreeNode from './TreeNode';


const TransitionTreeNode=React.forwardRef((props,ref)=>{

    const {
        transitionNodes,
        eventKey,
        title
    }=props;
 

    if(transitionNodes){
        return (
            <Collapse>
                {
                    transitionNodes.map((treeNode)=>{
                        const {

                        }=treeNode;
                         

                        return (<TreeNode
                            data={treeNode.data}
                            eventKey={eventKey}
                        />)
                    })
                }
            </Collapse>
        )
    }

    return <TreeNode 
        eventKey={eventKey}
        title={title}
    />

})

export default TransitionTreeNode;