

import React,{useState,useMemo,useRef,useEffect,useCallback,useContext} from 'react';
import TransitionGroupContext from './TransitionGroupContext';
import useInit from '@packages/hooks/useInit';
import usePrevState from '@packages/hooks/usePrevState';
import setRef from '@packages/utils/setRef';

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
        timeout,
        onEnter=noop,
        ...childProps
    }=props;

    const isInit=useInit();

    let nodeRef=useRef(null);

    const { initialStatus }=useMemo(()=>{

        let initialStatus;

        if(visibleProp){
            initialStatus=ENTERED
        }else{
            //1.当visible是false时组件正常是处于exited状态
            initialStatus=EXITED
        }

        return {
            initialStatus
        }

    },[]);

    const getTimeouts=useCallback(()=>{
        let exit, enter, appear;
        exit = enter = appear = timeout;

        if (timeout != null && typeof timeout !== 'number') {
            exit = timeout.exit
            enter = timeout.enter
            // TODO: remove fallback for next major
            appear = timeout.appear !== undefined ? timeout.appear : enter
        }
        return { exit, enter, appear };
    },[timeout]);

    const handleRef=useCallback((node)=>{
        setRef(nodeRef,node);
    },[])

    const nextCallback=useRef(null);

    const appearStatus=useRef(null);

    const [ status,setStatus ]=useState(initialStatus);

    const prevStatus=usePrevState(status);

    useEffect(()=>{ 
        updateStatus(true,appearStatus.current);
        ()=>{
            cancelNextCallback();
        }
    },[]);

    useEffect(()=>{
        if(isInit){
            let nextStatus = null;
            if(visibleProp){
                if (status !== ENTERING && status !== ENTERED) {
                    nextStatus = ENTERING
                }
            }
            updateStatus(false, nextStatus)
        }
    },[visibleProp,isInit]);

    const cancelNextCallback=()=>{
        if(nextCallback.current!==null){
            nextCallback.current.cancel();
            nextCallback.current=null;
        }
    }

    const updateStatus=(mounting=false,nextStatus)=>{
        if(nextStatus=null){
            // nextStatus will always be ENTERING or EXITING.
            cancelNextCallback()
            if (nextStatus === ENTERING) {
                performEnter(mounting)
            }
        }else{

        }
    }

    const performEnter=(mounting)=>{
        const appearing=mounting;

        onEnter?.(maybeNode, appearing);
    }
    

    //如果状态是unmounted，直接返回空
    if (status === UNMOUNTED) {
        return null;
    }

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

    return (
        <TransitionGroupContext.Provider value={null}>
            <TransitionComponent 
                ref={handleRef}
            />
        </TransitionGroupContext.Provider>
    )
});

export default Transition;