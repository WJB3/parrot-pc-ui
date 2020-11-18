

import React, { useState } from 'react'; 
import 'antd/dist/antd.css'; 
import Pagination from '@packages/core/Pagination';
import PaginationM from '@material-ui/lab/Pagination';
import { Pagination as PaginationA } from 'antd';

//返回true 表示复用上一次渲染的内容
const MemoContext=React.memo(
    ({children})=>children,
    (prev,next)=>true
)
 
const Page=(props)=>{

    const [count,setCount]=useState(0);


    return (
        <div style={{padding:200}}>  
            <PaginationA total={60} showLessItems/>
            <Pagination 
                defaultCurrent={1} 
                total={60} 
                jumpNumber={10} 
                defaultPageSize={2} 
                pageSizeOptions={[2,4,6]} 
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                showQuickJumper
            />   

            <button onClick={()=>setCount(count+1)}>click me!</button>

            <MemoContext>
                <div>{count}</div>
            </MemoContext>

        </div>
    )
}

export default Page;        