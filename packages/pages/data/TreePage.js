

import React ,{ useEffect, useState,useRef } from 'react';   
import Tree from '@packages/core/Tree';  
import { Button, message } from 'antd'; 
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

const key = 'updatable';
 
const Page=(props)=>{   

    const openMessage = () => {
      message.loading({ content: 'Loading...', key });
      setTimeout(() => {
        message.success({ content: 'Loaded!', key, duration: 2 });
      }, 1000);
    };

    return (
        <div> 
            <Tree 
              treeData={treeData}  
            />  
             <Button type="primary" onClick={openMessage}>
              Open the message box
            </Button>
        </div>
    )
}
 

export default Page;        