import { useRef } from 'react';

export default function(isScrollAtTop,isScrollAtBottom){
    
    const scrollPingRef=useRef({
        top:isScrollAtTop,
        bottom:isScrollAtBottom
    });

    scrollPingRef.current.top=isScrollAtTop;
    scrollPingRef.current.bottom=isScrollAtBottom;

    return (deltaY)=>{
        const originScroll=
            //向上滚动并且已经到顶点
            (deltaY<0 && scrollPingRef.current.top)||
            //向下滚动并且已经到底点
            (deltaY>0 && scrollPingRef.current.bottom);

        return originScroll;

    }

}
