import React from 'react';
import  Form  from '@packages/core/Form';
//import  {Form}  from 'antd';
import Button from '@packages/core/Button';
import axios from 'axios';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const Page = React.forwardRef((props, ref) => {

    const handleClick=()=>{
        axios.get("http://erp.idodb.com/get/impower/res")
    }

    return <div>
        <Form
            name="basic"
            initialValues={{username:"wujiabao",age:20}}
            {...layout}
            onFinish={(value)=>console.log(value)}
        >
            <Form.Item
                label="姓名"
                name="username" 
            >
                <input />
            </Form.Item> 
            <Form.Item
                label="年龄"
                name="age" 
            >
                <input />
            </Form.Item>
            <button type="submit">提交</button>
        </Form>

        {/* <Button onClick={handleClick}>请求</Button> */}
    </div>
});


export default Page;