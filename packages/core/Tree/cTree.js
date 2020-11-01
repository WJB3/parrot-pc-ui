// TODO: https://www.w3.org/TR/2017/NOTE-wai-aria-practices-1.1-20171214/examples/treeview/treeview-2/treeview-2a.html
// Fully accessibility support

import * as React from 'react';
import KeyCode from 'rc-util/lib/KeyCode'; 
import classNames from 'classnames';

import {
  TreeContext 
} from './contextTypes';

import {
  getDataAndAria,
  getDragChildrenKeys,
  parseCheckedKeys,
  conductExpandParent,
  calcSelectedKeys,
  calcDropPosition,
  arrAdd,
  arrDel,
  posToArr,
} from './util'; 
import {
  flattenTreeData,
  convertTreeToData,
  convertDataToEntities, 
  convertNodePropsToEventData,
  getTreeNodeProps,
} from './utils/treeUtil';
import NodeList, { MOTION_KEY, MotionEntity } from './NodeList';
import TreeNode from './TreeNode';
import { conductCheck } from './utils/conductUtil';
import DropIndicator from './DropIndicator';
    

class Tree extends React.Component{
  static defaultProps = {
    prefixCls: 'rc-tree',
    showLine: false,
    showIcon: true,
    selectable: true,
    multiple: false,
    checkable: false,
    disabled: false,
    checkStrictly: false,
    draggable: false,
    defaultExpandParent: true,
    autoExpandParent: false,
    defaultExpandAll: false,
    defaultExpandedKeys: [],
    defaultCheckedKeys: [],
    defaultSelectedKeys: [],
    dropIndicatorRender: DropIndicator,
    allowDrop: () => true,
  };

  static TreeNode = TreeNode;

  destroyed= false;

  delayedDragEnterLogic;

  state = {
    keyEntities: {},

    indent: null,

    selectedKeys: [],
    checkedKeys: [],
    halfCheckedKeys: [],
    loadedKeys: [],
    loadingKeys: [],
    expandedKeys: [],

    dragging: false,
    dragChildrenKeys: [],

    // dropTargetKey is the key of abstract-drop-node
    // the abstract-drop-node is the real drop node when drag and drop
    // not the DOM drag over node
    dropTargetKey: null,
    dropPosition: null, // the drop position of abstract-drop-node, inside 0, top -1, bottom 1
    dropContainerKey: null, // the container key of abstract-drop-node if dropPosition is -1 or 1
    dropLevelOffset: null, // the drop level offset of abstract-drag-over-node
    dropTargetPos: null, // the pos of abstract-drop-node
    dropAllowed: true, // if drop to abstract-drop-node is allowed
    // the abstract-drag-over-node
    // if mouse is on the bottom of top dom node or no the top of the bottom dom node
    // abstract-drag-over-node is the top node
    dragOverNodeKey: null,

    treeData: [],
    flattenNodes: [],

    focused: false,
    activeKey: null,

    listChanging: false,

    prevProps: null,
  };

  dragStartMousePosition = null;

  dragNode;

  listRef = React.createRef();

  componentWillUnmount() {
    window.removeEventListener('dragend', this.onWindowDragEnd);
    this.destroyed = true;
  }

