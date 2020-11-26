

import React, { useLayoutEffect, useEffect,useRef, useCallback,useState } from 'react';
import List from 'rc-virtual-list'; 
import VirtualList from '@packages/core/VirtualList';
//import useChildren from '@packages/core/VirtualList/hooks/useChildren';
import axios from 'axios';
import { Tree } from 'antd';  
 
import 'antd/dist/antd.css';
 

const Page=(props)=>{
 
    useEffect(()=>{
         
    },[])
 
    
    return (
        <>     
            <VirtualList data={new Array(1000000).fill("").map((_,index)=>({id:index+1,item:index+1}))} height={800} itemHeight={30} itemKey="id">
                {index=> <div>
                    <div><div><div>{index.item}</div></div></div>
                    <div><div><div>{index.item}</div></div></div>
                    <div><div><div>{index.item}</div></div></div>
                </div>} 
            </VirtualList>
        </>
    )
}

export default Page;        