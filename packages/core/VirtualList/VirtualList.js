import React ,{useState ,useContext,useRef,useMemo, useCallback} from 'react';
import classNames from '@packages/utils/classNames';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import useHeights from './hooks/useHeights';
import useChildren from './hooks/useChildren';
import Filler from './Filler';

//1.Promise.resolve意义微任务、宏任务
//2.offsetParent
//3.CacheMap
//4.<></>

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

        if(!inVirtual){
            return {
                scrollHeight:fillerInnerRef.current?.offsetHeight||0,
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
        for(let i=0;i<dataLen.length;i++){ 
            console.log(heights.get());
            const cacheHeight=heights.get(); 
            
            const currentItemBottom=itemTop+(cacheHeight===undefined?itemHeight:cacheHeight);

            //在范围内检查项目顶部
            if(currentItemBottom>=scrollTop && startIndex===undefined){
                startIndex=i;
                startOffset=itemTop;
            }
            //检查范围底部的项目。我们将渲染额外的一个项目用于运动使用
            if(currentItemBottom>scrollTop+height && endIndex===undefined){
                endIndex=1;
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

        endIndex=Math.min(endIndex+1,data.length);

        return {
            scrollHeight:itemTop,
            start:startIndex,
            end:endIndex,
            offset:startOffset
        }

    },[inVirtual,useVirtual,data,scrollTop,height,heightUpdatedMark])

  

    //====================Render===========================
    console.log(scrollHeight);
    console.log(data);
    console.log(start);
    console.log(end);

    const listChildren=useChildren(data, start, end, setInstanceRef, children);

    let componentStyle=null;
    if(height){
        componentStyle={"height":height,...ScrollStyle};

        if(useVirtual){
            componentStyle.overflowY="hidden";
        }
    }


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
        </div>
    )
});

export default VirtualList;