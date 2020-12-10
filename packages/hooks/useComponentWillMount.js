

import React from 'react';

//模拟class的componentWillMount声明周期，在渲染前执行一次
export default function useComponentWillMount(func){

    const willMount=React.useRef(true);

    if(willMount.current){
        func();
    }

    willMount.current=false;

}