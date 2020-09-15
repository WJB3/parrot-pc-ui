import React from 'react';
//import  Form  from '@packages/core/Form';
import { Form } from 'antd';
import Button from '@packages/core/Button';
import axios from 'axios';
import { ConfigProvider, Pagination} from 'antd';
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const Page = React.forwardRef((props, ref) => {

    return <div>
        <ConfigProvider locale={zhCN}>
            <Pagination defaultCurrent={1} total={50} showSizeChanger />
        </ConfigProvider>

        {/* <Button onClick={handleClick}>请求</Button> */}
    </div>
});


export default Page;