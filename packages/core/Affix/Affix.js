import React,{ useRef, useState,useEffect } from 'react';
import classNames from '@packages/utils/classNames'; 
import PropTypes from 'prop-types'; 
import usePrefixCls from '@packages/hooks/usePrefixCls';  
import ResizeObserver from '@packages/core/ResizeObserver';
import { addObserveTarget } from '@packages/utils/affixUtils';

import "./index.scss";

function getDefaultTarget(target) {
    if(target){
        return typeof target === 'function' ? target() : target;
    }
    return typeof window !== 'undefined' ? window : null;
}
  
 
const Affix=React.forwardRef((props,ref)=>{
    const {
        prefixCls:customizePrefixCls,
        className, 
        children,
        component:Component='div',
        direction="horizontal", 
        itemStyle,
        target
    }=props;

    const prefixCls=usePrefixCls('Affix',customizePrefixCls);
    const affixStyle=useState(null);

    const placeholderRef=useRef(null); 
    const fixedRef=useRef(null); 

    const timeoutRef=useRef(null);

    const lazyUpdatePosition=()=>{
        const targetNode=getDefaultTarget(target);

        prepareMeasure();
    }

    useEffect(()=>{
         
        const targetNode=getDefaultTarget(target);

        if(targetNode){
            timeoutRef.current=setTimeout(()=>{
                addObserveTarget(targetNode,{
                    lazyUpdatePosition
                })
            });
        } 

    },[target])

    return (
        <ResizeObserver
            onResize={()=>{}}
        >
            <div ref={placeholderRef}>
                <div className={classNames({
                    [prefixCls]:affixStyle
                })} ref={fixedRef}>
                    {children}
                </div>
            </div>
        </ResizeObserver>
    )
});

Affix.propTypes={
    prefixCls:PropTypes.string,
    className:PropTypes.string, 
    children:PropTypes.any, 
    offsetBottom:PropTypes.number,
    offsetTop:PropTypes.number,
    offsetLeft:PropTypes.number,
    offsetRight:PropTypes.number
};

export default Affix;