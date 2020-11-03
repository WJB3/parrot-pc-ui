

import React, { useLayoutEffect, useEffect,useRef } from 'react';
import List from 'rc-virtual-list';
import VirtualList from '@packages/core/VirtualList';
import axios from 'axios';
import { Tree } from 'antd';  
 
import 'antd/dist/antd.css';
 

const Page=(props)=>{

    const sss=useRef();
    const ssss=useRef();
    
    return (
        <>  
           
            {/* <List data={new Array(100).fill("").map((_,index)=>({"value":index+1,"id":index+1}))} fullHeight={false} height={200} itemHeight={30} itemKey="id">
                {index => <div>{index.value}</div>}
            </List> */}
            <VirtualList data={new Array(100).fill("").map((_,index)=>index+1)} height={200} itemHeight={30} itemKey="id">
                {index => <div >{index}</div>}
            </VirtualList>
        </>
    )
}

export default Page;        