//1.currentTarget的区别
//2.computed函数
//3.valueToPercent获得百分比
//4.sort函数
//5.slice函数
//6.getAttribute函数
//7.event.button==0代表单机左键 event.buttons===0代表 没有按键或者是没有初始化
//8.event.changedTouched
//9.event对象 clientX
//10.getBoundingClientRect
//11.Node.ownerDocument 只读属性会返回当前节点的顶层的 document 对象。
//12.newValue=computed(newValue,min,max);为了不让
//13.activeElement和contains
//14. left: calc(-50% - 4px);

import React, { useState , useContext, useRef,useEffect} from 'react';
import classNames from '@packages/utils/classNames';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import capitalize from '@packages/utils/capitalize';
import useControlled from '@packages/hooks/useControlled';
import toArray from '@packages/utils/toArray';
import useForkRef from '@packages/hooks/useForkRef';
import ownerDocument from '@packages/utils/ownerDocument';
import ValueLabel from './ValueLabel';
import "./index.scss";

function computed(value, min, max) {
    //根据max和min得出正确的值
    return Math.min(Math.max(min, value), max);
}

function valueToPercent(value, min, max) {
    //根据max和min得出正确的百分比
    return ((value - min)/(max - min))*100;
}

function percentToValue(percent, min, max) {
    return (max - min) * percent + min;
}

const axisProps = {
    horizontal: {
        offset: (percent) => ({ left: `${percent}%` }),
        leap: (percent) => ({ width: `${percent}%` }),
    },
    vertical: {
        offset: (percent) => ({ bottom: `${percent}%` }),
        leap: (percent) => ({ height: `${percent}%` }),
    },
};

function getDecimalPrecision(num){
    const decimalPart=num.toString().split(".")[1];
    return decimalPart?decimalPart.length:0;
}

function roundValueToStep(value,step,min){

}

function trackFinger(event, touchId) {
    if (touchId.current !== undefined && event.changedTouches) {
        for (let i = 0; i < event.changedTouches.length; i += 1) {
            const touch = event.changedTouches[i];
            if (touch.identifier === touchId.current) {
                return {
                    x: touch.clientX,
                    y: touch.clientY,
                };
            }
        }
        return false;
    }
    return {
        x: event.clientX,
        y: event.clientY,
    };
}

function focusThumb({ sliderRef, activeIndex, setActive }) {
    const doc = ownerDocument(sliderRef.current);
    if (
      !sliderRef.current.contains(doc.activeElement) ||
      Number(doc.activeElement.getAttribute('data-index')) !== activeIndex
    ) {
      sliderRef.current.querySelector(`[role="slider"][data-index="${activeIndex}"]`).focus();
    }
  
    if (setActive) {
      setActive(activeIndex);
    }
}

