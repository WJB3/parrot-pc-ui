import { useRef } from 'react';
import raf from 'rc-util/lib/raf'; 
import useOriginScroll from './useOriginScroll';
 

export default function useFrameWheel(
  inVirtual,
  isScrollAtTop,
  isScrollAtBottom,
  onWheelDelta
) {
  const offsetRef = useRef(0);
  const nextFrameRef = useRef(null);

  // Firefox patch
  const wheelValueRef = useRef(null);
  const isMouseScrollRef = useRef(false);

  // Scroll status sync
  const originScroll = useOriginScroll(isScrollAtTop, isScrollAtBottom);

  function onWheel(event) {
    if (!inVirtual) return;

    raf.cancel(nextFrameRef.current);

    const { deltaY } = event;
    offsetRef.current += deltaY;
    wheelValueRef.current = deltaY;

    // Do nothing when scroll at the edge, Skip check when is in scroll
    if (originScroll(deltaY)) return;

   

    nextFrameRef.current = raf(() => {
      // Patch a multiple for Firefox to fix wheel number too small
      // ref: https://github.com/ant-design/ant-design/issues/26372#issuecomment-679460266
      const patchMultiple = isMouseScrollRef.current ? 10 : 1;
      onWheelDelta(offsetRef.current * patchMultiple);
      offsetRef.current = 0;
    });
  }
 

  return [onWheel];
}