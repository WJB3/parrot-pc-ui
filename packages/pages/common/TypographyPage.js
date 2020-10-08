import React from 'react';
import Typography from '@packages/core/Typography';


const Page= React.forwardRef((props,ref)=>{
    return <React.Fragment>
        <Typography.Text color="primary" strong>
            Ant Defaulty
        </Typography.Text>
        <Typography.Link href="https://www.baidu.com" target="_blank">
            百度一下
        </Typography.Link>
        <Typography.Title>
            h1.Parrot h1
        </Typography.Title>
        <Typography.Title level={2}>
            h2.Parrot h2
        </Typography.Title>
        <Typography.Title level={3}>
            h3.Parrot h3
        </Typography.Title>
        <Typography.Title level={4}>
            h4.Parrot h4
        </Typography.Title>
        <Typography.Title level={5}>
            h5.Parrot h5
        </Typography.Title>
    </React.Fragment>
});

export default Page;