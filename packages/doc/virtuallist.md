![哈哈](./assets/virtuallist/mieba.png)


<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    <div>
        <div><i>I am a destiny.</i></div>
        <div style="text-align:right;"><b>——Marvel·Thanos</b></div>
    <div> 
    
</blockquote>
 
# 一、Virtual-List组件介绍

## 1.组件概述

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1;'>
    用来代表用户或事物，支持图片、图标或字符展示。
</blockquote>

## 2.为什么需要这个组件

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    无论是在表格中还是到对话框菜单中，都可以找到使用头像的身影。
</blockquote>

# 二、Avatar组件设计
  

## 原理解析

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    一个非常简单的样式修改。
</blockquote> 

# 三、Avatar组件实战

## 1、代码实战

```js
import React,{ useContext,useState,useRef } from 'react';
import classNames from '@packages/utils/classNames';
import PropTypes from 'prop-types'; 
import capitalize from '@packages/utils/capitalize';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import ResponsiveObserve, {
    responsiveArray
} from '@packages/utils/responsiveObserve';
import useImageLoad from '@packages/hooks/useImageLoad'; 
import { Person } from  "@packages/core/Icon";
import Paper from '@packages/core/Paper';
import useBreakpoint from '@packages/hooks/useBreakpoint';
import useForkRef from '@packages/hooks/useForkRef';
import "./index.scss";

const Avatar = React.forwardRef((props, ref) => {
    const {
        prefixCls: customizePrefixCls,
        component: Component = Paper,
        className,
        size = "default",
        children: childrenProp,
        type = "circle",
        src,
        srcSet,
        alt,
        imgProps,
        color="default",
        icon,
        //字符类型距离左右2侧边界单位像素
        gap=4,
        style,
        onError,
        onLoaded,
        ...restProps
    } = props;

    const prefixCls = useContext(ConfigContext)?.getPrefixCls("Avatar", customizePrefixCls);
    const [mounted, setMounted] = useState(false);
    const [scale,setScale]=useState(false);
    const screens =useBreakpoint();
    //string孩子节点
    const avatarChildrenRef=useRef(null);
    const avatarRef=useRef(null);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    let children = null;

    const loaded = useImageLoad({ src, srcSet });

    if(loaded==="error"){
        onError?.("error");
    }else if(loaded==="loaded"){
        onLoaded?.("loaded")
    }

    const hasImg = src || srcSet;
    //有src或者srcSet但是图片没有加载成功
    const hasImgNotFailing = hasImg && loaded !== 'error';

    const setScaleParam=()=>{
        if(!avatarChildrenRef.current||!avatarRef.current){
            return ;
        }
        const childrenWidth=avatarChildrenRef.current.offsetWidth;
        const nodeWidth=avatarRef.current.offsetWidth;

        if(childrenWidth!==0 && nodeWidth!==0){
            if(gap*2 < nodeWidth){
                setScale(nodeWidth-gap*2<childrenWidth?(nodeWidth-gap*2)/childrenWidth:1)
            }
        } 
    }

    React.useEffect(()=>{
        setScaleParam();
    },[gap]);

    if (hasImgNotFailing) {
        children = (
          <img
            alt={alt}
            src={src}
            srcSet={srcSet} 
            className={`${prefixCls}-Image`}
            {...imgProps}
          />
        );
    } else if(loaded == 'error'){
        children=<Person />
    } else if(icon){
        children=icon;
    } else if(mounted||scale!==1){ 

        const transformString=`scale(${scale})`;
        const childrenStyle = {
            msTransform: transformString,
            WebkitTransform: transformString,
            transform: transformString,
        };
        children=(
            <span style={childrenStyle} className={classNames(`${prefixCls}-String`)} ref={avatarChildrenRef}>
                {childrenProp}
            </span>
        )
    } else{
        children=(
            <span style={{opacity:0}} className={classNames(`${prefixCls}-String`)} ref={avatarChildrenRef}>
                {childrenProp}
            </span>
        )
    }

    const renderStyle=()=>{
        let sizeValue;
        if(typeof size==="number"){
            sizeValue=size; 
        }else if(typeof size==="object"){
            const currentBreakpoint=responsiveArray.find(screen=>screens[screen]);
            sizeValue=size[currentBreakpoint]||18; 
        }else if(typeof size==="string"){
            return {}
        } 
        return {
            width: sizeValue,
            height: sizeValue,
            lineHeight: `${sizeValue}px`,
            fontSize: icon ? sizeValue / 2 : 18,
        }
    }

    const handleRef=useForkRef(ref,avatarRef);

    return (
        <Component
            className={classNames(
                prefixCls,
                className,
                { 
                    [`${prefixCls}-Circle`]:type==="circle",
                    [`${prefixCls}-Color${capitalize(color)}`]:color && !hasImgNotFailing,
                    [`${prefixCls}-${capitalize(size)}`]:typeof size==="string"
                }
            )}
            style={{...renderStyle(),...style}}
            ref={handleRef} 
            square={type==="square"}
            {...restProps}
        >
            {children}
        </Component>
    )
}); 

export default Avatar;
```
 

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    代码非常简单，相信直接看也是可以看懂的。
</blockquote> 

## 2、AvatarGroup组件的设计

