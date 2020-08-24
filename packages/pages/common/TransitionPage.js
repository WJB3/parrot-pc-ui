import React from 'react';
import { Fade } from '@packages/core/Transition';
import Button from '@packages/core/Button';
 


const Page= React.forwardRef((props,ref)=>{

    const [visible,setVisible]=React.useState(false);

    return <React.Fragment>
        <Button onClick={()=>setVisible(!visible)}>测试</Button>
       
        <Fade visible={visible}>
            <div style={{height:500,width:500,backgroundColor:'yellow'}}></div>
        </Fade>
       
    </React.Fragment>
});

export default Page;