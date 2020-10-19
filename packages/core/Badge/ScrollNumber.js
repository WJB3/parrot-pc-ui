import React,{cloneElement, useEffect, useState} from 'react';
import classNames from '@packages/utils/classNames';
import usePrevState from '@packages/hooks/usePrevState';

//38->[8,3]
const getNumberArray=(num)=>{
    return num
        ?num
        .toString()
        .split("") 
        .map(i=>{
            const current=Number(i);
            return isNaN(current)?i:current;
        })
        :[]
}

const renderNumberList=(position,className)=>{
    const childrenToReturn=[];
    for(let i=0;i<30;i++){
        childrenToReturn.push(
            <p
                key={i.toString()}
                className={
                    classNames(className,{
                        current:position ===i
                    })
                }
            >
                {i % 10}
            </p>
        )
    }
    return childrenToReturn;
}

const ScrollNumber=React.forwardRef((props,ref)=>{
    const {
        prefixCls:customizePrefixCls,
        className, 
        component="sup",
        style,
        title,
        count:customizeCount,
        displayComponent,
        onAnimated,
        ...restProps
    }=props;
 
    const [count,setCount]=useState(customizeCount);  
    const lastCount=usePrevState(count); 
    const prefixCls=`${customizePrefixCls}-ScrollNumber`;
  
    const newProps={
        ...restProps,
        style,
        ref:ref,
        className:classNames(prefixCls,className),
        title:title
    }

    React.useEffect(()=>{ 

        let timeout=setTimeout(()=>{
            setCount(customizeCount);
        });

        return ()=>{
            if(timeout){
                clearTimeout(timeout);
            }
        }
    },[customizeCount]);
 

    const getPositionByNum=(num,i)=>{
        const currentCount=Math.abs(Number(count));
        const lstCount=Math.abs(Number(lastCount));
        const currentDigit=Math.abs(getNumberArray(count)[i]||0);
        const lastDigit=Math.abs(getNumberArray(lstCount)[i]||0); 

        if(currentCount>lastCount||currentDigit<=lastDigit){ 
            return 10 + num;
        }
        
        return num;
    }

    const renderCurrentNumber=(num,i)=>{
        if(typeof num==="number"){
            const position=getPositionByNum(num,i);

            return React.createElement(
                "span",
                {
                    className:`${prefixCls}-Only`,
                    style:{
                        transition: undefined,
                        msTransform: `translateY(${-position * 100}%)`,
                        WebkitTransform: `translateY(${-position * 100}%)`,
                        transform: `translateY(${-position * 100}%)`,
                    },
                    key:i
                },
                renderNumberList(position,`${prefixCls}-Only-Unit`)
            )
        }

        return (
            <span key="symbol" className={`${prefixCls}-Symbol`}>
                {num}
            </span>
        )
    }

    const renderNumberElement=()=>{
        if(count && Number(count) % 1===0){
            return getNumberArray(count)
            .map((num,i)=>renderCurrentNumber(num,i)) 
        }
        return count;
    }

    if(displayComponent){
        return cloneElement(displayComponent,{
            style:style,
            className:classNames(
                `${prefixCls}-Custom-Component`
            )
        })
    }

    return React.createElement(component,newProps,renderNumberElement());

})

export default ScrollNumber;