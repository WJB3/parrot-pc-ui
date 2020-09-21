

import React from 'react';
import InputText from '@packages/core/InputText';  

const Page=(props)=>{
    return (
        <div> 
            <InputText size="large" allowClear placeholder="Basic usage" maxLength={5} prefix={"A"} suffix={"A"} /> 
        
        </div>
    )
}

export default Page;    