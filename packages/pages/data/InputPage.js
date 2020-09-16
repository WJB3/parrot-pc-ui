

import React from 'react';
import InputText from '@packages/core/InputText';
import ConfigProvider from '@packages/core/ConfigProvider';
import {
    HomeOutlined,
    SettingFilled,
    SmileOutlined,
    SyncOutlined,
    LoadingOutlined,
} from '@ant-design/icons';
import AccessAlarmIcon from '@material-ui/icons/AcUnit';

import { Transition } from 'react-transition-group';

const Page=(props)=>{
    return (
        <div>
            <HomeOutlined />

            <SettingFilled />
        <InputText size="small" allowClear placeholder="Basic usage" maxLength={5} prefix={"A"} suffix={"A"} />

 
        
        </div>
    )
}

export default Page;    