

import React from 'react';
import InputText from '@packages/core/InputText';
import ConfigProvider from '@packages/core/ConfigProvider';
import 'rsuite/dist/styles/rsuite-default.css'; 
import AccountBookFilledSvg from '@ant-design/icons-svg/lib/asn/AccountBookFilled';  

import {
    HomeOutlined,
    SettingFilled,
    SmileOutlined,
    SyncOutlined,
    LoadingOutlined,
    LeftOutlined
} from '@ant-design/icons';

import { Icon } from 'rsuite';

import { AccessAlarm } from '@material-ui/icons/'; 

import { Transition } from 'react-transition-group';

const Page=(props)=>{
    return (
        <div>
            <HomeOutlined />

            <SettingFilled />

            <AccessAlarm />

            <Icon icon='star' />
            <Icon icon='shield' />
            
            <InputText size="small" allowClear placeholder="Basic usage" maxLength={5} prefix={"A"} suffix={"A"} /> 
        
        </div>
    )
}

export default Page;    