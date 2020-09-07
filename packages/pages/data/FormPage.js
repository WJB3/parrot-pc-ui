import React from 'react';
import Form, { useForm } from '@packages/core/Form';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const Page = React.forwardRef((props, ref) => {
    return <div>
        <Form
            name="basic"
            {...layout}
        >
            <Form.Item
                label="Username"
                name="username" 
            >
                <input />
            </Form.Item> 
        </Form>
    </div>
});

export default Page;