

import React ,{ useState  } from 'react';
import Slider from '@packages/core/Slider';   

import { Slider as SliderAn } from 'antd';
import {
    Favorite,
    FavoriteOutline
} from '@packages/core/Icon';   
import SliderA from '@material-ui/core/Slider';
import 'antd/dist/antd.css';
import "./index.scss"; 
const Page=(props)=>{
 
    return (
        <div style={{padding:100,border:"2px solid red"}}> 
             
            <div   
                onFocus={()=>console.log("onFocus")}
                onMouseDown={(e)=>{console.log("mousedownaa");  }} 
                onKeyDown={()=>console.log("nishionKeyDown")}
                style={{padding:100,border:"2px solid blue"}}
            >
                 
                <div 
                    id="input1"
                    tabIndex={0} 
                    onFocus={()=>{console.log("woshiOnfocus")}}
                    onMouseDown={()=>console.log("woshiOnMouseDown")}
                    onKeyDown={()=>console.log("woshioonKeyDown")}
                    onBlur={()=>console.log("onBlur")}
                >我是谁</div>

            </div>

        </div>
    )
}

export default Page;        