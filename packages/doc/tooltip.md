![哈哈](./assets/tooltip/deadman.jpg)


<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1;'>
    <div>
        <div><i>Aw Motherfucker. You are hard to look at.</i></div>
        <div style="text-align:right;"><b>——Marvel·Deadpool</b></div>
    <div> 
    
</blockquote>

# 一、Tooltip组件介绍

## 1.组件概述
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1;'>
    简单的文字提示气泡框。 
</blockquote>

## 2.为什么需要这个组件
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    <div>鼠标移入则显示提示，移出消失，气泡浮层不承载复杂文本和操作。可用来代替系统默认的 title 提示，提供一个按钮/文字/操作的文案解释。</div>
</blockquote>

# 二、Tooltip组件设计

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
主要是借助我们之前设计的Popper组件来实现我们的定位功能，再配合相关样式就可以了。
</blockquote>

# 三、Tooltip组件实战

```js
import React, { useCallback, useRef, useContext, useEffect, useState } from 'react';
import classNames from '@packages/utils/classNames';
import {
    ConfigContext,
} from '@packages/core/ConfigProvider';
import PropTypes from 'prop-types';
import Popper from '@packages/core/Popper';
import useForkRef from '@packages/hooks/useForkRef';
import useControlled from '@packages/hooks/useControlled';
import useId from '@packages/hooks/useId';
import useWillUnmount from '@packages/hooks/useWillUnmount';
import capitalize from '@packages/utils/capitalize'; 
import Paper from '@packages/core/Paper';
import { Grow } from '@packages/core/Transition';
import "./index.scss";

function flipPlacement(placement){
    let subplacement=placement.substring(0,6);
    let PLACEMENT=['top','bottom','right','left'];
    let index=PLACEMENT.findIndex(item=>subplacement.indexOf(item)>-1);
    if(index>-1){
        return PLACEMENT[index]
    }
    return "top";
}
 
const defaultColor="rgba(48, 48, 48, 0.9)";

const Tooltip = React.forwardRef(function (props, ref) {

    const {
        prefixCls: customizePrefixCls, 
        children,
        title,
        arrow,
        placement = "top", 
        className,
        transition = true,
        visible: visibleProp,
        defaultVisible,
        trigger = "hover",
        enterDelay = 0,
        leaveDelay=0,
        TransitionComponent=Grow,
        id: idProp,
        destroyTooltipOnHide=false,
        onVisibleChange,
        getPopupContainer,
        color
    } = props;

    const prefixCls = useContext(ConfigContext)?.getPrefixCls("Tooltip", customizePrefixCls);
   
    const id = useId(idProp);

    const [arrowRef, setArrowRef] = React.useState(null);

    const enterTimer = React.useRef();
    const leaveTimer = React.useRef();

    useWillUnmount(() => {
        clearTimeout(enterTimer.current);
        clearTimeout(leaveTimer.current);
    });

    const [visible, setVisible] = useControlled({
        controlled: visibleProp,
        default: defaultVisible
    });

    const [childNode, setChildNode] = useState();

    const handleRef = useForkRef(children.ref, setChildNode, ref);

    const childrenProps = {
        ref: handleRef,
        id: id,
        className:classNames(className)
    }

    const handleOpen = (event) => {
        setVisible(true);
    }

    const handleClose=(event)=>{
        setVisible(false); 
    }

    const handleEnter = (forward = true) => (event) => {
        const childrenProps = children.props;

        if (event.type === 'mouseover' && childrenProps.onMouseOver && forward) {
            childrenProps.onMouseOver(event);
        }

        if (event.type === 'focus' && childrenProps.onFocus && forward) {
            childrenProps.onFocus(event);
        }

        clearTimeout(enterTimer.current);

        if (enterDelay) {
            enterTimer.current = setTimeout(
                () => {
                    handleOpen(event);
                },
                enterDelay
            )
        } else {
            handleOpen(event);
        }

    }

    const handleLeave = (forward = true) => (event) => {
        const childrenProps = children.props;

        if (
            event.type === 'mouseleave' &&
            childrenProps.onMouseLeave &&
            event.currentTarget === childNode
        ) {
            childrenProps.onMouseLeave(event);
        }

        if (
            event.type === 'blur' &&
            childrenProps.onBlur &&
            event.currentTarget === childNode
        ) {
            childrenProps.onBlur(event);
        }
         
        clearTimeout(leaveTimer.current);

        leaveTimer.current=setTimeout(()=>{
            handleClose(event);
        },leaveDelay);
    }

    if (trigger === "hover") {
        childrenProps.onMouseOver = handleEnter();
        childrenProps.onMouseLeave = handleLeave(); 
    } 

    if(trigger === "focus"){
        childrenProps.onFocus=handleEnter();
        childrenProps.onBlur= handleLeave();
    }

    const handleClick=(event)=>{ 
        if(visible){
            handleLeave()(event);
        }else{
            handleEnter()(event);
        }
    }

    if(trigger === "click"){
        childrenProps.onClick=handleClick;
    }

    const mergedPopperProps=React.useMemo(() => {
        return { 
              modifiers: [
                {
                  name: 'arrow',
                  options: {
                    element: arrowRef,
                  },
                },
              ],
          } 
    }, [arrowRef]);

    useEffect(()=>{
        onVisibleChange(visible);
    },[visible])
 

    return (
        <React.Fragment>
            {React.cloneElement(children, childrenProps)}
            <Popper
                transition={transition}
                placement={placement}
                visible={childNode ? visible : false}
                id={id}
                mountNode={childNode} 
                keepMounted={!destroyTooltipOnHide}
                target={getPopupContainer}
                {...mergedPopperProps}
            >
                {({placement:placementInner,TransitionProps})=>(
                    <TransitionComponent
                        {...TransitionProps}
                    >
                        <Paper
                            className={
                                classNames(
                                    prefixCls,
                                    {
                                        [`${prefixCls}-Placement-${capitalize(flipPlacement(placementInner),false)}`]:placementInner
                                    }
                                )
                            }   
                            style={{backgroundColor:color}} 
                        >
                            {title}
                            {arrow?<span className={classNames(
                                `${prefixCls}-Arrow`
                            )}  ref={setArrowRef} style={{color:color||defaultColor}} />:null}
                        </Paper>
                    </TransitionComponent>
                )}
            </Popper>
        </React.Fragment>
    )
}) 

export default Tooltip;
```
 
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
   1.根据trigger来判断修改visible的条件，根据visible来判断tooltip框的显示隐藏。<br /> 
