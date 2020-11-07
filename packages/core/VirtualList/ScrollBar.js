

import React, { useEffect, useRef, useState } from 'react';
import useInit from '@packages/hooks/useInit';

//滚动条最小高度
const MIN_HEIGHT=20;

function getPageY(e){
    return 'touches' in e?e.touches[0].pageY:e.pageY;
}

const ScrollBar=(props)=>{

    const {
        prefixCls,
        scrollHeight,
        scrollTop,
        height,
        onScroll,
        scrollTimeout=2000
    }=props;

    //滚动条高度/可视区域=可视区域高度/滚动高度
    const thumbWidth=Math.max((height/scrollHeight)*height,MIN_HEIGHT);

    const isInit=useInit();

    const [visible,setVisible]=useState(false);

    const visibleTimeout=useRef(null);

    const dragging=useRef(false);

    const [pageY,setPageY]=useState(false);

    const [startTop,setStartTop]=useState(0);

    const enableScrollRange=scrollHeight-height||0;

    const enableHeightRange=height-thumbWidth||0;

    const getTop=()=>{
        //和计算滚动条高度计算方法一致
        //已滚动高度/总可滚动高度=滚动条的top/可视区域总可滚动高度
        if(scrollTop===0){
            return 0;
        }
        return (scrollTop/enableScrollRange)*enableHeightRange;
    }

     //========================== Events ==============================
     const patchEvents=()=>{
        window.addEventListener("mousemove",handleMouseMove);
        window.addEventListener("mouseup",handleMouseUp); 
    }

    const removeEvents=()=>{
        window.removeEventListener("mousemove",handleMouseMove);
        window.removeEventListener("mouseup",handleMouseUp);  
    }

    const handleMouseDown=(e)=>{
        dragging.current=true;
        setPageY(getPageY(e));
        setStartTop(getTop());
        patchEvents();
    }

    const handleMouseMove=(e)=>{
        
        if(dragging.current){
            //偏移高度
            const offsetY=getPageY(e)-pageY;
            const newTop=startTop+offsetY; 

            onScroll?.((newTop/enableHeightRange)*enableScrollRange)
        }
    }

    const containerMouseDown=(e)=>{
        e.preventDefault();
        e.stopPropagation();
    }

    const handleMouseUp=()=>{
        removeEvents();
        dragging.current=false;
    }

    useEffect(()=>{
        if(isInit){
            if(visibleTimeout.current) clearTimeout(visibleTimeout.current);
            setVisible(true)
            visibleTimeout.current=setTimeout(()=>{
                setVisible(false);
            },scrollTimeout);
        }
        return ()=>{
            clearTimeout(visibleTimeout.current);
        }
    },[scrollTop,scrollTimeout]); 
 
    return  <div className={`${prefixCls}-ThumbWrapper`} style={{position:"absolute",width:8,right:0,top:0,bottom:0}} onMouseDown={containerMouseDown}>
        <div 
            className={`${prefixCls}-Thumb`}
            style={{
                width:"100%",
                height:thumbWidth,
                top:getTop(),
                left:0, 
                position:"absolute",
                background:dragging.current?"rgba(0,0,0,0.8)":"rgba(0,0,0,0.5)",
                borderRadius:99,
                cursor:"pointer",
                useSelect:"none", 
                display:visible?"block":"none"
            }}   
            onMouseDown={handleMouseDown} 
        ></div>
    </div>
}

export default ScrollBar;