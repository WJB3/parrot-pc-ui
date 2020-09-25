import React from 'react';
import Button from '@packages/core/Button'; 
import Portal from '@packages/core/Portal';


const Page= React.forwardRef((props,ref)=>{

    const [mount,setMount]=React.useState(false);

    const container=React.useRef(null);

    return <React.Fragment>
        <Button onClick={()=>setMount(!mount)}>{mount?"挂载":"未挂载"}</Button>

        <div ref={container}></div>
         
        <Portal target={container.current}>
            {mount?"render":null}
        </Portal>
        
    </React.Fragment>
});

export default Page;