</blockquote>


# 四、Tooltip组件设计核心要素

## 1.destroyTooltipOnHide的实现

```js
    keepMounted={!destroyTooltipOnHide}

    if (!visible && exited && !keepMounted)  { 
        return null;
    }  
```
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    1.destroyTooltipOnHide关闭后是否销毁 Tooltip。<br />
    2.利用Popper组件的keepMounted属性，如果keepMounted为true时，表示一直挂载，如果为false时，表示卸载，返回null。
</blockquote>

## 2.利用trigger来判断该如何修改visible的值

```js
  const handleOpen = (event) => {
        setVisible(true);
    }

    const handleClose=(event)=>{
        setVisible(false); 
    }

    const handleEnter = (forward = true) => (event) => {
        const childrenProps = children.props;

        if (event.type === 'mouseover' && childrenProps.onMouseOver && forward) {
            childrenProps.onMouseOver(event);
        }

        if (event.type === 'focus' && childrenProps.onFocus && forward) {
            childrenProps.onFocus(event);
        }

        clearTimeout(enterTimer.current);

        if (enterDelay) {
            enterTimer.current = setTimeout(
                () => {
                    handleOpen(event);
                },
                enterDelay
            )
        } else {
            handleOpen(event);
        }

    }

    const handleLeave = (forward = true) => (event) => {
        const childrenProps = children.props;

        if (
            event.type === 'mouseleave' &&
            childrenProps.onMouseLeave &&
            event.currentTarget === childNode
        ) {
            childrenProps.onMouseLeave(event);
        }

        if (
            event.type === 'blur' &&
            childrenProps.onBlur &&
            event.currentTarget === childNode
        ) {
            childrenProps.onBlur(event);
        }
         
        clearTimeout(leaveTimer.current);

        leaveTimer.current=setTimeout(()=>{
            handleClose(event);
        },leaveDelay);
    }

    if (trigger === "hover") {
        childrenProps.onMouseOver = handleEnter();
        childrenProps.onMouseLeave = handleLeave(); 
    } 

    if(trigger === "focus"){
        childrenProps.onFocus=handleEnter();
        childrenProps.onBlur= handleLeave();
    }

    const handleClick=(event)=>{ 
        if(visible){
            handleLeave()(event);
        }else{
            handleEnter()(event);
        }
    }

    if(trigger === "click"){
        childrenProps.onClick=handleClick;
    }

```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(247, 31, 85,1); background: rgb(239, 235, 233);line-height:1.5;'>
    及时清除延时导致的定时器。
