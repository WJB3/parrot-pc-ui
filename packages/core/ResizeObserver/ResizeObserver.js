import React,{forwardRef,useRef, useEffect} from 'react';
import setRef from '@packages/utils/setRef';
import useForkRef from '@packages/hooks/useForkRef';
import ResizeObserver from 'resize-observer-polyfill';
import { findDOMNode } from 'react-dom';

const ResizeObserverComponent=forwardRef((props,ref)=>{

    const {
        children:childrenProps,
        onResize
    }=props;

    const childNode=useRef(null);

    const currentELement=useRef(null);

    const resizeObserver=useRef(null);

    const onComponentUpdated=()=>{
        const element=findDOMNode(childNode.current);
        const elementChanged=element!==currentELement.current;

        if(elementChanged){
            destroyObserver();
            currentELement.current=element;
        }

        if(!resizeObserver.current && element){
            resizeObserver.current=new ResizeObserver(handleResize);
            resizeObserver.current.observe(element);
        }
    }

    const destroyObserver=()=>{
        if(resizeObserver.current){ 
            resizeObserver.current.disconnect();
            resizeObserver.current=null;
        }
    }

    const handleResize=()=>{ 
        if(onResize){
            onResize();
        }
    }

    useEffect(()=>{
        onComponentUpdated()
        return ()=>destroyObserver()
    },[]);

    const handleNodeRef=(node)=>{
        setRef(childNode,node)
    }

    const handleRef =useForkRef(handleNodeRef,childrenProps.ref,ref);

    return  React.cloneElement(childrenProps,{
        ref:handleRef
    });
}); 

export default ResizeObserverComponent;