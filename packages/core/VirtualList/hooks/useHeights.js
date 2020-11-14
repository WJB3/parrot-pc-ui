
import React,{useRef,useState} from 'react';
import { findDOMNode } from 'react-dom';  

export default function useHeights(getKey){
    
    let [markedUpdate,setMarkedUpdate]=useState(0);
    let heightsRef=useRef(new Map());
    let instanceRef=useRef(new Map());
    let heightsUpdateRef=useRef(0);
     
    function collectHeight(){
        heightsUpdateRef.current+=1;
        const currentId=heightsUpdateRef.current;

        
        Promise.resolve().then(()=>{
            //这样的写法只有最后一次才会往后执行
            if(currentId!==heightsUpdateRef.current) return;

            instanceRef.current.forEach((instance,key)=>{
                if(instance && instance.offsetParent){
                    const htmlElement = findDOMNode(instance);
                    const { offsetHeight } = htmlElement;
                    if (heightsRef.current.get(key) !== offsetHeight) {
                        heightsRef.current.set(key, htmlElement.offsetHeight);
                    }
                }
            })
            //每次计算出高度都重新计算出
            setMarkedUpdate(m=>m+1);
        })
        
    }



    function setInstanceRef(item,instance){
        console.log("setInstanceRef")
        const itemKey=getKey(item);
        console.log(itemKey)
        if(instance){
            instanceRef.current.set(itemKey,instance);
            collectHeight();
        }else{
            instanceRef.current.delete(itemKey);
        }
    }


    return [setInstanceRef,heightsRef.current,markedUpdate]
}