import React, { useState,useEffect,useRef } from 'react';
import raf from 'raf';

export default function useRaf(callback){

    const rafRef=useRef();
    const removeRef=useRef(false);

    function trigger(...args){
        if(!removeRef.current){
            raf.cancel(rafRef.current);
            rafRef.current=raf(()=>{
                callback(...args)
            });
        }
    }

    useEffect(()=>{
        return ()=>{
            removeRef.current=true;
            raf.cancel(rafRef.current);
        }
    },[]);

    return trigger;
}

export function useRafState(defaultState){
    const batchRef=React.useRef([]);
    const [ ,forceUpdate]=useState({});
    const state=useRef(typeof defaultState==="function"?defaultState():defaultState);

    const flushUpdate=useRaf(()=>{
        let current=state.current;
        batchRef.current.forEach(callback=>{
            current=callback(current);
        });
        batchRef.current=[];
        state.current=current;
        forceUpdate({})
    })

    function updater(callback){
        batchRef.current.push(callback);
        flushUpdate();
    }

    return [state.current,updater]
}