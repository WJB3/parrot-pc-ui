import React ,{useState ,useContext,useRef,useMemo, useCallback,useLayoutEffect} from 'react';
import classNames from '@packages/utils/classNames';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import useHeights from './hooks/useHeights';
import useChildren from './hooks/useChildren';
import Filler from './Filler';
import useFrameWheel from './hooks/useFrameWheel';
import useOriginScroll from './hooks/useOriginScroll';
import ScrollBar from './ScrollBar';

//1.Promise.resolve意义微任务、宏任务
//2.offsetParent
//3.CacheMap
//4.<></>
//5.useLayoutEffect
//6.节流函数
//7.requestAnimationFrame
//8.scrollTop 只有可滚动元素
//9./滚动条高度=容器高度/内容高度*容器高度容器高度比内容高度等于滚动条高度比容器高度

const ScrollStyle={
    overflowY:"auto"
}


const VirtualList=React.forwardRef((props,ref)=>{

    const {
        prefixCls:customizePrefixCls,
        className,
        style,
        virtual,
        height,
        itemHeight,
        component:Component="div",
        data=[],
        children
        
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("VirtualList",customizePrefixCls);

    const componentRef=useRef();
    const fillerInnerRef=useRef();
    const scrollBarRef=useRef(null);

    const useVirtual=!!(virtual!==false && height && itemHeight);
 
    const inVirtual=useVirtual && data && itemHeight * data.length > height;

    const [scrollTop, setScrollTop] = useState(0);
   
    //=====================Height===========================
    const [setInstanceRef,collectHeight,heights,heightUpdatedMark]=useHeights();

    const { scrollHeight,start,end,offset }=useMemo(()=>{
        if(!useVirtual){
            return {
                scrollHeight:undefined,
                start:0,
                end:data.length-1,
                offset:undefined
            }   
        }

        let itemTop=0;
        let startIndex;
        let startOffset;
        let endIndex;

        const dataLen=data.length; 
        
        for(let i=0;i<dataLen;i++){ 
            
            const cacheHeight=heights.get(); 
         
            const currentItemBottom=itemTop+(cacheHeight===undefined?itemHeight:cacheHeight);
 
            //在范围内检查项目顶部
            if(currentItemBottom>=scrollTop && startIndex===undefined){
                startIndex=i;
                startOffset=itemTop;
            } 
            //检查范围底部的项目。我们将渲染额外的一个项目用于运动使用
            if(currentItemBottom>scrollTop+height && endIndex===undefined){
                endIndex=i;
            }
    
            itemTop=currentItemBottom;
        }

        if(startIndex===undefined){
            startIndex=0;
            startOffset=0;
        }
        if(endIndex===undefined){
            endIndex=data.length-1;
        }

        endIndex=endIndex+1,data.length;
 
        return {
            scrollHeight:itemTop,
            start:startIndex,
            end:endIndex,
            offset:startOffset
        }

    },[inVirtual,useVirtual,data,scrollTop,height,heightUpdatedMark]);
    //======================In Range======================

    //最大可滚动高度为滚动高度减去高度
    const maxScrollHeight=scrollHeight-height;
    const maxScrollHeightRef=useRef(maxScrollHeight);
    maxScrollHeightRef.current=maxScrollHeight;

    function keepInRange(newScrollTop){
        let newTop=Math.max(newScrollTop,0);
        if(!Number.isNaN(maxScrollHeightRef.current)){
            newTop=Math.min(newTop,maxScrollHeightRef.current);
        }
        return newTop;
    }

    const isScrollAtTop=scrollTop<=0;
    const isScrollAtBottom=scrollTop>=maxScrollHeight;

    const originScroll=useOriginScroll(isScrollAtTop,isScrollAtBottom);

    //====================Scroll===========================
    function onScrollBar(newScrollTop) {
        const newTop = newScrollTop;
        syncScrollTop(newTop);
    }

    function syncScrollTop(newTop){ 

        setScrollTop(origin=>{
            let value;
            if(typeof newTop==='function'){
                value=newTop(origin);
            }else{
                value=newTop;
            } 
            const alignedTop=keepInRange(value);

            componentRef.current.scrollTop = alignedTop;
            return alignedTop;
        });
    }

    const [onRawWheel]=useFrameWheel(
        useVirtual,
        isScrollAtTop,
        isScrollAtBottom,
        offsetY=>{
            syncScrollTop(originTop=>{ 
                const newTop=originTop+offsetY;
                return newTop;
            })
        }
    )

    //====================Render===========================

   
 
    const listChildren=useChildren(data, start, end, setInstanceRef, children);

    let componentStyle=null;
    if(height){
        componentStyle={"height":height,...ScrollStyle};

        if(useVirtual){
            componentStyle.overflowY="hidden";
        }
    }

    React.useLayoutEffect(()=>{
        componentRef.current.addEventListener("wheel",onRawWheel);
         
        return ()=>{
            componentRef.current.removeEventListener("wheel",onRawWheel);
        }
    },[useVirtual]);

    return (
        <div 
            className={
                classNames(prefixCls,className)
            } 
            style={{
                ...style,
                position:"relative"
            }}
            ref={ref}
        >
            <Component
                className={`${prefixCls}-Fixator`}
                style={componentStyle}
                ref={componentRef}
            >
                <Filler
                    prefixCls={prefixCls}
                    height={scrollHeight}
                    offset={offset}
                    onInnerResize={collectHeight}
                    ref={fillerInnerRef}
                >
                    {listChildren}
                </Filler>
            </Component>

            {useVirtual && (
                <ScrollBar 
                    ref={scrollBarRef}
                    prefixCls={prefixCls}
                    scrollTop={scrollTop}
                    height={height}
                    scrollHeight={scrollHeight}
                    onScroll={onScrollBar}
                />
            )}
        </div>
    )
});

export default VirtualList;