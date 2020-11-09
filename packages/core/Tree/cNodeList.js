/**
 * Handle virtual list of the TreeNodes.
 */

import * as React from 'react';
import VirtualList  from 'rc-virtual-list'; 
import MotionTreeNode from './MotionTreeNode';
import { findExpandedKeys, getExpandRange } from './utils/diffUtil';
import { getTreeNodeProps, getKey } from './utils/treeUtil';

  
export const MOTION_KEY = `RC_TREE_MOTION_${Math.random()}`;

  

/**
 * We only need get visible content items to play the animation.
 */
export function getMinimumRangeTransitionRange(
  list,
  virtual,
  height,
  itemHeight,
) {
  if (virtual === false || !height) {
    return list;
  }

  return list.slice(0, Math.ceil(height / itemHeight) + 1);
}

function itemKey(item) {
  const {
    data: { key },
    pos,
  } = item;
  return getKey(key, pos);
} 

const RefNodeList = (props, ref) => {
  const {
    prefixCls,
    data,
    selectable,
    checkable,
    expandedKeys,
    selectedKeys,
    checkedKeys,
    loadedKeys,
    loadingKeys,
    halfCheckedKeys,
    keyEntities,
    disabled,

    dragging,
    dragOverNodeKey,
    dropPosition,
    height,
    itemHeight,
    virtual,

    focusable,
    activeItem,
    focused,
    tabIndex,

    onKeyDown,
    onFocus,
    onBlur,
    onActiveChange,

    onListChangeStart,
    onListChangeEnd,

    ...domProps
  } = props;

  // =============================== Ref ================================
  const listRef = React.useRef(null);
  const indentMeasurerRef = React.useRef(null);
  React.useImperativeHandle(ref, () => ({
    scrollTo: scroll => {
      listRef.current.scrollTo(scroll);
    },
    getIndentWidth: () => indentMeasurerRef.current.offsetWidth,
  }));

  // ============================== Motion ==============================
  const [prevExpandedKeys, setPrevExpandedKeys] = React.useState(expandedKeys);
  const [prevData, setPrevData] = React.useState(data); 
  const [transitionRange, setTransitionRange] = React.useState([]);
  const [motionType, setMotionType] = React.useState(null);

  function onMotionEnd() {
    setPrevData(data); 
    setTransitionRange([]);
    setMotionType(null);

    onListChangeEnd();
  }

  // Do animation if expanded keys changed
  React.useEffect(() => {
    setPrevExpandedKeys(expandedKeys);

    const diffExpanded = findExpandedKeys(prevExpandedKeys, expandedKeys);

    if (diffExpanded.key !== null) {
      if (diffExpanded.add) {
        const keyIndex = prevData.findIndex(({ data: { key } }) => key === diffExpanded.key);

        const rangeNodes = getMinimumRangeTransitionRange(
          getExpandRange(prevData, data, diffExpanded.key),
          virtual,
          height,
          itemHeight,
        );

        const newTransitionData  = prevData.slice();
        newTransitionData.splice(keyIndex + 1, 0, MotionFlattenData);
 
        setTransitionRange(rangeNodes);
        setMotionType('show');
      } else {
        const keyIndex = data.findIndex(({ data: { key } }) => key === diffExpanded.key);

        const rangeNodes = getMinimumRangeTransitionRange(
          getExpandRange(data, prevData, diffExpanded.key),
          virtual,
          height,
          itemHeight,
        );

        const newTransitionData  = data.slice();
        newTransitionData.splice(keyIndex + 1, 0, MotionFlattenData);
 
        setTransitionRange(rangeNodes);
        setMotionType('hide');
      }
    } else if (prevData !== data) {
      // If whole data changed, we just refresh the list
      setPrevData(data); 
    }
  }, [expandedKeys, data]);

  React.useEffect(() => {
    if (!dragging) {
      onMotionEnd();
    }
  }, [dragging]);
 

  const treeNodeRequiredProps = {
    expandedKeys,
    selectedKeys,
    loadedKeys,
    loadingKeys,
    checkedKeys,
    halfCheckedKeys,
    dragOverNodeKey,
    dropPosition,
    keyEntities,
  };

  return (
    <> 
      <VirtualList 
        {...domProps}
        data={data}
        itemKey={itemKey}
        height={height}
        fullHeight={false}
        virtual={virtual}
        itemHeight={itemHeight}
        prefixCls={`${prefixCls}-list`}
        ref={listRef}
      >
        {(treeNode) => {
          const {
            pos,
            data: { key, ...restProps },
            isStart,
            isEnd,
          } = treeNode;
          const mergedKey = getKey(key, pos);
          delete restProps.children;

          const treeNodeProps = getTreeNodeProps(mergedKey, treeNodeRequiredProps);

          return (
            <MotionTreeNode
              {...restProps}
              {...treeNodeProps}
              active={!!activeItem && key === activeItem.data.key}
              pos={pos}
              data={treeNode.data}
              isStart={isStart}
              isEnd={isEnd} 
              motionNodes={key === MOTION_KEY ? transitionRange : null}
              motionType={motionType}
              onMotionStart={onListChangeStart}
              onMotionEnd={onMotionEnd}
              treeNodeRequiredProps={treeNodeRequiredProps}
              onMouseMove={() => {
                onActiveChange(null);
              }}
            />
          );
        }}
      </VirtualList>
    </>
  );
};

const NodeList = React.forwardRef(RefNodeList);
NodeList.displayName = 'NodeList';

export default NodeList;