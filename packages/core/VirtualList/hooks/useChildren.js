

import React ,{ useCallback } from 'react';

/**
 * 
 * @param {array} originData 传过来的原始数据
 * @param {*} startIndex 截取原始数据的开始下标
 * @param {*} endIndex 截取原始数据的结束下标
 * @param {*} setIntance 设置单个Item的实例
 * @param {*} renderFunc 组件的children，通常为一个渲染节点的函数
 * @param {*} getKey 获取单个Item的key
 */

export default function useChildren(originData,startIndex,endIndex,setIntance=()=>{},renderFunc,getKey=()=>{}){

    const refFunc=useCallback((ref)=>{
        console.log("refFunc");
        console.log(ref);
        setIntance(ref)
    },[]);


    return originData.slice(startIndex,endIndex+1).map((item,index)=>{
        const elementIndex=startIndex+index;
        const node=renderFunc(item,elementIndex);
        const key=getKey(item);

        return React.cloneElement(node,{
            ref:refFunc,
            key:key
        })
    })
}