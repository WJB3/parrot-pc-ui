

import React, { useEffect } from 'react';
import List from 'rc-virtual-list';
import VirtualList from '@packages/core/VirtualList';
import axios from 'axios';
import { Tree } from 'antd';  
 
import 'antd/dist/antd.css';

let a=0;
function testDemo(){
    a++;
    let c=a;
    console.log("testDemo")
    Promise.resolve().then(()=>{
        console.log("resolve")
        console.log(a)
        console.log(c)
        console.log("--------")
    })    
}

const Page=(props)=>{

   
    useEffect(()=>{
        // for(let i=0;i<10;i++){
        //     testDemo();
        // }
    },[])

    return (
        <div> 
            {/* <List data={new Array(100).fill("").map((_,index)=>index+1)} fullHeight={false} height={200} itemHeight={30} itemKey="id">
                {index => <div>{index}</div>}
            </List> */} 
            <VirtualList data={new Array(100).fill("").map((_,index)=>index+1)} height={200} itemHeight={30} itemKey="id">
                {index => <div>{index}</div>}
            </VirtualList>
        </div>
    )
}

export default Page;        