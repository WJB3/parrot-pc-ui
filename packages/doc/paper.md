![哈哈](./assets/paper/heiguafu.jpg)


<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1;'>
    <div>
        <div><i>Hey, big brother, the sun is setting.</i></div>
        <div style="text-align:right;"><b>——Marvel·Black Widow</b></div>
    <div> 
    
</blockquote>

# 一、Paper组件介绍

## 1.组件概述
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1;'>
    为了在屏幕上展现了纸张的物理属性。
</blockquote>

## 2.为什么需要这个组件
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    <div>作为需要阴影效果的组件的基础组件、需要显示阴影效果。</div>
</blockquote>

# 二、Paper组件设计

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
   意在作为div标签的替代标签，丰富了div标签上不存在的效果。
</blockquote>

# 三、Paper组件实战

```js
import React from 'react';
import classNames from '@packages/utils/classNames'; 
import PropTypes from 'prop-types'; 
import {
    ConfigContext 
} from '@packages/core/ConfigProvider'; 
import "./index.scss";

const Paper=React.forwardRef((props,ref)=>{
    const {
        prefixCls:customizePrefixCls,
        className,
        component: Component = 'div',
        square=false,
        shadow=1,
        children,
        style
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Paper",customizePrefixCls); 

    return (
        <Component
            className={classNames(
                prefixCls,
                className,
                {
                    [`${prefixCls}-Round`]:!square,
                    [`${prefixCls}-Shadow${shadow}`]:shadow
                }
            )}
            ref={ref}
            children={children}
            style={style}
        />
             
    )
});
 
export default Paper;
``` 

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
1.使用box-shadow实现阴影效果<br />
2.使用square来实现圆角和直角效果
</blockquote>


# 四、Paper组件设计核心要素

## 1.scss for循环优化重复代码

```css
.#{$prefixCls}{
    color:$global-text-color;
    transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
    background-color: #fff;

    &-Round{
        border-radius: 4px;
    }

    @for $i from 0 through 24 {
        &-Shadow#{$i} {
            @include boxShadowLevel($i)
        }
    }

}
```
 <blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(247, 31, 85,1); background: rgb(239, 235, 233);line-height:1.5;'>
   参考资料：<a href="https://www.sass.hk/docs/">Scss for循环</a>:巧用scss for循环避免书写大量重复代码。
</blockquote>
 
 

