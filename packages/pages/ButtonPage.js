import React from 'react';
import Button from '@packages/core/Button';


const Page= React.forwardRef((props,ref)=>{
    return <React.Fragment>
        <Button>测试</Button>
        <Button color="primary">测试</Button>
        <Button color="danger">测试</Button>
        <Button color="second">测试</Button>
        <Button color="warning">测试</Button>
        <Button color="success">测试</Button>
        <Button color="info">测试</Button>
    </React.Fragment>
});

export default Page;