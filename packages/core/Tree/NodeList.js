
import React from 'react';
import VirtualList from '@packages/core/VirtualList';
import TreeNode from './TreeNode';
import { getKey,getTreeNodeProps } from './utils/treeUtil';
import  { TreeContext } from './TreeContext';

const NodeList=React.forwardRef((props,ref)=>{

    const {
        prefixCls,
        itemHeight
    }=props;

    const {
        keyEntities,
        expandedKeys
    }=useContext(TreeContext);

    const treeNodeRequiredProps={
        keyEntities,
        expandedKeys
    };
 

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
                            data:{key,...restProps},
                            isStart,
                            isEnd
                        }=treeNode;

                        const mergedKey=getKey(key,pos);
                        const treeNodeProps=getTreeNodeProps(mergedKey,treeNodeRequiredProps);

                        return (
                            <TreeNode 
                                {...restProps}
                                {...treeNodeProps}
                                data={treeNode.data}
                            />
                        )

                    }
                }
            </VirtualList>
        </>
    )

});

export default NodeList;