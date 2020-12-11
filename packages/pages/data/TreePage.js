

import React ,{ useEffect, useState,useRef } from 'react';   
import Tree from '@packages/core/Tree';  
import CTree from '@packages/core/CTree';  
import STree from '@packages/core/STree';  
import { Button, message,Tree as TreeA } from 'antd'; 
import 'antd/dist/antd.css';

const treeData2=[
  {
    title: 'parent 1',
    key: '0-0', 
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',  
      },
      {
        title: 'parent 1-1',
        key: '0-0-1' 
      },
    ],
  }
];
  
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

    const [auto,setAuto]=useState(false); 

    return (
        <div> 
            {/* <Tree 
              treeData={treeData}   
              defaultExpandedKeys={['0-0-0']} 
              defaultExpandParent={false}
              blockNode
            />   */}
            {/* <CTree
              treeData={treeData}   
              defaultExpandedKeys={['0-0-0']}    
              defaultExpandParent={false}
              blockNode
            />   */}
            <STree 
              treeData={treeData}  
              defaultExpandedKeys={['0-0-0-0','0-0-0-0']} 
              defaultExpandParent={false}
            />
            <TreeA
              treeData={treeData}   
              multiple 
            />  
            <Button type="primary" onClick={()=>setAuto(true)}>
              切换expandParent
            </Button>
             <Button type="primary" onClick={openMessage}>
              Open the message box
            </Button>
        </div>
    )
}
 

export default Page;        