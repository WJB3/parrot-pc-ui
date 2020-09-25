![哈哈](./assets/popper/star.jpeg)


<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1;'>
    <div>
        <div><i>You're going to dump me on that stinking fox.</i></div>
        <div style="text-align:right;"><b>——Marvel·Nebula</b></div>
    <div> 
    
</blockquote>

# 一、Popper组件介绍

## 1.组件概述
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1;'>
    使用弹出提示组件，您可在另一个元素之上显示一些内容。 
</blockquote>

## 2.为什么需要这个组件
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    <div>Tooltip、Popconfirm、Popover组件的基础组件,主要是封装了实现定位效果的功能。</div>
</blockquote>

# 二、Popper组件设计

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
   主要是借助<a href="https://popper.js.org/docs/v2/constructors/">Popop.js</a>这个工具提示和弹出框
定位引擎来实现定位功能，这个库较好的兼容了低版本浏览器和良好的效果，要是我们来实现定位功能，还是比较费时且费力的，有现成的库为什么不用呢？
</blockquote>

# 三、Popper组件实战

```js
import React,{useCallback,useRef,useContext, useEffect } from 'react';
import classNames from '@packages/utils/classNames'; 
import {
    ConfigContext,
} from '@packages/core/ConfigProvider'; 
import { createPopper } from '@popperjs/core'
import useForkRef from '@packages/hooks/useForkRef';
import Portal from '@packages/core/Portal';
import setRef from '@packages/utils/setRef';
import PropTypes from 'prop-types';
import "./index.scss"; 

function getTarget(target){
    if(target && target.current){
        return target.current;
    }
    return typeof anchorEl==="function"?anchorEl():anchorEl;
}

const Popper = React.forwardRef(function(props,ref){
 
    const {
        prefixCls:customizePrefixCls,  
        visible,
        children,
        target,
        disablePortal=false,
        placement="right",
        mountNode,//需要挂载的节点
        className,
        transition=true,
    } = props;

    const [exited, setExited] = React.useState(true);//定义动画是否退出
    
    const prefixCls = useContext(ConfigContext)?.getPrefixCls("Popper", customizePrefixCls); 

    const popperRef=useRef(null);//div为popper的节点

    const locationRef=useRef(null);//popjs节点用于存储popperjs

    const ownRef=useForkRef(popperRef,ref);

    const handleOpen=useCallback(()=>{
        if(!popperRef.current || !mountNode ||!visible){
            return ;
        }

        if(locationRef.current){
            locationRef.current.destroy();
        }

        const popper=createPopper(getTarget(mountNode),popperRef.current,{
            placement
        });

        locationRef.current=popper;
 
    },[mountNode, disablePortal, visible, placement]);

    const handleClose = () => {
        if (!locationRef.current) {
          return;
        }
    
        locationRef.current.destroy(); 
    };
 
    
    const handleRef=React.useCallback(
        (node)=>{
            setRef(ownRef,node);//将div id=popper节点赋值给tooltipRef
            handleOpen();
        },
        [ownRef,handleOpen]
    );

    
    const handleEnter=()=>{
        setExited(false);
    };

    const handleExited=()=>{
        setExited(true); 
        handleClose();
    }

    React.useEffect(() => {
        if (!visible && !transition) {
          // Otherwise handleExited will call this.
          handleClose();
        }
    }, [visible, transition]);

    const childProps = { placement }

    if (transition) {
        childProps.TransitionProps = {
            visible: visible,
            onEnter:handleEnter,
            onExited:handleExited
        };
    }

    useEffect(()=>()=>handleClose(),[]);

    if (!visible && (!transition || exited) ) {
        return null;
    }  
  
    return (
        <Portal target={target}  disablePortal={disablePortal}>
            <div
                ref={handleRef}
                id="popper"
                className={classNames(
                    prefixCls,
                    className
                )}
                style={{
                    willChange:'transform'
                }}
                 
            >
                {typeof children === 'function' ? children(childProps) : children}
            </div>
        </Portal>
    )
})
 
export default Popper;
```
 
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
   1.基于Protal组件进行封装拓展。<br />
   2.当visible变为true时，handleOpen触发，通过createPopper函数生成一个popper实例对象,并保存起来。<br />
   3.当visible变为false时，handleClose触发，调用popper实例对象的destroy销毁popper对象避免造成内存浪费。<br />
