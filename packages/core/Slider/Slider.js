  
//13.activeElement和contains
//14. left: calc(-50% - 4px);
//15.toFixed()
//16.reduce
//17.mousedown聚焦后失去交代呢
//18.在目前版本的Chrome浏览器下，浏览器认为键盘访问触发的元素聚焦才是:focus-visible所表示的聚焦。


import React, { useState, useContext, useRef, useEffect } from 'react';
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
import useIsFocusVisible from '@packages/hooks/useIsFocusVisible';
import "./index.scss";


const Forward = ({ children }) => children;

function computed(value, min, max) {
    //根据max和min得出正确的值
    return Math.min(Math.max(min, value), max);
}

function valueToPercent(value, min, max) {
    //根据max和min得出正确的百分比
    return ((value - min) / (max - min)) * 100;
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

function getDecimalPrecision(num) {
    const decimalPart = num.toString().split(".")[1];
    return decimalPart ? decimalPart.length : 0;
}

function roundValueToStep(value, step, min) {
    const nearest = Math.round((value - min) / step) * step + min;
    return Number(nearest.toFixed(getDecimalPrecision(step)));
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


function findClosest(values, currentValue) {
    const { index: closestIndex } = values.reduce((acc, value, index) => {
      const distance = Math.abs(currentValue - value);
  
      if (acc === null || distance < acc.distance || distance === acc.distance) {
        return {
          distance,
          index,
        };
      }
  
      return acc;
    }, null);
    return closestIndex;
}

function setValueIndex({ values, source, newValue, index }) {
    // Performance shortcut
    if (source[index] === newValue) {
      return source;
    }
  
    const output = values.slice();
    output[index] = newValue;
    return output;
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

const Slider = React.forwardRef(function(props, ref){

    const {
        prefixCls: customizePrefixCls,
        className,
        color = "primary",
        direction = "horizontal",
        value: valueProp,
        defaultValue = 0,
        max = 100,
        min = 0,
        ThumbComponent = "span",
        onMouseDown,
        onChange,
        style,
        valueLabelDisplay = "off",
        ValueLabelComponent: ValueLabelComponentProp = ValueLabel,
        valueLabelFormat,
        step = 1 
    } = props;

    const prefixCls = useContext(ConfigContext)?.getPrefixCls("Slider", customizePrefixCls);

    const [valueDerived, setValue] = useControlled({
        controlled: valueProp,
        default: defaultValue
    });

    const [focusVisible,setFocusVisible]=React.useState(-1);

    //slice可以将类数组转化为数组
    const range = Array.isArray(valueDerived);//判断是否是范围

    let values = range ? valueDerived.slice().sort((a,b)=>a-b) : toArray(valueDerived);

    values=values.map((value) => computed(value, min, max));

    const sliderRef = useRef();

    const touchId = useRef(null);

    const {
        isFocusVisibleRef,
        onBlur:handleBlurVisible,
        onFocus:handleFocusVisible,
        ref:focusVisibleRef
    }=useIsFocusVisible();

    const handleRef = useForkRef(ref, sliderRef,focusVisibleRef); 

    const previousIndex = React.useRef();

    const [active, setActive] = useState(-1);

    const getFingerNewValue = ({ finger,move=false, values: values2, source }) => {
        const { current: slider } = sliderRef;
        const { width, height, bottom, left } = slider.getBoundingClientRect();
        let percent;

        if (direction.indexOf("vertical") === 0) {
            percent = (bottom - finger.y) / height;
        } else {
            percent = (finger.x - left) / width;
        }

        let newValue;
        newValue = percentToValue(percent, min, max);

        if (step) {
            newValue = roundValueToStep(newValue, step, min);
        }

        newValue = computed(newValue, min, max);

        let activeIndex = 0;

        if (range) {
            if(!move){
                activeIndex = findClosest(values2, newValue);
            }else{
                activeIndex = previousIndex.current;
            }
            const previousValue = newValue;
            newValue = setValueIndex({
                values: values2,
                source,
                newValue,
                index: activeIndex,
            }).sort((a,b)=>a-b);
            activeIndex = newValue.indexOf(previousValue);
            previousIndex.current = activeIndex;
        }
        
        return {
            newValue, activeIndex
        }
    }

    

    const handleTouchMove = (nativeEvent) => {
        const finger = trackFinger(nativeEvent, touchId);
        if (!finger) {
            return;
        } 

        const { newValue, activeIndex } = getFingerNewValue({
            finger,
            move: true,
            values,
            source: valueDerived,
        });
        focusThumb({ sliderRef, activeIndex, setActive });
        setValue(newValue);
    }

    const handleKeyDown = (event) => {  
        const index = Number(event.currentTarget.getAttribute('data-index'));
        const value = values[index];
        const tenPercents = (max - min) / 10;
        let newValue;
        const increaseKey = 'ArrowRight';
        const decreaseKey = 'ArrowLeft'; 
        switch (event.key) {
            case 'Home':
                newValue = min;
                break;
            case 'End':
                newValue = max;
                break;
            case 'PageUp':
                if (step) {
                    newValue = value + tenPercents;
                }
                break;
            case 'PageDown':
                if (step) {
                    newValue = value - tenPercents;
                }
                break;
            case increaseKey:
            case 'ArrowUp':
                if (step) {
                    newValue = value + step;
                }
                break;
            case decreaseKey:
            case 'ArrowDown':
                if (step) {
                    newValue = value - step;
                }
                break;
            default:
                return;
        }
        if (step) {
            newValue = roundValueToStep(newValue, step, min);
        }
        newValue = computed(newValue, min, max);
        setValue(newValue);

    }

    const handleMouseDown =  (event) => {  
        onMouseDown?.(event);

        // 单击
        if (event.button !== 0) {
            return;
        }

        event.preventDefault();

        const finger = trackFinger(event, touchId);
   
        const { newValue, activeIndex } = getFingerNewValue({ finger ,values,source:valueDerived});

        focusThumb({ sliderRef, activeIndex, setActive });

        setValue(newValue);

        const doc = ownerDocument(sliderRef.current);
        doc.addEventListener("mousemove", handleTouchMove);
        doc.addEventListener('mouseup', handleTouchEnd);
    }

    const handleFocus = (event) => { 
        const index = Number(event.currentTarget.getAttribute('data-index'));
        handleFocusVisible(event);
        if (isFocusVisibleRef.current === true) {
          setFocusVisible(index);
        } 
    };

    const handleBlur = (event) => { 
        handleBlurVisible(event);
        if (isFocusVisibleRef.current === false) {
          setFocusVisible(-1);
        } 
    };

    const stopListening = () => {
        const doc = ownerDocument(sliderRef.current);
        doc.removeEventListener("mousemove", handleTouchMove);
        doc.removeEventListener("mouseup", handleTouchEnd);
        doc.removeEventListener("touchmove", handleTouchMove);
        doc.removeEventListener("touchend", handleTouchEnd);
    };

    const handleTouchEnd = (nativeEvent) => { 
        const finger = trackFinger(nativeEvent, touchId);

        if (!finger) {
            return;
        }
        const { newValue } = getFingerNewValue({ finger, values, source: valueDerived });

        setActive(-1);

        touchId.current = undefined;

        stopListening();
    }

    const trackOffset = valueToPercent(range ? values[0] : min, min, max);
    const trackLeap = valueToPercent(values[values.length - 1], min, max) - trackOffset;

    const trackStyle = {
        ...axisProps[direction].offset(trackOffset),
        ...axisProps[direction].leap(trackLeap)
    };

  
    useEffect(() => {
        onChange?.(range ? values : values[0]);
    }, [values]);

    return (
        <span
            className={
                classNames(
                    prefixCls,
                    className,
                    {
                        [`${prefixCls}-${capitalize(color,false)}`]: color,
                        [`${prefixCls}-${capitalize(direction,false)}`]: direction
                    }
                )
            }
            ref={handleRef}
            style={style}
            onMouseDown={handleMouseDown}
        
        >
            <span className={`${prefixCls}-Rail`} />
            <span className={`${prefixCls}-Track`} style={trackStyle} /> 
            {
                values.map((value, index) => {
                    const percent = valueToPercent(value, min, max);
                    const style = axisProps[direction].offset(percent);
                    const ValueLabelComponent = valueLabelDisplay === "off" ? Forward: ValueLabelComponentProp
                     
                    return (
                        <ValueLabelComponent
                            key={index}
                            className={classNames(
                                `${prefixCls}-ValueLabel`
                            )}
                            value={
                                typeof valueLabelFormat === "function"
                                    ? valueLabelFormat(value, index)
                                    : value
                            }
                            index={index}
                            open={active === index || valueLabelDisplay === 'on'}
                        >
                            <ThumbComponent
                                className={
                                    classNames(
                                        `${prefixCls}-Thumb`,
                                        {
                                            [`${prefixCls}-Thumb-Active`]: active === index,
                                            [`${prefixCls}-Thumb-FocusVisible`]: focusVisible === index,
                                        }
                                    )
                                }
                                style={style}
                                role="slider"
                                tabIndex={0}
                                data-index={index}
                                key={index}
                                onKeyDown={handleKeyDown} 
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                        </ValueLabelComponent>
                    )
                })
            }

        </span>
    );
});


export default Slider;