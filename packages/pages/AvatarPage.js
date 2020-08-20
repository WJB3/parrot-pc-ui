import React from 'react';
import Avatar from '@packages/core/Avatar';
import Space from '@packages/core/Space'; 
import Paper from '@packages/core/Paper'; 
import Image1 from '@packages/assets/images/1.jpg';
import Tabs from '@packages/core/Tabs';


const Page= React.forwardRef((props,ref)=>{
    return <React.Fragment>
        <Paper square >
        <Tabs >
            <div  tab="Tab 1" key="1">1</div>
            <div  tab="Tab 2" key="2">2</div>
            <div  tab="Tab 3" key="3">3</div>
        </Tabs>
        </Paper>
    </React.Fragment>
});

export default Page;