  static getDerivedStateFromProps(props, prevState) {
    const { prevProps } = prevState;
    const newState = {
      prevProps: props,
    };

    function needSync(name) {
      return (!prevProps && name in props) || (prevProps && prevProps[name] !== props[name]);
    }

    // ================== Tree Node ==================
    let treeData ;

    // Check if `treeData` or `children` changed and save into the state.
    if (needSync('treeData')) {
      ({ treeData } = props);
    } else if (needSync('children')) { 
      treeData = convertTreeToData(props.children);
    }

    // Save flatten nodes info and convert `treeData` into keyEntities
    if (treeData) {
      newState.treeData = treeData;
      const entitiesMap = convertDataToEntities(treeData);
      newState.keyEntities = {
        [MOTION_KEY]: MotionEntity,
        ...entitiesMap.keyEntities,
      };
 
      if (process.env.NODE_ENV !== 'production') {
        warningWithoutKey(treeData);
      }
    }

    const keyEntities = newState.keyEntities || prevState.keyEntities;

    // ================ expandedKeys =================
    if (needSync('expandedKeys') || (prevProps && needSync('autoExpandParent'))) {
      newState.expandedKeys =
        props.autoExpandParent || (!prevProps && props.defaultExpandParent)
          ? conductExpandParent(props.expandedKeys, keyEntities)
          : props.expandedKeys;
    } else if (!prevProps && props.defaultExpandAll) {
      const cloneKeyEntities = { ...keyEntities };
      delete cloneKeyEntities[MOTION_KEY];
      newState.expandedKeys = Object.keys(cloneKeyEntities).map(key => cloneKeyEntities[key].key);
    } else if (!prevProps && props.defaultExpandedKeys) {
      newState.expandedKeys =
        props.autoExpandParent || props.defaultExpandParent
          ? conductExpandParent(props.defaultExpandedKeys, keyEntities)
          : props.defaultExpandedKeys;
    }

    if (!newState.expandedKeys) {
      delete newState.expandedKeys;
    }

    // ================ flattenNodes =================
    if (treeData || newState.expandedKeys) {
      const flattenNodes = flattenTreeData(
        treeData || prevState.treeData,
        newState.expandedKeys || prevState.expandedKeys,
      );
      newState.flattenNodes = flattenNodes;
    }

    // ================ selectedKeys =================
    if (props.selectable) {
      if (needSync('selectedKeys')) {
        newState.selectedKeys = calcSelectedKeys(props.selectedKeys, props);
      } else if (!prevProps && props.defaultSelectedKeys) {
        newState.selectedKeys = calcSelectedKeys(props.defaultSelectedKeys, props);
      }
    }

    // ================= checkedKeys =================
    if (props.checkable) {
      let checkedKeyEntity;

      if (needSync('checkedKeys')) {
        checkedKeyEntity = parseCheckedKeys(props.checkedKeys) || {};
      } else if (!prevProps && props.defaultCheckedKeys) {
        checkedKeyEntity = parseCheckedKeys(props.defaultCheckedKeys) || {};
      } else if (treeData) {
        // If `treeData` changed, we also need check it
        checkedKeyEntity = parseCheckedKeys(props.checkedKeys) || {
          checkedKeys: prevState.checkedKeys,
          halfCheckedKeys: prevState.halfCheckedKeys,
        };
      }

      if (checkedKeyEntity) {
        let { checkedKeys = [], halfCheckedKeys = [] } = checkedKeyEntity;

        if (!props.checkStrictly) {
          const conductKeys = conductCheck(checkedKeys, true, keyEntities);
          ({ checkedKeys, halfCheckedKeys } = conductKeys);
        }

        newState.checkedKeys = checkedKeys;
        newState.halfCheckedKeys = halfCheckedKeys;
      }
    }

    // ================= loadedKeys ==================
    if (needSync('loadedKeys')) {
      newState.loadedKeys = props.loadedKeys;
    }

    return newState;
  }

  onNodeDragStart = (event, node) => {
    const { expandedKeys, keyEntities } = this.state;
    const { onDragStart } = this.props;
    const { eventKey } = node.props;

    this.dragNode = node;
    this.dragStartMousePosition = {
      x: event.clientX,
      y: event.clientY,
    };

    const newExpandedKeys = arrDel(expandedKeys, eventKey);

    this.setState({
      dragging: true,
      dragChildrenKeys: getDragChildrenKeys(eventKey, keyEntities),
      indent: this.listRef.current.getIndentWidth(),
    });

    this.setExpandedKeys(newExpandedKeys);

    window.addEventListener('dragend', this.onWindowDragEnd);

    if (onDragStart) {
      onDragStart({ event, node: convertNodePropsToEventData(node.props) });
    }
  };

