
import React from 'react';
import VirtualList from '@packages/core/VirtualList';
import TreeNode from './TreeNode';
import { getKey } from './utils/treeUtil';

const NodeList=React.forwardRef((props,ref)=>{

    const {
        prefixCls,
        itemHeight
    }=props;
 

    return (
        <> 
            <VirtualList  
                prefixCls={`${prefixCls}-NodeList`}
                itemHeight={itemHeight}
            >
                {
                    (treeNode)=>{
                        const {
                            pos,
                            data:{key},
                            isStart,
                            isEnd
                        }=treeNode;

                        const mergedKey=getKey(key,pos);

                        return (
                            <TreeNode 
                            
                            />
                        )

                    }
                }
            </VirtualList>
        </>
    )

});

export default NodeList;