//1.currentTarget的区别
//2.computed函数
//3.valueToPercent获得百分比
//4.sort函数
//5.slice函数
//6.getAttribute函数
//7.event.button==0代表单机左键
//8.event.changedTouched
//9.event对象 clientX
//10.getBoundingClientRect

import React, { useContext, useRef } from 'react';
import classNames from '@packages/utils/classNames';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import capitalize from '@packages/utils/capitalize';
import useControlled from '@packages/hooks/useControlled';
import toArray from '@packages/utils/toArray';
import useForkRef from '@packages/hooks/useForkRef';
import "./index.scss";

function computed(value, min, max) {
    //根据max和min得出正确的值
    return Math.min(Math.max(min, value), max);
}

function valueToPercent(value, min, max) {
    //根据max和min得出正确的百分比
    return ((value - min) * 100) / (max - min);
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

function getDecimalPrecision(num){
    if(Math.abs(num)<1){
        
    }
}

const Slider = React.forwardRef((props, ref) => {

    const {
        prefixCls: customizePrefixCls,
        className,
        color = "primary",
        direction = "horizontal",
        value: valueProp = 0,
        defaultValue,
        max = 100,
        min = 0,
        ThumbComponent = "span",
        onMouseDown,
        step=1,
    } = props;

    const prefixCls = useContext(ConfigContext)?.getPrefixCls("Slider", customizePrefixCls);

    const [valueDerived, setValue] = useControlled({
        controlled: valueProp,
        default: defaultValue
    });

    const getFingerNewValue=({finger,move=false,values:valuesProp,source})=>{
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

    const handleKeyDown = (event) => {

    }

    const handleMouseDown = (event) => {
        console.log(sliderRef.current.getBoundingClientRect())
        onMouseDown?.(event);

        // 单击
        if (event.button !== 0) {
            return;
        }

        const finger = trackFinger(event, touchId);
    }

    return (
        <span
            className={
                classNames(
                    prefixCls,
                    className,
                    {
                        [`${prefixCls}-${capitalize(color)}`]: color
                    }
                )
            }
            ref={handleRef}
            onMouseDown={handleMouseDown}
        >
            <span className={`${prefixCls}-Rail`} />
            <span className={`${prefixCls}-Track`} />
            <input type="hidden" />
            {
                values.map((value, index) => {
                    const percent = valueToPercent(value, min, max);
                    const style = axisProps[direction].offset(percent);

                    return (
                        <ThumbComponent
                            className={
                                classNames(
                                    `${prefixCls}-Thumb`
                                )
                            }
                            tabIndex={0}
                            data-index={index}
                            key={index}
                            onKeyDown={handleKeyDown}
                            onFocus={handleFocus}
                            onMouseOver={handleMouseOver}
                            onMouseLeave={handleMouseLeave}
                        >

                        </ThumbComponent>
                    )
                })
            }

        </span>
    );
});


export default Slider;