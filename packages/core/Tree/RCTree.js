 
import * as React from 'react';
import RcTree, { TreeNode, TreeProps  } from 'rc-tree';
import classNames from 'classnames'; 

import DirectoryTree from './DirectoryTree';
import { ConfigContext } from '../config-provider';
import collapseMotion from '../_util/motion';
import renderSwitcherIcon from './utils/iconUtil';
       
const Tree = React.forwardRef((props, ref) => {
  const { getPrefixCls, virtual } = React.useContext(ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    className,
    showIcon,
    showLine,
    switcherIcon,
    blockNode,
    children,
    checkable,
  } = props;
  const newProps = {
    ...props,
    showLine: Boolean(showLine),
  };
  const prefixCls = getPrefixCls('tree', customizePrefixCls);
  return (
    <RcTree
      itemHeight={20}
      ref={ref}
      virtual={virtual}
      {...newProps}
      prefixCls={prefixCls}
      className={classNames(
        {
          [`${prefixCls}-icon-hide`]: !showIcon,
          [`${prefixCls}-block-node`]: blockNode, 
        },
        className,
      )}
      checkable={checkable ? <span className={`${prefixCls}-checkbox-inner`} /> : checkable}
      switcherIcon={(nodeProps) =>
        renderSwitcherIcon(prefixCls, switcherIcon, showLine, nodeProps)
      }
    >
      {children}
    </RcTree>
  );
}) as CompoundedComponent;

Tree.TreeNode = TreeNode;

Tree.DirectoryTree = DirectoryTree;

Tree.defaultProps = {
  checkable: false,
  showIcon: false,
  motion: {
    ...collapseMotion,
    motionAppear: false,
  },
  blockNode: false,
};

export default Tree;
 
