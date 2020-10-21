![哈哈](./assets/card/fengbao.jpg)


<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    <div>
        <div><i>I dont't know.</i></div>
        <div style="text-align:right;"><b>——Marvel·Storm</b></div>
    <div> 
    
</blockquote>
 
# 一、Card组件介绍

## 1.组件概述

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    卡片组件能够承载与单个主题相关的内容和操作。
</blockquote>

## 2.为什么需要这个组件

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    1.卡片组件能够承载与单个主题相关的内容和操作。<br />
    2.通过卡片组件，扫描相关的和可操作的信息更为便捷了。 <br />
    3.像文本和图像这样的元素，则应按照清晰的布局来排列，以此呈现结构层次。
</blockquote>

# 二、Card组件设计
  

## 原理解析

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    一个简单的样式进行修改。<br />
    1.在Card从上到下可以依次分为Header头部组件、Meta图片承载组件、Content主题内容组件、Bottom尾部组件一般存放一些操作按钮。<br />
    2.只需要给予一些样式即可。
</blockquote> 

# 三、Card组件实战

## 1、Card实战

```js
//Badge.js
iimport React ,{useContext} from 'react';
import classNames from '@packages/utils/classNames';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import Paper from '@packages/core/Paper';
import Header from './Header';
import Content from './Content';
import Meta from './Meta';
import childrenToArray from '@packages/utils/childrenToArray';
import "./index.scss";
import Bottom from './Bottom';
import Action from './Action';

 
function isHaveCardElement(children){
    return childrenToArray(children).find((child)=>(child.type===Header||child.type===Content||child.type===Bottom||child.type===Meta||child.type===Action))
}

const Card=React.forwardRef((props,ref)=>{
    const {
        prefixCls:customizePrefixCls,
        className,
        children,
        style
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Card",customizePrefixCls); 

    const hasCardElement=isHaveCardElement(children);

    return <Paper
        className={
            classNames(
                prefixCls,
                className,
                {
                    [`${prefixCls}-notHasCardElement`]:!hasCardElement
                }
            )
        }
        style={style}
        ref={ref}
    >
        {children}
    </Paper>

});

export default Card;

``` 

## 2、Card组件的目录结构

```js
|-Card.js
|-Action.js
|-Bottom.js
|-Content.js
|-Header.js
|-index.js
|-Meta.js
|-index.scss
```

# 四、Card组件设计核心要素

## 1.childrenToArray 函数的使用

```js
import React from 'react';

export default function childrenToArray(children){

    let ret=[];

    if(!children){
        return [];
    }

    React.Children.forEach(children,(c)=>{
        ret.push(c);
    });

    return ret;

}
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
   通过此函数将React组件转化为数组方便使用数组的一些方法方便调用。
</blockquote>


## 2.如何判断是否含有自定义的组件

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,17,1); background: rgb(239, 235, 233);line-height:1.5;'>
    自定义组件Title加与不加尖括号的区别：<br />
    1.加了尖括号只是多包了一层createElement而已<br />
    2.加了尖括号后，编译器会对props进行处理<br />
    3.如果不加尖括号，react是无法渲染的
        
</blockquote>
 
```js
import Header from './Header';
import Content from './Content';
import Meta from './Meta';
import childrenToArray from '@packages/utils/childrenToArray';
import "./index.scss";
import Bottom from './Bottom';
import Action from './Action';

