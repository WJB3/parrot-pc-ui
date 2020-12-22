
import React from 'react';
export default function capitalize(str,isMemo=true){  
    if(typeof str!=="string"){
        return undefined;
    } 
    return str.substring(0,1).toUpperCase()+str.substring(1);
    
}