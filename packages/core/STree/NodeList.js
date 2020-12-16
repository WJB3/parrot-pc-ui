
import React, { useEffect, useState } from 'react';
import VirtualList from '@packages/core/VirtualList';
import TreeNode from './TreeNode';
import {
    findExpandedKeys,
    getExpandRange
} from './util//diffUtils';
import {
    getKey
} from './util/treeUtils';
import {  Collapse,Fade,Grow } from '@packages/core/Transition';

export const TRANSITION_KEY = `TRANSITION_KEY_${Math.random()}`;

function itemKey(item) { 
    const {
      data: { key },
      pos,
    } = item;
    return getKey(key, pos);
}
  

const TransitionNode = {
    key: TRANSITION_KEY,
};

const TransitionEntity = {
    key: TRANSITION_KEY,
    level: 0,
    index: 0,
    pos: '0',
    node: TransitionNode,
};


const TransitionFlattenData = {
    parent: null,
    children: [],
    pos: TransitionEntity.pos,
    data: TransitionNode,
    /** Hold empty list here since we do not use it */
    isStart: [],
    isEnd: [],  
    
}; 

const NodeList = React.forwardRef((props, ref) => {

    const {
        data,
        expandedKeys,
        transitionComponent: TransitionComponent = Collapse,
        height
    } = props;

    //上一轮数据
    const [prevData, setPrevData] = useState(data);
    const [prevExpandedKeys, setPrevExpandedKeys] = useState(expandedKeys);
    const [transitionData, setTransitionData] = useState(data);
    const [transitionRange, setTransitionRange] = React.useState([]);
    const [transitionVisible,setTransitionVisible]=React.useState(false);

    useEffect(() => {
        setPrevExpandedKeys(expandedKeys);

        const diffExpanded = findExpandedKeys(prevExpandedKeys, expandedKeys); 

        if (diffExpanded.key !== null) {
            if (diffExpanded.add) {//如果是增加
                const keyIndex = prevData.findIndex(({ data: { key } }) => key === diffExpanded.key);
                const rangeNodes = getExpandRange(prevData, data, diffExpanded.key);
                const newTransitionData = prevData.slice();
                newTransitionData.splice(keyIndex + 1, 0, TransitionFlattenData); 
                setTransitionData(newTransitionData);
                setTransitionRange(rangeNodes);
                setTransitionVisible(true);
            }else{
                const keyIndex = data.findIndex(({ data: { key } }) => key === diffExpanded.key);
                const rangeNodes = getExpandRange(data, prevData, diffExpanded.key);  
                const newTransitionData = data.slice();
                newTransitionData.splice(keyIndex + 1, 0, TransitionFlattenData);  
                setTransitionData(newTransitionData);
                setTransitionRange(rangeNodes);  
                setTransitionVisible(false);
            }
        } else {
            setPrevData(data);
            setTransitionData(data);
        }

    }, [expandedKeys, data]); 

    const handleTransitionEntered=()=>{ 
        setPrevData(data);
        setTransitionData(data);
        setTransitionRange([]); 
    } 

    const handleTransitionExited=()=>{
        setPrevData(data);
        setTransitionData(data);
        setTransitionRange([]); 
    }
 

    return (
        <VirtualList
            data={transitionData}
            itemKey={itemKey}
            height={height}
        >
            {
                (treeNode) => { 
                    const {
                        data: { key }
                    } = treeNode; 
                    if (key === TRANSITION_KEY) { 
                        return (
                            <TransitionComponent 
                                key={key} 
                                visible={transitionVisible}  
                                timeout={300}
                                disappear
                                onEntered={handleTransitionEntered}
                                onExited={handleTransitionExited}
                            >
                                <div>
                                    {
                                        transitionRange.map(item=>{ 
                                            return <TreeNode
                                                {...treeNode}
                                                key={item.key}
                                                eventKey={item.key}
                                                title={item.title} 
                                            />
                                        })
                                    }
                                </div>
                            </TransitionComponent>
                        )
                    }


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

export default React.memo(NodeList);