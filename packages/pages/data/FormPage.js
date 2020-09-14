import React from 'react';
//import  Form  from '@packages/core/Form';
import  {Form}  from 'antd';
import Button from '@packages/core/Button';
import axios from 'axios';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const Page = React.forwardRef((props, ref) => {

    return <div>
        <Form
            name="basic"
            initialValues={{username:"wujiabao",age:20}}
            {...layout}
            onFinish={(value)=>console.log(value)}
            onFinishFailed={()=>console.log("onFinishFailed")}
        >
            <Form.Item
                label="姓名"
                name="username" 
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <input />
            </Form.Item> 
            <Form.Item
                label="年龄"
                name="age" 
            >
                <input />
            </Form.Item>
            <button>提交</button>
        </Form>

        {/* <Button onClick={handleClick}>请求</Button> */}
    </div>
});


export default Page;