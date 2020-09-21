![哈哈](./assets/transition/doctor.jpg)


<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    <div>
        <div><i>Be careful which path you travel now,Strange.Stronger men than you hava lost their way.</i></div>
        <div style="text-align:right;"><b>——Marvel·Stephen Steve Vincent Strange</b></div>
    <div> 
    
</blockquote>

# 一、Transition动画组件介绍

## 1.组件概述

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    全局的过渡效果组件。
</blockquote>


## 2.为什么需要这个组件

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    在21世纪，尤其是在信息技术如此发达的今天，一个软件如何脱颖而出，良好的用户体验是不可缺少的，而动画是提升用户体验必不可少的一个功能之一。而且在我们后续的开发中，动画是经常需要贯穿在组件内部的，我们可以将这些动画封装成一个又一个组件。<br />
 其实相比较Vue自带的<a href="https://cn.vuejs.org/v2/guide/transitions.html">Transition</a>组件，React中并没有自带的Transition组件可以获取到节点的离开/进入时机，由于实践起来也是比较复杂，同时也是为了避免重复造轮子，我们在这里直接使用别人的库<a href="https://reactcommunity.org/react-transition-group/">React-Transition-Group</a>。
</blockquote>





# 二、React-Transition-Group介绍

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    鉴于以下的所有的组件都是基于这个基础组件来，我们详细扒一扒这个组件的API,看看他都给我们带来了哪些功能。
</blockquote>


## 1.Transition组件

### 1.nodeRef

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    对node的引用，意思就是直接通过这个属性可以获取到需要添加过渡效果的DOM节点。如果有了这个属性，在过渡回调如onEnter(节点刚进入前触发的回调)，就不会将DOM节点传递给你，因为你已经可以直接获取这个DOM节点了。
</blockquote>
 
### 2.children

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    这里的children就是正常的孩子节点，不同的是这里可以是一个函数，函数参数是一个state描述组件的各个状态，可以通过这个状态给组件添加不同的style样式和class类名
</blockquote>

### 3.in

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    显示组件，触发进入或退出的状态，当in从false变为true时，组件就要进行渲染进屏幕，从true变为false时，组件就会慢慢从屏幕上消失。
</blockquote>



### 4.mountOnEnter

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
   默认情况下，子组件将与父Transition组件一起立即安装。意思是说默认他默认是存在节点，只是不显示而已，如果设成true的话，节点默认一开始是不在dom树上的，在in为true时，才将节点挂在dom树上。
</blockquote>



### 5.unmountOnExit

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
   默认情况下，子组件在达到'exited'状态后会保持挂载状态。如果将这个设置为true时，当组件“离开”这个页面时，dom树上的这个节点会卸载。
</blockquote>


### 6.appear（不准确）

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(247, 31, 85,1); background: rgb(239, 235, 233);line-height:1.5;'>
   默认情况下，子组件在初次安装时不执行回车转换。意思是如果这个节点刚被挂在到节点上时，是默认没有过渡转换的，也就是设置成mountOnEnter时。（事实上我测试并无作用）
</blockquote>
 

### 7.enter


<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
   启用或禁用输入转换.即对应的onEnter、onEntering、onEntered不会调用。
</blockquote>
 

### 8、exit

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
   启用或禁用退出转换。即对应的onExit、onExiting、onExited不会调用。
</blockquote>
 
### 9、timeout

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
过渡持续时间（以毫秒为单位）。除非addEndListener提供，否则为必需。<br />

如果是进入的话 timeout设置的值就是onEntering->onEntered的时间。<br />

如果是退出的话 timeout设置的值就是onExiting->onExited的时间。
</blockquote>



### 10、addEndListener

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
   不常用，添加自定义过渡结束触发器。通过过渡的DOM节点和done回调进行调用。允许使用更细粒度的过渡结束逻辑。如果提供超时，仍将其用作备用。
</blockquote>



### 11、onEnter


