
import React, { useState,useRef } from 'react';
import Button from '@packages/core/Button';

const ActionButton=React.forwardRef((props,ref)=>{

    const {
        children,
        color,
        actionFn,
        closeModal
    }=props;

    const [ loading,setLoading ]=useState(false);

    const clickedRef=useRef(false);

    const handlePromiseOnOk=(returnValueOfOnOk)=>{
        if(!returnValueOfOnOk || !returnValueOfOnOk.then){
            return ;
        }
        setLoading(true); 
        returnValueOfOnOk.then(
            (...args) => { 
                closeModal(...args);
            },
            (e) => { 
                console.error(e); 
                setLoading(false);
                clickedRef.current = false;
            },
        )
    }

    const onClick=()=>{
        if (clickedRef.current) {
            return;
        }
        clickedRef.current = true;
        //如果没有方法传进来，默认执行关闭操作
        if (!actionFn) {
            closeModal();
            return;
        }
        //
        let returnValueOfOnOk;
        if (actionFn.length) {
            returnValueOfOnOk = actionFn(closeModal);
        }else{
            returnValueOfOnOk = actionFn();
            if (!returnValueOfOnOk) {
                closeModal();
                return;
            }
        }
        handlePromiseOnOk(returnValueOfOnOk);
    }

    return (
        <Button
            ref={ref}
            type="text"
            color={color}
            onClick={onClick}
            loading={loading}
        >
            {children}
        </Button>
    )
});

export default ActionButton;