import React ,{useContext,useRef,useMemo, useCallback} from 'react';
import classNames from '@packages/utils/classNames';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import useHeights from './hooks/useHeights';
import useChildren from './hooks/useChildren';
import Filler from './Filler';

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
        children,
        itemKey
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("VirtualList",customizePrefixCls);

    const componentRef=useRef();
    const fillerInnerRef=useRef();

    const useVirtual=!!(virtual!==false && height && itemHeight);
 
    const inVirtual=useVirtual && data && itemHeight * data.length > height;

    const getKey=useCallback(item=>{
        if(typeof itemKey==="function"){
            return itemKey(item);
        }
        return item[itemKey];
    },[itemKey]);

   
    //=====================Height===========================
    const [setInstanceRef,collectHeight,heights,heightUpdatedMark]=useHeights(
        getKey,
        null,
        null
    )

    const { scrollHeight,start,end }=useMemo(()=>{
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
        for(let i=0;i<dataLen;i++){
            const item=data[i];
            const key=getKey(item);

            const cacheHeight=heights.get(key);
            const currentItemBottom=itemTop+(cacheHeight===undefined?itemHeight:cacheHeight);

            if(currentItemBottom>=scrollTop && startIndex===undefined){
                startIndex=i;
                startOffset=itemTop;
            }

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

    },[inVirtual,useVirtual,data,height])

    //=====================Item key========================
    const sharedConfig={
        getKey
    }

    //====================Render===========================
    const listChildren=useChildren(data, start, end, setInstanceRef, children, sharedConfig);


    return (
        <div 
            className={
                classNames(prefixCls,className)
            } 
            style={{
                ...style,
                position:"relative"
            }}
        >
            <Component
                className={`${prefixCls}-Fixator`}
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