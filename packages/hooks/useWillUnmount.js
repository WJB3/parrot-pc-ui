import React from 'react';

//组件被销毁前被调用
export default function useWillUnmount(callback){
    React.useEffect(()=>{
        return ()=>{
            callback();
        }
    },[]);
}