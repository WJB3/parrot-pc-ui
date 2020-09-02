import React from 'react';
import Breadcrumb from '@packages/core/Breadcrumb';
import Button from '@packages/core/Button';


const Page = React.forwardRef((props, ref) => {
    return   <Breadcrumb separator="@">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
               Application Center 
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                 Application List 
            </Breadcrumb.Item>
            <Breadcrumb.Item>An Application</Breadcrumb.Item>
        </Breadcrumb>
   
});

export default Page;