import React,{useContext, useEffect, useState,useRef } from 'react';
import classNames from '@packages/utils/classNames'; 
import PropTypes from 'prop-types'; 
import {
    ConfigContext 
} from '@packages/core/ConfigProvider'; 
import ResizeObserver from '@packages/core/ResizeObserver'; 
import InputText from '@packages/core/InputText';
import calculateNodeHeight  from './calculateNodeHeight';
import useForkRef from '@packages/hooks/useForkRef';
import "./index.scss"; 

const InputTextarea=React.forwardRef(function(props,ref){
    const {
        prefixCls:customizePrefixCls,
        className,
        autoSize,
        onResize,
        onChange,
        ...restProps
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("InputTextarea",customizePrefixCls); 

    const textAreaRef=useRef(null);

    const [textareaStyles,setTextareaStyles]=useState({});

    const resizeTextarea=()=>{  
        console.log(textAreaRef.current)
        if(!autoSize||!textAreaRef.current){
            return ;
        } 
        const {minRows,maxRows}=autoSize;
        const textareaStyles = calculateNodeHeight(textAreaRef.current, minRows, maxRows);
 
        // setTextareaStyles(textareaStyles);
    }

    const handleChange=(value,e)=>{ 
        resizeTextarea(); 

        onChange?.(value,e); 
    }

    useEffect(()=>{
        resizeTextarea()
    },[autoSize])

    const handleResize=()=>{
        onResize?.();
    } 

    const handleRef=useForkRef(ref,textAreaRef);

    return (
        <ResizeObserver onResize={handleResize}>
            <InputText 
                component={"textarea"} 
                className={classNames(prefixCls)}  
                onChange={handleChange}
                ref={handleRef}
                textareaStyles={{
                    ...textareaStyles
                }} 
                {...restProps} 
            />
        </ResizeObserver>
    )
});

InputTextarea.propTypes={
    //自定义后缀
    prefixCls:PropTypes.string,
    //自定义类名
    className:PropTypes.string, 
    //input 尺寸大小
    size:PropTypes.oneOf(['small','default','large']), 
    //最大长度
    maxLength:PropTypes.number,
    //占位符
    placeholder:PropTypes.any,
    //输入框内容
    value:PropTypes.string,
    //输入框默认内容
    defaultValue:PropTypes.string,
    //焦点事件
    onFocus:PropTypes.func,
    //离开焦点事件
    onBlur:PropTypes.func,
    //输入框内容变化的回调事件
    onChange:PropTypes.func,
    //输入框的id
    id:PropTypes.string,
    //input前缀
    prefix:PropTypes.any,
    //input后缀
    suffix:PropTypes.any

};

export default InputTextarea;