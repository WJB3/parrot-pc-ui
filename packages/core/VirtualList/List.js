
import React ,{ useContext,useCallback,useState,useMemo, useEffect,useRef } from 'react';
import PropTypes from 'prop-types'; 
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import "./index.scss";
import useHeights from './hooks/useHeights';
import useChildren from './hooks/useChildren';
import useFrameWheel from './hooks/useFrameWheel';
import ScrollBar from './ScrollBar';

const MIN_HEIGHT=20;

const List=React.forwardRef((props,ref)=>{

    const {
        height,
        prefixCls:customizePrefixCls,
        data:originData=[],
        itemKey,
        itemHeight=MIN_HEIGHT,
        children
    }=props;

    const componentRef=useRef(null);

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("VirtualList",customizePrefixCls);

    const [scrollTop,setScrollTop]=useState(0);

    const isVirtual=height && itemHeight;

    const getKey=useCallback((item)=>{
        if(typeof itemKey==="function"){
            return itemKey(item);
        }
        return item[itemKey];
    },[itemKey]);

    const syncScroll=(deltaY)=>{
        setScrollTop((originScrollTop)=>{

            let newTop;

            if(typeof deltaY==="function"){
                newTop=deltaY(originScrollTop);
            }else{
                newTop=deltaY;
            }

            const rangeValue=keepInRange(newTop);  

            componentRef.current.scrollTop=rangeValue;  

            return rangeValue;
        })
    }

    const [onRawWheel]=useFrameWheel(
        (offsetY)=>syncScroll((top)=>{return top+offsetY})
    );

    const containerStyle={
        maxHeight:height,
        overflow:"hidden"
    };

    const [setInstanceRef,heights,heightMarkedUpdate]=useHeights(getKey); 

    const {startIndex,endIndex,scrollHeight,offsetHeight}=useMemo(()=>{
        if(!isVirtual){
            return {
                startIndex:0,
                endIndex:originData.length-1,
                scrollHeight:undefined,
                offsetHeight:undefined
            }
        }

        let itemTop=0;
        let startIndex;
        let endIndex; 
        let startOffset; 

        for(let i=0;i<originData.length;i++){
            let itemKey=getKey(originData[i]);   
            let calcuHeight=heights.get(itemKey);  
          
            let currentItemBottom=itemTop+(calcuHeight===undefined?itemHeight:calcuHeight);   

            if(currentItemBottom>scrollTop && startIndex===undefined){//如果此时item的高度大于scrollTop 即可以判断出开始下标
                startIndex=i;
                startOffset=itemTop;
            }

            if(currentItemBottom>=scrollTop+height  && endIndex===undefined ){
                endIndex=i;
            }  
            itemTop=currentItemBottom;
        }
 
        return {
            startIndex:startIndex,
            endIndex:endIndex,
            scrollHeight:itemTop,
            offsetHeight:startOffset
        }

    },[isVirtual,scrollTop,originData,height,heightMarkedUpdate]);    

    console.log(startIndex)
    console.log(endIndex)
 
    const viewChildren=useChildren(originData,startIndex,endIndex,setInstanceRef,children,getKey);

    console.log(viewChildren)

    //==============================Range=============================
    //采用ref为了获取到最新的值
    let maxScrollHeight=scrollHeight-height; 
    let maxScrollHeightRef=useRef(maxScrollHeight);
    maxScrollHeightRef.current=maxScrollHeight; 
    
    const keepInRange=(value)=>{    
        return Math.min(Math.max(value,0),maxScrollHeightRef.current);
    }

    useEffect(()=>{
        componentRef.current.addEventListener("wheel",onRawWheel);

        ()=>{
            return componentRef.current.removeEventListener("wheel",onRawWheel);
        }
    },[]);  
    
    return <div className={prefixCls} style={{position:"relative"}}>

        <div className={`${prefixCls}-Container`} style={containerStyle} ref={componentRef}>
            <div style={{height:scrollHeight,transform:`translateY(${offsetHeight}px)`}}>{viewChildren}</div>
        </div>

        {
            isVirtual && <ScrollBar 
                            prefixCls={prefixCls} 
                            scrollHeight={scrollHeight}   
                            scrollTop={scrollTop} 
                            height={height}    
                            onScroll={syncScroll}
                        />
        }
    </div>
});

List.propTypes = {
    //显示区域的容器高度
    height:PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

export default React.memo(List);