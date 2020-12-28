import React ,{useContext, useEffect, useState,useRef } from 'react'; 
import Progress,{ gprogress } from '@packages/core/Progress';   

import Button from '@packages/core/Button';
import 'antd/dist/antd.css'; 


const Page= React.forwardRef((props,ref)=>{

    const [value,setValue]=useState(0);

    const [color,setColor]=useState();

    let timer=useRef(null);

    useEffect(()=>{
        timer.current=setInterval(()=>{
            setValue(prevValue=>{
                if(prevValue>=100){ 
                    return 100;
                }else{
                    return prevValue+1
                }
            })
        },200); 
        return ()=>{
            clearInterval(timer.current);
        }
    },[]);

    const handleClick=()=>{
        gprogress.start();
    }
  

    return <React.Fragment>
        <div style={{padding:200}}>
            <Button onClick={handleClick}>测试机</Button>
            <Button onClick={()=>gprogress.end()}>结束</Button>
            <Progress 
                percent={value}
                showInfo={true}
                color={color}
                onFinish={()=>setColor("success")}
            />
        </div>
    </React.Fragment>
});

export default Page;