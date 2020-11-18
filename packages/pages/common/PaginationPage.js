

import React from 'react'; 
import 'antd/dist/antd.css'; 
import Pagination from '@packages/core/Pagination';
import PaginationM from '@material-ui/lab/Pagination';
import { Pagination as PaginationA } from 'antd';
 
const Page=(props)=>{
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

        </div>
    )
}

export default Page;        