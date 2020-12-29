import * as React from 'react';
import classNames from 'classnames'; 

export function renderExpandIcon({
  prefixCls,
  record,
  onExpand,
  expanded,
  expandable,
}) {
  const expandClassName = `${prefixCls}-row-expand-icon`;

  if (!expandable) {
    return <span className={classNames(expandClassName, `${prefixCls}-row-spaced`)} />;
  }

  const onClick = event => {
    onExpand(record, event);
    event.stopPropagation();
  };

  return (
    <span
      className={classNames(expandClassName, {
        [`${prefixCls}-row-expanded`]: expanded,
        [`${prefixCls}-row-collapsed`]: !expanded,
      })}
      onClick={onClick}
    />
  );
}

export function findAllChildrenKeys(
  data,
  getRowKey,
  childrenColumnName,
) {
  const keys = [];

  function dig(list) {
    (list || []).forEach((item, index) => {
      keys.push(getRowKey(item, index));

      dig((item)[childrenColumnName]);
    });
  }

  dig(data);

  return keys;
}