import React from 'react';
import Button from '@packages/core/Button';
import Icon from '@packages/icon';


const Page= React.forwardRef((props,ref)=>{
    return <React.Fragment>
        <Button type="text" color="primary" size="small">测试</Button>
        <Button type="text" color="default">测试</Button>
        <Button type="text" color="danger">测试</Button>
        <Button type="text" color="info">测试</Button>
        <Button type="text" color="success">测试</Button>
        
    </React.Fragment>
});

export default Page;