<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
   在应用“进入”状态之前触发了回调。提供了一个额外的参数 isAppearing来指示进入阶段是否在初始安装中发生。
</blockquote>


### 12、onEntering

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
   应用“输入”状态后触发的回调。提供了一个额外的参数 isAppearing来指示进入阶段是否在初始安装中发生。
</blockquote>


### 13、onEntered

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    应用“已进入”状态后触发的回调。提供了一个额外的参数 isAppearing来指示进入阶段是否在初始安装中发生。
</blockquote>

### 14、onExit

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    在应用“退出”状态之前触发了回调。
</blockquote>
 
### 15、onExiting

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    应用“退出”状态后触发的回调。
</blockquote>
 
### 16、onExited

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
 应用“退出”状态后触发的回调。
</blockquote>


## 2.CSSTransition组件

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
 CSSTransition组件继承了组件的所有功能，受到vue-animate,ng-animate库的启发，增加了一个classNames属性。即不用通过style属性或js属性控制样式。动画classNames应用于出现，进入，退出或已完成过渡的组件。可以提供一个名称，该名称将在每个阶段后缀，例如classNames="fade"适用：

</blockquote>
 


```css
fade-appear，fade-appear-active，fade-appear-done

fade-enter，fade-enter-active，fade-enter-done

fade-exit，fade-exit-active，fade-exit-done
```
 
# 三、Fade淡入淡出组件（从透明到不透明）

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
就是常规的渐隐操作，就是opacity由0 - > 1的过程，或者opacity1 -> 0的过程
</blockquote>
 
```js
import React, { isValidElement } from 'react';  
import { Transition } from 'react-transition-group';
import { duration } from '@packages/core/styles/transitions'; 

const reflow=(node)=>node.scrollTop;

const styles = {
    entering: {
        opacity: 1,
    },
    entered: {
        opacity: 1,
    },
};

const Fade = React.forwardRef(function (props, ref) {
    const {
        prefixCls: customizePrefixCls,
        className,
        TransitionComponent = Transition,
        children,
        visible: visibleProp,
        onEnter,
        onEntered,
        onEntering,
        onExit,
        onExited,
        onExiting,
        timeout = {
            enter: duration.enteringScreen,
            exit: duration.leavingScreen
        },
        style,
        ...other
    } = props;

    const handleEnter = function(node, isAppearing){   

        reflow(node);

        node.style.webkitTransition = `opacity ${timeout && timeout.enter?timeout.enter:timeout}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`;
        node.style.transition =`opacity ${timeout && timeout.enter?timeout.enter:timeout}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`;

        onEnter?.(node,isAppearing);

    };

    const handleExit = function(node, isAppearing){ 
 
        node.style.webkitTransition = `opacity ${timeout && timeout.exit?timeout.exit:timeout}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`;
        node.style.transition =  `opacity ${timeout && timeout.exit?timeout.exit:timeout}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`;

        onExit?.(node,isAppearing);

    };
 

    return (
        <TransitionComponent   
            in={visibleProp}
            onEnter={handleEnter}
            onEntered={(node, isAppearing) => onEntered?.(node, isAppearing)}
            onEntering={(node, isAppearing) => onEntering?.(node, isAppearing)}
            onExit={handleExit}
            onExited={(node, isAppearing) => onExited?.(node, isAppearing)}
            onExiting={(node, isAppearing) => onExiting?.(node, isAppearing)}
            timeout={timeout}
            {...other}
        >
            {
                (state, childProps) => {   
                    return React.cloneElement(children, {
                        style: {
                            opacity: 0,
                            visibility: state === 'exited' && !visibleProp ? 'hidden' : undefined,
                            ...style,
                            ...styles[state],
                            ...children.props?.style
                        },
                        ref:ref,
                        ...childProps
                    })
                }
            }
        </TransitionComponent>
    )
});

 

export default Fade;
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
要点分析：<br />
1. 通过onEnter(表示在安装前)和onExit(表示在卸载前后)给节点设置过渡CSS,通过状态的不同给节点设置不同的opacity,刚开始节点opacity为0，然后在entering状态下设置opacity:1,注意此时需要在entered下也设置opacity:1，使节点显示。<br />
2. 当节点初次被挂载到节点上时，设置过渡效果会失效，需要上文中的过渡效果，具体原因暂未得知，希望大佬能解答哦。
</blockquote>
  


# 四、Zoom组件放大组件（从子元素的中心向外扩展） 

```js
import React from 'react';
import PropTypes from 'prop-types'; 
import { Transition } from 'react-transition-group';
import { duration } from '@packages/core/styles/transitions';
import "./index.scss";

