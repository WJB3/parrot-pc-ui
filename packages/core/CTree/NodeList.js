


import React from 'react'; 
import VirtualList from '@packages/core/VirtualList';
import {
    getKey,
    findExpandedKeys
} from './utils/treeUtils';
import TreeNode from './TreeNode';
import classNames from '@packages/utils/classNames';
import TransitionTreeNode from './TransitionTreeNode';


function itemKey(item) {
    const {
        data: { key },
        pos,
    } = item;
    return getKey(key, pos);
}


const NodeList = function(props) {

    const {
        prefixCls,
        //data
        data,
        expandedKeys
    } = props; 

    return (
        <VirtualList
            prefixCls={`${prefixCls}-NodeList`}
            itemKey={itemKey}
            data={data}
        >
            {
                (treeNodeData) => {

                    const {
                        data:{key}
                    }=props;

                    return (
                        <TransitionTreeNode
                            
                        />
                    )

                }
            }
        </VirtualList>
    )
}

export default React.memo(NodeList);