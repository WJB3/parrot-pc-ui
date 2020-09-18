import React from 'react';
import {
    Add
} from '@packages/core/Icon';

import {
    HomeOutlined,
    SettingFilled,
    SmileOutlined,
    SyncOutlined,
    LoadingOutlined,
    LeftOutlined,
    PlusOutlined
} from '@ant-design/icons';  

import { Add as Madd } from '@material-ui/icons';         

const Page=(props)=>{
    return <div> 
        <Add rotate={45} spin style={{fontSize:50}}/>
        <Madd /> 
        <PlusOutlined spin />
    </div>
}

export default Page;