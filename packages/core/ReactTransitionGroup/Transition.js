

import React,{createElement,useMemo,useRef,useEffect,useCallback,useContext} from 'react';
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
        timeout,
        onEnter=noop,
        ...childProps
    }=props; 

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

    const [ status,setStatus ]=useStateCallback(initialStatus); 

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

    const handleRef=useForkRef(ref,nodeRef);
  
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