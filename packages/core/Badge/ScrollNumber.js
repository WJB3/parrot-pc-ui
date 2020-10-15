import React,{useEffect, useState} from 'react';

//38->['8','3]
const getNumberArray=(num)=>{
    return num
        ?num
        .toString()
        .split("")
        .reverse()
        .map(i=>{
            const current=Number(i);
            return isNaN(current)?i:current;
        })
        :[]
}

const ScrollNumber=(props,ref)=>{
    const {
        prefixCls:customizePrefixCls,
        className,
        displayComponent,
        component="sup",
        style,
        title,
        count:customizeCount,
        onAnimated,
        ...restProps
    }=props;

    const [animateStarted,setAnimateStarted]=useState(true);
    const [count,setCount]=useState(customizeCount);
    const [prevCount,setPrevCount]=useState(customizeCount);
    const [lastCount,setLastCount]=useState(customizeCount);

    const prefixCls=`${customizePrefixCls}-ScrollNumber`;

    const newProps={
        ...restProps,
        style,
        className:classNames(prefixCls,className),
        title:title
    }

    useEffect(()=>{
        if(animateStarted){
            setAnimateStarted(false);
        }
    },[animateStarted])

    const getPositionByNum=(num,i)=>{
        const currentCount=Math.abs(Number(count));
        const lstCount=Math.abs(Number(lastCount));
        const currentDigit=Math.abs(getNumberArray(count)[i]);
        const lastDigit=Math.abs(getNumberArray(lstCount)[i])
    }

    const renderCurrentNumber=(num,i)=>{
        if(typeof num==="number"){

        }
    }

    const renderNumberElement=()=>{

    }

    return React.createElement(component,newProps,renderNumberElement());

}

export default ScrollNumber;