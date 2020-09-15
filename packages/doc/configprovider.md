![哈哈](./assets/configprovider/ironman.jpg)


<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1;'>
    <div>
        <div><i>I am Iron Man.</i></div>
        <div style="text-align:right;"><b>——Marvel·Iron Man</b></div>
    <div> 
    
</blockquote>
 
# 一、ConfigProvider组件介绍

## 1.组件概述

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1;'>
    为组件提供统一的全局化配置。
</blockquote>

## 2.为什么需要这个组件

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    在我们日常开发中，往往需要一个很简单的操作，就可以完成全局的配置。比如下拉框选择中文和英文需要全文切换语言，选择大、中、小尺寸使得全文中的输入框等实现大小的切换。所以我们希望可以通过一个组件传递一些参数就可以实现这些功能。
</blockquote>

# 二、ConfigProvider组件设计
 
## 1.重点特性

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    全局化配置很容易让人想到<a href="https://zh-hans.reactjs.org/docs/context.html#gatsby-focus-wrapper">React Context API</a> 打开文档可以明晃晃的看见一句：Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。
</blockquote>


![哈哈](./assets/configprovider/reactcontext.png)

## 2.原理解析

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    就是在ConfigProvider这个组件中提供Provider生产者将全局属性传递给消费组件。在每个需要全局配置的组件也就是消费组件通过是否有通过ConfigProvider中传递的context属性值和自身组件的props属性值来得出正确的props值再继续进行后续操作。
</blockquote>

# 三、ConfigProvider组件实战

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    这里我们只设计 `componentSize、prefixCls`这2个常用API。
</blockquote> 

## 1、SizeContext设计


<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    SizeContext这个Context专门用来传递size。
</blockquote> 

```js
import React from 'react';

const SizeContext=React.createContext(undefined);

export default SizeContext;
```
 
## 2、ConfigContext设计

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    ConfigContext这个Context用来传递一些全局配置如全局类名前缀prefixCls。
</blockquote> 

```js
import React from 'react';

let globalPrefix="parrot-pc";

const ConfigContext=React.createContext({
    getPrefixCls:(suffixCls,customizePrefixCls)=>{
        if(customizePrefixCls) return customizePrefixCls;

        return suffixCls?`${globalPrefix}-${suffixCls}`:globalPrefix;
    }
})

export default ConfigContext;
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    这个Context提供了一个默认的获取类名前缀的方法，因为后面需要使用这个方法。
</blockquote> 