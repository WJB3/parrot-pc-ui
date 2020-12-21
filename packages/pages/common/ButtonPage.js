import React from 'react';
import Button from '@packages/core/Button'; 
import Space from '@packages/core/Space';


const Page= React.forwardRef((props,ref)=>{
    return <React.Fragment>
        <Space>
        <Button color="primary" >测试</Button>
        <Button color="default">测试</Button>
        <Button color="danger">测试</Button>
        <Button color="info">测试</Button>
        <Button color="success">测试</Button> 
        </Space>
        <Space>
        <Button color="primary" type="text">测试</Button>
        <Button color="default" type="text">测试</Button>
        <Button color="danger" type="text">测试</Button>
        <Button color="info" type="text">测试</Button>
        <Button color="success" type="text">测试</Button> 
        </Space>
        <Space>
        <Button color="primary" outline>测试</Button>
        <Button color="default"   outline>测试</Button>
        <Button color="danger"   outline>测试</Button>
        <Button color="info"  outline>测试</Button>
        <Button color="success"  outline>测试</Button> 
        </Space>
    </React.Fragment>
});

export default Page;