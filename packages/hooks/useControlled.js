import React from 'react';

export default function useControlled({controlled:controlledProp,default:defaultProp}){

    //如果value为undefined 则此时组件为可控
    let controlled=controlledProp!==undefined;

    //defaultProp 参数只会在组件的初始渲染中起作用，后续渲染时会被忽略。
    const [valueState,setValueState]=React.useState(defaultProp); 

    const value=controlled?controlledProp:valueState;

    const setValueIfControlled=React.useCallback((newValue)=>{
        if(!controlled){
            setValueState(newValue)
        }
    },[value,controlled]);

    return [value,setValueIfControlled,controlled];

}