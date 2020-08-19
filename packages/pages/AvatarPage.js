import React from 'react';
import Avatar from '@packages/core/Avatar';
import Space from '@packages/core/Space'; 
import Paper from '@packages/core/Paper'; 
import Image1 from '@packages/assets/images/1.jpg';
import Tabs from '@packages/core/Tabs';


const Page= React.forwardRef((props,ref)=>{
    return <React.Fragment>
        <Tabs >
            <div tab="1">1</div>
            <div tab="2">2</div>
            <div tab="3">3</div>
        </Tabs>
    </React.Fragment>
});

export default Page;