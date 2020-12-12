

import React,{useState,useMemo,useRef,useEffect} from 'react';
import TransitionGroupContext from './TransitionGroupContext';
import useInit from '@packages/hooks/useInit';
 

export const UNMOUNTED="unmounted";
export const EXITED="exited";
export const ENTERING="entering";
export const ENTERED="entered";
export const EXITING="exiting";

function noop() {}

//1.默认visibleProp此时是组件正常是处于exited状态
const Transition=React.forwardRef((props,ref)=>{

    const {
        children,
        visible:visibleProp=false,
        onEnter=noop,
        ...childProps
    }=props;

    const isInit=useInit();

    const { initialStatus }=useMemo(()=>{

        let initialStatus;

        if(visibleProp){
            initialStatus=ENTERED
        }else{
            //1.默认visibleProp此时是组件正常是处于exited状态
            initialStatus=EXITED
        }

        return {
            initialStatus
        }

    },[]);

    const nextCallback=useRef(null);

    const appearStatus=useRef(null);

    const [ status,setStatus ]=useState(initialStatus);

    useEffect(()=>{ 

        updateStatus(true,appearStatus.current);

        ()=>{
            cancelNextCallback();
        }
    },[])

    const cancelNextCallback=()=>{
        if(nextCallback.current!==null){
            nextCallback.current.cancel();
            nextCallback.current=null;
        }
    }

    const updateStatus=(mounting=false,nextStatus)=>{
        if(nextStatus=null){

        }else{

        }
    }
    

    //如果状态是unmounted，直接返回空
    if (status === UNMOUNTED) {
        return null;
    }

    return (
        <TransitionGroupContext.Provider value={null}>
            {
                typeof children==="function"
                ?children(status,childProps)
                :React.cloneElement(React.Children.only(children), childProps)
            }
        </TransitionGroupContext.Provider>
    )
});

export default Transition;