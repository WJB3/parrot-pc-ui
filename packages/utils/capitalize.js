
import React from 'react';
export default function capitalize(str,isMemo=true){
    if(!isMemo){
        return str.substring(0,1).toUpperCase()+str.substring(1);
    }
    return React.useMemo(()=>{
        return str.substring(0,1).toUpperCase()+str.substring(1);
    },[str])
}