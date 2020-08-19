import React from 'react';
import Button from '@packages/core/Button';
import Space from '@packages/core/Space'; 


const Page= React.forwardRef((props,ref)=>{
    return <React.Fragment>
        <Space>
      
            <Button>DEFAULT</Button>
            <Button color="primary">PRIMARY</Button>
            <Button color="danger">SECONDARY</Button>
            <Button color="second">测试</Button>
            <Button color="warning">测试</Button>
            <Button color="success">测试</Button>
            <Button color="info">测试</Button>
        </Space>
    </React.Fragment>
});

export default Page;