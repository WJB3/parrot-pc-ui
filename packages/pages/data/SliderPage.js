

import React from 'react';
import Slider from '@packages/core/Slider';   
import {
    Favorite,
    FavoriteOutline
} from '@packages/core/Icon';   
import SliderA from '@material-ui/core/Slider';
import 'antd/dist/antd.css';
import "./index.scss";
import CilclePng from './circle.png';
const Page=(props)=>{
    return (
        <div style={{padding:200}}> 
            <Slider valueLabelDisplay="on"  />
            <div style={{height:200}}></div>
            <SliderA      valueLabelDisplay="on"  />
            {/* <div style={{height:200}}>
                <Slider orientation="vertical"   direction="vertical" onChange={(value)=>console.log(value)}/>
            </div> */}
            
           
{/* 
            <div className={'ywcx-btn'} >
                <img src={CilclePng} />
                <a href="javascript:void;">{"content"}</a>
            </div>  */}
        </div>
    )
}

export default Page;        