</blockquote>


# 四、Popper组件设计核心要素

## 1.target为目标挂载容器,mountNode是实际需要的实现定位效果的组件

```js
const popper=createPopper(getTarget(mountNode),popperRef.current,{
            placement
});
```
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(247, 31, 85,1); background: rgb(239, 235, 233);line-height:1.5;'>
    1.组件基于Protal组件,target参数直接传入到Protal组件中。<br />
    2.createPopper函数第一个参数是定位包围节点（依据什么元素进行定位），第二个参数是需要真实定位的元素，第三个参数是一些可选选项，这里我们只需要placement。
</blockquote>

## 2.return null需要满足的条件

```js
if (!visible && (!transition || exited) ) {
    return null;
}  
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(247, 31, 85,1); background: rgb(239, 235, 233);line-height:1.5;'>
    1.visible表示元素是否可见。<br />
    2.transition元素表示是否使用过渡效果，这个本是配合<a href="https://reactcommunity.org/react-transition-group/">React-Transition-Group</a>库一起使用的。
    3.exited表示是否不在过渡<br />
    4.如果visible为false，即不可见直接返回null。
</blockquote>

## 3.will-change的使用

```css
style={{
    willChange:'transform'
}}
```
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(247, 31, 85,1); background: rgb(239, 235, 233);line-height:1.5;'>
    <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/will-change">will-change</a> 为web开发者提供了一种告知浏览器该元素会有哪些变化的方法，这样浏览器可以在元素属性真正发生变化之前提前做好对应的优化准备工作。 这种优化可以将一部分复杂的计算工作提前准备好，使页面的反应更为快速灵敏。
</blockquote>

## 4.对于popper实例对象的清除

```js
const handleOpen=useCallback(()=>{
        if(!popperRef.current || !mountNode ||!visible){
            return ;
        }

        if(locationRef.current){
            locationRef.current.destroy();
        }

        const popper=createPopper(getTarget(mountNode),popperRef.current,{
            placement
        });

        locationRef.current=popper;
 
},[mountNode, disablePortal, visible, placement]);

const handleClose = () => {
        if (!locationRef.current) {
          return;
        }
    
        locationRef.current.destroy(); 
};

useEffect(()=>()=>handleClose(),[]);
```
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(247, 31, 85,1); background: rgb(239, 235, 233);line-height:1.5;'>
    1.每次节点出现，触发handleOpen函数,触发前检测是否存在popper实例对象，如果有的话清除。<br />
    2.每次节点消失时，触发handleClose函数，清除popper实例对象。<br />
    3.组件销毁时，触发handleClose函数，清除popper实例对象。
</blockquote>

## 5.使用过渡和不使用过渡

```js
//不使用过渡
React.useEffect(() => {
        if (!visible && !transition) {
          // Otherwise handleExited will call this.
          handleClose();
        }
}, [visible, transition]);
//使用过渡
if (transition) {
        childProps.TransitionProps = {
            visible: visible,
            onEnter:handleEnter,
            onExited:handleExited
        };
}
const handleExited=()=>{
        setExited(true); 
        handleClose();
}
 
{typeof children === 'function' ? children(childProps) : children}
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(247, 31, 85,1); background: rgb(239, 235, 233);line-height:1.5;'>
    1.当子元素是函数时，默认使用过渡效果，这样可以把过渡组件必须属性如visible属性传递过去。<br />
    2.当使用过渡效果时，通过handleExited函数触发handleClose函数。<br />
</blockquote>

## 6.exited变量的作用
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(247, 31, 85,1); background: rgb(239, 235, 233);line-height:1.5;'>
    可能有人对exited变量的实质性作用会产生怀疑，exited变量的作用是等过渡效果过渡完以后再设置为true，然后不至于在过渡效果结束之前销毁组件。
</blockquote>

