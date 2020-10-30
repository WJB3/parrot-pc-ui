

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
        <div 
            style={{padding:100,border:"5px solid red"}}  
            onMouseDown={(e)=>{console.log("mousedownaa3");  }} 
            onMouseUp={(e)=>{console.log("mouseup3");  }}   
        > 
             3
            <div    
                onMouseDown={(e)=>{console.log("mousedownaa2"); e.preventDefault();document.getElementById("input1").focus() }}   
                onMouseUp={(e)=>{console.log("mouseup2");  }} 
                style={{padding:100,border:"5px solid blue"}}
            >
                2
                 
                <div 
                    id="input1"
                    style={{padding:100,border:"5px solid skyblue"}}
                    tabIndex={0} 
                    onFocus={()=>{console.log("woshiOnfocus1")}}
                    onMouseUp={(e)=>{console.log("mouseup1");  }} 
                    onMouseDown={()=>console.log("woshiOnMouseDown1")} 
                    onBlur={()=>console.log("onBlur1")}
                >1</div>

            </div> 
        </div>
    )
}

export default Page;        