  /**
   * [Legacy] Select handler is smaller than node,
   * so that this will trigger when drag enter node or select handler.
   * This is a little tricky if customize css without padding.
   * Better for use mouse move event to refresh drag state.
   * But let's just keep it to avoid event trigger logic change.
   */
  onNodeDragEnter = (event, node) => {
    const {
      expandedKeys,
      keyEntities,
      dragChildrenKeys,
      flattenNodes,
      indent,
    } = this.state;
    const { onDragEnter, onExpand, allowDrop, direction } = this.props;
    const { pos } = node.props;
    const { dragNode } = this;

    const {
      dropPosition,
      dropLevelOffset,
      dropTargetKey,
      dropContainerKey,
      dropTargetPos,
      dropAllowed,
      dragOverNodeKey,
    } = calcDropPosition(
      event,
      node,
      indent,
      this.dragStartMousePosition,
      allowDrop,
      flattenNodes,
      keyEntities,
      expandedKeys,
      direction,
    );

    if (
      !dragNode ||
      // don't allow drop inside its children
      dragChildrenKeys.indexOf(dropTargetKey) !== -1 ||
      // don't allow drop when drop is not allowed caculated by calcDropPosition
      !dropAllowed
    ) {
      this.setState({
        dragOverNodeKey: null,
        dropPosition: null,
        dropLevelOffset: null,
        dropTargetKey: null,
        dropContainerKey: null,
        dropTargetPos: null,
        dropAllowed: false,
      });
      return;
    }

    // Side effect for delay drag
    if (!this.delayedDragEnterLogic) {
      this.delayedDragEnterLogic = {};
    }
    Object.keys(this.delayedDragEnterLogic).forEach(key => {
      clearTimeout(this.delayedDragEnterLogic[key]);
    });

    if (dragNode.props.eventKey !== node.props.eventKey) {
      // hoist expand logic here
      // since if logic is on the bottom
      // it will be blocked by abstract dragover node check
      //   => if you dragenter from top, you mouse will still be consider as in the top node
      event.persist();
      this.delayedDragEnterLogic[pos] = window.setTimeout(() => {
        if (!this.state.dragging) return;

        let newExpandedKeys = [...expandedKeys];
        const entity = keyEntities[node.props.eventKey];

        if (entity && (entity.children || []).length) {
          newExpandedKeys = arrAdd(expandedKeys, node.props.eventKey);
        }

        if (!('expandedKeys' in this.props)) {
          this.setExpandedKeys(newExpandedKeys);
        }

        if (onExpand) {
          onExpand(newExpandedKeys, {
            node: convertNodePropsToEventData(node.props),
            expanded: true,
            nativeEvent: event.nativeEvent,
          });
        }
      }, 800);
    }

    // Skip if drag node is self
    if (dragNode.props.eventKey === dropTargetKey && dropLevelOffset === 0) {
      this.setState({
        dragOverNodeKey: null,
        dropPosition: null,
        dropLevelOffset: null,
        dropTargetKey: null,
        dropContainerKey: null,
        dropTargetPos: null,
        dropAllowed: false,
      });
      return;
    }

    // Update drag over node and drag state
    this.setState({
      dragOverNodeKey,
      dropPosition,
      dropLevelOffset,
      dropTargetKey,
      dropContainerKey,
      dropTargetPos,
      dropAllowed,
    });

    if (onDragEnter) {
      onDragEnter({
        event,
        node: convertNodePropsToEventData(node.props),
        expandedKeys,
      });
    }
  };

