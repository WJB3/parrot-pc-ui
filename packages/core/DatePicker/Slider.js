import React, { useEffect } from 'react';
import SliderTranslation from './SliderTranslation';
import childrenToArray from '@packages/utils/childrenToArray';
import usePrevState from '@packages/cores/usePrevState';
import useInit from '@pacakges/cores/useInit';
 

 
const Slider=(props)=>{

    const {
        children:childrenProps,
        date, 
        direction="next",//默认是下一个向上
    }=props;
 
    const [children,setChildren]=React.useState([]);

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
        if(!isInit){
            setChildren([<SliderTranslation in={true} key={index.current} >{childrenProps}</SliderTranslation>]);
        }
        
        setChildren([React.cloneElement(children[0],{
            status:direction==="next"?"prev":"next",
            in:false
        }),<SliderTranslation in={true} key={index.current} status={direction}  >{childrenProps}</SliderTranslation>])

        index.current++;
    },[date,isInit]);
   
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