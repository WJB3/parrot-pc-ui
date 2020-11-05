

import React, { useLayoutEffect, useEffect,useRef } from 'react';
import List from 'rc-virtual-list';
import VirtualList from '@packages/core/VirtualList2';
import axios from 'axios';
import { Tree } from 'antd';  
 
import 'antd/dist/antd.css';
 

const Page=(props)=>{
 
    useEffect(()=>{
        
    },[])
    
    return (
        <>     
            {/* {new Array(100000).fill("").map((_,index)=>index+1).map(index=> <div style={{backgroundColor:`rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},1)`}}>
                <div><div><div>{index}</div></div></div>
                <div><div><div>{index}</div></div></div>
                <div><div><div>{index}</div></div></div>
            </div>)} */}

            <List data={new Array(100000).fill("").map((_,index)=>index+1)} height={800} itemHeight={30} itemKey="id">
                {index=> <div style={{backgroundColor:`rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},1)`}}>
                    <div><div><div>{index}</div></div></div>
                    <div><div><div>{index}</div></div></div>
                    <div><div><div>{index}</div></div></div>
                </div>} 
            </List>
        </>
    )
}

export default Page;        