  onNodeDragOver = (event, node) => {
    const {
      dragChildrenKeys,
      flattenNodes,
      keyEntities,
      expandedKeys,
      indent,
    } = this.state;
    const { onDragOver, allowDrop, direction } = this.props;
    const { dragNode } = this;

    const {
      dropPosition,
      dropLevelOffset,
      dropTargetKey,
      dropContainerKey,
      dropAllowed,
      dropTargetPos,
      dragOverNodeKey,
    } = calcDropPosition(
      event,
      node,
      indent,
      this.dragStartMousePosition,
      allowDrop,
      flattenNodes,
      keyEntities,
      expandedKeys,
      direction,
    );

    if (
      !dragNode ||
      dragChildrenKeys.indexOf(dropTargetKey) !== -1 ||
      !dropAllowed
    ) {
      // don't allow drop inside its children
      // don't allow drop when drop is not allowed caculated by calcDropPosition
      return;
    }

    // Update drag position

    if (dragNode.props.eventKey === dropTargetKey && dropLevelOffset === 0) {
      if (
        !(
          this.state.dropPosition === null &&
          this.state.dropLevelOffset === null &&
          this.state.dropTargetKey === null &&
          this.state.dropContainerKey === null &&
          this.state.dropTargetPos === null &&
          this.state.dropAllowed === false &&
          this.state.dragOverNodeKey === null
        )
      ) {
        this.setState({
          dropPosition: null,
          dropLevelOffset: null,
          dropTargetKey: null,
          dropContainerKey: null,
          dropTargetPos: null,
          dropAllowed: false,
          dragOverNodeKey: null,
        });
      }
    } else if (
      !(
        dropPosition === this.state.dropPosition &&
        dropLevelOffset === this.state.dropLevelOffset &&
        dropTargetKey === this.state.dropTargetKey &&
        dropContainerKey === this.state.dropContainerKey &&
        dropTargetPos === this.state.dropTargetPos &&
        dropAllowed === this.state.dropAllowed &&
        dragOverNodeKey === this.state.dragOverNodeKey
      )
    ) {
      this.setState({
        dropPosition,
        dropLevelOffset,
        dropTargetKey,
        dropContainerKey,
        dropTargetPos,
        dropAllowed,
        dragOverNodeKey,
      });
    }

    if (onDragOver) {
      onDragOver({ event, node: convertNodePropsToEventData(node.props) });
    }
  };

  onNodeDragLeave = (event, node) => {
    const { onDragLeave } = this.props;

    if (onDragLeave) {
      onDragLeave({ event, node: convertNodePropsToEventData(node.props) });
    }
  };

  // since stopPropagation() is called in treeNode
  // if onWindowDrag is called, whice means state is keeped, drag state should be cleared
  onWindowDragEnd = event => {
    this.onNodeDragEnd(event, null, true);
    window.removeEventListener('dragend', this.onWindowDragEnd);
  };

  // if onNodeDragEnd is called, onWindowDragEnd won't be called since stopPropagation() is called
  onNodeDragEnd = (event, node, outsideTree = false) => {
    const { onDragEnd } = this.props;
    this.setState({
      dragOverNodeKey: null,
    });

    this.cleanDragState();

    if (onDragEnd && !outsideTree) {
      onDragEnd({ event, node: convertNodePropsToEventData(node.props) });
    }

    this.dragNode = null;
  };

  onNodeDrop = (event, node, outsideTree = false) => {
    const {
      dragChildrenKeys,
      dropPosition,
      dropTargetKey,
      dropTargetPos,
      dropAllowed,
    } = this.state;

    if (!dropAllowed) return;

    const { onDrop } = this.props;

    this.setState({
      dragOverNodeKey: null,
    });
    this.cleanDragState();

    if (dropTargetKey === null) return;

    const abstractDropNodeProps = {
      ...getTreeNodeProps(
        dropTargetKey,
        this.getTreeNodeRequiredProps(),
      ),
      active: this.getActiveItem()?.data.key === dropTargetKey,
      data: this.state.keyEntities[dropTargetKey].node,
    } 

    const posArr = posToArr(dropTargetPos);

    const dropResult = {
      event,
      node: convertNodePropsToEventData(abstractDropNodeProps),
      dragNode: this.dragNode ? convertNodePropsToEventData(this.dragNode.props) : null,
      dragNodesKeys: [this.dragNode.props.eventKey].concat(dragChildrenKeys),
      dropToGap: dropPosition !== 0,
      dropPosition: dropPosition + Number(posArr[posArr.length - 1]),
    };

    if (onDrop && !outsideTree) {
      onDrop(dropResult);
    }

    this.dragNode = null;
  };

