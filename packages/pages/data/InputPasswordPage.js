

import React from 'react';
import InputPassword from '@packages/core/InputPassword';    
import {
    Add,
    CloseSquare
} from '@packages/core/Icon';    

const Page=(props)=>{
    return (
        <div> 
            <InputPassword size={"large"}   style={{width:256}}   placeholder="Basic usage"  />   
           
        </div>
    )
}

export default Page;        