const styles = {
    entering: {
      transform: 'none',
    },
    entered: {
      transform: 'none',
    },
};

const reflow=node=>node.scrollTop;

const Zoom = React.forwardRef(function (props, ref) {
    const {
        prefixCls: customizePrefixCls,
        className,
        TransitionComponent = Transition,
        children,
        visible: visibleProp,
        onEnter,
        onEntered,
        onEntering,
        onExit,
        onExited,
        onExiting,
        timeout = {
            enter: duration.enteringScreen,
            exit: duration.leavingScreen
        },
        style,
        ...other
    } = props; 


    
    const handleEnter = function(node, isAppearing){ 
       
        reflow(node);
        
        node.style.webkitTransition = `transform ${timeout && timeout.enter?timeout.enter:timeout}ms`;
        node.style.transition =`transform ${timeout && timeout.enter?timeout.enter:timeout}ms`;

        onEnter?.(node,isAppearing);

    };

    const handleExit = function(node, isAppearing){ 
 
        node.style.webkitTransition = `transform ${timeout && timeout.exit?timeout.exit:timeout}ms`;
        node.style.transition =  `transform ${timeout && timeout.exit?timeout.exit:timeout}ms`;

        onExit?.(node,isAppearing);

    };

    return (
        <TransitionComponent 
            in={visibleProp}
            onEnter={handleEnter}
            onEntered={(node, isAppearing) => onEntered?.(node, isAppearing)}
            onEntering={(node, isAppearing) => onEntering?.(node, isAppearing)}
            onExit={handleExit}
            onExited={(node, isAppearing) => onExited?.(node, isAppearing)}
            onExiting={(node, isAppearing) => onExiting?.(node, isAppearing)}
            timeout={timeout}
            {...other}
        >
            {
                (state, childProps) => {
                    return React.cloneElement(children, {
                        style: {
                            transform: 'scale(0)',
                            visibility: state === 'exited' && !visibleProp ? 'hidden' : undefined,
                            ...style,
                            ...styles[state],
                            ...children.props.style
                        },
                        ref:ref,
                        ...childProps
                    })
                }
            }
        </TransitionComponent>
    )
});

 
export default Zoom;

```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
要点分析：<br />
1. 和Fade组件几乎是一样的，唯一的区别就是css属性一个是opacity，另一个则是transform:scale(1);
</blockquote>  

# 五、Grow扩展组件（从子元素的中心向外扩展同时设置透明度）

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
要点分析：<br />
这个组件是我们组件库的基准动效组件，可以说我们的组件库都会基于这个组件进行开发。
</blockquote>  


```JS

import React from 'react';
import PropTypes from 'prop-types'; 
import { Transition } from 'react-transition-group';
import { duration } from '@packages/core/styles/transitions';

import "./index.scss";
function getScale(value) {
    return `scale(${value}, ${value ** 2})`;
}

const styles = {
    entering: {
        opacity: 1,
        transform: getScale(1),
    },
    entered: {
        opacity: 1,
        transform: 'none',
    },
};

