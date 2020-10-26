

import React from 'react';
import Slider from '@packages/core/Slider';   
import {
    Favorite,
    FavoriteOutline
} from '@packages/core/Icon';   
import 'antd/dist/antd.css';

const Page=(props)=>{
    return (
        <div style={{padding:200}}> 
            <Slider />
        </div>
    )
}

export default Page;        