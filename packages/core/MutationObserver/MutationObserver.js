import React ,{ useEffect, useRef,useState } from 'react';
import useForkRef from '@packages/hooks/useForkRef';

const observerOptions = {
    childList: true,  // 观察目标子节点的变化，是否有添加或者删除
    attributes: true, // 观察属性变动
    subtree: true     // 观察后代节点，默认为 false
}

const MutationObserverComponent=React.forwardRef((props,ref)=>{

    const {
        children:childrenProps,
        onChange,
        cssProperty="transform"
    }=props;

    const childNode=useRef(null); 

    const [cssValue,setCssValue]=useState("");

    const mutationObserver=useRef(null);

    const register=()=>{
        const element=childNode.current; 
 
        if(!mutationObserver.current && element){
            mutationObserver.current=new MutationObserver(handleResize);
            mutationObserver.current.observe(element,observerOptions);
        }
    }

    const unregister=()=>{
        if(mutationObserver.current){
            mutationObserver.current.disconnect(); 
            mutationObserver.current=null;
        }
    }

    const handleResize=(mutationsList, observer)=>{
        const target=mutationsList[0].target; 
        for(let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                console.log('A child node has been added or removed.');
            } else if (mutation.type === 'attributes') {
                let currentCssValue=target[mutation.attributeName][cssProperty]; 
                if(currentCssValue!==cssValue){
                    onChange?.(target,currentCssValue)
                    setCssValue(currentCssValue);
                }
            }
        }
    }

    useEffect(()=>{
        register();
        return ()=>{
            unregister();
        }
    },[]);

    const handleRef=useForkRef(childNode,childrenProps.ref,ref);

    return  React.cloneElement(childrenProps,{
        ref:handleRef
    });


});

export default MutationObserverComponent;