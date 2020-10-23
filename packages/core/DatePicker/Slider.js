import React, { useEffect } from 'react';
import SliderTranslation from './SliderTranslation';
import childrenToArray from '@packages/utils/childrenToArray'; 
import useInit from '@packages/hooks/useInit';
import usePrevState from '@packages/hooks/usePrevState';
 

 
const Slider=(props)=>{

    const {
        children:childrenProps,
        date, 
        status="next",//默认是下一个向上
        direction="upDown",
        renderChildren
    }=props;
 
    const [children,setChildren]=React.useState([]);

    const prevDate=usePrevState(date);

    const index=React.useRef(0);

    const isInit=useInit();

    const prevRef=React.useRef(null);

    const handleRef=(ref)=>{
        if(!ref){
            return ;
        }
        prevRef.current=ref;
        setTransition();
    }

    const setTransition=()=>{
       
        function transitionend(){ 
            
            if(children.length>1){
                setChildren((oldChildrens)=>{
                    if(oldChildrens.length>1){
                        return oldChildrens.splice(1);
                    }
                    return oldChildrens;
                });
            }
            prevRef.current.removeEventListener('transitionend', transitionend, false);
        }
        prevRef.current.addEventListener('transitionend', transitionend, false);
        
    }

    useEffect(()=>{ 
        setChildren([<SliderTranslation in={true} key={index.current} direction={direction}>{childrenProps}</SliderTranslation>]);
     
        index.current++;
    },[]);

    useEffect(()=>{
        if(isInit){
            let clearIndex=React.Children.count(children)===1?0:1;//遇到过渡清除不掉的情况下

            setChildren([React.cloneElement(children[clearIndex],{
                status:status==="next"?"prev":"next",
                in:false
            }),<SliderTranslation in={true} key={index.current} status={status} direction={direction} >{childrenProps}</SliderTranslation>]) 
        }
        index.current++;
    },[date]);
    
    useEffect(()=>{
        if(isInit){
            let clearIndex=React.Children.count(children)===1?0:1;//遇到过渡清除不掉的情况下

            setChildren([React.cloneElement(children[clearIndex],{
                status:status==="next"?"prev":"next",
                in:false
            }),<SliderTranslation in={true} key={index.current} status={status} direction={direction} >{childrenProps}</SliderTranslation>]) 
        }
    },[]);

    
    useEffect(()=>{//当日期不变时 无法重新渲染 
        if(isInit && renderChildren && prevDate===date){ 
            setChildren([<SliderTranslation in={true} key={index.current} >{childrenProps}</SliderTranslation>])
            index.current++;
        }
    },[childrenProps]);
   
    return <React.Fragment>
        {
            childrenToArray(children).map((item,index)=>{
          
                return React.cloneElement(item,{
                    ref:index===0?handleRef:undefined
                })
            })
        } 
    </React.Fragment>
};

export default Slider;