![哈哈](./assets/popconfirm/jinganglang.jpg)

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    <div>
        <div><i>Why is the moon so lonely!</i></div>
        <div style="text-align:right;"><b>——Marvel·Wolverine</b></div>
    <div> 
    
</blockquote>
 
# 一、Popconfirm组件介绍

## 1.组件概述

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1;'>
    点击元素，弹出气泡式的确认框。
</blockquote>

## 2.为什么需要这个组件

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    目标元素的操作需要用户进一步的确认时，在目标元素附近弹出浮层提示，询问用户和 confirm 弹出的全屏居中模态对话框相比，交互形式更轻量。
</blockquote>

# 二、Popconfirm组件设计
  
## 原理解析

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    基于Popover组件进行扩展
</blockquote> 

# 三、Popconfirm组件实战

## 1、代码实战

```js
import React , { useContext,useState  } from 'react';
import Popover from '@packages/core/Popover';
import classNames from '@packages/utils/classNames'; 
import PropTypes from 'prop-types'; 
import {
    ConfigContext, 
} from '@packages/core/ConfigProvider'; 
import Button from '@packages/core/Button';
import { Warning } from '@packages/core/Icon';
import "./index.scss";

const Popconfirm=React.forwardRef(function(props,ref){

    const {
        children,
        prefixCls:customizePrefixCls,
        className,
        icon,
        title="确认进行此操作吗？",
        cancelText="取消",
        okText="确定",
        okType="primary",
        okButtonProps,
        cancelButtonProps,
        onConfirm=()=>{},
        onCancel=()=>{}
    }=props;

    const [okRef,setOkRef]=useState(null);
    const [cancelRef,setCancekRef]=useState(null);

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Popconfirm",customizePrefixCls); 

    const renderContent=()=>{
        return <div className={classNames(`${prefixCls}-Content`)}>
            <div className={classNames(`${prefixCls}-Message`)}>
                {icon||<Warning   className={classNames(`${prefixCls}-Message-Icon`)}/>}
                <div className={classNames(`${prefixCls}-Message-Title`)}>{title}</div>
            </div>
            <div className={classNames(`${prefixCls}-Button`)}>
                <Button color={okType} size="small" style={{marginRight:6}} {...okButtonProps} ref={setOkRef} onClick={onConfirm}>{okText}</Button>
                <Button color="danger" size="small" {...cancelButtonProps} ref={setCancekRef} onClick={onCancel}>{cancelText}</Button>
            </div>
        </div>
    } 
    
    return (
        <Popover 
            className={
                classNames(
                    prefixCls,
                    className
                )
            }
            content={renderContent()}
            trigger="click"
            externalNode={[okRef,cancelRef]}
        >
            {children}
        </Popover>
    )
}); 

export default Popconfirm;
```
 

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    代码非常简单，相信直接看也是可以看懂的。
</blockquote> 

## 2、Popconfirm组件的目录结构

```js
|-Popconfirm.js
|-index.js
|-index.scss
```

# 四、Popconfirm组件设计核心要素

## 将按钮也设置为其他外部

```js
const [okRef,setOkRef]=useState(null);
const [cancelRef,setCancekRef]=useState(null);

const renderContent=()=>{
        return <div className={classNames(`${prefixCls}-Content`)}>
            <div className={classNames(`${prefixCls}-Message`)}>
                {icon||<Warning   className={classNames(`${prefixCls}-Message-Icon`)}/>}
                <div className={classNames(`${prefixCls}-Message-Title`)}>{title}</div>
            </div>
            <div className={classNames(`${prefixCls}-Button`)}>
                <Button color={okType} size="small" style={{marginRight:6}} {...okButtonProps} ref={setOkRef} onClick={onConfirm}>{okText}</Button>
                <Button color="danger" size="small" {...cancelButtonProps} ref={setCancekRef} onClick={onCancel}>{cancelText}</Button>
            </div>
        </div>
} 

externalNode={[okRef,cancelRef]}
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    这里有个需要注意的地方，我们使用的是trigger为click模式下的popover，因为我们点击悬浮框内的按钮也需要隐藏，所以我们需要配合clickAwayListener组件的externalNode属性。
</blockquote>


 