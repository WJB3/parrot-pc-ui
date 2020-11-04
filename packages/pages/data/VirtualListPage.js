

import React, { useLayoutEffect, useEffect,useRef } from 'react';
import List from 'rc-virtual-list';
import VirtualList from '@packages/core/VirtualList';
import axios from 'axios';
import { Tree } from 'antd';  
 
import 'antd/dist/antd.css';
 

const Page=(props)=>{

    const sss=useRef();
    const ssss=useRef();

    useEffect(()=>{
        // window.addEventListener("scroll",function(){console.log("virtualpagescroll")})
        // document.getElementById("root").addEventListener("scroll",function(){console.log("virtusssalpagescroll")})
        //window.onscroll=(e)=>{console.log("virtualpagescroll")}
    },[])
    
    return (
        <>     
            {new Array(100000).fill("").map((_,index)=>index+1).map(index=> <div style={{color:`rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},1)`}}>{index}</div>)})}

            {/* <List data={new Array(10000).fill("").map((_,index)=>index+1)} height={200} itemHeight={30} itemKey="id">
                {index => <div style={{color:`rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},1)`}}>{index}</div>}
            </List> */}
        </>
    )
}

export default Page;        