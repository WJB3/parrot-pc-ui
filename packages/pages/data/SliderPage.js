

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
import CilclePng from './circle.png';

const Page=(props)=>{

    const Forward=({children})=>children;

    const [value,setValue]=useState([1]);

    return (
        <div style={{padding:200}}>

            <input /> 
            <input /> 
            {/* {
                value.map((item)=>{
                    const Component=({children})=>children;

                    return <Component>
                        <span onClick={()=>setValue(value++)}>{item}</span>
                    </Component>

                })
            }

            {
                value.map((item)=>{ 

                    return <Forward>
                        <span onClick={()=>setValue(value++)}>{item}</span>
                    </Forward>

                })
            }
             */}
            <Slider defaultValue={30} min={9}  />

            <div style={{height:200}}></div> 

            <SliderA defaultValue={30} min={9}  />
 
             {/* <SliderA valueLabelDisplay="auto" step={1} min={9} defaultValue={20} /> */}
 
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