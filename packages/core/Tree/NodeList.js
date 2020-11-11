
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
        data,
        prefixCls
    }=props;

    const prefixClsNodeList=`${prefixCls}-NodeList`;

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
                            key
                        }=treeNode;  

                        return (
                            <TreeNode 
                                eventKey={key}
                            />
                        )

                    }
                }
            </VirtualList>
        </>
    )

});

export default NodeList;