const Grow = React.forwardRef(function (props, ref) {
    const {
        prefixCls: customizePrefixCls,
        className,
        TransitionComponent = Transition,
        children,
        visible: visibleProp,
        onEnter,
        onEntered,
        onEntering,
        onExit,
        onExited,
        onExiting,
        timeout = {
            enter: duration.enteringScreen,
            exit: duration.leavingScreen
        },
        style,
        ...other
    } = props;

    const handleEnter = function(node, isAppearing){ 

        reflow(node);
       
 
        node.style.webkitTransition = `opacity ${timeout && timeout.enter?timeout.enter:timeout}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${timeout && timeout.enter?timeout.enter:timeout}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        node.style.transition =`opacity ${timeout && timeout.enter?timeout.enter:timeout}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${timeout && timeout.enter?timeout.enter:timeout}ms cubic-bezier(0.4, 0, 0.2, 1)`;

        onEnter?.(node,isAppearing);

    };

    const handleExit = function(node, isAppearing){ 
 
        node.style.webkitTransition = `opacity ${timeout && timeout.enter?timeout.enter:timeout}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform ${timeout && timeout.leave?timeout.leave:timeout}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;`;
        node.style.transition =  `opacity ${timeout && timeout.enter?timeout.enter:timeout}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform ${timeout && timeout.leave?timeout.leave:timeout}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;`;

        node.style.opacity = '0';
        node.style.transform = getScale(0.75);

        onExit?.(node,isAppearing);

    };

    return (
        <TransitionComponent
            appear
            in={visibleProp}
            onEnter={handleEnter} 
            onExit={handleExit} 
            timeout={timeout}
            {...other}
        >
            {
                (state, childProps) => {
                    return React.cloneElement(children, {
                        style: {
                            opacity: 0,
                            transform: getScale(0.75),
                            visibility: state === 'exited' && !visibleProp ? 'hidden' : undefined,
                            ...style,
                            ...styles[state],
                            ...children.props.style
                        },
                        ref:ref,
                        ...childProps
                    })
                }
            }
        </TransitionComponent>
    )
});

 
export default Grow;
```
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
要点分析：<br />
1. 和前2个组件是一样的，只是相当于俩个CSS属性结合在一起了opacity、transform<br />
2.为了让scale变化更加丰富增加了getScale
</blockquote>  
 


# 六、Collapse折叠组件（从子元素的顶部展开而来）

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
这个组件相比较来说比较复杂。老规矩先上代码。
</blockquote>  
 

```js

import React from 'react';
import classNames from '@packages/utils/classNames';
import PropTypes from 'prop-types';
import usePrefixCls from '@packages/hooks/usePrefixCls'; 
import { Transition } from 'react-transition-group';
import { duration } from '@packages/core/styles/transitions';
import "./index.scss"; 


const Collapse = React.forwardRef(function(props, ref) {
    const {
        prefixCls: customizePrefixCls,
        className,
        TransitionComponent = Transition,
        component: Component = 'div',
        children,
        visible: visibleProp,
        onEnter,
        onEntered,
        onEntering,
        onExit,
        onExited,
        onExiting,
        collapsedHeight: collapsedHeightProp = '0px',
        timeout = duration.standard,
        style,
        ...other
    } = props;

    const wrapperRef = React.useRef(null);

    const collapsedHeight =
        typeof collapsedHeightProp === 'number' ? `${collapsedHeightProp}px` : collapsedHeightProp;

    const prefixCls = usePrefixCls('Transition-Collapse', customizePrefixCls);

    const handleEnter = (node, isAppearing) => {
        node.style.height = collapsedHeight;

        onEnter?.(node, isAppearing);
    };

    const handleEntering = (node, isAppearing) => {
        const wrapperHeight = wrapperRef.current ? wrapperRef.current.clientHeight : 0;

        node.style.transitionDuration = `${timeout && timeout.enter?timeout.enter:timeout}ms`;

        node.style.height = `${wrapperHeight}px`;

        onEntering?.(node, isAppearing)

    };

    const handleEntered = (node, isAppearing) => {
        node.style.height = 'auto';
        onEntered?.(node, isAppearing)
    };

    const handleExit = node => {
        const wrapperHeight = wrapperRef.current ? wrapperRef.current.clientHeight : 0;
        node.style.height = `${wrapperHeight}px`;
        onExit?.(node)
    };

    const handleExiting = node => {
        const wrapperHeight = wrapperRef.current ? wrapperRef.current.clientHeight : 0;
 
        node.style.transitionDuration = `${timeout && timeout.leave?timeout.leave:timeout}ms`;
     
        node.style.height = collapsedHeight;

        onExiting?.(node);

    };

    return (
        <TransitionComponent
            in={visibleProp}
            onEnter={handleEnter}
            onEntered={handleEntered}
            onEntering={handleEntering}
            onExit={handleExit} 
            onExiting={handleExiting} 
            timeout={timeout === 'auto' ? null : timeout}
            {...other}
        >
            {(state, childProps) => (
                <Component
                    className={classNames(
                        `${prefixCls}-Container`,
                        {
                            [`${prefixCls}-Entered`]: state === 'entered',
                            [`${prefixCls}-Hidden`]: state === 'exited' && !visibleProp && collapsedHeight === '0px',
                        },
                        className,
                    )}
                    style={{
                        minHeight: collapsedHeight,
                        ...style,
                    }}
                    ref={ref}
                    {...childProps}
                >
                    <div className={`${prefixCls}-Wrapper`} ref={wrapperRef}>
                        <div className={`${prefixCls}-WrapperInner`}>{children}</div>
                    </div>
                </Component>
            )}
        </TransitionComponent>
    )
});
 

export default Collapse;

//index.scss样式

@import "../styles/variable.scss";

$prefixCls:"#{$global-prefix}-Transition";

.#{$prefixCls}{
    
    &-Collapse{
        
        &-Container{
            height: 0;
            overflow: hidden;
            transition-property: height;
        }

        &-Entered{
            height: auto;
            overflow: visible;
        }
       
        &-Hidden{
            visibility: hidden;
        }

        &-Wrapper{
            display: flex;

            &Inner{
                width:100%;
            }
        }


    
    }
    
}
```
 
 # 七、Slide滑动组件（从屏幕边缘划入）

 <blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
这个组件在抽屉组件中常用到。
</blockquote>
 
```js

import React,{ useEffect, useRef } from 'react';
import PropTypes from 'prop-types'; 
import { Transition } from 'react-transition-group';
import { duration } from '@packages/core/styles/transitions';
import useForkRef from '@packages/hooks/useForkRef';
import "./index.scss";


export function setTranslateValue(direction, node) {
    const transform = getTranslateValue(direction, node);
 
    if (transform) {
        node.style.webkitTransform = transform;
        node.style.transform = transform;
    }
}

function getTranslateValue(direction, node) {
    const rect = node.getBoundingClientRect();
 
    let transform;

    if (node.fakeTransform) {
        transform = node.fakeTransform;
    } else {
        const computedStyle = window.getComputedStyle(node);
        transform =
            computedStyle.getPropertyValue('-webkit-transform') ||
            computedStyle.getPropertyValue('transform');
    }

    let offsetX = 0;
    let offsetY = 0;

    if (transform && transform !== 'none' && typeof transform === 'string') {
        const transformValues = transform
            .split('(')[1]
            .split(')')[0]
            .split(',');
        offsetX = parseInt(transformValues[4], 10);
        offsetY = parseInt(transformValues[5], 10);
    }

    if (direction === 'left') {
        return `translateX(${window.innerWidth}px) translateX(-${rect.left - offsetX}px)`;
    }

    if (direction === 'right') {
        return `translateX(-${rect.left + rect.width - offsetX}px)`;
    }

    if (direction === 'up') {
        return `translateY(${window.innerHeight}px) translateY(-${rect.top - offsetY}px)`;
    }

    // direction === 'down'
    return `translateY(-${rect.top + rect.height - offsetY}px)`;
}

const Slide = React.forwardRef(function (props, ref) {
    const {
        prefixCls: customizePrefixCls,
        className,
        direction = 'down',
        TransitionComponent = Transition,
        children,
        visible: visibleProp,
        onEnter,
        onEntered,
        onEntering,
        onExit,
        onExited,
        onExiting,
        timeout = {
            enter: duration.enteringScreen,
            exit: duration.leavingScreen
        },
        style,
        ...other
    } = props; 

    const childrenRef = useRef(null);

    const handleEnter = (_, isAppearing)=>{

        const node = childrenRef.current; 

        setTranslateValue(direction, node);

        onEnter?.(node, isAppearing);

    };

    const handleEntering = (_, isAppearing) => {
        const node = childrenRef.current;
         
        node.style.webkitTransition=`transform ${timeout && timeout.enter ? timeout.enter : timeout}ms cubic-bezier(0, 0, 0.2, 1) 0ms`;
        node.style.transition=`transform ${timeout && timeout.enter ? timeout.enter : timeout}ms cubic-bezier(0, 0, 0.2, 1) 0ms`;
        node.style.webkitTransform = 'none';
        node.style.transform = 'none';

        onEntering?.(node,isAppearing);
         
      };

    const handleExit = (node, isAppearing)=>{

        node.style.webkitTransition = `transform ${timeout && timeout.exit ? timeout.exit : timeout}ms`;
        node.style.transition = `transform ${timeout && timeout.exit ? timeout.exit : timeout}ms`;

        setTranslateValue(direction, node);

        onExit?.(node, isAppearing);

    };

    const handleExited=()=>{
        const node = childrenRef.current;
        node.style.webkitTransition="";
        node.style.transition="";
        onExited?.(node)
    }


    const handleRef = useForkRef(childrenRef, children.ref, ref);

    useEffect(()=>{
        if(!visibleProp){
            if (childrenRef.current) {
                setTranslateValue(direction, childrenRef.current);
            }
        }
    },[visibleProp])

    return (
        <TransitionComponent 
            in={visibleProp}
            onEnter={handleEnter} 
            onEntering={handleEntering}
            onExit={handleExit}
            onExited={handleExited} 
            timeout={timeout}
            {...other}
        >
            {
                (state, childProps) => {
                    return React.cloneElement(children, {
                        style: {
                            visibility: state === 'exited' && !visibleProp ? 'hidden' : undefined,
                            ...style,
                            ...children.props.style,
                        },
                        ref: handleRef,
                        ...childProps
                    })
                }
            }
        </TransitionComponent>
    )
});

 

export default Slide;
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
要点分析：<br />
1. 自定义setTranslateValue函数通过getBoundingClientRect和方向来计算并设置节点的translateX/translateY。<br />
2.记得在in为false的情况下，需要设置translate效果，否则无法过渡。
</blockquote>  
 



# 八、Transition组件设计核心要素

## 1.Hooks函数:useForkRef 

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
 在这里我们介绍一个hooks函数，这个函数可以同时设置多个Ref节点变量，很实用哦！
</blockquote>  


```js
import React from 'react';
import setRef from '@packages/utils/setRef';

export default function useForkRef(...refs){
    return React.useMemo(()=>{
        if (refs.every(item=>item==null)) {
            return null;
        }
        return refValue => {  
            for(let i=0;i<refs.length;i++){
                setRef(refs[i],refValue)
            }
        };
    },[refs])
}

//setRef
export default function setRef(ref, value) {
 
    if (typeof ref === 'function') {
      ref(value);
    } else if (ref) { 
      ref.current = value;
    } 
}

```

## 2.reflow函数

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
浏览器触发了<a href="https://blog.csdn.net/mxydl2009/article/details/94625340">重排和重绘</a>
</blockquote>  