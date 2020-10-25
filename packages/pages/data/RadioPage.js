

import React from 'react';
import Radio from '@packages/core/Radio';   
 

const Page=(props)=>{
    return (
        <div> 
            <Radio>Radio</Radio>
            <Radio.Group name="radiogroup" defaultValue={1}>
                <Radio value={1}>A</Radio>
                <Radio value={2}>B</Radio>
                <Radio value={3}>C</Radio>
                <Radio value={4}>D</Radio>
            </Radio.Group>
        </div>
    )
}

export default Page;        