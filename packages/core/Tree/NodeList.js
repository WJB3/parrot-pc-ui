
import React ,{ useContext } from 'react';
import VirtualList from '@packages/core/VirtualList';
import TreeNode from './TreeNode';
import { getKey,getTreeNodeProps } from './utils/treeUtil';
import { TreeContext } from './TreeContext';

function itemKey(item){
    const {
        data: { key },
        pos,
    } = item;
    return getKey(key,pos);
}

const NodeList=React.forwardRef((props,ref)=>{

    const { 
        itemHeight,
        data
    }=props;

    const {
        keyEntities,
        expandedKeys,
        prefixCls
    }=useContext(TreeContext);

    const prefixClsNodeList=`${prefixCls}-NodeList`

    const treeNodeRequiredProps={
        keyEntities,
        expandedKeys
    }; 

    return (
        <> 
            <VirtualList  
                prefixCls={`${prefixClsNodeList}`}
                itemHeight={itemHeight}
                data={data}
                itemKey={itemKey}
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