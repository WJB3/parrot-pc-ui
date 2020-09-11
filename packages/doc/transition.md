![哈哈](./assets/transition/doctor.jpg)


<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1;'>
    <div>
        <div><i>Be careful which path you travel now,Strange.Stronger men than you hava lost their way.</i></div>
        <div style="text-align:right;"><b>——Marvel·Stephen Steve Vincent Strange</b></div>
    <div> 
    
</blockquote>

# 一、Transition动画组件概述

在21世纪，尤其是在信息技术如此发达的今天，一个软件如何脱颖而出，良好的用户体验是不可缺少的，而动画是提升用户体验必不可少的一个功能之一。而且在我们后续的开发中，动画是经常需要贯穿在组件内部的，我们可以将这些动画封装成一个又一个组件。

> 其实相比较Vue自带的[Transition](https://cn.vuejs.org/v2/guide/transitions.html)组件，React中并没有自带的Transition组件可以获取到节点的离开/进入时机，由于实践起来也是比较复杂，同时也是为了避免重复造轮子，我们在这里直接使用别人的库[React-Transition-Group](https://reactcommunity.org/react-transition-group/)。

# 二、React-Transition-Group介绍

> 鉴于以下的所有的组件都是基于这个基础组件来，我们详细扒一扒这个组件的API,看看他都给我们带来了哪些功能。

## 1.Transition组件

### 1.nodeRef

>对node的引用，意思就是直接通过这个属性可以获取到需要添加过渡效果的DOM节点。如果有了这个属性，在过渡回调如onEnter(节点刚进入前触发的回调)，就不会将DOM节点传递给你，因为你已经可以直接获取这个DOM节点了。

### 2.children

>这里的children就是正常的孩子节点，不同的是这里可以是一个函数，函数参数是一个state描述组件的各个状态，可以通过这个状态给组件添加不同的style样式和class类名


### 3.in

>显示组件，触发进入或退出的状态，当in从false变为true时，组件就要进行渲染进屏幕，从true变为false时，组件就会慢慢从屏幕上消失。

### 4.mountOnEnter

>默认情况下，子组件将与父Transition组件一起立即安装。意思是说默认他默认是存在节点，只是不显示而已，如果设成true的话，节点默认一开始是不在dom树上的，在in为true时，才将节点挂在dom树上。

### 5.unmountOnExit

>默认情况下，子组件在达到'exited'状态后会保持挂载状态。如果将这个设置为true时，当组件“离开”这个页面时，dom树上的这个节点会卸载。

### 6.appear

>默认情况下，子组件在初次安装时不执行回车转换。意思是如果这个节点刚被挂在到节点上时，是默认没有过渡转换的，也就是设置成mountOnEnter时。

### 7.enter

>启用或禁用输入转换.即对应的onEnter、onEntering、onEntered不会调用。

### 8、exit

>启用或禁用退出转换。即对应的onExit、onExiting、onExited不会调用。

### 9、timeout

>过渡持续时间（以毫秒为单位）。除非addEndListener提供，否则为必需。

>如果是进入的话 timeout设置的值就是onEntering->onEntered的事件
>如果是退出的话 timeout设置的值就是onExiting->onExited的事件

### 10、addEndListener

> 不常用，添加自定义过渡结束触发器。通过过渡的DOM节点和done回调进行调用。允许使用更细粒度的过渡结束逻辑。如果提供超时，仍将其用作备用。

### 11、onEnter

> 在应用“进入”状态之前触发了回调。提供了一个额外的参数 isAppearing来指示进入阶段是否在初始安装中发生。

### 12、onEntering

> 应用“输入”状态后触发的回调。提供了一个额外的参数 isAppearing来指示进入阶段是否在初始安装中发生。

### 13、onEntered

> 应用“已进入”状态后触发的回调。提供了一个额外的参数 isAppearing来指示进入阶段是否在初始安装中发生。

### 14、onExit

> 在应用“退出”状态之前触发了回调。

### 15、onExiting

> 应用“退出”状态后触发的回调。

### 16、onExited

> 应用“退出”状态后触发的回调。

## 2.CSSTransition组件

>CSSTransition组件继承了组件的所有功能，受到vue-animate,ng-animate库的启发，增加了一个classNames属性。即不用通过style属性或js属性控制样式。

动画classNames应用于出现，进入，退出或已完成过渡的组件。可以提供一个名称，该名称将在每个阶段后缀，例如classNames="fade"适用：

```js
fade-appear，fade-appear-active，fade-appear-done

fade-enter，fade-enter-active，fade-enter-done

fade-exit，fade-exit-active，fade-exit-done
```