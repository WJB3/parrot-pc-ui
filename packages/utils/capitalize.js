
import React from 'react';
export default function capitalize(str){

    return React.useMemo(()=>{
        return str.substring(0,1).toUpperCase()+str.substring(1);
    },[str])
}