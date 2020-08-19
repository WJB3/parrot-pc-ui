import React from 'react';
import Avatar from '@packages/core/Avatar';
import Space from '@packages/core/Space'; 
import Paper from '@packages/core/Paper'; 
import Image1 from '@packages/assets/images/1.jpg';


const Page= React.forwardRef((props,ref)=>{
    return <React.Fragment>
        <Space>
            <Paper >
                <Avatar src={Image1} />
            </Paper>
        </Space>
    </React.Fragment>
});

export default Page;