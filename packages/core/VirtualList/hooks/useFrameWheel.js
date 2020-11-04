
import React ,{ useRef } from 'react'; 
import useOriginScroll from './useOriginScroll';

export default function useFrameWheel(inVirtual,isScrollAtTop,isScrollAtBottom,onWheelDelta){

    const offsetRef=useRef(0);
    const nextFrameRef=useRef(null);

    const originScroll=useOriginScroll(isScrollAtTop,isScrollAtBottom);

    

    function onWheel(event){  
        if(!inVirtual) return ;

        event.preventDefault()
        //防抖
        nextFrameRef.current=null;

        const { deltaY }=event; 
        offsetRef.current+=deltaY; 

        //边滚动时不做任何事，滚动时跳过检查
        if(originScroll(deltaY)) return ;

        nextFrameRef.current=()=>{ 
            //保证只16ms执行一次 
            const patchMultiple=1;
            onWheelDelta(offsetRef.current*patchMultiple);
            offsetRef.current=0;
        };
        nextFrameRef.current()
    }

    return [onWheel];
}