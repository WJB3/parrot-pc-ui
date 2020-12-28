import React,{forwardRef,useRef, useEffect,useState} from 'react'; 
import useForkRef from '@packages/hooks/useForkRef';
import ResizeObserver from 'resize-observer-polyfill';  
import PropTypes from 'prop-types';

const ResizeObserverComponent=forwardRef((props,ref)=>{

    const {
        children:childrenProps,
        onResize
    }=props;
    

    const [sizeObject,setSizeObject]=useState({width:0,height:0,offsetWidth:0,offsetWidth:0});

    const childNode=useRef(null); 

    const resizeObserver=useRef(null);

    const onComponentUpdated=()=>{
        const element=childNode.current; 
 
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

    const handleResize=(entries)=>{   
        const target=entries[0].target;

        const { width,height }=target.getBoundingClientRect();

        const { offsetWidth,offsetHeight }=target;

        const fixedWidth=Math.floor(width);
        const fixedHeight=Math.floor(height);

        if(
            sizeObject.width!==fixedWidth||
            sizeObject.height!==fixedHeight||
            sizeObject.offsetWidth!==offsetWidth||
            sizeObject.offsetHeight!==offsetHeight    
        ){
            const size={width:fixedWidth,height:fixedHeight,offsetWidth,offsetHeight};

            setSizeObject(size);

            onResize?.(childNode.current);
        }
    }

    useEffect(()=>{
        onComponentUpdated()
        return ()=>destroyObserver()
    },[sizeObject]); 

    const handleRef=useForkRef(childNode,childrenProps.ref,ref);

    return  React.cloneElement(childrenProps,{
        ref:handleRef
    });
}); 

ResizeObserverComponent.propTypes = { 
    //传送门
    children: PropTypes.any,
    //节点变化的回调
    onResize:PropTypes.func
}


export default ResizeObserverComponent;