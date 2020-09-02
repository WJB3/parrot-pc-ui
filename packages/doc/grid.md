![哈哈](./assets/heibao.jpeg)

>蹭一波热度，瓦坎达forever哈哈哈😂。最近一直在忙着写自己的组件库，但是由于写的组件越来越多，如果不及时地做总结的话，很快就会遗忘之前写过的代码。本人只是记录写组件的过程，认可也大程度的抄袭了antd的相关代码，所以也相当于ANTD源码解析，大佬勿喷。


# 一、Grid组件概述

>我们这节课的内容是我们的Grid组件，在我们的组件库中，很多组件都用到了这个基础组件，比如我们的Form组件,这个组件的主要目的是保证页面的每个区域能够稳健地排布起来。考虑实际的场景：在一个表单中，如果是在大屏中，需要一行至少有4个input元素输入框，但是如果是在小屏中，只需要2个input输入框即可。

如下图：

![哈哈](./assets/grid_demo.jpg)

可以参考antd的grid组件，通过row行和col列可以将一行分成对应的不同大小、宽度的列。
```js
//参考代码
    <Row>
      <Col span={24}>col</Col>
    </Row>
    <Row>
      <Col span={12}>col-12</Col>
      <Col span={12}>col-12</Col>
    </Row>
    <Row>
      <Col span={8}>col-8</Col>
      <Col span={8}>col-8</Col>
      <Col span={8}>col-8</Col>
    </Row>
    <Row>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
    </Row>
```

# 二、重点Hook:useBreakpoint介绍

能够根据屏幕大小进行自适应栅格是重要的一个功能，那么Grid是怎么做的呢？antd内部有一个hooks函数:useBreakpoint。这个hooks函数引用了一个工具类函数：
```js

//ResponsiveObserve 工具类函数
export const responsiveArray = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

export const responsiveMap = {
    xs: '(max-width: 575px)',
    sm: '(min-width: 576px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 992px)',
    xl: '(min-width: 1200px)',
    xxl: '(min-width: 1600px)',
};

const subscribers = new Map();
let subUid = -1;
let screens = {};

const responsiveObserve={
    matchHandlers:{},
    dispatch(pointMap){
        screens=pointMap;
        subscribers.forEach(func=>func(screens));
        return subscribers.size>=1;
    },
    subscribe(func){
        if(!subscribers.size) this.register();
        subUid+=1;
        subscribers.set(subUid,func);
        func(screens);
        return subUid;
    },
    unsubscribe(token){
        subscribers.delete(token);
        if(!subscribers.size) this.unregister();
    },
    register(){
        Object.keys(responsiveMap).forEach((screen)=>{
            const matchMediaQuery = responsiveMap[screen];
            const listener=({matches})=>{
                this.dispatch({
                    ...screens,
                    [screen]:matches
                });
            };
            const mql = window.matchMedia(matchMediaQuery);
            mql.addListener(listener);
            this.matchHandlers[matchMediaQuery] = {
                mql, 
                listener,
            };
            listener(mql);
        })
    },
    unregister(){
        Object.keys(responsiveMap).forEach((screen)=>{
            const matchMediaQuery=responsiveMap[screen];
            const handler=this.matchHandlers[matchMediaQuery];
            handler?.mql.removeListener(handler?.listener);
        });
        subscribers.clear();
    }
}

export default responsiveObserve;

//useBreakPoint hook的使用
export default function useBreakpoint(){

    const [screens,setScreens]=useState({});

    useEffect(()=>{
        const token=ResponsiveObserve.subscribe(supportScreens=>{
            setScreens(supportScreens)
        });

        return ()=>ResponsiveObserve.unsubscribe(token);
    },[]);

    return screens;
}
```

1. [Window.matchMedia()](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/matchMedia)Api可以监听媒体查询条件的变化，通过屏幕的变化来。其中mql对象中的监听函数有一个方法matches，表示当前是否匹配这个媒体查询。
2. useBreakpoint在每次媒体查询条件匹配变化的时候，会重新触发setScreens设置屏幕。
3. 执行流程分析：useEffect(()=>{},[])相当于componentDidMount，全文中只执行一次->调用subscribe方法，传递一个改变screens的方法->进入subscribe方法，此时subscribers是一个空Map,从而调用register方法->循环屏幕媒体查询调用dispatch方法->将对应的媒体查询结果赋值给内部变量screens->将func存到subscribers变量里面，执行func来改变屏幕->之后每一次屏幕的修改都会被matchMedia监听到，然后触发dispatch方法->subscribers.forEach(func=>func(screens))执行存在subscribers里面的函数func->即修改了state,state变化，页面会重新渲染。

# 三、RowContext的创建

[Context](https://zh-hans.reactjs.org/docs/context.html#gatsby-focus-wrapper)这里使用context是为了避免Col列组件并不是Row行组件的直接孩子元素,属性可以多层传递。

```js
import { createContext } from 'react';

const RowContext=createContext({});

export default RowContext;
```

# 四、全局Hook:usePrefixCls及相关工具类介绍

1. usePrefixCls 的 hooks函数 为了方便全局类名前缀的调用和设置，由于全文是可以设置类名前缀的，采用自定义hook的形式抽取公共代码。
2. ConfigContext 的 getPrefixCls函数 是全局的context方法，提供了一个全局的获取类名的方法。
3. classNames 函数和classnames库类似，可以通过变量动态的绑定合成className的值。
4. capitalize 函数是让传入的props属性等首字母大写，使得代码更规范。

```js
//usePrefixCls函数
import { ConfigContext } from '@packages/core/ConfigContext';
import React from 'react';

export default function usePrefixCls(name,customizePrefixCls){

    const { getPrefixCls } = React.useContext(ConfigContext);

    return React.useMemo(()=>{

        const prefixCls = getPrefixCls(name, customizePrefixCls);
 
        return  prefixCls;
       
   },[name])
};

//ConfigContext全文的context
import React from 'react';

let globalPrefix="parrot-pc";

export const ConfigContext=React.createContext({
    getPrefixCls:(suffixCli,customizePrefixCls)=>{
        if(customizePrefixCls) return customizePrefixCls;

        return `${globalPrefix}-${suffixCli}`
    }
});

//合成class的方法
export default function classNames(name){
    let hasOwn={}.hasOwnProperty;
    let classes=[];

    for(let i=0;i<arguments.length;i++){
        let arg=arguments[i];
        if(!arg) continue;
        let argType=typeof arg;
        if(argType==="string"||argType==="number"){
            classes.push(arg);
        }else if(Array.isArray(arg) && arg.length){
            let inner=classNames.apply(null,arg);
            if(inner){
                classes.push(inner);
            }
        }else if(argType==='object'){
            for(let key in arg){
                if(hasOwn.call(arg,key) && arg[key]){
                    classes.push(key);
                }
            }
        }
    }

    return classes.join(" ");
}

//props首字母大写
import React from 'react';
export default function capitalize(str){

    return React.useMemo(()=>{
        return str.substring(0,1).toUpperCase()+str.substring(1);
    },[str])
}

```


# 四、Row组件的编写

>Row组件是弹性布局属性，学习弹性盒子个人比较推荐 [阮一峰的Flex教程](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

## 1.属性align 	垂直对齐方式默认值是top

align就是相当于align-items的角色，只是省略了baseline、stretch属性。

## 2.属性justify 垂直对齐方式默认值是start

justify就是相当于justify-content的角色。

