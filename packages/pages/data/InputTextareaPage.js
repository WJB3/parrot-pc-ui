

import React from 'react';
import InputTextarea from '@packages/core/InputTextarea';  
import {Input} from 'antd';
// import 'antd/dist/antd.css';

const Page=(props)=>{
    return (
        <div> 
            <InputTextarea autoSize style={{width:256}}  placeholder="Basic usage"  /> 
            <InputTextarea style={{width:256}} autoSize placeholder="Basic usage"  /> 
            {/* <Input.TextArea
                placeholder="nes"
                autoSize
            />
              */}
        </div>
    )
}

export default Page;    