import React from 'react';

export default function useControlled({controlled,default:defaultProps}){

    let isControlled=controlled!==undefined;

    const [valueState,setValueState]=React.useState(defaultProps); 

    const value=isControlled?controlled:valueState;

    const setValueIfControlled=React.useCallback((newValue)=>{
        if(!isControlled){
            setValueState(newValue)
        }
    },[value]);

    return [value,setValueIfControlled,isControlled]

}