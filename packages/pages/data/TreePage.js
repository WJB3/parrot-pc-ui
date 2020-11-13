

import React ,{ useEffect, useState,useRef } from 'react';  
import Button from '@packages/core/Button'; 
import Tree from '@packages/core/Tree'; 
import Checkbox from '@packages/core/Checkbox'; 
import { Tree as ATree} from 'antd';  
import useControlled from '@packages/hooks/useControlled';
import 'antd/dist/antd.css';

const Demo=(props)=>{

  const [stateCount]=useControlled({
    controlled:undefined,
    default:props.stateCount
  });

  console.log(stateCount);

  const [count,setCount]=useState(stateCount)

  const propC=useRef(props.propCount);

  return <div>
    <p>{count}</p>
    <p>{propC.current}</p>
  </div>
}

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
    
    const [ propCount,setPropCount ]=useState(0);
    const [ stateCount,setStateCount ]=useState(0);

    const [expandedKeys,setExpandedKeys]=useState(["0-0-0"]);
    const [checkedKeys,setCheckedKeys]=useState(["0-0-0-0"]);

    return (
        <div> 
            <Tree 
                treeData={treeData}
                defaultExpandedKeys={expandedKeys}  
                blockNode
                checkable
                defaultCheckedKeys={checkedKeys}
            />

            <ATree 
                treeData={treeData}
                defaultExpandedKeys={expandedKeys}  
                blockNode
                checkable
                defaultCheckedKeys={checkedKeys}
            />
 

            <Button onClick={()=>setExpandedKeys(["0-0"])}>点击切换</Button>
        </div>
    )
}

 

export default Page;        