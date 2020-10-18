import React,{useEffect, useState} from 'react';
import classNames from '@packages/utils/classNames';

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
    const [lastCount,setLastCount]=useState(customizeCount);//记录之前的count

    if(prevCount!==customizeCount){ 
        setPrevCount(customizeCount);
    }

    const prefixCls=`${customizePrefixCls}-ScrollNumber`;

    const newProps={
        ...restProps,
        style,
        className:classNames(prefixCls,className),
        title:title
    }

    React.useEffect(()=>{
     
        //当count变为9时，lastCount可以获取到8
        setLastCount(count);

        let timeout=setTimeout(()=>{
            setCount(customizeCount);
        });

        return ()=>{
            if(timeout){
                clearTimeout(timeout);
            }
        }
    },[customizeCount]);
 

    const getPositionByNum=(num,i)=>{//2,0
        const currentCount=Math.abs(Number(count));//2
        const lstCount=Math.abs(Number(lastCount));//3
        const currentDigit=Math.abs(getNumberArray(count)[i]);//2
        const lastDigit=Math.abs(getNumberArray(lstCount)[i])//3
 

        if(currentCount>lastCount){ 
            if(currentDigit>=lastDigit){
                return 10+num;
            }
            return 20 + num;
        }
        if(currentDigit<=lastDigit){
            return 10+num;
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
                        transition:undefined,
                        msTransform:`translateY(${-position*100}%)`,
                        WebkitTransform:`translateY(${-position*100}%)`,
                        transform:`translateY(${-position*100}%)`
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

    return React.createElement(component,newProps,renderNumberElement());

}

export default ScrollNumber;