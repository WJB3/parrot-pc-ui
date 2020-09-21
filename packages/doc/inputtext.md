![哈哈](./assets/inputtext/meiguoduizhang.jpeg)


<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1;'>
    <div>
        <div><i>You just don't know when to give up ,do you ?.</i></div>
        <div style="text-align:right;"><b>——Marvel·Captain America</b></div>
    <div> 
    
</blockquote>

# 一、InputText组件介绍

## 1.组件概述
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1;'>
    通过鼠标或键盘输入内容，是最基础的表单域的包装。
</blockquote>

## 2.为什么需要这个组件
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    <div>在一个表单组件中，InputText组件是最基础的输入组件，我们可以利用这个组件输入账号密码等基本信息，并作为后面带有输入框的组件基础组件。</div>
</blockquote>

# 二、InputText组件设计

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    这个组件还是比较简单的，就是input框改一些样式，我们可以直接设计我们的InputText框。
</blockquote>

# 三、InputText组件实战

```js

import React,{useContext,useState} from 'react';
import classNames from '@packages/utils/classNames'; 
import PropTypes from 'prop-types'; 
import {
    ConfigContext,
    SizeContext
} from '@packages/core/ConfigProvider'; 
import useControlled from '@packages/hooks/useControlled';
import capitalize from '@packages/utils/capitalize';
import Icon from '@packages/icon';
import { Fade } from '@packages/core/Transition';
import "./index.scss"; 

const InputText=React.forwardRef(function(props,ref){
    const {
        prefixCls:customizePrefixCls,
        className,  
        size:customizeSize="default",
        placeholder,
        maxLength,
        value:valueProp,
        defaultValue,
        onFocus,
        onBlur,
        onChange,
        onKeyDown,
        id,
        prefix,
        suffix,
        type="text",
        onPressEnter,
        allowClear 
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("InputText",customizePrefixCls); 
 
    const size=useContext(SizeContext)||customizeSize;

    const [value,setValue]=useControlled({
        controlled:valueProp,
        default:defaultValue
    });

    const [active,setActive]=useState(false);

    const handleFocus=(e)=>{
        setActive(true);
        onFocus?.(e);
    };

    const handleBlur=(e)=>{
        setActive(false);
        onBlur?.(e);
    }

    const handleChange=(e)=>{
        onChange?.(e.target.value,e);
        setValue(e.target.value);
    } 

    const handleKeyDown=(e)=>{
        onKeyDown?.(e.keyCode,e);
        if(e.keyCode===13){
            onPressEnter?.(e,value);
        }
    }

    return (
        <div ref={ref} className={classNames(
            `${prefixCls}`,
            className,
            {
                [`${prefixCls}-${capitalize(size)}`]:size,
                [`${prefixCls}-Focus`]:active
            } 
        )}>
            <div className={classNames(
                `${prefixCls}-InputWrapper`
            )}>

                {
                    prefix && <span className={classNames(`${prefixCls}-InputWrapper-Prefix`)}>
                        {prefix}
                    </span>
                }

                <input 
                    placeholder={placeholder}
                    value={value?value:""}
                    className={
                        classNames(
                            `${prefixCls}-Input`
                        )
                    }
                    id={id}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    maxLength={maxLength}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    type={type}
                />

                {
                    (suffix || allowClear) && <span className={classNames(`${prefixCls}-InputWrapper-Suffix`)}>
                        {allowClear && <Fade in={value?true:false} mountOnEnter unmountOnExit>
                            <Icon name={"CloseSquare"} style={{fontSize:16,color: "rgba(0,0,0,.4)"}} />
                        </Fade>}
                        {suffix}
                    </span>
                }
            </div>
        </div>
    )
});

 
export default InputText;
```

# 四、InputText组件设计核心要素

## 1.value/defaultValue、可控/不可控

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    通常来说表单组件如input、textarea上存在value prop就是<a href="https://zh-hans.reactjs.org/docs/glossary.html#%E5%8F%97%E6%8E%A7%E7%BB%84%E4%BB%B6-vs-%E9%9D%9E%E5%8F%97%E6%8E%A7%E7%BB%84%E4%BB%B6">受控组件</a>，且input、textarea上value和defaultValue属性不能同时存在，因为我们组件的核心就是input框，那么value和defaultValue属性是如何共存的呢？这里不得不介绍我们的一个hooks函数:useControlled!
</blockquote>

```js
//useControlled
import React from 'react';

export default function useControlled({controlled,default:defaultProps}){

    let isControlled=controlled!==undefined;

    const [valueState,setValueState]=React.useState(defaultProps); 

    const value=isControlled?controlled:valueState;

    const setValueIfControlled=React.useCallback((newValue)=>{
        if(!isControlled){
            setValueState(newValue)
        }
    },[value]);

    return [value,setValueIfControlled,isControlled]

}
```
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    当value和defaultValue共存时，并不会将defaultValue和value都直接赋值，将value和defaultValue传入这个hook函数,得出value值，然后将value值赋值给input的value prop。
    如果没有传入value,即默认不在外部修改value的值，可以通过函数的第二个函数来修改value的值，如果组件外部传入的value属性是有值的，则无法组件内部修改值。实则上都是value的值，则组件内部的input为受控组件。
</blockquote>

## 2.去除原生input样式、采用伪类元素来模仿下边框的动画效果

```css
 .#{$prefixClsInput}{
            font:inherit;
            color:currentColor;
            outline: none;
            border:0; 
            background: none;
            flex:1;
            box-sizing: border-box;
}

```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    border:0;outline:none;可以去除input框的默认样式
</blockquote>


```css
&:before{
            content:"";
            display:block;
            position: absolute;
            left:0;
            right:0;
            bottom:0;
            border-bottom:1px solid rgba(0,0,0,.45);
            pointer-events:none;
            transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}
&:after{
            content:"";
            display:block;
            position: absolute;
            left:0;
            right:0;
            bottom:0;
            transform:scaleX(0);
            border-bottom:2px solid $primary-color;
            pointer-events: none;
            transition:transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    &:before的样式是没有active前即聚焦等。<br />
    &:after的样式是没有active为true后如聚焦等。<br />
</blockquote>