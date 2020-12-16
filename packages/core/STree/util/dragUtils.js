
/**
 * 获取drag节点的子节点
 * @param {*} dragNodeKey 
 * @param {*} keyEntities 
 */
export function getDragChildrenKeys(dragNodeKey,keyEntities){

    const dragChildrenKeys = [];

    const entity = keyEntities[dragNodeKey];

    function dig(list= []) {
        list.forEach(({ key, children }) => {
          dragChildrenKeys.push(key);
          dig(children);
        });
    }

    dig(entity.children);

    return dragChildrenKeys;
}

export function calcDropPosition(
  event,
  targetNode,
  indent,
  startMousePosition,
  allowDrop,
  flattenedNodes,
  keyEntities,
  expandKeys, 
){
  const { clientX, clientY } = event;
  const { top, height } = event.target.getBoundingClientRect();
  // optional chain for testing
  const horizontalMouseOffset = 1 * ((startMousePosition?.x || 0) - clientX);
  const rawDropLevelOffset = (horizontalMouseOffset - 12) / indent;

  // find abstract drop node by horizontal offset
  let abstractDropNodeEntity = keyEntities[targetNode.props.eventKey];

  if (clientY < top + height / 2) {
    // first half, set abstract drop node to previous node
    const nodeIndex = flattenedNodes.findIndex(
      flattenedNode => flattenedNode.data.key === abstractDropNodeEntity.key,
    );
    const prevNodeIndex = nodeIndex <= 0 ? 0 : nodeIndex - 1;
    const prevNodeKey = flattenedNodes[prevNodeIndex].data.key;
    abstractDropNodeEntity = keyEntities[prevNodeKey];
  }

  const abstractDragOverEntity = abstractDropNodeEntity;
  const dragOverNodeKey = abstractDropNodeEntity.key;

  let dropPosition = 0;
  let dropLevelOffset = 0;
  for (let i = 0; i < rawDropLevelOffset; i += 1) {
    if (
      isLastChild(abstractDropNodeEntity)
    ) {
      abstractDropNodeEntity = abstractDropNodeEntity.parent;
      dropLevelOffset += 1;
    } else {
      break;
    }
  }

  const abstractDropDataNode = abstractDropNodeEntity.node
  let dropAllowed = true;
  if (
    isFirstChild(abstractDropNodeEntity) &&
    abstractDropNodeEntity.level === 0 &&
    clientY < top + height / 2 &&
    allowDrop({
      dropNode: abstractDropDataNode,
      dropPosition: -1,
    }) &&
    abstractDropNodeEntity.key === targetNode.props.eventKey
  ) {
    // first half of first node in first level
    dropPosition = -1
  } else if (
    (abstractDragOverEntity.children || []).length &&
    expandKeys.includes(dragOverNodeKey)
  ) {
    // drop on expanded node
    // only allow drop inside
    if (allowDrop({
      dropNode: abstractDropDataNode,
      dropPosition: 0,
    })) {
      dropPosition = 0;
    } else {
      dropAllowed = false
    }
  } else if (
    dropLevelOffset === 0
  ) {
    if (rawDropLevelOffset > -1.5) {
      // | Node     | <- abstractDropNode
      // | -^-===== | <- mousePosition
      // 1. try drop after
      // 2. do not allow drop
      if (allowDrop({
        dropNode: abstractDropDataNode,
        dropPosition: 1,
      })) {
        dropPosition = 1;
      } else {
        dropAllowed = false;
      }
    } else {
      // | Node     | <- abstractDropNode
      // | ---==^== | <- mousePosition
      // whether it has children or doesn't has children
      // always
      // 1. try drop inside
      // 2. try drop after
      // 3. do not allow drop
      if (allowDrop({
        dropNode: abstractDropDataNode,
        dropPosition: 0,
      })) {
        dropPosition = 0;
      } else if (allowDrop({
        dropNode: abstractDropDataNode,
        dropPosition: 1,
      })) {
        dropPosition = 1;
      } else {
        dropAllowed = false;
      }
    }
  } else {
    // | Node1 | <- abstractDropNode
    //      |  Node2  |
    // --^--|----=====| <- mousePosition
    // 1. try insert after Node1
    // 2. do not allow drop
    if (allowDrop({
      dropNode: abstractDropDataNode,
      dropPosition: 1,
    })) {
      dropPosition = 1;
    } else {
      dropAllowed = false;
    }
  }

  return {
    dropPosition,
    dropLevelOffset,
    dropTargetKey: abstractDropNodeEntity.key,
    dropTargetPos: abstractDropNodeEntity.pos,
    dragOverNodeKey,
    dropContainerKey: dropPosition === 0 ? null : (abstractDropNodeEntity.parent?.key || null),
    dropAllowed,
  };
}
