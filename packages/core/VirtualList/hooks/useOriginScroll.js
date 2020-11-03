import { useRef } from 'react';

export default function(isScrollAtTop,isScrollAtBottom){
    //在滚动时锁定滚轮
    const lockRef=useRef(false);
    let lockTimeoutRef=useRef(null);

    function lockScroll(){
        clearTimeout(lockTimeoutRef.current);

        lockRef.current=true;

        lockTimeoutRef.current=setTimeout(()=>{
            lockRef.current=false;
        },50);
    }

    const scrollPingRef=useRef({
        top:isScrollAtTop,
        bottom:isScrollAtBottom
    });
    scrollPingRef.current.top=isScrollAtTop;
    scrollPingRef.current.bottom=isScrollAtBottom;

    return (deltaY,smoothOffset=false)=>{
        const originScroll=
            (deltaY<0 && scrollPingRef.current.top)||
            (deltaY>0 && scrollPingRef.current.bottom);

        if(smoothOffset && originScroll){
            clearTimeout(lockTimeoutRef.current);
            lockRef.current=false;
        }else if(!originScroll || lockRef.current){
            lockScroll();
        }

        return !lockRef.current && originScroll;

    }

}
