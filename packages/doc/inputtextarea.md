![哈哈](./assets/inputtextarea/green.jpeg)


<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1;'>
    <div>
        <div><i>Don't make me angry. You wouldn't like me when I'm angry..</i></div>
        <div style="text-align:right;"><b>——Marvel·Hulk</b></div>
    <div> 
    
</blockquote>
 
# 一、InputTextarea组件介绍

## 1.组件概述

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1;'>
    文本域，用于多行输入。
</blockquote>

## 2.为什么需要这个组件

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    在一个表单中，我们需要一个可以输入多行文本的控件，但是输入框只能输入一行很显然不能满足我们的需求，所以我们需要这样的一个控件。
</blockquote>

# 二、InputTextarea组件设计
 

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    本文是基于InputText框所写的，其余属性大致一致，只是额外增加了autoSize的功能和onResize回调的功能。
</blockquote>

# 三、ResizeObserver组件实现

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    在InputTextarea组件中我们会有这样的一个功能，如果autoSize有值的话，输入框的高会自动随着内容的变化而撑开，当然这个功能是需要我们自行实现的，原生的textArea是不具有这样的功能的，首先我们需要实现ResizeObserver组件，实现监听元素DOM变化的功能。
</blockquote>

```js
import React,{forwardRef,useRef, useEffect} from 'react'; 
import useForkRef from '@packages/hooks/useForkRef';
import ResizeObserver from 'resize-observer-polyfill';  

const ResizeObserverComponent=forwardRef((props,ref)=>{

    const {
        children:childrenProps,
        onResize
    }=props;

    const childNode=useRef(null); 

    const resizeObserver=useRef(null);

    const onComponentUpdated=()=>{
        const element=childNode.current; 
 
        if(!resizeObserver.current && element){
            resizeObserver.current=new ResizeObserver(handleResize);
            resizeObserver.current.observe(element);
        }
    }

    const destroyObserver=()=>{
        if(resizeObserver.current){ 
            resizeObserver.current.disconnect();
            resizeObserver.current=null;
        }
    }

    const handleResize=()=>{ 
        onResize?.(childNode.current);
    }

    useEffect(()=>{
        onComponentUpdated()
        return ()=>destroyObserver()
    },[]); 

    const handleRef=useForkRef(childNode,childrenProps.ref,ref);

    return  React.cloneElement(childrenProps,{
        ref:handleRef
    });
}); 

export default ResizeObserverComponent;
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    其实上面的代码也很简单，就是利用了一个新的API:<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver">ResizeObserver</a><br />1.ResizeObserver 接口可以监听到 Element 的内容区域或 SVGElement的边界框改变。内容区域则需要减去内边距padding.ResizeObserver避免了在自身回调中调整大小，从而触发的无限回调和循环依赖。它仅通过在后续帧中处理DOM中更深层次的元素来实现这一点。<br />2.ResizeObserver.observe()实现观察指定的Element和SVGElement,这样每次DOM变化都可以回调函数以便后续操作。<br />3.最后在组件销毁时ResizeObserver.disconnect()取消对Element的监听。
    <br />4.使用resize-observer-polyfill来避免浏览器兼容性问题。
</blockquote>

# 四、autoSize的实现

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    正如我们所知道的 textarea 是一个行内块元素 display: inline-block 并且它的默认宽高由 cols & rows 决定, 也就是说 textarea 的 height 并不会自适应于内容长度.
</blockquote>

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(7,121,228,1); background: rgb(239, 235, 233);line-height:1。5;'>
    参考资料：<a href="http://www.zhangxinxu.com/wordpress/2016/02/html-textarea-rows-height/">textarea 的宽高是如何决定的?</a>
</blockquote>


## 1.方案一：两次调整 textarea.style.height

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
textarea.style.height = 'auto';// 让 textarea 的高度恢复默认<br />
textarea.style.height = textarea.scrollHeight + 'px';// textarea.scrollHeight 表示 textarea 内容的实际高度
</blockquote>

## 2.方案二：利用一个 ghostTextarea 获得输入框内容高度, 再将这个高度设置给真实的 textarea

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
同时渲染两个 textarea, 一个真实 textarea 一个隐藏 textarea。
</blockquote>

## 3.方案三：使用 div.contenteditable 代替 textarea

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
同时渲染两个 textarea, 一个真实 textarea 一个隐藏 textarea。
</blockquote>

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(7,121,228,1); background: rgb(239, 235, 233);line-height:1。5;'>
由于本组件是主要讲解第二种实现方案，下面会着重讲解第二种解决方案。具体的可以看<a href="https://blog.csdn.net/abcde158308/article/details/93853896?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-1.channel_param&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-1.channel_param">参考资料</a>
</blockquote>



# 五、InputTextarea组件实战

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    这里我们只设计 componentSize、prefixCls这2个后续会使用到的API。
</blockquote> 

## 1、calculateNodeHeight


<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    传入节点，minRows和maxRows可以得到textarea需要的高、最大高度、最小高度。
</blockquote> 

```js
const HIDDEN_TEXTAREA_STYLE = `
  min-height:0 !important;
  max-height:none !important;
  height:0 !important;
  visibility:hidden !important; 
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important
`;

