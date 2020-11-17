

import React from 'react'; 
import 'antd/dist/antd.css'; 
import Pagination from '@packages/core/Pagination';
import PaginationM from '@material-ui/lab/Pagination';
import { Pagination as PaginationA } from 'antd';
 
const Page=(props)=>{
    return (
        <div style={{padding:200}}>  
            <Pagination defaultCurrent={1} total={100} />
            {/* <PaginationM count={20} />  */}
        </div>
    )
}

export default Page;        