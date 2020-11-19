import * as React from 'react';
import canUseDom from 'rc-util/lib/Dom/canUseDom';
 

// fix ssr render
const defaultContainer = canUseDom() ? window : null;

/** Sticky header hooks */
export default function useSticky(
  sticky,
  prefixCls,
) {
  const { offsetHeader = 0, offsetScroll = 0, getContainer = () => defaultContainer } =
    typeof sticky === 'object' ? sticky : {};

  const container = getContainer() || defaultContainer;

  return React.useMemo(() => {
    const isSticky = !!sticky;
    return {
      isSticky,
      stickyClassName: isSticky ? `${prefixCls}-sticky-header` : '',
      offsetHeader,
      offsetScroll,
      container,
    };
  }, [offsetScroll, offsetHeader, prefixCls, container]);
}