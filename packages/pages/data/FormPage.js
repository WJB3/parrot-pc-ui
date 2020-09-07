import React from 'react';
import Form, { useForm } from '@packages/core/Form';

const Page = React.forwardRef((props, ref) => {
    return <React.Fragment>
        <Form
            name="basic"
        >
            <Form.Item
                label="Username"
                name="username" 
            >
                <input />
            </Form.Item> 
        </Form>
    </React.Fragment>
});

export default Page;