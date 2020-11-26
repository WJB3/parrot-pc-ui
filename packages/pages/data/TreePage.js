

import React ,{ useEffect, useState,useRef } from 'react';   
import Tree from '@packages/core/Tree';   
import 'antd/dist/antd.css';
  
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
 
const Page=(props)=>{   
    return (
        <div> 
            <Tree 
              treeData={treeData}  
            />  
        </div>
    )
}
 

export default Page;        