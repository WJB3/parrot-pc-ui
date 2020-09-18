import React from 'react';
import {
    Add
} from '@packages/icon';
import Icon from '@packages/icon';
import {
    HomeOutlined,
    SettingFilled,
    SmileOutlined,
    SyncOutlined,
    LoadingOutlined,
    LeftOutlined
} from '@ant-design/icons';  

import { Add as Madd } from '@material-ui/icons';         

const Page=(props)=>{
    return <div>
        <HomeOutlined />
        <Add />
        <Madd />
        <Icon name="Add" />
    </div>
}

export default Page;