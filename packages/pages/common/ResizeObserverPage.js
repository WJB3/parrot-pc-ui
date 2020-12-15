import React from 'react';
import ResizeObserver from '@packages/core/ResizeObserver';
import Button from '@packages/core/Button';


const Page= React.forwardRef((props,ref)=>{

    function handleResize(node){ 
    }

    const [visible,setVisible]=React.useState(false);

    return <React.Fragment>
        
        <Button onClick={()=>setVisible(!visible)}>测试</Button>
         
        <ResizeObserver onResize={handleResize}>
            <div>1<div>2<div style={{display:visible?"flex":"none"}}>3</div></div></div>
        </ResizeObserver>
    </React.Fragment>
});

export default Page;