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
    根据上文，虚拟列表是按需显示思路的一种实现，即虚拟列表是一种根据滚动容器元素的可视区域来渲染长列表数据中某一个部分数据的技术。
</blockquote>

## 2.为什么需要这个组件

```js
//不使用虚拟列表
{new Array(100000).fill("").map((_,index)=>index+1).map(index=> <div style={{backgroundColor:`rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},1)`}}>
                <div><div><div>{index}</div></div></div>
                <div><div><div>{index}</div></div></div>
                <div><div><div>{index}</div></div></div>
            </div>)}
//使用虚拟列表
<VirtualList data={new Array(100000).fill("").map((_,index)=>index+1)} height={800} itemHeight={30} itemKey="id">
                {index=> <div style={{backgroundColor:`rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},1)`}}>
                    <div><div><div>{index}</div></div></div>
                    <div><div><div>{index}</div></div></div>
                    <div><div><div>{index}</div></div></div>
                </div>} 
            </VirtualList>
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    列表形态的数据格式是一种非常常见的数据展示格式。 <br />
    如果某用户需要有10000条数据在客户端进行展示，那么会产生什么影响呢？<br />
    如上代码：<br />
    1.第一种情况下：在不使用虚拟列表时，浏览器渲染100000条数据时,如下图所示,总渲染时间超过25s，在页面上表现得非常卡顿，这对于用于的体验来说是致命的。<br />
    <img src="./assets/virtuallist/nouse.jpg"><br />
    2.在第二种情况下：在使用虚拟列表时，浏览器渲染100000条数据时，如下图所示，总渲染事件仅仅花了1s，在页面上表现的十分流程，并没有卡顿感。<br />
    <img src="./assets/virtuallist/use.jpg"><br />
</blockquote>

# 二、Virtual-List组件设计
  

## 原理解析

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    虚拟列表本质上是按需渲染。按需渲染是指根据容器元素的高度以及列表项元素的高度来渲染数据。<br >
    <img src="./assets/virtuallist/yuanli.jpg"><br />
    如上图所示，假设容器元素的高度是500px,而列表项元素的height是50px,那么容器元素内此时最多可以显示10个元素项，也就是说当元素初始化的时候，实际上我们只需要渲染十条数据，而不是1000个数据项。<br />
</blockquote> 

```js
//初始化渲染数据
const wantData=originData.splice(0,Math.ceil(containerHeight/itemHeight));
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(247, 31, 85,1); background: rgb(239, 235, 233);line-height:1。5;'>
1.wantData:代表需要展示的数据。<br />
2.originData:代表原始的数据。<br />
3.containerHeight:代表容器元素高度。<br />
4.itemHeight:表示列表项高度。<br />
5.scrollTop:表示容器元素Y轴滚动值。  
</blockquote> 

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    如下图所示，当元素滚动位置如上图所示时：根据前面的计算，此时在容器元素内所能展示的第一个数据项应该是 3，最后一个数据项应该是 13 而不是 12，因为列表项元素 3 是只是部分隐藏了。那么，此时根据 originalData 进行对应的数据项截取即可。
    <img src="./assets/virtuallist/scrolling.jpg"><br />
</blockquote> 

