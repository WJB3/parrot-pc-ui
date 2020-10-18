import React,{useEffect, useRef,useState} from 'react';
import Button from '@packages/core/Button';
import Badge from '@packages/core/Badge';

  

const Page = React.forwardRef((props, ref) => {

    const demoRef=useRef(null);
    const [count,setCount]=useState(9);

    return <React.Fragment>

        <div style={{padding:200}}>

            <Badge count={count}>
                <Button onClick={()=>setCount(count+1)}>默认</Button>
            </Badge> 
                <div></div>
            <Button onClick={()=>setCount(count+1)}>+</Button>
            <Button onClick={()=>setCount(count-1)}>-</Button>
        </div>
    </React.Fragment>
});

export default Page;