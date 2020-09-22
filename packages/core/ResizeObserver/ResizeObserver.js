import React,{forwardRef,useRef, useEffect} from 'react'; 
import useForkRef from '@packages/hooks/useForkRef';
import ResizeObserver from 'resize-observer-polyfill'; 
import PropTypes from 'prop-types';

const ResizeObserverComponent=forwardRef((props,ref)=>{

    const {
        children:childrenProps,
        onResize
    }=props;

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

    const handleResize=()=>{ 
        onResize?.(childNode.current);
    }

    useEffect(()=>{
        onComponentUpdated()
        return ()=>destroyObserver()
    },[]); 

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