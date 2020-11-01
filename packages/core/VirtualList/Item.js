

import React from 'react';


export function Item({children,setRef}){
    const refFunc=React.useCallback(node=>{
        setRef(node);
    },[]);

    return React.cloneElement(children,{
        ref:refFunc
    })
}