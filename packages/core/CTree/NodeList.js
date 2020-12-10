


import React ,{ useState } from 'react'; 
import VirtualList from '@packages/core/VirtualList';
import {
    getKey,
    findExpandedKeys,
    getExpandRange 
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

export const TRANSITION_KEY = `PARROT_TRANSITION_KEY_${Math.random()}`;

const TRANSITION_NODE = {
  key: TRANSITION_KEY,
};

export const TranstionEntity = {
    key: TRANSITION_KEY,
    level: 0,
    index: 0,
    pos: '0',
    node: TRANSITION_NODE,
  };

const TransitionFlattenData={
    parent: null,
    children: [],
    pos: TranstionEntity.pos,
    data: TRANSITION_NODE,
    /** Hold empty list here since we do not use it */
    isStart: [],
    isEnd: [],
}


const NodeList = React.forwardRef(function(props,ref) {

    const {
        prefixCls,
        //data
        data,
        expandedKeys
    } = props; 

    console.log(data)
 

    const [ prevExpandedKeys,setPrevExpandedKeys ]=useState(expandedKeys);
    //记录上一次的data
    const [ prevData, setPrevData ] = React.useState(data);
    const [ transitionData, setTransitionData ] = React.useState(data);
    const [ transitionRange, setTransitionRange ] = React.useState([]);

    React.useEffect(() => {
        setPrevExpandedKeys(expandedKeys); 
        const diffExpanded = findExpandedKeys(prevExpandedKeys, expandedKeys); 
        console.log(diffExpanded);
      
        if (diffExpanded.key !== null) {
            if (diffExpanded.add) {//如果是展开 
                // const keyIndex = prevData.findIndex(({ data: { key } }) => key === diffExpanded.key);
                
                // const rangeNodes = getExpandRange(prevData, data, diffExpanded.key); 
                // const newTransitionData  = prevData.slice(); 
                // //增加
                // newTransitionData.splice(keyIndex + 1, 0, TransitionFlattenData);  
                // setTransitionData(newTransitionData);
                // setTransitionRange(rangeNodes); 
            }else{
                const keyIndex = data.findIndex(({ data: { key } }) => key === diffExpanded.key);
                const rangeNodes = getExpandRange(prevData, data, diffExpanded.key); 
                const newTransitionData= data.slice();
                newTransitionData.splice(keyIndex + 1, 0, TransitionFlattenData);

                setTransitionData(newTransitionData);
                setTransitionRange(rangeNodes);
            }
        }else if (prevData !== data) { 
            console.log("prevData!==data")
            // If whole data changed, we just refresh the list
            setPrevData(data);
            setTransitionData(data); 
        }
    },[expandedKeys,data]);

    const mergedData=transitionData;
 
    console.log(transitionData)
  
    return (
        <VirtualList
            prefixCls={`${prefixCls}-NodeList`}
            itemKey={itemKey}
            data={mergedData}
        >
            {
                (treeNodeData) => {
 
                    const {
                        key
                    }=treeNodeData;

                    return (
                        <TransitionTreeNode
                            {...treeNodeData}
                            eventKey={key}  
                            motionNodes={key === TRANSITION_KEY ? transitionRange : null}
                        />
                    )

                }
            }
        </VirtualList>
    )
});

export default React.memo(NodeList);