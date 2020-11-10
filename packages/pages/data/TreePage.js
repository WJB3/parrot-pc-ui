

import React ,{ useEffect, useState } from 'react';
import Switch from '@packages/core/Switch'; 
import { ArrowUp,ArrowDown } from '@packages/core/Icon'; 
import { Tree } from 'antd';  
<<<<<<< HEAD
import axios from 'axios';
=======

>>>>>>> 072b6219dff8451c72fa5abccde67e309bd11d00
import 'antd/dist/antd.css';

const Page=(props)=>{

    const [count,setCount]=useState(1);

    const treeData = [
        {
          title: 'parent 1',
          key: '0-0',
          children: [
            {
              title: 'parent 1-0',
              key: '0-0-0', 
              children:[
                {
                  title:"parent 1-0-0",
                  key: '0-0-0-0', 
                },
                {
                  title:"parent 1-0-1",
                  key: '0-0-0-1', 
                }
              ]
            },
            {
              title: 'parent 1-1',
              key: '0-0-1' 
            },
          ],
        }
    ];

    useEffect(()=>{
      location.href="http://api.erp.com/v1/indent/pdd/gettoken";
    },[])


    return (
        <div> 


            <Tree   
                treeData={treeData}
                defaultExpandedKeys={["0-0-0-1"]}   
            />

  
          <ArrowUp style={{fontSize:24}}/>
          <ArrowDown style={{fontSize:24}}/>
        </div>
    )
}

function Demo(props){

  const [count,setCount]=useState(props.count);

  return <div>{count}</div>

}

export default Page;        