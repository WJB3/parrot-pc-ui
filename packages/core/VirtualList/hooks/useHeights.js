

import React,{useRef} from 'react';
import CacheMap from '@packages/utils/CacheMap';
import { findDOMNode }  from 'react-dom'

export default function useHeights(
    getKey,
    onItemAdd,
    onItemRemove
){
    const [updatedMark,setUpdatedMark]=React.useState(0);
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
                    const {offsetHeight}=htmlElement;
                    if(heightsRef.current.get(key)!==offsetHeight){
                        heightsRef.current.set(key,htmlElement.offsetHeight);
                    }
                }
            });

            setUpdatedMark(c=>c+1);
        })
    }


    function setInstanceRef(item,instance){
        const key=getKey(item);
        const origin=instanceRef.current.get(key);
        if(instance){
            instanceRef.current.set(key,instance);
            collectHeight()
        }else{
            instanceRef.current.delete(key);
        }

        if(!origin !== !instance){
            if(instance){
                onItemAdd?.(item);
            }else{
                onItemRemove?.(item);
            }
        }
    }

    return [
        setInstanceRef,
        collectHeight,
        heightsRef.current,
        updatedMark
    ];
}