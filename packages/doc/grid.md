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


# 五、Row组件的编写

>Row组件是弹性布局属性，学习弹性盒子个人比较推荐 [阮一峰的Flex教程](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

## 1.属性align 	垂直对齐方式默认值是top

align就是相当于align-items的角色，只是省略了baseline、stretch属性。

## 2.属性justify 垂直对齐方式默认值是start

justify就是相当于justify-content的角色。

## 3.属性gutter 珊格之间的距离

首先根据屏幕大小判断出对应的尺码，再根据对应尺寸的大小来设置行的样式`marginLeft:$size/-2;marginRight:$size/-2`;
再设置列的样式`paddingLeft: ${size} / 2;paddingRight: ${size} / 2`

>这里行设置负值的margin可以增加行的宽度，然后设置元素的padding为margin负值一样的宽度可以使第一个子元素和最后一个子元素视觉上与原来保持一致。



# 六、Col组件的编写

>Col相当于弹性盒子的元素。

## 1.属性flex flex布局属性 

这里的flex相当于弹性盒子元素的flex属性

## 2.属性span 栅格占位格数，为 0 时相当于 display: none

通过弹性盒子元素属性:`flex:0 0 100%/(24/$i)`(每一行有24格栏栅)即可设置

## 3.属性gutter 

> flex属性有三个参数：第一个参数flex-grow定义项目的放大比例,第二个参数flex-shrink定义项目的缩小比例，第三个参数flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间。

## 3.属性order 栅格顺序

通过弹性盒子元素属性:`order:$order`

>属性定义项目的排列顺序。数值越小，排列越靠前。

## 4.属性pull和属性push 栅格向左/右移动格数

>看起来很高大上的属性，其实只是利用了`left`和`right`,前提是元素设置了`position:relative`。`left: (100%/24) * $push;right: (100%/24) * $pull;`

## 5.属性offset 栅格左侧的间隔格数，间隔内不可以有栅格

>同样是看起来很高大上的属性，其实只是用了一个margin-left：`margin-left: (100%/24) * $offset`

## 6.xs/sm/md/lg/xl/xxl属性 响应式栅格

>其实是通过传递的属性来给节点添加对应的class，再给class通过媒体查询设置相对应的样式


# 七、浏览器兼容性

1. React兼容IE9以上版本

2. flex兼容性如下

![flex兼容性](./assets/flex_support.png)

3. window.matchMedia兼容性如下

![window.matchMedia兼容性](./assets/matchmedia_support.png)

> IE10以上基本没问题