```js
const from=Math.floor(scrollTop/itemHeight);
const to=Math.ceil((scrollTop+containerHeight)/itemHeight); 
const wantData = originalData.slice(from, to)
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    这里我们大概就简述完了我们虚拟滚动的大部分内容。
</blockquote> 


# 三、Virtual-List组件设计核心要素

## 1.组件框架结构大体简述

![哈哈](./assets/virtuallist/div.jpg)


<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    在这里我们要设计这个组件分为2个部分：虚拟列表的主体部分container、滚动条thumb。既然我们需要自己实现虚拟滚动，那么浏览器原生的滚动条必然满足不了我们的需求。
    <br />
    <br />
    VirtualList是组件的最外层的div，主要是为了放置组件的2个主要部分的div的，可以设置<i>position:"relative"</i>为滚动条提供一个父元素定位，滚动条实现时可以使用<i>position:"absolute"</i>很方便实现定位。
    <br />
    <br />
    Container是我们前章节中提到一个高度容器，这里我们设置一个固定高度：<i>height:props.height</i>,因为这里的滚动条我们自己实现，所以我们使用<i>overflow:hidden</i>来隐藏滚动条。
    <br />
    <br />
    ScrollContainer是一个高度为所有元素总高度的一个容器：这里我们需要设置一个<i>height:item.length*item.width</i>,同时为了实现元素向上移动，向下移动时有那种平移的效果，我们需要设置<i>transform:translateY(srollTop px)</i>
    <br />
    <br />
    WantDataChildNode则是我们实际需要在页面渲染的节点，每次滚动条滚动都需要重新渲染新的节点。
    <br />
    <br />
    Thumb-Wrapper是滚动条的容器，一般就是滚动条所在的那个在浏览器右侧的滚动条垂直容器。
    <br />
    <br />
    Thumb是我们的滚动条，这里我们需要实现可以移动滚动条实现列表的滚动、点击滚动条所在容器可以实现列表的移动、在滚轮一定时间内没有滚动或者没有没有拖动滚动条时，滚动条自己隐藏/显示等。
</blockquote> 

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1。5;'>
    根据前文我们可以得出虚拟列表的大致代码结构如下：
</blockquote> 

```js

import React ,{ useContext } from 'react';
import PropTypes from 'prop-types'; 
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import classNames from '@packages/utils/classNames';
import "./index.scss";

const List=React.forwardRef((props,ref)=>{

    const {
        height,
        prefixCls:customizePrefixCls
    }=props;

    const preficCls=useContext(ConfigContext)?.getPrefixCls("VirtualList",customizePrefixCls);

    const containerStyle={
        height,
        overflow:"hidden"
    };

    return <div className={preficCls} style={{position:"relative"}}>

        <div className={`${preficCls}-Container`} style={containerStyle}>
            <div ></div>
        </div>

        <div className={`${prefixCls}-ThumbWrapper`} style={{position:"absolute",width:8,right:0,top:0,bottom:0}}>
            <div className={`${prefixCls}-Thumb`}></div>
        </div>


    </div>
});

