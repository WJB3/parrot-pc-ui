import * as React from 'react';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import getScrollBarSize from 'rc-util/lib/getScrollBarSize';
import classNames from 'classnames';
import { getOffset } from 'rc-util/lib/Dom/css';
import TableContext from './context/TableContext';
import { useLayoutState } from './hooks/useFrame';
 

const StickyScrollBar= (
  { scrollBodyRef, onScroll, offsetScroll, container },
  ref,
) => {
  const { prefixCls } = React.useContext(TableContext);
  const bodyScrollWidth = scrollBodyRef.current?.scrollWidth || 0;
  const bodyWidth = scrollBodyRef.current?.clientWidth || 0;
  const scrollBarWidth = bodyScrollWidth && bodyWidth * (bodyWidth / bodyScrollWidth);

  const scrollBarRef = React.useRef();
  const [scrollState, setScrollState] = useLayoutState({
    scrollLeft: 0,
    isHiddenScrollBar: false,
  });
  const refState = React.useRef({
    delta: 0,
    x: 0,
  });
  const [isActive, setActive] = React.useState(false);

  const onMouseUp = () => {
    setActive(false);
  };

  const onMouseDown= event => {
    event.persist();
    refState.current.delta = event.pageX - scrollState.scrollLeft;
    refState.current.x = 0;
    setActive(true);
    event.preventDefault();
  };

  const onMouseMove= event => {
    // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
    const { buttons } = event || (window?.event);
    if (!isActive || buttons === 0) {
      // If out body mouse up, we can set isActive false when mouse move
      if (isActive) {
        setActive(false);
      }
      return;
    }
    let left =
      refState.current.x + event.pageX - refState.current.x - refState.current.delta;

    if (left <= 0) {
      left = 0;
    }

    if (left + scrollBarWidth >= bodyWidth) {
      left = bodyWidth - scrollBarWidth;
    }

    onScroll({
      scrollLeft: (left / bodyWidth) * (bodyScrollWidth + 2),
    });

    refState.current.x = event.pageX;
  };

  const onContainerScroll = () => {
    const tableOffsetTop = getOffset(scrollBodyRef.current).top;
    const tableBottomOffset = tableOffsetTop + scrollBodyRef.current.offsetHeight;
    const currentClientOffset =
      container === window
        ? document.documentElement.scrollTop + window.innerHeight
        : getOffset(container).top + container.clientHeight;

    if (
      tableBottomOffset - getScrollBarSize() <= currentClientOffset ||
      tableOffsetTop >= currentClientOffset - offsetScroll
    ) {
      setScrollState(state => ({
        ...state,
        isHiddenScrollBar: true,
      }));
    } else {
      setScrollState(state => ({
        ...state,
        isHiddenScrollBar: false,
      }));
    }
  };

  const setScrollLeft = (left) => {
    setScrollState(state => {
      return {
        ...state,
        scrollLeft: (left / bodyScrollWidth) * bodyWidth || 0,
      };
    });
  };

  React.useImperativeHandle(ref, () => ({
    setScrollLeft,
  }));

  React.useEffect(() => {
    const onMouseUpListener = addEventListener(document.body, 'mouseup', onMouseUp, false);
    const onMouseMoveListener = addEventListener(document.body, 'mousemove', onMouseMove, false);
    onContainerScroll();
    return () => {
      onMouseUpListener.remove();
      onMouseMoveListener.remove();
    };
  }, [scrollBarWidth, isActive]);

  React.useEffect(() => {
    const onScrollListener = addEventListener(container, 'scroll', onContainerScroll, false);
    const onResizeListener = addEventListener(window, 'resize', onContainerScroll, false);

    return () => {
      onScrollListener.remove();
      onResizeListener.remove();
    };
  }, [container]);

  React.useEffect(() => {
    if (!scrollState.isHiddenScrollBar) {
      setScrollState(state => ({
        ...state,
        scrollLeft:
          (scrollBodyRef.current.scrollLeft / scrollBodyRef.current?.scrollWidth) *
          scrollBodyRef.current?.clientWidth,
      }));
    }
  }, [scrollState.isHiddenScrollBar]);

  if (bodyScrollWidth <= bodyWidth || !scrollBarWidth || scrollState.isHiddenScrollBar) {
    return null;
  }

  return (
    <div
      style={{
        height: getScrollBarSize(),
        width: bodyWidth,
        bottom: offsetScroll,
      }}
      className={`${prefixCls}-sticky-scroll`}
    >
      <div
        onMouseDown={onMouseDown}
        ref={scrollBarRef}
        className={classNames(`${prefixCls}-sticky-scroll-bar`, {
          [`${prefixCls}-sticky-scroll-bar-active`]: isActive,
        })}
        style={{
          width: `${scrollBarWidth}px`,
          transform: `translate3d(${scrollState.scrollLeft}px, 0, 0)`,
        }}
      />
    </div>
  );
};

export default React.forwardRef(StickyScrollBar);