 

import React,{useState,useRef } from 'react';
import CacheMap from '@packages/utils/CacheMap';
import { findDOMNode } from 'react-dom';

export default function useHeights(){

    const [updatedMark,setUpdatedMark]=useState(0);
    const instanceRef=useRef(new Map());
    const heightsRef=useRef(new CacheMap());
    const heightUpdateIdRef=useRef(0);

    function collectHeight(){
        heightUpdateIdRef.current+=1;
        const currentId=heightUpdateIdRef.current;

        Promise.resolve().then(()=>{
            if(currentId!==heightUpdateIdRef.current) return ;

            instanceRef.current.forEach((element,key)=>{
                if(element && element.offsetParent){
                    const htmlElement=findDOMNode(element);
                    const { offsetHeight }=htmlElement;

                    if(heightsRef.current.get(key)!==offsetHeight){
                        heightsRef.current.set(key,htmlElement.offsetHeight);
                    }
                }
            });
            //总是触发更新标记，告诉父级在调整大小时应该重新计算高度
            setUpdatedMark(c => c + 1);
        });
    }

    function setInstanceRef(item,instance){
        if(instance){
            instanceRef.current.set(undefined,instance);
            collectHeight();
        }else{
            instanceRef.current.delete(undefined);
        }
    }   

    return [setInstanceRef,collectHeight,heightsRef.current,updatedMark];

}