

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
            <Checkbox >{"我爱中国"}</Checkbox>
            <Checkbox >{"我爱安徽"}</Checkbox>
            <Checkbox >{"我爱合肥"}</Checkbox>
            <Checkbox >{"我爱美国"}</Checkbox>
            <Checkbox.Group defaultValue={["a","b"]}>
                <Checkbox value={"a"}>A</Checkbox>
                <Checkbox value={"b"}>B</Checkbox>
                <Checkbox value={"c"}>C</Checkbox>
                <Checkbox value={"d"}>D</Checkbox>
            </Checkbox.Group>
        </div>
    )
}

export default Page;        