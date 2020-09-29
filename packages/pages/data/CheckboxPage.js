

import React from 'react';
import Checkbox from '@packages/core/Checkbox';   
import {
    Favorite,
    FavoriteOutline
} from '@packages/core/Icon';   
import 'antd/dist/antd.css';

const Page=(props)=>{
    return (
        <div> 
            <Checkbox color="danger" defaultChecked onChange={(checked)=>console.log(checked)} />  
            <Checkbox checked  /> 
            <Checkbox indeterminate  /> 
            <Checkbox selectIcon={<Favorite />} unselectIcon={<FavoriteOutline />} /> 
        </div>
    )
}

export default Page;        