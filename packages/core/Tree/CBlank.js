import * as React from 'react';
import classNames from 'classnames';
 
const Indent = ({ prefixCls, level, isStart, isEnd }) => {
  const baseClassName = `${prefixCls}-indent-unit`;
  const list  = [];
  for (let i = 0; i < level; i += 1) {
    list.push(
      <span
        key={i}
        className={classNames(baseClassName, {
          [`${baseClassName}-start`]: isStart[i],
          [`${baseClassName}-end`]: isEnd[i],
        })}
      />,
    );
  }

  return (
    <span aria-hidden="true" className={`${prefixCls}-indent`}>
      {list}
    </span>
  );
};

export default Indent;