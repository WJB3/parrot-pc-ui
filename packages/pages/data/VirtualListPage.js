

import React, { useLayoutEffect, useEffect,useRef, useCallback,useState } from 'react';
import List from 'rc-virtual-list';
import VirtualList2 from '@packages/core/VirtualList2';
import useChildren from '@packages/core/VirtualList/hooks/useChildren';
import axios from 'axios';
import { Tree } from 'antd';  
 
import 'antd/dist/antd.css';
 

const Page=(props)=>{
 
    useEffect(()=>{
         
    },[])

    const [start,setStart]=useState(0)
    const [end,setEnd]=useState(1)
 
    
    return (
        <>     
            
            {/* {useChildren()} */}
            {useChildren([{"a":1},{"a":2},{"a":3},{"a":4}],start,end,()=>{},(item)=><div>{item.a}</div>)}
            <button onClick={()=>{ 
                setEnd(2)
            }}>{"a"}</button>
        </>
    )
}

export default Page;        