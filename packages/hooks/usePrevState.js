
import React,{useRef, useEffect} from 'react';

/**
 * 获取上一轮的state值
 * 原理：先执行return ref.current再进行赋值操作
 * @param {*} value 
 */
export default function usePrevState(value){

    const ref=useRef(value);

    useEffect(()=>{
        ref.current=value

        return ()=>{
            ref.current=null;
        }
    },[value]) 

    return ref.current;
}