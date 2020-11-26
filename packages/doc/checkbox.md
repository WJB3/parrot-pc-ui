![哈哈](./assets/checkbox/yinyingxia.jpg)


<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    <div>
        <div><i>All that you know, is at an end.</i></div>
        <div style="text-align:right;"><b>——Marvel·Silver Surfer</b></div>
    <div> 
    
</blockquote>
 
# 一、Checkbox组件介绍

## 1.组件概述

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1;'>
    复选框是一种可同时选中多项的基础表单控件。
</blockquote>

## 2.为什么需要这个组件

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    复选框是一个非常基础的表单控件元素，作为一个完整的组件库，一定是必不可少的，它可以选中多个（单个选项一般更适用于单选框组件）选项，配合表单提交按钮进行表单提交。
</blockquote>

# 二、Checkbox组件设计
   
## 原理解析

![哈哈](./assets/checkbox/checkbox-demo.jpg)

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
   如上，我们可以选择我爱中国、我爱安徽、我爱合肥，而并不选择我爱美国。
</blockquote> 
 
```js 
<Checkbox >{"我爱中国"}</Checkbox>
<Checkbox >{"我爱安徽"}</Checkbox>
<Checkbox >{"我爱合肥"}</Checkbox>
<Checkbox >{"我爱美国"}</Checkbox> 
``` 

# 三、Checkbox组件设计大概流程
## 1.组件框架结构大体简述

![哈哈](./assets/checkbox/yuanli.jpg)
  

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    在这里我们要设计这个组件分为2个部分：一个是Input框即元素的可选框部分，一个是可选框文字部分。
    <br />
    <br />
    在我们的最外层Checkbox部分，我们使用label元素包裹元素，这个时候你可能会有疑问，为什么不使用div或者span来包裹呢？
    <br />
    <br />
    label标签主要是方便鼠标点击使用，增强用用户操作体验。在传统的checkbox中，html的原生checkbox框非常的小，每次选择时需要点击到checkbox框，会很难点击。在包裹了label后，当点击复选框文字部分时也可以选中input框。
    <br />
    <br />
    这里我们使用input框，通过onChange来改变复选框的选中/未选中状态，checked元素来控制复选框的选中/未选中状态并且改变相应的样式，即这里我们的input属于受控元素，我们并没有借助如文字的点击事件等来切换选中的状态，即采用原生的input框的change事件来切换。
    <br />
    <br />
    一般我们的label部分即labelWrapper组件为组件传过来的children属性。
 
</blockquote>  

# 四、Checkbox组件设计核心要素

## 1.input[type="checkbox"]

```js
<input
    type="checkbox"
    className={
        classNames(
        `${prefixCls}-Input`
        )
    }
    onChange={(e) => handleChange(e)}
    checked={checked}
    ref={ref}
    value={value}
/>

```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
当使用type="checkbox"时，value表示checkbox的value值，checked表示是否选中。</br >
</blockquote>


## 2.label的作用

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    我们一般是点击Checkbox来点击切换checkbox的状态，但是我们这里不是用我们的click事件，而是使用input框的change事件，当label标签内部有表单元素时，当点击label标签内的元素时，表单元素会触发点击事件，其中的event.target.checked可以获取此时表单元素的选中状态。
</blockquote>

```js
<label
    className={
        classNames(
            prefixCls,
            className, 
        )
    }
>
            ......
    {children && <Component
                className={
                    classNames(
                        `${prefixCls}-labelWrapper`
                    )
                }
    >
            {children}
    </Component>}
</label>
```

## 3.使用createChainedFunction是的函数可以按顺序执行

```js 

//可以让函数依次执行

export default function createChainedFunction(...params){

    const args=Array.prototype.slice.call(arguments,0);

    if(args.length===1){
        return args[0];
    }

    return function chainedFunction(){
        for(let i=0;i<args.length;i++){
            if(args[i] && args[i].apply){
                args[i].apply(this,arguments);
            }
        }
    }
}

const onChange=createChainedFunction(onChangeProp,checkboxGroup && checkboxGroup.onChange);
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    这个函数中使用了call来将传入的参数变成一个数组，然后使用apply将传入的函数一一执行，这样子就能够实现一个函数接受多个函数，然后按照顺序执行。（个人感觉就是代码比较优雅没什么卵用）
</blockquote>

 ## 4.使用context进行判断是否是在group中
 
```js
//Group
import React from 'react';
import classNames from '@packages/utils/classNames';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import CheckboxGroupContext from './CheckboxGroupContext';
import useControlled from '@packages/hooks/useControlled';
import "./index.scss";

const CheckGroup=React.forwardRef((props,ref)=>{

    const {
        Component="div",
        className,
        value:valueProp,
        defaultValue,
        name="check-group",
        prefixCls:customizePrefixCls,
        children,
        onChange
    }=props;

    const prefixCls = React.useContext(ConfigContext)?.getPrefixCls("CheckboxGroup", customizePrefixCls);

    const [value,setValue]=useControlled({
        controlled:valueProp,
        default:defaultValue
    }); 

    const handleChangeCheckbox=(checked,event,name)=>{
        let index=value.indexOf(name); 
        if(index>-1){//当存在时
            if(checked===false){//移除存在的
                value.splice(index,1);
            }
        }else{
            if(checked===true){//添加没有的
                value.push(name);
            }
        } 
        setValue([...value]);
        onChange?.(value,e);
    }
    
    return (
        <CheckboxGroupContext.Provider value={{name,onChange:handleChangeCheckbox,value}}>
            <Component
                className={
                    classNames(
                        prefixCls,
                        className
                    )
                }
                ref={ref}
            >
                {children}
            </Component>
        </CheckboxGroupContext.Provider>
    )
});

export default CheckGroup;



    let ischecked=checkedProp;

    if(checkboxGroup){
        if(typeof ischecked==='undefined'){
            ischecked=checkboxGroup.value?checkboxGroup.value.indexOf(value)>-1?true:false:false;
        }
    }

    const [checked, setChecked] = useControlled({
        controlled: ischecked,
        default: Boolean(defaultChecked)
    });
```