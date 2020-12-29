import * as React from 'react';
import classNames from 'classnames';
import { supportRef } from 'rc-util/lib/ref'; 
import { getPathValue } from '../utils/valueUtil';

function isRenderCell(
  data,
) {
  return data && typeof data === 'object' && !Array.isArray(data) && !React.isValidElement(data);
}

function isRefComponent(component) {
  // String tag component also support ref
  if (typeof component === 'string') {
    return true;
  }
  return supportRef(component);
}
 
function Cell(
  {
    prefixCls,
    className,
    record,
    index,
    dataIndex,
    render,
    children,
    component: Component = 'td',
    colSpan,
    rowSpan,
    fixLeft,
    fixRight,
    firstFixLeft,
    lastFixLeft,
    firstFixRight,
    lastFixRight,
    appendNode,
    additionalProps = {},
    ellipsis,
    align,
    rowType,
    isSticky,
  },
  ref,
) {
  const cellPrefixCls = `${prefixCls}-cell`;

  // ==================== Child Node ====================
  let cellProps;
  let childNode;

  if (children) {
    childNode = children;
  } else {
    const value = getPathValue(record, dataIndex);

    // Customize render node
    childNode = value;
    if (render) {
      const renderData = render(value, record, index);

      if (isRenderCell(renderData)) {
        childNode = renderData.children;
        cellProps = renderData.props;
      } else {
        childNode = renderData;
      }
    }
  }

  // Not crash if final `childNode` is not validate ReactNode
  if (
    typeof childNode === 'object' &&
    !Array.isArray(childNode) &&
    !React.isValidElement(childNode)
  ) {
    childNode = null;
  }

  if (ellipsis && (lastFixLeft || firstFixRight)) {
    childNode = <span className={`${cellPrefixCls}-content`}>{childNode}</span>;
  }

  const {
    colSpan: cellColSpan,
    rowSpan: cellRowSpan,
    style: cellStyle,
    className: cellClassName,
    ...restCellProps
  } = cellProps || {};
  const mergedColSpan = cellColSpan !== undefined ? cellColSpan : colSpan;
  const mergedRowSpan = cellRowSpan !== undefined ? cellRowSpan : rowSpan;

  if (mergedColSpan === 0 || mergedRowSpan === 0) {
    return null;
  }

  // ====================== Fixed =======================
  const fixedStyle = {};
  const isFixLeft = typeof fixLeft === 'number';
  const isFixRight = typeof fixRight === 'number';

  if (isFixLeft) {
    fixedStyle.position = 'sticky';
    fixedStyle.left = fixLeft;
  }
  if (isFixRight) {
    fixedStyle.position = 'sticky';

    fixedStyle.right = fixRight;
  }

  // ====================== Align =======================
  const alignStyle = {};
  if (align) {
    alignStyle.textAlign = align;
  }

  // ====================== Render ======================
  let title;
  const ellipsisConfig = ellipsis === true ? { showTitle: true } : ellipsis;
  if (ellipsisConfig && (ellipsisConfig.showTitle || rowType === 'header')) {
    if (typeof childNode === 'string' || typeof childNode === 'number') {
      title = childNode.toString();
    } else if (React.isValidElement(childNode) && typeof childNode.props.children === 'string') {
      title = childNode.props.children;
    }
  }

  const componentProps = {
    title,
    ...restCellProps,
    ...additionalProps,
    colSpan: mergedColSpan && mergedColSpan !== 1 ? mergedColSpan : null,
    rowSpan: mergedRowSpan && mergedRowSpan !== 1 ? mergedRowSpan : null,
    className: classNames(
      cellPrefixCls,
      className,
      {
        [`${cellPrefixCls}-fix-left`]: isFixLeft,
        [`${cellPrefixCls}-fix-left-first`]: firstFixLeft,
        [`${cellPrefixCls}-fix-left-last`]: lastFixLeft,
        [`${cellPrefixCls}-fix-right`]: isFixRight,
        [`${cellPrefixCls}-fix-right-first`]: firstFixRight,
        [`${cellPrefixCls}-fix-right-last`]: lastFixRight,
        [`${cellPrefixCls}-ellipsis`]: ellipsis,
        [`${cellPrefixCls}-with-append`]: appendNode,
        [`${cellPrefixCls}-fix-sticky`]: (isFixLeft || isFixRight) && isSticky,
      },
      additionalProps.className,
      cellClassName,
    ),
    style: { ...additionalProps.style, ...alignStyle, ...fixedStyle, ...cellStyle },
    ref: isRefComponent(Component) ? ref : null,
  };

  return (
    <Component {...componentProps}>
      {appendNode}
      {childNode}
    </Component>
  );
}

const RefCell = React.forwardRef(Cell);
RefCell.displayName = 'Cell';

const MemoCell = React.memo(RefCell, (prev, next) => {
  if (next.shouldCellUpdate) {
    return !next.shouldCellUpdate(next.record, prev.record);
  }

  return false;
});

export default MemoCell;