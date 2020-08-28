
import React from 'react';

export default function useInit(){//表示是否初始化
    const initRef=React.useRef(false);

    React.useEffect(()=>{
        initRef.current=true;

        return ()=>{
            initRef.current=false;
        }
    },[]);

    return initRef.current;
}