![哈哈](./assets/popover/tanglangnv.jpg)


<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    <div>
        <div><i>Something is happening!</i></div>
        <div style="text-align:right;"><b>——Marvel·Mantis</b></div>
    <div> 
    
</blockquote>
 
# 一、Popover组件介绍

## 1.组件概述

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1;'>
    点击/鼠标移入元素，弹出气泡式的卡片浮层。
</blockquote>

## 2.为什么需要这个组件

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。
和 Tooltip 的区别是，用户可以对浮层上的元素进行操作，因此它可以承载更复杂的内容，比如链接或按钮等。
</blockquote>

# 二、Popover组件设计
  

## 原理解析

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    该组件非常简单，基于Tooltip组件，修改了部分样式，增添了部分API。
</blockquote> 

# 三、Popover组件实战

## 1、代码实战

```js
import React ,{useContext }from 'react';
import classNames from '@packages/utils/classNames'; 
import PropTypes from 'prop-types'; 
import {
    ConfigContext 
} from '@packages/core/ConfigProvider'; 
import Tooltip from '@packages/core/Tooltip';
import "./index.scss";

const Popover=React.forwardRef((props,ref)=>{
    const {
        prefixCls:customizePrefixCls,
        className,
        component: Component = 'div', 
        children, 
        title,
        content,
        arrow=true,
        ...restProps
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Popover",customizePrefixCls); 

    return (
        <Tooltip 
            {...restProps}
            className={
                prefixCls
            }
            title={
                <div className={classNames(`${prefixCls}-Content`)}>
                        {!!title && <div className={classNames(`${prefixCls}-Content-Title`)}>{title}</div>}
                        <div className={classNames(`${prefixCls}-Content-Main`)}>{content}</div>
                </div>
            }
            arrow={arrow}
            shadow={10}
            color={"#fff"}
        >
            {
                React.cloneElement(children)
            }
        </Tooltip>
    )
}); 

export default Popover;
```
 

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    代码非常简单，相信直接看也是可以看懂的。
</blockquote> 

## 2、Popover组件的目录结构

```js
|-Popover.js
|-index.js
|-index.scss
```

# 四、Popover组件设计核心要素

## 1.设置shadow、arrow、color

```js
arrow={arrow}
shadow={10}
color={"#fff"}
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    1.设置shadow阴影配合color白色达到对应阴影效果。<br />
    2.arrow设置为true，与tooltip不同。popover默认是有箭头的。
</blockquote>


 