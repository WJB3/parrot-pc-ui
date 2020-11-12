

import React ,{ useEffect, useState,useRef } from 'react';
import Switch from '@packages/core/Switch'; 
import { Copy,ArrowUp,ArrowDown } from '@packages/core/Icon'; 
import Tree from '@packages/core/Tree'; 
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

    return (
        <div> 
            <Tree 
                treeData={treeData}
                defaultExpandedKeys={["0-0-0-1"]} 
            />


            <button onClick={()=>setPropCount(propCount+1)}>propCount+1</button>
            <button onClick={()=>setStateCount(stateCount+1)}>stateCount+1</button>
   
            <Demo 
              stateCount={stateCount}
              propCount={propCount}
            />
        </div>
    )
}

 

export default Page;        