List.propTypes = {
    //显示区域的容器高度
    height:PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

export default List;
```

## 2.初始化时应该需要怎么处理？

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    我们回想一下，如果在不使用虚拟列表的情况下，无论是初次渲染还是后期的渲染都会花费巨大的时间，这是为什么呢？
    <br />
    <br />
    因为浏览器每次都要渲染100000个节点，那么我们在初次渲染时就必须控制住渲染节点的数量，那么如何控制渲染节点的数量是我们需要实现的重中之重，默认情况下列表未滚动，也就是scrollTop=0，如果需要计算出初次渲染需要渲染的节点数，必然要结合容器高度和列表的高度：<i>初次渲染节点数=容器高度/单个列表高度</i>。
    <br />
    <br />
    但是在未渲染节点时，我们是无法获取列表的高度的，这个时候itemHeight的属性就起到了关键性作用，即如果在列表没有渲染到页面上时，使用itemHeight来替代单个列表的高度。
</blockquote> 
  
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    第一步：定义state值scrollTop<br />
    <blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(247, 31, 85,1); background: rgb(239, 235, 233);line-height:1.5;'>

JavaScript高级教程第四版16章2节3小节中：scrollTop为内容区顶部隐藏的像素数，设置这个属性可以改变元素的滚动位置。且document.documentElement.scrollTop和document.body.scrollTop同时只有一个属性是有值的。
    </blockquote>
    因为我们是采用的overflow:hidden所以我们实际上是没有真正滚动滚动条来改变scrollTop，所以我们的scrollTop是没有实际作用的，那么我们此时就需要定义一个state来模拟scrollTop。

</blockquote> 

```js
//初始化时scrollTop为0
const [scrollTop,setScrollTop]=useState(0);
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    第二步：计算出渲染元素的总高度和渲染元素对应的起始下标<br />
</blockquote> 

```js
const MIN_HEIGHT=20;

{
    originData,
    itemHeight=MIN_HEIGHT,
}=props;

const getKey=useCallback((item)=>{
        return item[itemKey];
},[itemKey]);

const {startIndex,endIndex,scrollHeight}=useMemo(()=>{
        if(!isVirtual){
            return {
                startIndex:0,
                endIndex:originData.length-1,
                scrollHeight:undefined
            }
        }

        let itemTop=0;
        let startIndex;
        let endIndex; 

        for(let i=0;i<originData.length;i++){
            let itemKey=getKey(originData[i]);  
            let calcuHeight=heights.get(itemKey);
          
            let currentItemBottom=itemTop+(calcuHeight===undefined?itemHeight:calcuHeight);   

            if(currentItemBottom>scrollTop && startIndex===undefined){//如果此时item的高度大于scrollTop 即可以判断出开始下标
                startIndex=i;
            }

            if(currentItemBottom>scrollTop+height  && endIndex===undefined ){
                endIndex=i;
            }

            itemTop=currentItemBottom;
        }
 
        return {
            startIndex:startIndex,
            endIndex:endIndex,
            scrollHeight:itemTop,
        }

},[isVirtual,scrollTop,originData,height,heightMarkedUpdate]); 
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    计算出渲染元素对应的起始坐标可以让我们判断出哪些元素需要被渲染，当我们第一次渲染节点前，我们是无法取到对应节点的高度值的所以这个时候我们就需要拿itemHeight参数来进行判断开始下标和结束下标，当元素对应下边的高度刚好大于scrollTop的大小时，即可判断此元素为开始元素，即可获得对应开始下标。当元素对应的下边高度刚好大于scrollTop+height(可视区域高度)的大小时，即可判断此元素为结束元素，即可获得对应结束下标。每次累加高度即可获取元素对应总高度。
</blockquote> 

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    第三步：渲染元素<br />
</blockquote> 

```js
const viewChildren=useChildren(originData,startIndex,endIndex,setInstanceRef,children,getKey);

function useChildren(originData,startIndex,endIndex,setInstanceRef,renderFunc,getKey){

    return originData.slice(startIndex,endIndex+1).map((item,index)=>{
        const elementIndex=startIndex+index;
        const node=renderFunc(item,elementIndex);
        const key=getKey(item);

        return <Item key={key} setRef={(node)=>{setInstanceRef(item,node)}}>
            {node}
        </Item>
    })
}

const Item=(props)=>{
    
    const {
        children,
        setRef
    }=props;

    const refFunc=useCallback((node)=>{ 
        setRef(node)
    },[]);

    return React.cloneElement(children,{
        ref:refFunc
    })
}
```
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    根据前面得出的startIndex和endIndex我们可以使用slice截取的数据并渲染：<br />
    1.slice() 返回从开始索引到结束索引对应的所有元素，其中不包含结束索引对应的元素。所以我们这里第二个参数加1表示包含最后一个元素。<br />
    2.ref属性可以是一个由 React.createRef() 函数创建的对象、或者一个回调函数、或者一个字符串（遗留 API）。当 ref 属性是一个回调函数时，此函数会（根据元素的类型）接收底层 DOM 元素或 class 实例作为其参数。<br />
    3.ref上使用useCallback可以避免refFunc重复渲染，当再次渲染重复节点时，refFunc会检查内存是否有此函数，如果有的话，就直接返回原函数，并不会继续执行，创建。这里setRef已经计算过了height属性，所以没有必要。
</blockquote> 

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    第四步：计算元素高度<br />
</blockquote> 

```js
const [setInstanceRef,heights,heightMarkedUpdate]=useHeights(getKey); 


import React,{useRef,useState} from 'react';
import { findDOMNode } from 'react-dom';

export default function useHeights(getKey){
    
    let [markedUpdate,setMarkedUpdate]=useState(0);
    let heightsRef=useRef(new Map());
    let instanceRef=useRef(new Map());
    let heightsUpdateRef=useRef(0);
     
    function collectHeight(){
        heightsUpdateRef.current+=1;
        const currentId=heightsUpdateRef.current;

        
        Promise.resolve().then(()=>{
            //这样的写法只有最后一次才会往后执行
            if(currentId!==heightsUpdateRef.current) return;

            instanceRef.current.forEach((instance,key)=>{
                if(instance && instance.offsetParent){
                    const htmlElement = findDOMNode(instance);
                    const { offsetHeight } = htmlElement;
                    if (heightsRef.current.get(key) !== offsetHeight) {
                        heightsRef.current.set(key, htmlElement.offsetHeight);
                    }
                }
            })
            //每次计算出高度都重新计算出
            setMarkedUpdate(m=>m+1);
        })
        
    }

    function setInstanceRef(item,instance){
        const itemKey=getKey(item);
        if(instance){
            instanceRef.current.set(itemKey,instance);
            collectHeight();
        }else{
            instanceRef.current.delete(itemKey);
        }
    }


    return [setInstanceRef,heightsRef.current,markedUpdate]
}
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    前文中我们知道了根据itemHeight得到startIndex、endIndex并渲染出了相应的元素，当元素渲染到界面上时，触发了setRef方法，也就触发了上面setIntanceRef方法，设置完instance后，就触发collectHeight来计算元素的高度，这里采用了Promise.resolve().then()微任务来只渲染一次的效果，微任务是异步任务，当主线程任务当重复触发collectHeight时，只有最后一次才会真正执行到下面，这里使用了一个闭包的用法，currentId这个变量并没有在collectHeight这个方法执行完以后就被销毁了，反而是存在了Promise微任务里，再最后一次collectHeight执行以后再将所有的instance循环获取元素的高度，此时也会更新state。
</blockquote> 

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    上面我们提到了更新state->这个时候会触发重渲染->依赖项有这个state的memo函数更新->startIndex、endIndex变化->渲染节点变化->触发setInstanceRef->更新state->触发重渲染->...........<br />
    由此可以得出这是一个不断渲染计算高度渲染的过程。所以我们应该尽可能小的定义itemHeight,如果ItemHeight过于大的话，会使组件多次渲染，造成性能瓶颈。
</blockquote> 

## 3.滚动时该如何处理？

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    前文中我们实现了初始化状态的组件，那么滚动元素的变化，我们应该如何编写呢？这里我们通过<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/WheelEvent">wheel滚轮事件</a>,这个事件不同于scroll事件。 wheel 事件不一定会触发 scroll 事件。我们只需要监听滚轮事件，然后通过他的deltaY值来作为列表滚动的值。
</blockquote> 

```js
const [onRawWheel]=useFrameWheel(
    (offsetY)=>syncScroll(offsetY)
);

export default function useFrameWheel(syncScroll){
    function onWheel(e){
        e.preventDefault();
        syncScroll(e.deltaY);
    };
    return [onWheel];
}

useEffect(()=>{
    componentRef.current.addEventListener("wheel",onRawWheel);
    ()=>{
        return componentRef.current.removeEventListener("wheel",onRawWheel);
    }
},[]); 
```
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    我们在页面初始化的时候监听滚轮滚动事件，将e.deltaY值回调给List页面，注意e.preventDefault这可以防止外层滚轮滚动，可以作为避免scroll事件滚动冒泡的方法，接下来：
</blockquote> 

```js
const syncScroll=(deltaY)=>{
        setScrollTop((originScrollTop)=>{

            const rangeValue=keepInRange(originScrollTop+deltaY); 

            componentRef.current.scrollTop=rangeValue;  

            return rangeValue;
        })

let maxScrollHeight=scrollHeight-height; 
    let maxScrollHeightRef=useRef(maxScrollHeight);
    maxScrollHeightRef.current=maxScrollHeight;
    
const keepInRange=(value)=>{    
        return Math.min(Math.max(value,0),maxScrollHeightRef.current);
}

<div style={{height:scrollHeight,transform:`translateY(${offsetHeight}px)`}}>{viewChildren}</div>
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
这里有2点值得我们注意：<br />
1.有的同学会很疑惑为什么既要改变scrollTop,又需要改变translate属性，是否是画蛇添足呢？其实不然，试想下如果单纯的使用scrollTop或者translateY能不能达到相同的效果。元素的可视区域是固定的，且元素渲染个数是固定的，如果使用scrollTop会不会导致元素向上移动导致出现空白。同理使用translateY是一样的道理。持续改变scrollTop使元素有向上滑动的动画效果，同时将元素translate向下平移，达到中和的效果。<br />
2.在这里我们使用ref获得maxScrollHeightRef引用，为什么我们需要这么做呢？因为keepInRange中获取不到最新的scrollHeight,也就无法获取最大的滚动值，故就无法实现最大最小值回应。
</blockquote> 


<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
    第五步：编写滚动条元素<br />
</blockquote> 


<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
首先，我们需要计算出这个滚动条的高度，可以想象出来，可视区域高度比上滚动高度大致上等于滚动条高度比上可视区域高度，这里为了更美观，我们给了滚动条一个最小值。
</blockquote> 

```js
//滚动条高度/可视区域=可视区域高度/滚动高度
const thumbWidth=Math.max((height/scrollHeight)*height,MIN_HEIGHT);

<div 
            className={`${prefixCls}-Thumb`}
            style={{
                width:"100%",
                height:thumbWidth,
                top:getTop(),
                left:0, 
                position:"absolute",
                background:dragging.current?"rgba(0,0,0,0.8)":"rgba(0,0,0,0.5)",
                borderRadius:99,
                cursor:"pointer",
                useSelect:"none", 
                display:visible?"block":"none"
            }}   
            onMouseDown={handleMouseDown} 
></div>
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
其次，我们需要计算出滚动条距离顶部的距离给予合适的top值，我们是根据传过来的属性值来算出top值，已知滚动条距离顶部的距离可视区域的scrollTop,即滚动条距离顶部的距离/可视区域内可滚动高度=滚动区域的scroll/滚动区域的可滚动高度。
</blockquote> 

```js
const enableScrollRange=scrollHeight-height||0;

const enableHeightRange=height-thumbWidth||0;

const getTop=()=>{
        //和计算滚动条高度计算方法一致
        //已滚动高度/总可滚动高度=滚动条的top/可视区域总可滚动高度
        if(scrollTop===0){
            return 0;
        }
        return (scrollTop/enableScrollRange)*enableHeightRange;
}
```


<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
既然是模拟滚动条，那么最基础的拖拽滚动条实现元素移动的功能是必须要实现的了。当鼠标按下时，监听鼠标移动和鼠标离开事件。根据比例算出滚动区域需要的scrollTop,再接着回调即可。
</blockquote> 

```js
const patchEvents=()=>{
        window.addEventListener("mousemove",handleMouseMove);
        window.addEventListener("mouseup",handleMouseUp); 
}

const removeEvents=()=>{
        window.removeEventListener("mousemove",handleMouseMove);
        window.removeEventListener("mouseup",handleMouseUp);  
}
const handleMouseDown=(e)=>{
        dragging.current=true;
        setPageY(getPageY(e));
        setStartTop(getTop());
        patchEvents();
}

const handleMouseMove=(e)=>{
        
        if(dragging.current){
            //偏移高度
            const offsetY=getPageY(e)-pageY;
            const newTop=startTop+offsetY; 

            onScroll?.((newTop/enableHeightRange)*enableScrollRange)
        }
}
const handleMouseUp=()=>{
        removeEvents();
        dragging.current=false;
}
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
最后，滚动条不可能一直存在，希望在滚动或者拖拽的时候显示，一定时间内隐藏即可，想必大家已经猜到了定时器哈哈哈。
</blockquote> 

```js
useEffect(()=>{
        if(isInit){
            if(visibleTimeout.current) clearTimeout(visibleTimeout.current);
            setVisible(true)
            visibleTimeout.current=setTimeout(()=>{
                setVisible(false);
            },scrollTimeout);
        }
        return ()=>{
            clearTimeout(visibleTimeout.current);
        }
},[scrollTop,scrollTimeout]); 
```