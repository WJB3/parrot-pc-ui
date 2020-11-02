

import React from 'react';
import List from 'rc-virtual-list';
import VirtualList from '@packages/core/VirtualList';
import { Tree } from 'antd';  
 
import 'antd/dist/antd.css';

const Page=(props)=>{
  
    return (
        <div> 
            <List data={new Array(100).fill("").map((_,index)=>index+1)} fullHeight={false} height={200} itemHeight={30} itemKey="id">
                {index => <div>{index}</div>}
            </List>
            {/* <VirtualList data={new Array(100).fill("").map((_,index)=>index+1)} height={200} itemHeight={30} itemKey="id">
                {index => <div>{index}</div>}
            </VirtualList> */}
        </div>
    )
}

export default Page;        