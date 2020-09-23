

import React from 'react';
import InputNumber from '@packages/core/InputNumber';  
import InputText from '@packages/core/InputText';  
import { InputNumber as  InputNumberA} from 'antd';
import 'antd/dist/antd.css';

const Page=(props)=>{
    return (
        <div> 
            <InputNumber  defaultValue={"卧槽"}   step={2} style={{width:256}}  placeholder="Basic usage"  />    
            <InputNumberA   defaultValue={"卧槽"}   style={{width:256}}  placeholder="Basic usage"  />    
            <InputText   value={"卧槽"}   style={{width:256}}  placeholder="Basic usage"  />    
        </div>
    )
}

export default Page;        