  cleanDragState = () => {
    const { dragging } = this.state;
    if (dragging) {
      this.setState({
        dragging: false,
        dropPosition: null,
        dropContainerKey: null,
        dropTargetKey: null,
        dropLevelOffset: null,
        dropAllowed: true,
        dragOverNodeKey: null,
      });
    }
    this.dragStartMousePosition = null;
  };

  onNodeClick = (e, treeNode) => {
    const { onClick } = this.props;
    if (onClick) {
      onClick(e, treeNode);
    }
  };

  onNodeDoubleClick = (e, treeNode) => {
    const { onDoubleClick } = this.props;
    if (onDoubleClick) {
      onDoubleClick(e, treeNode);
    }
  };

  onNodeSelect = (e, treeNode) => {
    let { selectedKeys } = this.state;
    const { keyEntities } = this.state;
    const { onSelect, multiple } = this.props;
    const { selected, key } = treeNode;
    const targetSelected = !selected;

    // Update selected keys
    if (!targetSelected) {
      selectedKeys = arrDel(selectedKeys, key);
    } else if (!multiple) {
      selectedKeys = [key];
    } else {
      selectedKeys = arrAdd(selectedKeys, key);
    }

    // [Legacy] Not found related usage in doc or upper libs
    const selectedNodes = selectedKeys
      .map(selectedKey => {
        const entity = keyEntities[selectedKey];
        if (!entity) return null;

        return entity.node;
      })
      .filter(node => node);

    this.setUncontrolledState({ selectedKeys });

    if (onSelect) {
      onSelect(selectedKeys, {
        event: 'select',
        selected: targetSelected,
        node: treeNode,
        selectedNodes,
        nativeEvent: e.nativeEvent,
      });
    }
  };

  onNodeCheck = (
    e,
    treeNode,
    checked,
  ) => {
    const {
      keyEntities,
      checkedKeys: oriCheckedKeys,
      halfCheckedKeys: oriHalfCheckedKeys,
    } = this.state;
    const { checkStrictly, onCheck } = this.props;
    const { key } = treeNode;

    // Prepare trigger arguments
    let checkedObj;
    const eventObj = {
      event: 'check',
      node: treeNode,
      checked,
      nativeEvent: e.nativeEvent,
    };

    if (checkStrictly) {
      const checkedKeys = checked ? arrAdd(oriCheckedKeys, key) : arrDel(oriCheckedKeys, key);
      const halfCheckedKeys = arrDel(oriHalfCheckedKeys, key);
      checkedObj = { checked: checkedKeys, halfChecked: halfCheckedKeys };

      eventObj.checkedNodes = checkedKeys
        .map(checkedKey => keyEntities[checkedKey])
        .filter(entity => entity)
        .map(entity => entity.node);

      this.setUncontrolledState({ checkedKeys });
    } else {
      // Always fill first
      let { checkedKeys, halfCheckedKeys } = conductCheck(
        [...oriCheckedKeys, key],
        true,
        keyEntities,
      );

      // If remove, we do it again to correction
      if (!checked) {
        const keySet = new Set(checkedKeys);
        keySet.delete(key);
        ({ checkedKeys, halfCheckedKeys } = conductCheck(
          Array.from(keySet),
          { checked: false, halfCheckedKeys },
          keyEntities,
        ));
      }

      checkedObj = checkedKeys;

      // [Legacy] This is used for `rc-tree-select`
      eventObj.checkedNodes = [];
      eventObj.checkedNodesPositions = [];
      eventObj.halfCheckedKeys = halfCheckedKeys;

      checkedKeys.forEach(checkedKey => {
        const entity = keyEntities[checkedKey];
        if (!entity) return;

        const { node, pos } = entity;

        eventObj.checkedNodes.push(node);
        eventObj.checkedNodesPositions.push({ node, pos });
      });

      this.setUncontrolledState(
        {
          checkedKeys,
        },
        false,
        {
          halfCheckedKeys,
        },
      );
    }

    if (onCheck) {
      onCheck(checkedObj, eventObj);
    }
  };

