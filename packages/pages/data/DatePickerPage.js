

import React from 'react';
import DatePicker from '@packages/core/DatePicker';  
import Space from '@packages/core/Space';
import "./index.scss";

const Page=(props)=>{
    return (
        <Space style={{padding:200}}> 
            <DatePicker 
                type="day"
                onChange={(value)=>console.log(value)}
          
            /> 

            <DatePicker 
                type="month"
                onChange={(value)=>console.log(value)}
              
            /> 
        
            <DatePicker 
                type="year"
                onChange={(value)=>console.log(value)}
                
            /> 
        </Space>
    )
}

export default Page;    