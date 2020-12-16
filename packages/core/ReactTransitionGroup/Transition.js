

import React,{createElement,useMemo,useRef,useEffect,useCallback,useState} from 'react';
import TransitionGroupContext from './TransitionGroupContext';
import useInit from '@packages/hooks/useInit';
import usePrevState from '@packages/hooks/usePrevState';
import setRef from '@packages/utils/setRef';
import ReactDOM from 'react-dom';
import useStateCallback from '@packages/hooks/useStateCallback';
import useForkRef from '@packages/hooks/useForkRef';

export const UNMOUNTED="unmounted";
export const EXITED="exited";
export const ENTERING="entering";
export const ENTERED="entered";
export const EXITING="exiting";

function noop() {}
 

//1.当visible是false时组件正常是处于exited状态
//2.当visible 由false变成true时 变成entering->entered
const Transition=React.forwardRef((props,ref)=>{

    const {
        children,
        visible:visibleProp=false,
        appear=false,
        timeout,
        onEnter=noop,
        onEntering=noop,
        onEntered=noop,
        onExited=noop,
        onExit=noop,
        onExiting=noop,
        unmountOnExit=false,
        mountOnEnter=false,
        disappear=false,
        ...childProps
    }=props; 

    let nodeRef=useRef(null); 

    const handleRef=useForkRef(ref,nodeRef,(instance)=>{mounting.current=true});
   
    const { initialStatus }=useMemo(()=>{  
        let initialStatus; 
        if(visibleProp){
            if(appear){
                initialStatus=EXITED;
            }else{
                initialStatus=ENTERED;
            }
        }else{ 
            if(disappear){
                initialStatus=ENTERED
            }else{
                if(unmountOnExit||mountOnEnter){
                    initialStatus=UNMOUNTED
                }else{
                    initialStatus=EXITED
                }
            }
            
        } 
        return {
            initialStatus
        }
    },[]);  

   

    const [ status,setStatus ]=useStateCallback(initialStatus);  

    const mounting=useRef(false); 

    const getTimeout=()=>{
        let enter,exit;
        if(typeof timeout==="number"){
            enter=exit=timeout
        }else if(typeof timeout==="object"){
            enter=timeout && timeout.enter?timeout.enter:300;
            exit=timeout && timeout.exit?timeout.exit:500;
        }
        return {
            enter,
            exit
        }
    }

    

    useEffect(()=>{    
         
        if(visibleProp && (status===EXITED)){//当visible由false变为true时 
            onEnter?.(nodeRef.current,mounting.current);
             
            setStatus(ENTERING,()=>{
                onEntering?.(nodeRef.current,mounting.current);

                setTimeout(()=>{
                    setStatus(ENTERED);
                    onEntered?.(nodeRef.current,mounting.current);
                },getTimeout().enter);
            });
        }else if(!visibleProp && status===ENTERED){//当visible由true变为false时
            onExit?.(nodeRef.current,mounting.current);

            setStatus(EXITING,()=>{
                onExiting?.(nodeRef.current,mounting.current);

                setTimeout(()=>{
                    setStatus(EXITED);
                    onExited?.(nodeRef.current,mounting.current);
                },getTimeout().exit);
            });
        }else if(visibleProp && status===UNMOUNTED){
            setStatus(EXITED);
        }else if(!visibleProp && status===EXITED && unmountOnExit){
            setStatus(UNMOUNTED);
        } 
    },[visibleProp,status]);

   

    //如果状态是unmounted，直接返回空 

    const { TransitionComponent }=useMemo(()=>{
    
        let Component; 
        if(typeof children==="function"){
            Component=children(status,childProps);
        }else{
            Component=React.cloneElement(React.Children.only(children),childProps);
        } 
        return {
            TransitionComponent:Component
        }
    },[status,childProps,children]);  

    if (status === UNMOUNTED) {
        return null;
    } 

    return (
        <TransitionGroupContext.Provider value={null}>
            {
                React.cloneElement(
                    TransitionComponent,
                    {
                        ref:handleRef
                    }
                )
            }
        </TransitionGroupContext.Provider>
    )
});

export default Transition;