  onNodeLoad = (treeNode) =>
    new Promise(resolve => {
      // We need to get the latest state of loading/loaded keys
      this.setState(({ loadedKeys = [], loadingKeys = [] }) => {
        const { loadData, onLoad } = this.props;
        const { key } = treeNode;

        if (!loadData || loadedKeys.indexOf(key) !== -1 || loadingKeys.indexOf(key) !== -1) {
          // react 15 will warn if return null
          return {};
        }

        // Process load data
        const promise = loadData(treeNode);
        promise.then(() => {
          const { loadedKeys: currentLoadedKeys, loadingKeys: currentLoadingKeys } = this.state;
          const newLoadedKeys = arrAdd(currentLoadedKeys, key);
          const newLoadingKeys = arrDel(currentLoadingKeys, key);

          // onLoad should trigger before internal setState to avoid `loadData` trigger twice.
          // https://github.com/ant-design/ant-design/issues/12464
          if (onLoad) {
            onLoad(newLoadedKeys, {
              event: 'load',
              node: treeNode,
            });
          }

          this.setUncontrolledState({
            loadedKeys: newLoadedKeys,
          });
          this.setState({
            loadingKeys: newLoadingKeys,
          });

          resolve();
        });

        return {
          loadingKeys: arrAdd(loadingKeys, key),
        };
      });
    });

  onNodeMouseEnter = (event, node) => {
    const { onMouseEnter } = this.props;
    if (onMouseEnter) {
      onMouseEnter({ event, node });
    }
  };

  onNodeMouseLeave = (event, node) => {
    const { onMouseLeave } = this.props;
    if (onMouseLeave) {
      onMouseLeave({ event, node });
    }
  };

  onNodeContextMenu = (event, node) => {
    const { onRightClick } = this.props;
    if (onRightClick) {
      event.preventDefault();
      onRightClick({ event, node });
    }
  };

  onFocus = (...args) => {
    const { onFocus } = this.props;
    this.setState({ focused: true });

    if (onFocus) {
      onFocus(...args);
    }
  };

  onBlur = (...args) => {
    const { onBlur } = this.props;
    this.setState({ focused: false });
    this.onActiveChange(null);

    if (onBlur) {
      onBlur(...args);
    }
  };

  getTreeNodeRequiredProps = () => {
    const {
      expandedKeys,
      selectedKeys,
      loadedKeys,
      loadingKeys,
      checkedKeys,
      halfCheckedKeys,
      dragOverNodeKey,
      dropPosition,
      keyEntities,
    } = this.state;
    return {
      expandedKeys: expandedKeys || [],
      selectedKeys: selectedKeys || [],
      loadedKeys: loadedKeys || [],
      loadingKeys: loadingKeys || [],
      checkedKeys: checkedKeys || [],
      halfCheckedKeys: halfCheckedKeys || [],
      dragOverNodeKey,
      dropPosition,
      keyEntities,
    };
  };

  // =========================== Expanded ===========================
  /** Set uncontrolled `expandedKeys`. This will also auto update `flattenNodes`. */
  setExpandedKeys = (expandedKeys) => {
    const { treeData } = this.state;

    const flattenNodes = flattenTreeData(treeData, expandedKeys);
    this.setUncontrolledState(
      {
        expandedKeys,
        flattenNodes,
      },
      true,
    );
  };

  onNodeExpand = (e, treeNode) => {
    let { expandedKeys } = this.state;
    const { listChanging } = this.state;
    const { onExpand, loadData } = this.props;
    const { key, expanded } = treeNode;

    // Do nothing when motion is in progress
    if (listChanging) {
      return;
    }
 
    const targetExpanded = !expanded;

    if (targetExpanded) {
      expandedKeys = arrAdd(expandedKeys, key);
    } else {
      expandedKeys = arrDel(expandedKeys, key);
    }

    this.setExpandedKeys(expandedKeys);

    if (onExpand) {
      onExpand(expandedKeys, {
        node: treeNode,
        expanded: targetExpanded,
        nativeEvent: e.nativeEvent,
      });
    }

    // Async Load data
    if (targetExpanded && loadData) {
      const loadPromise = this.onNodeLoad(treeNode);
      if (loadPromise) {
        loadPromise.then(() => {
          // [Legacy] Refresh logic
          const newFlattenTreeData = flattenTreeData(this.state.treeData, expandedKeys);
          this.setUncontrolledState({ flattenNodes: newFlattenTreeData });
        });
      }
    }
  };

