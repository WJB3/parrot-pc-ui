

import React from 'react';
import DatePicker from '@packages/core/DatePicker';  
import "./index.scss";

const Page=(props)=>{
    return (
        <div style={{padding:200}}> 
            <DatePicker 
                type="month"
            /> 
 
        
        </div>
    )
}

export default Page;    