</blockquote>

## 3.onVisibleChange回调

```css
useEffect(()=>{
        onVisibleChange(visible);
},[visible])
```
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(247, 31, 85,1); background: rgb(239, 235, 233);line-height:1.5;'>
     使用useEffect可以很方便的实现这种功能。当visible变化时触发
</blockquote>

## 4.利用popper.js对箭头实现居中

```js
const mergedPopperProps=React.useMemo(() => {
        return { 
              modifiers: [
                {
                  name: 'arrow',
                  options: {
                    element: arrowRef,
                  },
                },
              ],
          } 
}, [arrowRef]);

//Popper.js
const popper=createPopper(getTarget(mountNode),popperRef.current,{
            placement:transformPlacement(placement), 
            modifiers: modifiers
});

```
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(247, 31, 85,1); background: rgb(239, 235, 233);line-height:1.5;'>
    使用popper.js实现箭头居中无非是最好的效果。<br /> 
</blockquote>

## 5.使用flip函数来预测四个方向的值并给予对应样式

```js
function flipPlacement(placement){
    let subplacement=placement.substring(0,6);
    let PLACEMENT=['top','bottom','right','left'];
    let index=PLACEMENT.findIndex(item=>subplacement.indexOf(item)>-1);
    if(index>-1){
        return PLACEMENT[index]
    }
    return "top";
}

[`${prefixCls}-Placement-${capitalize(flipPlacement(placementInner),false)}`]:placementInner
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(247, 31, 85,1); background: rgb(239, 235, 233);line-height:1.5;'>
    1.由于一个方位的三个位置样式相同，即只需要设置一次即可。比如：rightTop、right、rightBottom。<br />
    2.使用flipPlacement函数得出唯一的一个方位。
</blockquote>

## 6.巧用currentColor来实现color的功能

```js

                        <Paper
                            className={
                                classNames(
                                    prefixCls,
                                    {
                                        [`${prefixCls}-Placement-${capitalize(flipPlacement(placementInner),false)}`]:placementInner
                                    }
                                )
                            }   
                            style={{backgroundColor:color}} 
                        >
                            {title}
                            {arrow?<span className={classNames(
                                `${prefixCls}-Arrow`
                            )}  ref={setArrowRef} style={{color:color||defaultColor}} />:null}
                        </Paper>
                        
```
```css
 .#{$prefixCls}-Arrow{
            left: 0;
            margin-left: -18px;
            border-right: 8px solid currentColor;
            border-left: 10px solid transparent;
            border-top: 6px solid transparent;
            border-bottom: 6px solid transparent;
        }
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(247, 31, 85,1); background: rgb(239, 235, 233);line-height:1.5;'>
    1.给箭头函数给与对应的color。<br />
    2.currentColor是对应的color的颜色，这样就避免写固定值时造成的不方便。
</blockquote>

## 7.实现鼠标移到提示信息时信息不消失