  onListChangeStart = () => {
    this.setUncontrolledState({
      listChanging: true,
    });
  };

  onListChangeEnd = () => {
    setTimeout(() => {
      this.setUncontrolledState({
        listChanging: false,
      });
    });
  };

  // =========================== Keyboard ===========================
  onActiveChange = (newActiveKey) => {
    const { activeKey } = this.state;
    const { onActiveChange } = this.props;

    if (activeKey === newActiveKey) {
      return;
    }

    this.setState({ activeKey: newActiveKey });
    if (newActiveKey !== null) {
      this.scrollTo({ key: newActiveKey });
    }

    if (onActiveChange) {
      onActiveChange(newActiveKey);
    }
  };

  getActiveItem = () => {
    const { activeKey, flattenNodes } = this.state;
    if (activeKey === null) {
      return null;
    }

    return flattenNodes.find(({ data: { key } }) => key === activeKey) || null;
  };

  offsetActiveKey = (offset) => {
    const { flattenNodes, activeKey } = this.state;

    let index = flattenNodes.findIndex(({ data: { key } }) => key === activeKey);

    // Align with index
    if (index === -1 && offset < 0) {
      index = flattenNodes.length;
    }

    index = (index + offset + flattenNodes.length) % flattenNodes.length;

    const item = flattenNodes[index];
    if (item) {
      const { key } = item.data;
      this.onActiveChange(key);
    } else {
      this.onActiveChange(null);
    }
  };

