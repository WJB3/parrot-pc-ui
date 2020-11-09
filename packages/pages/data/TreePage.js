

import React ,{ useState } from 'react';
import Switch from '@packages/core/Switch'; 
import { Tree } from 'antd';  
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

    return (
        <div> 
            <Tree   
                treeData={treeData}
                defaultExpandedKeys={["0-0-0-1"]}   
            />

            
        </div>
    )
}

function Demo(props){

  const [count,setCount]=useState(props.count);

  return <div>{count}</div>

}

export default Page;        