

import React from 'react';
import Select from '@packages/core/Select';   
import MenuItem from '@material-ui/core/MenuItem';
import SelectA from '@material-ui/core/Select';
import 'antd/dist/antd.css';
import "./index.scss";
 
const Page=(props)=>{
    return (
        <div style={{padding:200}}> 
            <Select>
                <Select.Option value={"Ten"}>{"Ten"}</Select.Option>
                <Select.Option value={"Twenty"}>{"Twenty"}</Select.Option>
                <Select.Option value={"Thirty"}>{"Thirty"}</Select.Option>
                <Select.Option value={"啊"}>{"啊"}</Select.Option>
            </Select>
            <SelectA>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </SelectA>
        </div>
    )
}

export default Page;        