```js

import React, { useContext,cloneElement } from 'react';
import classNames from '@packages/utils/classNames';
import PropTypes from 'prop-types'; 
import childrenToArray from '@packages/utils/childrenToArray';
import Popover from '@packages/core/Popover';
import Avatar from './Avatar';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import "./index.scss";

const Group=React.forwardRef((props,ref)=>{
    const {
        prefixCls:customizePrefixCls,
        maxCount,
        maxStyle,
        children:childrenProps,
        maxPopoverPlacement="top",
        className,
        style
    }=props;

    let children;

    const prefixCls = useContext(ConfigContext)?.getPrefixCls("AvatarGroup", customizePrefixCls);

    children=childrenToArray(childrenProps).map((child,index)=>{
        return cloneElement(child,{
            key:`avatar-key-${index}`
        })
    });

    const numOfChildren=children.length;

    if(maxCount && maxCount<numOfChildren){
        const childrenShow=children.slice(0,maxCount);
        const childrenHidden=children.slice(maxCount,numOfChildren);

        childrenShow.push(
            <Popover
                key="avatar-popover-key"
                content={childrenHidden}
                trigger="hover"
                placement={maxPopoverPlacement}
            >
                <Avatar style={maxStyle}>{`+${numOfChildren-maxCount}`}</Avatar>
            </Popover>
        )

        return (
            <div className={classNames(`${prefixCls}`,className)} style={style}>
                {childrenShow}
            </div>
        )
    }

    return (
        <div className={classNames(`${prefixCls}`,className)} style={style}>
            {children}
        </div>
    )


}); 

export default Group;
```

## 3、Avatar组件的目录结构

```js
|-Avatar.js
|-Group.js
|-index.js
|-index.scss
```

# 四、Avatar组件设计核心要素

## 1.mounted变量的使用

```js
const [mounted, setMounted] = useState(false);

React.useEffect(() => {
        setMounted(true);
}, []);

} else if(mounted||scale!==1){ 
    ...
} else{


if(!avatarChildrenRef.current||!avatarRef.current){
            return ;
}
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    通过mounted来判断已经渲染完毕，可以成功拿到我们后续操作需要的节点。
</blockquote>


## 2.通过gap结合scale属性

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    基本逻辑：判断avatar外层节点和string字符节点包裹节点的offsetWidth，然后得出scale的值为(nodeWidth-gap*2)/childrenWidth
</blockquote>

```js
const [scale,setScale]=useState(false);
const setScaleParam=()=>{ 
        if(!avatarChildrenRef.current||!avatarRef.current){
            return ;
        }
        const childrenWidth=avatarChildrenRef.current.offsetWidth;
        const nodeWidth=avatarRef.current.offsetWidth;

        if(childrenWidth!==0 && nodeWidth!==0){
            if(gap*2 < nodeWidth){
                setScale(nodeWidth-gap*2<childrenWidth?(nodeWidth-gap*2)/childrenWidth:1)
            }
        } 
}
const transformString=`scale(${scale})`;
        const childrenStyle = {
            msTransform: transformString,
            WebkitTransform: transformString,
            transform: transformString,
};
children=(
            <span style={childrenStyle} className={classNames(`${prefixCls}-String`)} ref={avatarChildrenRef}>
                {childrenProp}
            </span>
)
```

## 3.通过size的类型判断赋予不同的值

```js
const screens =useBreakpoint();
const renderStyle=()=>{
        let sizeValue;
        if(typeof size==="number"){
            sizeValue=size; 
        }else if(typeof size==="object"){
            const currentBreakpoint=responsiveArray.find(screen=>screens[screen]);
            sizeValue=size[currentBreakpoint]||18; 
        }else if(typeof size==="string"){
            return {}
        } 
        return {
            width: sizeValue,
            height: sizeValue,
            lineHeight: `${sizeValue}px`,
            fontSize: icon ? sizeValue / 2 : 18,
        }
}
style={{...renderStyle(),...style}}
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    使用useBreakpoint()来判断当前的屏幕尺寸。
</blockquote>

## 4.使用useImageLoaded hooks函数

```js

const loaded = useImageLoad({ src, srcSet });

if(loaded==="error"){
        onError?.("error");
}else if(loaded==="loaded"){
        onLoaded?.("loaded")
}

import React from 'react';

export default function useLoaded({ src, srcSet }) {
    const [loaded, setLoaded] = React.useState(false);
  
    React.useEffect(() => {
      if (!src && !srcSet) {
        return undefined;
      }
  
      setLoaded(false);
  
      let active = true;
      const image = new Image();
      image.src = src;
      image.srcSet = srcSet;
      image.onload = () => {
        if (!active) {
          return;
        }
        setLoaded('loaded');
      };
      image.onerror = () => {
        if (!active) {
          return;
        }
        setLoaded('error');
      };
  
      return () => {
        active = false;
      };
    }, [src, srcSet]);
  
    return loaded;
}
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    使用useImageLoaded()可以判断是否加载以及加载是否成功。
</blockquote>

## 5.Group组件除第一个以外其余组件向左移动

```css

$prefixCls:"#{$global-prefix}-Avatar";
$prefixClsGroup:"#{$global-prefix}-AvatarGroup";

.#{$prefixClsGroup}{
    display: inline-flex;
    
    .#{$prefixCls}{
        &:not(:first-child){
            margin-left: -8px;
        }
    }
}
```
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    使用 <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/:not">:not</a> 选择器即可实现效果。
</blockquote>