function isHaveCardElement(children){
    return childrenToArray(children).find((child)=>(child.type===Header||child.type===Content||child.type===Bottom||child.type===Meta||child.type===Action))
}

 const hasCardElement=isHaveCardElement(children);

    return <Paper
        className={
            classNames(
                prefixCls,
                className,
                {
                    [`${prefixCls}-notHasCardElement`]:!hasCardElement
                    .......
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,17,1); background: rgb(239, 235, 233);line-height:1.5;'>
    因为我们需要在children是否存在特定组件中加载不同的样式。
    通过上文我们知道加了尖括号只是包了一层createElement，所以child.type就是我们自定义的组件，我们就可以判断出。
        
</blockquote>

## 3.offset的实现

```js
style={{backgroundColor:color,...style,right:offset?-offset[0]:0,marginTop:offset?.[1]}}
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    红点定位在右上角的基本逻辑是：<i>position:absolute;top:0;right:0;transform:translate(50%,-50%)。</i>offset的第一个参数和第二个参数对应的是向左和向上偏移，所以采用负的right和marginTop
</blockquote>

## 4.改造Zoom过渡组件

```js
<Zoom visible={!isHidden()} extraStyle={children?"translate(50%,-50%)":""}> 
                {renderBadgeNumber()}
</Zoom>
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    我们使用的是我们的Zoom组件，由于Zoom组件的过渡与文中元素的transform属性起了冲突，所以我们需要将额外的属性传递合并进去。这里我们需要将<b>transform-origin:100% 0%;</b>加上，否侧会产生意想不到的效果。
</blockquote>

## 5.badge标点波纹效果

```css

  if(!children && color){
        return <div className={classNames(prefixCls)}>
            <span className={classNames(`${prefixCls}-Color`)} style={{...style,color:color,backgroundColor:color}}></span>
            <span className={classNames(`${prefixCls}-Text`)}>{text}</span>
        </div>
    }

    @keyframes ripple {
        0% {
            transform: scale(.8);
            opacity: 1;
        }
        100% {
            transform: scale(2.4);
            opacity: 0;
        }
    }
 

    &-Color{
        position: relative;
        top: -1px;
        display: inline-block;
        width: 8px;
        height: 8px;
        vertical-align: middle;
        border-radius: 50%;

        &:after{
            top: 0;
            left: 0;
            width: 100%;
            border: 1px solid currentColor;
            height: 100%;
            content: "";
            position: absolute;
            animation: ripple 1.2s infinite ease-in-out;
            border-radius: 50%;
        }
    }
```
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    使用<a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-elements">伪元素</a>来实现波纹效果。
</blockquote>

## 6.ribbon右下角倒三角

```css
.#{$prefixClsRibbon}-Wrapper{
    position: relative; 
    display: inline-block;

    .#{$prefixClsRibbon}{
        position: absolute;
        top: 8px;
        height: 22px;
        padding: 0 8px;
        color: #fff;
        line-height: 22px;
        white-space: nowrap;
        background-color: $primary-color;
        border-radius: 2px;

        &-Corner{
            position: absolute;
            top: 100%;
            width: 8px;
            height: 8px;
            color: $primary-color;
            border: 4px solid;
            transform: scaleY(.75);
            transform-origin: top;

            &:after{
                
                position: absolute;
                top: -4px;
                left: -4px;
                width: inherit;
                height: inherit;
                color: rgba(0,0,0,.25);
                border: inherit;
                content: "";
            }
            
        }

    }
    .#{$prefixClsRibbon}-Placement-End{
        right: -8px;
        border-bottom-right-radius: 0;

        .#{$prefixClsRibbon}-Corner{
            right:0;
            border-color: currentColor transparent transparent currentColor;
            
        }

    }
    
}
```
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    1.使用border-color: currentColor transparent transparent currentColor;结合 border: 4px solid;来实现三角效果<br />
    2.border: inherit;width:inherit;height:inherit;巧妙运用inherit减少代码<br />
    3.color: rgba(0,0,0,.25);通过伪元素给倒三角添加一个蒙层加深效果，使得更有层次感。
</blockquote>

## 7.usePrevState hooks函数来获取上一次的state值。

```js

import React,{useRef, useEffect} from 'react';

/**
 * 获取上一轮的state值
 * 原理：先执行return ref.current再进行赋值操作
 * @param {*} value 
 */
export default function usePrevState(value){

    const ref=useRef(value);

    useEffect(()=>{
        ref.current=value

        return ()=>{
            ref.current=null;
        }
    },[value]) 

    return ref.current;
}
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    在文字滚动时需要判断值的变化，所以需要借助此函数来获取上一次state的值。
</blockquote>
