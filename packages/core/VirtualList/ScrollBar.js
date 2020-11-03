
import React,{ useEffect, useRef,useState } from 'react';
import classNames from '@packages/utils/classNames';
import raf from '@packages/utils/raf';
 
const MIN_SIZE = 20;

function getPageY(e){
    return 'touches' in e?e.touches[0].pageY:e.pageY;
}

const ScrollBar=React.forwardRef((props,ref)=>{

    const {
        prefixCls,
        height,
        count,
        scrollHeight, 
        scrollTop,
        onScroll
    }=props;

    const moveRef=useRef(null);

    const visibleTimeout=useRef(null);

    const scrollBarRef=useRef(null);

    const thumbRef=useRef(null);

    const [visible,setVisible]=useState(false);

    const [dragging,setDragging]=useState(false);

    const [pageY,setPageY]=useState(false);

    const [startTop,setStartTop]=useState(null);

    //========================= Calculate ===========================
    let spinHeight=Math.floor(Math.max(height/scrollHeight*height,MIN_SIZE)); 

    const getTop=()=>{
        const enableScrollRange=scrollHeight-height||0;
        const enableHeightRange=height-spinHeight||0;
        if(scrollTop===0){
            return 0;
        }
        const ptg=scrollTop/enableScrollRange;
        return ptg*enableHeightRange;
    }

    //========================== Events ==============================
    const patchEvents=()=>{
        window.addEventListener("mousemove",handleMouseMove);
        window.addEventListener("mouseup",handleMouseUp);

        thumbRef.current.addEventListener("touchmove",handleMouseMove);
        thumbRef.current.addEventListener("touchend",handleMouseUp);
    }

    const removeEvents=()=>{
        window.removeEventListener("mousemove",handleMouseMove);
        window.removeEventListener("mouseup",handleMouseUp);

        thumbRef.current.removeEventListener("touchstart",handleMouseDown);
        thumbRef.current.removeEventListener("touchmove",handleMouseMove);
        thumbRef.current.removeEventListener("touchend",handleMouseUp);

        raf.cancel(moveRef.current);
    }

    //========================== Thumb ===============================
    const handleMouseDown=(e)=>{
        setDragging(true);
        setPageY(getPageY(e));
        setStartTop(getTop()); 
        patchEvents();

        e.stopPropagation();
        e.preventDefault();

    }

    const handleMouseMove=(e)=>{

        raf.cancel(moveRef);

        if(dragging){
            const offsetY=getPageY(e)-pageY;
            const newTop=startTop+offsetY;

            const enableScrollRange=scrollHeight-height||0;
            const enableHeightRange=height-spinHeight||0;

            const ptg=enableHeightRange?newTop/enableHeightRange:0;
            const newScrollTop=Math.ceil(ptg*enableScrollRange);
            moveRef=raf(()=>{
                onScroll?.(newScrollTop)
            })

        }
    }

    const handleMouseUp=()=>{
        setDragging(false); 

        removeEvents();
    }

    const delayHidden=()=>{

        clearTimeout(visibleTimeout);

        setVisible(true);

        visibleTimeout.current=setTimeout(()=>{
            setVisible(false);
        },2000);

    }

    useEffect(()=>{
         ()=>{
            removeEvents();
            clearTimeout(visibleTimeout.current);
         }
    },[]);

    return (
        <div
            ref={scrollBarRef}
            className={`${prefixCls}-ScrollBar`}
            style={{
                width:8,
                top:0,
                bottom:0,
                right:0,
                position:"absolute",
                
            }}
            onMouseMove={delayHidden}
        >
            <div 
                ref={thumbRef}
                className={
                    classNames(
                        `${prefixCls}-ScrollBar-Thumb`,{
                            [`${prefixCls}-ScrollBar-Thumb-Moving`]:dragging,
                        }
                    )
                }
                style={{
                    width:"100%",
                    height:spinHeight,
                    left:0,
                    top:getTop(),
                    position:"absolute",
                    background:"rgba(0,0,0,0.5)",
                    borderRadius:99,
                    cursor:"pointer",
                    useSelect:"none"
                }}
                onMouseDown={handleMouseDown}
            />
        
        </div>
    )
}); 


export default ScrollBar;