const SIZING_STYLE = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'font-variant',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing', 
];

 
 
let hiddenTextarea;

export function calculateNodeStyling(node) { 
  const style = window.getComputedStyle(node); 

  const boxSizing =
    style.getPropertyValue('box-sizing') ||
    style.getPropertyValue('-moz-box-sizing') ||
    style.getPropertyValue('-webkit-box-sizing');

  const paddingSize =
    parseFloat(style.getPropertyValue('padding-bottom')) +
    parseFloat(style.getPropertyValue('padding-top'));

  const borderSize =
    parseFloat(style.getPropertyValue('border-bottom-width')) +
    parseFloat(style.getPropertyValue('border-top-width'));

  const sizingStyle = SIZING_STYLE.map(
    (name) => `${name}:${style.getPropertyValue(name)}`,
  ).join(';');

  const nodeInfo = {
    sizingStyle,
    paddingSize,
    borderSize,
    boxSizing,
  }; 
  return nodeInfo;
}

export default function calculateNodeHeight(
  uiTextNode, 
  minRows  = null,
  maxRows = null,
) {
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    hiddenTextarea.setAttribute('tab-index', '-1');
    hiddenTextarea.setAttribute('aria-hidden', 'true');
    document.body.appendChild(hiddenTextarea);
  }
 
  const {
    paddingSize,
    borderSize,
    boxSizing,
    sizingStyle,
  } = calculateNodeStyling(uiTextNode); 

  hiddenTextarea.setAttribute(
    'style',
    `${sizingStyle};${HIDDEN_TEXTAREA_STYLE}`,
  );
  hiddenTextarea.value = uiTextNode.value || uiTextNode.placeholder || ''; 

  let minHeight = Number.MIN_SAFE_INTEGER;
  let maxHeight = Number.MAX_SAFE_INTEGER;
  let height = hiddenTextarea.scrollHeight; 

  let overflowY;

  if (boxSizing === 'border-box') {
   
    height += borderSize;
  } else if (boxSizing === 'content-box') {
 
    height -= paddingSize;
  }

  const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize; 

  if (minRows !== null || maxRows !== null) {
   
    hiddenTextarea.value = ' ';
    const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
    if (minRows !== null) {
      minHeight = singleRowHeight * minRows;
      if (boxSizing === 'border-box') {
        minHeight = minHeight + paddingSize + borderSize;
      }
      height = Math.max(minHeight, height);
    }
    if (maxRows !== null) {
      maxHeight = singleRowHeight * maxRows;
      if (boxSizing === 'border-box') {
        maxHeight = maxHeight + paddingSize + borderSize;
      }
      overflowY = height > maxHeight ? '' : 'hidden';
      height = Math.min(maxHeight, height);
    }
  }
  return { height, minHeight, maxHeight, overflowY };
}

```
 
 <blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    创造一个一模一样的textarea的节点并隐藏，根据盒模型和scrollHeight就可以得出height。
</blockquote> 

## 2、InputTextarea实战

```js
import React,{useContext, useEffect, useState,useRef } from 'react';
import classNames from '@packages/utils/classNames';   
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
    
        if(!autoSize||!textAreaRef.current){
            return ;
        } 
        const {minRows,maxRows}=autoSize;
        const textareaStyles = calculateNodeHeight(textAreaRef.current, minRows, maxRows);

         setTextareaStyles(textareaStyles);
    }

    const handleChange=(value,e)=>{  
        resizeTextarea();
        onChange?.(value,e); 
    }

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
 
export default InputTextarea;
```


 <blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    当change事件触发时计算一下height并且将height赋值给textarea，此时height变化被ResizeObserver监听到了，故而触发onResize事件。
</blockquote> 


# 四、InputTextarea组件设计核心要素

## 1.onResize触发的条件是height的变化
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    当change触发时，每一次触发都会重新计算height,当滚动高度变化时，height也会随之变化，然后赋值给textarea组件，然后被ResizeObserver监听到。
</blockquote> 

## 2.ref直接获取的是textarea原生元素的ref节点，InputText组件也要随之改变
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    我们计算属性，赋值属性等都应该是textarea的值。
</blockquote> 

```js
                <Component 
                    placeholder={placeholder}
                    value={value?value:""}
                    className={
                        classNames(
                            `${prefixCls}-Input`
                        )
                    }
                    ref={ref} 
                    id={id}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    maxLength={maxLength}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    type={type}
                    style={textareaStyles}
                />
```

## 3.新textarea的scrollHeight与原元素并没有直接关系
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    因为我们这个组件是基于InputText这个基础组件来编写的，默认的话input框高32px，但是我在编写的时候发现获取到的scrollHeight在各个浏览器上都获取的不一致，由于我的脑海里面一直默认的高度是以32px作为标准衡量的，其实他的高度和我们的InputText组件的input框的高度没有任何关系。
</blockquote> 
