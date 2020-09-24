![哈哈](./assets/inputpassword/jingqi.jpg)


<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1;'>
    <div>
        <div><i>Don't you 'lady' me, son. I'm an avenger.</i></div>
        <div style="text-align:right;"><b>——Marvel·Captain Marvel</b></div>
    <div> 
    
</blockquote>

# 一、InputPassword组件介绍

## 1.组件概述
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1;'>
    通过鼠标或键盘输入内容，且密码多为隐私。
</blockquote>

## 2.为什么需要这个组件
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    <div>在登陆界面等需要输入账号密码时为保护隐私性等需要密码框。</div>
</blockquote>

# 二、InputPassword组件设计

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
   这个组件略简单，基于inputText进行设计。
</blockquote>

# 三、InputText组件实战

```js
import React, { useContext, useEffect, useState, useRef } from 'react';
import {
    EyeOn,
    EyeOff,
} from '@packages/core/Icon'; 
import classNames from '@packages/utils/classNames';
import PropTypes from 'prop-types';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import InputText from '@packages/core/InputText';
import useControlled from '@packages/hooks/useControlled';
import "./index.scss";

const sizeObj = {
    "small": "12px",
    "default": "16px",
    "large": "20px"
}

const InputPassword = React.forwardRef(function (props, ref) {
    const {
        prefixCls: customizePrefixCls,
        className,
        onChange,
        size = "default", 
        defaultValue,
        value: valueProp, 
        visibilityToggle=true,
        iconRender,
        ...restProps
    } = props; 

    const prefixCls = useContext(ConfigContext)?.getPrefixCls("InputPassword", customizePrefixCls);

    //首先确立我们的value始终是string
    const [value, setValue] = useControlled({controlled: valueProp, default: defaultValue});   
  
    const [visible,setVisible]=useState(false);//是否可见

    const handleChange=(val)=>{   
        setValue(val);
    }   

    const renderPassword=()=>{
        if(iconRender){
            return <div  onClick={()=>setVisible(!visible)}>
                {iconRender(visible)}
            </div>
        }
        return <div onClick={()=>setVisible(!visible)}>
            {visible?<EyeOn style={{fontSize:sizeObj[size]}} />:<EyeOff style={{fontSize:sizeObj[size]}} />}
        </div>
    }
 
 
    return (
        <InputText
            component={"input"}
            className={classNames(prefixCls)}   
            size={size}
            ref={ref}
            value={value?value:""}
            type={visible?"text":"password"}
            onChange={handleChange} 
            suffix={visibilityToggle?renderPassword():null}
            {...restProps}
        />
    )
});
 

export default InputPassword;
```


<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
   1.输入框右侧，也就是inputtext的suffix中渲染不同的图标<br />
   2.visibilityToggle表示是否展示切换按钮，默认为true<br />
   3.利用react的函数式特性，可以很容易的写出iconRender
</blockquote>


# 四、InputPassword组件设计核心要素

## 1.使InputText组件变为可控组件

```js
value={value?value:undefined}
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    在不存在value的时候，使value值变为“”表示对inputText组件进行控制。
</blockquote>

## 2.巧用一个变量

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    只需要一个是否可见的state就可以对图标和input type的控制。
</blockquote>
 
 ## 3.巧用冒泡

```js
const renderPassword=()=>{
        if(iconRender){
            return <div  onClick={()=>setVisible(!visible)}>
                {iconRender(visible)}
            </div>
        }
        return <div onClick={()=>setVisible(!visible)}>
            {visible?<EyeOn style={{fontSize:sizeObj[size]}} />:<EyeOff style={{fontSize:sizeObj[size]}} />}
        </div>
}
```
 <blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    因为需要点击图标达到切换可见的效果，所以需要添加点击事件。但是如果把点击事件放在Icon图标上，iconRender上的图标就不好写了，我们可以在外层包一个div,把click事件放在这个div上，利用冒泡特性。
</blockquote>
 