  onKeyDown = event => {
    const { activeKey, expandedKeys, checkedKeys } = this.state;
    const { onKeyDown, checkable, selectable } = this.props;

    // >>>>>>>>>> Direction
    switch (event.which) {
      case KeyCode.UP: {
        this.offsetActiveKey(-1);
        event.preventDefault();
        break;
      }
      case KeyCode.DOWN: {
        this.offsetActiveKey(1);
        event.preventDefault();
        break;
      }
    }

    // >>>>>>>>>> Expand & Selection
    const activeItem = this.getActiveItem();
    if (activeItem && activeItem.data) {
      const treeNodeRequiredProps = this.getTreeNodeRequiredProps();

      const expandable =
        activeItem.data.isLeaf === false || !!(activeItem.data.children || []).length;
      const eventNode = convertNodePropsToEventData({
        ...getTreeNodeProps(activeKey, treeNodeRequiredProps),
        data: activeItem.data,
        active: true,
      });

      switch (event.which) {
        // >>> Expand
        case KeyCode.LEFT: {
          // Collapse if possible
          if (expandable && expandedKeys.includes(activeKey)) {
            this.onNodeExpand({} , eventNode);
          } else if (activeItem.parent) {
            this.onActiveChange(activeItem.parent.data.key);
          }
          event.preventDefault();
          break;
        }
        case KeyCode.RIGHT: {
          // Expand if possible
          if (expandable && !expandedKeys.includes(activeKey)) {
            this.onNodeExpand({} , eventNode);
          } else if (activeItem.children && activeItem.children.length) {
            this.onActiveChange(activeItem.children[0].data.key);
          }
          event.preventDefault();
          break;
        }

        // Selection
        case KeyCode.ENTER:
        case KeyCode.SPACE: {
          if (
            checkable &&
            !eventNode.disabled &&
            eventNode.checkable !== false &&
            !eventNode.disableCheckbox
          ) {
            this.onNodeCheck(
              {} ,
              eventNode,
              !checkedKeys.includes(activeKey),
            );
          } else if (
            !checkable &&
            selectable &&
            !eventNode.disabled &&
            eventNode.selectable !== false
          ) {
            this.onNodeSelect({} , eventNode);
          }
          break;
        }
      }
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  /**
   * Only update the value which is not in props
   */
  setUncontrolledState = (
    state,
    atomic = false,
    forceState  = null,
  ) => {
    if (this.destroyed) {
      return;
    }

    let needSync = false;
    let allPassed = true;
    const newState = {};

    Object.keys(state).forEach(name => {
      if (name in this.props) {
        allPassed = false;
        return;
      }

      needSync = true;
      newState[name] = state[name];
    });

    if (needSync && (!atomic || allPassed)) {
      this.setState({
        ...newState,
        ...forceState,
      });
    }
  };

  scrollTo = scroll => {
    this.listRef.current.scrollTo(scroll);
  };

  render() {
    const {
      focused,
      flattenNodes,
      keyEntities,
      dragging,
      activeKey,
      dropLevelOffset,
      dropContainerKey,
      dropTargetKey,
      dropPosition,
      dragOverNodeKey,
      indent,
    } = this.state;
    const {
      prefixCls,
      className,
      style,
      showLine,
      focusable,
      tabIndex = 0,
      selectable,
      showIcon,
      icon,
      switcherIcon,
      draggable,
      checkable,
      checkStrictly,
      disabled,
      motion,
      loadData,
      filterTreeNode,
      height,
      itemHeight,
      virtual,
      titleRender,
      dropIndicatorRender,
      onContextMenu,
      direction,
    } = this.props;
    const domProps = getDataAndAria(this.props);

    return (
      <TreeContext.Provider
        value={{
          prefixCls,
          selectable,
          showIcon,
          icon,
          switcherIcon,
          draggable,
          checkable,
          checkStrictly,
          disabled,
          keyEntities,
          dropLevelOffset,
          dropContainerKey,
          dropTargetKey,
          dropPosition,
          dragOverNodeKey,
          indent,
          direction,
          dropIndicatorRender, 
          loadData,
          filterTreeNode, 
          titleRender, 
          onNodeClick: this.onNodeClick,
          onNodeDoubleClick: this.onNodeDoubleClick,
          onNodeExpand: this.onNodeExpand,
          onNodeSelect: this.onNodeSelect,
          onNodeCheck: this.onNodeCheck,
          onNodeLoad: this.onNodeLoad,
          onNodeMouseEnter: this.onNodeMouseEnter,
          onNodeMouseLeave: this.onNodeMouseLeave,
          onNodeContextMenu: this.onNodeContextMenu,
          onNodeDragStart: this.onNodeDragStart,
          onNodeDragEnter: this.onNodeDragEnter,
          onNodeDragOver: this.onNodeDragOver,
          onNodeDragLeave: this.onNodeDragLeave,
          onNodeDragEnd: this.onNodeDragEnd,
          onNodeDrop: this.onNodeDrop,
        }}
      >
        <div
          className={classNames(prefixCls, className, {
            [`${prefixCls}-show-line`]: showLine,
            [`${prefixCls}-focused`]: focused,
            [`${prefixCls}-active-focused`]: activeKey !== null,
          })}
        >
          <NodeList
            ref={this.listRef}
            prefixCls={prefixCls}
            style={style}
            data={flattenNodes}
            disabled={disabled}
            selectable={selectable}
            checkable={!!checkable}
            motion={motion}
            dragging={dragging}
            height={height}
            itemHeight={itemHeight}
            virtual={virtual}
            focusable={focusable}
            focused={focused}
            tabIndex={tabIndex}
            activeItem={this.getActiveItem()}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onKeyDown={this.onKeyDown}
            onActiveChange={this.onActiveChange}
            onListChangeStart={this.onListChangeStart}
            onListChangeEnd={this.onListChangeEnd}
            onContextMenu={onContextMenu}
            {...this.getTreeNodeRequiredProps()}
            {...domProps}
          />
        </div>
      </TreeContext.Provider>
    );
  }
}

export default Tree;