

import React from 'react'; 
import 'antd/dist/antd.css'; 
import Pagination from '@packages/core/Pagination';
import { Pagination as PaginationA } from 'antd';
 
const Page=(props)=>{
    return (
        <div style={{padding:200}}> 
            <PaginationA defaultCurrent={1} total={60} />
            <PaginationA defaultCurrent={1} total={50} />
            <PaginationA defaultCurrent={1} total={70} />
            <PaginationA defaultCurrent={1} total={80} />
            <Pagination defaultCurrent={1} total={50} />
            <Pagination defaultCurrent={1} total={50} />
            <Pagination defaultCurrent={1} total={50} color="primary" />
        </div>
    )
}

export default Page;        