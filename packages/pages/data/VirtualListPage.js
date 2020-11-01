

import React from 'react';
import List from 'rc-virtual-list';
import { Tree } from 'antd';  
 
import 'antd/dist/antd.css';

const Page=(props)=>{
 

    return (
        <div> 
            <List data={new Array(100).fill("").map((_,index)=>index+1)} height={200} itemHeight={30} itemKey="id">
            {index => <div>{index}</div>}
            </List>
        </div>
    )
}

export default Page;        