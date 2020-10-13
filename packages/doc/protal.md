![哈哈](./assets/protal/star.jpg)


<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    <div>
        <div><i>I'm a warrior and assassin.I do not dance.</i></div>
        <div style="text-align:right;"><b>——Marvel·Peter Jason Quill</b></div>
    <div> 
    
</blockquote>

# 一、Protal组件介绍

## 1.组件概述
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1;'>
    传送门组件将其子节点渲染到当前 DOM 结构之外的新 "子类树" 当中。
</blockquote>

## 2.为什么需要这个组件
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    <div>在一些场景下如Modal弹窗、下拉框中我们希望视觉上“跳出”其容器，可以利用这个组件轻松的传递到任意DOM树下。</div>
</blockquote>

# 二、Protal组件设计

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
   其实并不复杂，需要借助<a href="https://zh-hans.reactjs.org/docs/react-dom.html#createportal">createProtal</a>这个API。
</blockquote>

# 三、Protal组件实战

```js
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import useForkRef from '@packages/hooks/useForkRef';

function getContainer(target) {
    //容器
    const containerSelf = typeof target === 'function' ? target() : target;
    return ReactDOM.findDOMNode(containerSelf);
}

const Portal = React.forwardRef((props, ref) => {
    const {
        children,
        disablePortal = false,
        target,
    } = props;

    const [mountNode, setMountNode] = React.useState(null);

    const handleRef = useForkRef(React.isValidElement(children) ? children.ref : null, ref);

    React.useEffect(() => {
        if (!disablePortal) {
            setMountNode(getContainer(target) || document.body);
        }
    }, [target, disablePortal]);

    if (disablePortal) {
        if (React.isValidElement(children)) {
            return React.cloneElement(children, {
                ref: handleRef
            });
        }
    }

    return mountNode ? ReactDOM.createPortal(children, mountNode) : mountNode;
}); 
export default Portal;
```




<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
   这个组件主要用于我们开发后续组件的一个基础组件。代码很简洁相信大家一眼就可以看出来了。<br />
   1.target : 目标容器<br />
   2.disablePortal : 是否禁用Protal传送门<br />
</blockquote>


# 四、Protal组件设计核心要素

## 1.通过target参数获取真实dom节点

```js
function getContainer(target) {
    //容器
    const containerSelf = typeof target === 'function' ? target() : target;
    return ReactDOM.findDOMNode(containerSelf);
}
```
 <blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(247, 31, 85,1); background: rgb(239, 235, 233);line-height:1.5;'>
   参考资料：<a href="https://zh-hans.reactjs.org/docs/react-dom.html#finddomnode">findDOMNode</a>:如果组件已经被挂载到 DOM 上，此方法会返回浏览器中相应的原生 DOM 元素。
</blockquote>

 ## 2.通过isValidElement检测是否是React节点
```js
  //如果禁用disablePortal直接返回子元素
  if (disablePortal) {
        if (React.isValidElement(children)) {
            return React.cloneElement(children, {
                ref: handleRef
            });
        }
    }
```
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(247, 31, 85,1); background: rgb(239, 235, 233);line-height:1.5;'>
   参考资料：<a href="https://zh-hans.reactjs.org/docs/react-api.html#isvalidelement">isValidElement</a>:验证对象是否为 React 元素。
</blockquote> 
 

