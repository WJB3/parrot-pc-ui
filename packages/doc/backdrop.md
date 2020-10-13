![哈哈](./assets/backdrop/dead.jpg)


<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    <div>
        <div><i>In the land of the blind,the one-eye man is the King.</i></div>
        <div style="text-align:right;"><b>——Marvel·Daredevil</b></div>
    <div> 
    
</blockquote>
 
# 一、BackDrop组件介绍

## 1.组件概述

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1;'>
    背景暗化组件用于提供针对特定元素或这个元素一部分的强调。
</blockquote>

## 2.为什么需要这个组件

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    显示和隐藏UI上的背景，popups，loading，和其他覆盖层形式出现。通常，多个UI组件需要一个背景，但是只有一个背景经常需要同时在DOM中。
</blockquote>

# 二、BackDrop组件设计
  

## 原理解析

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    该组件非常简单，仅仅是一个显示隐藏的效果而已，这里用到了Portal组件。
</blockquote> 

# 三、BackDrop组件实战

## 1、代码实战

```js
import React, { useContext, useEffect } from 'react';
import { classNames } from '../components/helper/className';
import { ConfigContext } from '../ConfigContext';
import { Fade } from '../Animate';
import PropTypes from 'prop-types';
import "./index.scss";

const BackDrop = React.forwardRef((Props,ref) => {

    const {
        prefixCls:customizePrefixCls,
        className,
        children,
        style,
        open,
        onClick,
        disabledScroll,
        centered=true,
    } = Props;
 
    const { getPrefixCls } =useContext(ConfigContext);

    const prefixCls=getPrefixCls("backdrop",customizePrefixCls);

    useEffect(()=>{
        if(disabledScroll && open){
            document.body.style="overflow:hidden";
        }
        return ()=>{
            if(open){
                document.body.style="overflow:auto";
            }
        }
      
    },[disabledScroll,open]);
 
    return (
        <Fade in={open}>
            <div className={
                classNames(prefixCls,className,{
                    [`${prefixCls}-centered`]:centered
                })
            }  style={style} ref={ref} onClick={onClick} >
                {children}
            </div>
        </Fade>
    )
}); 
export default BackDrop;
```
 

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    代码非常简单，相信直接看也是可以看懂的。
</blockquote> 

## 2、Backdrop组件的目录结构

```js
|-BackDrop.js
|-index.js
|-index.scss
```

# 四、Backdrop组件设计核心要素

## 1.当禁止滚动时

```js
useEffect(()=>{
        if(disabledScroll && open){
            document.body.style="overflow:hidden";
        }

        return ()=>{
            if(open){
                document.body.style="overflow:auto";
            }
        }
},[disabledScroll,visible]
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    当禁止滚动时要将body的overflow设置为hidden
</blockquote>


## 2.借助Portal组件实现挂载到任意节点

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    默认挂载到Body下，可以指定target
</blockquote>

```js
   <Portal target={target}>
         ...
    </Portal>

```
