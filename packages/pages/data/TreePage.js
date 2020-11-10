

import React ,{ useEffect, useState } from 'react';
import Switch from '@packages/core/Switch'; 
import { ArrowUp,ArrowDown } from '@packages/core/Icon'; 
import Tree from '@packages/core/Tree'; 
import { Tree as ATree} from 'antd';  
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
              isLeaf:true,
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
      //location.href="http://api.erp.com/v1/indent/pdd/gettoken";
    },[])


    return (
        <div> 


            <ATree   
                treeData={treeData}
                defaultExpandedKeys={["0-0-0-1"]}   
            />

            <Tree 
              treeData={treeData}
            />

   
        </div>
    )
}

function Demo(props){

  const [count,setCount]=useState(props.count);

  return <div>{count}</div>

}

export default Page;        