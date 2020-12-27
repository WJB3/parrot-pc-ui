

import React, { useEffect,useRef } from 'react';
import Alert from '@packages/core/Alert';
import {
    Slide,FadeGrow
} from '@packages/core/Transition';


const Notice=React.forwardRef((props,ref)=>{

    const {
        message,
        type,
        prefixCls,
        visible:visibleProp,
        duration,
        //时间到了的回调
        onTimeClose,
        onClose,
        color,
        transition="fadeGrow",
        direction="left",
        closable
    }=props;

    let startTimer=useRef(null);

    useEffect(()=>{
        startTimer=setTimeout(()=>{
            onTimeClose?.(props);
        },duration);
        ()=>{
            clearTimeout(startTimer.current);
        }
    },[startTimer.current,duration]);

    const handleExited=(e)=>{
        onClose?.(e)
    }
    
    let TransitionComponent=transition==="fadeGrow"?FadeGrow:Slide;

    return (
        <TransitionComponent
            appear
            visible={visibleProp}
            ref={ref}
            onExited={handleExited}
            direction={direction}
        >
            <Alert
                className={`${prefixCls}-Notice`}
                block={false}
                message={message}
                type={type}
                color={color}
                closable={closable}
            />
        </TransitionComponent>
    )
});

export default Notice;