

import React, { useEffect,useRef } from 'react';
import Alert from '@packages/core/Alert';
import {
    Grow,Fade,FadeGrow
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
        color
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

    return (
        <FadeGrow
            appear
            visible={visibleProp}
            ref={ref}
            onExited={handleExited}
        >
            <Alert
                className={`${prefixCls}-Notice`}
                block={false}
                message={message}
                type={type}
                color={color}
            />
        </FadeGrow>
    )
});

export default Notice;