```js
childrenProps.onMouseLeave = (event)=>{
           
            event.persist();
            keepMountedTimer.current=setTimeout(()=>{ 
                handleLeave()(event);
            },300) 
}; 
const handleLeave = (forward = true) => (event) => { 

        if(!keepMountedTimer.current){
            return ;
        }
        ....
}
const handleTooltipMouseOver=()=>{
        if(keepMountedTimer.current){
            clearTimeout(keepMountedTimer.current)
        }
}
<Paper
    ...
    onMouseOver={handleTooltipMouseOver}
    onMouseLeave={handleLeave()}
>
    {title}
    {arrow?<span className={classNames(
                                `${prefixCls}-Arrow`
    )}  ref={setArrowRef} style={{color:color||defaultColor}} />:null}
</Paper>

```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(247, 31, 85,1); background: rgb(239, 235, 233);line-height:1.5;'>
    1.如果你想异步比如定时器中访问事件属性，你需在事件上调用 event.persist()，此方法会从池中移除合成事件，允许用户代码保留对事件的引用。<br />
    2.使用定时器来实现效果。当鼠标离开当前元素时，触发mouseleave事件，给予定时器，在鼠标进入提示框时清除定时器，就可以在leave事件里面判断是否有定时器给与相应逻辑。
</blockquote>
 
## 8.在trigger为focus时，触发焦点

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(247, 31, 85,1); background: rgb(239, 235, 233);line-height:1.5;'>
    如果默认卡片框visible或者defaultVisible为true时，应该默认是处于触发焦点的状态，便于失去焦点事件的触发
</blockquote>

```js
useEffect(()=>{
        if(visible && trigger==="focus"){ 
            childNode && childNode.focus();
        }
    },[visible,childNode,trigger])
```

## 9.根据触发的不同状态，书写不同的逻辑

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(247, 31, 85,1); background: rgb(239, 235, 233);line-height:1.5;'>
   1.当trigger为hover时，onMouseEnter改为true，onMouseLeave改为false。采用定时器保持在鼠标进入提示框时也可以显示，不会消失。（onmouseenter是鼠标刚进入时，只会触发一次，onmouseover是鼠标在元素上移动就会触发）
</blockquote>

```js
 if (trigger === "hover") {
        childrenProps.onMouseEnter = handleEnter();
        childrenProps.onMouseLeave = (event)=>{
            //如果你想异步访问事件属性，你需在事件上调用 event.persist()，此方法会从池中移除合成事件，允许用户代码保留对事件的引用。
            event.persist();
            keepMountedTimer.current=setTimeout(()=>{ 
                handleLeave()(event);
            },100) 
        }; 
} 
const handleTooltipMouseLeave=(event)=>{
        if(trigger==="hover"){
            handleLeave()(event)
        }
}
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(247, 31, 85,1); background: rgb(239, 235, 233);line-height:1.5;'>
   2.当trigger为focus时触发焦点事件显示，触发焦点离开事件消失。
</blockquote>

```js

    if(trigger === "focus"){
        childrenProps.onFocus=handleEnter();
        childrenProps.onBlur=handleLeave(); 
    }
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(247, 31, 85,1); background: rgb(239, 235, 233);line-height:1.5;'>
    3.当trigger为click时通过click事件来判断显示隐藏，有一点比较重要的是如何在提示框其他地方点击的时候也隐藏提示框，这里用到了我们的ClickAwayListener组件，可以很好的解决这个问题。
</blockquote>

```js
if(trigger === "click"){
        childrenProps.onClick=handleClick;
}
const handleClick=(event)=>{   
        if(visible){
            handleLeave()(event);
        }else{
            handleEnter()(event);
        }
}
const handleClickAway=(event)=>{ 
        if(visible && trigger==="click"){
            handleLeave()(event);
        }
}
<ClickAwayListener onClickAway={handleClickAway}>  
        <TransitionComponent
                        {...TransitionProps}
        >
                  ...
        </TransitionComponent>
</ClickAwayListener>
```