const Slider = React.forwardRef((props, ref) => {

    const {
        prefixCls: customizePrefixCls,
        className,
        color = "primary",
        direction = "horizontal",
        value: valueProp,
        defaultValue=0,
        max = 100,
        min = 0,
        ThumbComponent = "span",
        onMouseDown, 
        onChange,
        style,
        valueLabelDisplay="off",
        ValueLabelComponent:ValueLabelComponentProp=ValueLabel,
        valueLabelFormat
    } = props;

    const prefixCls = useContext(ConfigContext)?.getPrefixCls("Slider", customizePrefixCls);

    const [valueDerived, setValue] = useControlled({
        controlled: valueProp,
        default: defaultValue
    });

    const  [active,setActive]=useState(-1);

    const getFingerNewValue=({finger})=>{
        const {current:slider}=sliderRef;
        const {width,height,bottom,left}=slider.getBoundingClientRect();
        let percent;

        if(direction.indexOf("vertical")===0){
            percent=(bottom-finger.y)/height;
        }else{
            percent=(finger.x-left)/width;
        }

        let newValue;
        newValue=percentToValue(percent,min,max);

        newValue=computed(newValue,min,max);

        let activeIndex=0;
        return {
            newValue,activeIndex
        }
    }

    const sliderRef = useRef();

    const touchId = useRef(null);

    const handleRef = useForkRef(ref, sliderRef);

    const [open, setOpen] = React.useState(-1);

    //slice可以将类数组转化为数组
    let values = toArray(valueDerived).slice().sort((a, b) => a - b);

    values.map((value) => computed(value, min, max));

    const handleFocus = (event) => {
        const index = Number(event.currentTarget.getAttribute('data-index'));
        setOpen(index);
    };

    const handleMouseOver = (event) => {
        const index = Number(event.currentTarget.getAttribute('data-index'));
        setOpen(index);
    };

    const handleMouseLeave = () => {
        setOpen(-1);
    };

    const handleTouchMove=(nativeEvent)=>{
        const finger=trackFinger(nativeEvent,touchId);
        if(!finger){
            return ; 
        } 

        if (nativeEvent.type === 'mousemove' && nativeEvent.buttons === 0) {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            handleTouchEnd(nativeEvent);
            return;
        }

        const { newValue,activeIndex}=getFingerNewValue({
            finger,
        }); 

        setValue(newValue);
    }

    const handleKeyDown = (event) => {

    }

    const handleMouseDown = (event) => { 
        onMouseDown?.(event);

        // 单击
        if (event.button !== 0) {
            return;
        }

        const finger = trackFinger(event, touchId);

        const {newValue,activeIndex}=getFingerNewValue({finger});

        focusThumb({ sliderRef, activeIndex, setActive }); 

        setValue(newValue);

        const doc=ownerDocument(sliderRef.current);
        doc.addEventListener("mousemove",handleTouchMove);
        doc.addEventListener('mouseup', handleTouchEnd);
    }

    const stopListening=()=>{
        const doc=ownerDocument(sliderRef.current);
        doc.removeEventListener("mousemove",handleTouchMove);
        doc.removeEventListener("mouseup",handleTouchEnd);
        doc.removeEventListener("touchmove",handleTouchMove);
        doc.removeEventListener("touchend",handleTouchEnd);
    };

    const handleTouchEnd=(nativeEvent)=>{
        const finger=trackFinger(nativeEvent,touchId);

        if(!finger){
            return ;
        }
        const { newValue } =getFingerNewValue({finger});

        setActive(-1);

        touchId.current = undefined;

        stopListening();
    }

    const trackOffset=valueToPercent(min,min,max);
    const trackLeap=valueToPercent(values[values.length - 1], min, max)-trackOffset;

    const trackStyle = {
        ...axisProps[direction].offset(trackOffset),
        ...axisProps[direction].leap(trackLeap)
    };

    useEffect(()=>{
        onChange?.(values.length===1?values[0]:values);
    },[values]);

    return (
        <span
            className={
                classNames(
                    prefixCls,
                    className,
                    {
                        [`${prefixCls}-${capitalize(color)}`]: color,
                        [`${prefixCls}-${capitalize(direction)}`]:direction 
                    }
                )
            }
            ref={handleRef}
            style={style}
            onMouseDown={handleMouseDown}
        >
            <span className={`${prefixCls}-Rail`} />
            <span className={`${prefixCls}-Track`} style={trackStyle} />
            <input type="hidden" />
            {
                values.map((value, index) => {
                    const percent = valueToPercent(value, min, max); 
                    const style = axisProps[direction].offset(percent);
                    const ValueLabelComponent=valueLabelDisplay==="off"?({children})=>children:ValueLabelComponentProp

                    return (
                        <ValueLabelComponent
                            key={index}
                            className={classNames(
                                `${prefixCls}-ValueLabel`
                            )}
                            value={
                                typeof valueLabelFormat==="function"
                                ?valueLabelFormat(value,index)
                                :value
                            }
                            index={index}
                            open={open === index || active === index || valueLabelDisplay === 'on'}
                        >
                            <ThumbComponent
                                className={
                                    classNames(
                                        `${prefixCls}-Thumb`,
                                        {
                                            [`${prefixCls}-Thumb-Active`]:active===index
                                        }
                                    )
                                }
                                style={style}
                                role={"slider"}
                                tabIndex={0}
                                data-index={index}
                                key={index}
                                onKeyDown={handleKeyDown}
                                onFocus={handleFocus}
                                onMouseOver={handleMouseOver}
                                onMouseLeave={handleMouseLeave}
                            /> 
                        </ValueLabelComponent>
                    )
                })
            }

        </span>
    );
});


export default Slider;