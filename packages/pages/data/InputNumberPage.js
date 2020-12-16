

import React from 'react';
import InputNumber from '@packages/core/InputNumber';  
import InputText from '@packages/core/InputText';  
import { InputNumber as  InputNumberA} from 'antd';
import 'antd/dist/antd.css';

const Page=(props)=>{
    return (
        <div> 
            <InputNumber 
                 
                style={{width:256}}  
                placeholder="Basic usage" 
                onChange={(value)=>console.log(value)} 
            />    

           
        
        </div>
    )
}

export default Page;        