import React,{ useRef, useState,useEffect } from 'react';
import classNames from '@packages/utils/classNames'; 
import PropTypes from 'prop-types'; 
import usePrefixCls from '@packages/hooks/usePrefixCls';  
import ResizeObserver from '@packages/core/ResizeObserver';
import usePrevState from '@packages/hooks/usePrevState';
import { addObserveTarget,removeObserveTarget,getTargetRect } from '@packages/utils/affixUtils';

import "./index.scss";

function getDefaultTarget(target) {
    if(target){
        return typeof target === 'function' ? target() : target;
    }
    return typeof window !== 'undefined' ? window : null;
}
  
const AffixStatus={
    None,
    Prepare
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
    const [affixStyle,setAffixStyle]=useState(undefined);
    const [placeholderStyle,setPlaceholderStyle]=useState(undefined);
    const [status,setStatus]=useState(AffixStatus.None);
    const [prevTarget,setPrevTarget]=useState(null);


    const placeholderRef=useRef(null); 
    const fixedRef=useRef(null); 

    const timeoutRef=useRef(null);

    const lazyUpdatePosition=()=>{
        const targetNode=getDefaultTarget(target);

        prepareMeasure();
    }

    const prepareMeasure=()=>{
        setStatus(AffixStatus.Prepare);
        setAffixStyle(undefined);
        setPlaceholderStyle(undefined);
    }

    const updatePosition=()=>{
        prepareMeasure();
    }

    const measure=()=>{

        const targetNode=!getDefaultTarget(target);

        if(status!==AffixStatus.Prepare || !fixedRef || !placeholderRef || targetNode){
            return ;
        }

        const offsetTop=getOffsetTop();

        const newState={status:AffixStatus.None};

        const targetRect=getTargetRect(targetNode);
        const placeholderReact = getTargetRect(placeholderRef);



    }

    const getOffsetTop=()=>{
        if(offsetBottom===undefined && offsetTop===undefined){
            offsetTop=0;
        }
        return offsetTop;
    }
 
    useEffect(()=>{
         
        const targetNode=getDefaultTarget(target);

        if(targetNode){
            timeoutRef.current=setTimeout(()=>{
                addObserveTarget(targetNode,{
                    lazyUpdatePosition
                })

                updatePosition();
            });
        } 

    },[])

    useEffect(()=>{

        const targetNode=getDefaultTarget(target);
        let newTarget=null;
        if(targetNode){
            newTarget=targetNode||null;
        }

        if(prevTarget!==newTarget){
            removeObserveTarget({
                    lazyUpdatePosition
            });

            if(newTarget){
                addObserveTarget(newTarget,{
                    lazyUpdatePosition
                });
                updatePosition();
            }

            setPrevTarget(newTarget);
        }

        measure();

    },[target,prevTarget]);

    useEffect(()=>{
        updatePosition();
    },[offsetTop,offsetBottom]);

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