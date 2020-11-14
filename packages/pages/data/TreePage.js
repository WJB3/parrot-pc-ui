

import React ,{ useEffect, useState,useRef } from 'react';  
import Button from '@packages/core/Button'; 
import Tree from '@packages/core/Tree';  
import { Tree as ATree} from 'antd';   
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

    const [expandedKeys,setExpandedKeys]=useState(["0-0-0"]);
    const [checkedKeys,setCheckedKeys]=useState(["0-0-0-0"]);

    return (
        <div> 
            <Tree 
                treeData={treeData}
                defaultExpandAll
                defaultSelectedKeys={['0-0','0-0-0-0']} 
                height={50}
            />

            <div style={{height:200}}></div>

            <ATree 
                treeData={treeData}
                defaultExpandAll
                filterTreeNode={(node)=>node.key=="0-0"}
            />
 

            <Button onClick={()=>setCheckedKeys(["0-0"])}>点击切换</Button>
        </div>
    )
}

 

export default Page;        