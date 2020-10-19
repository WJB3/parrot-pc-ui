import React,{useEffect, useRef,useState} from 'react';
import Button from '@packages/core/Button';
import Badge from '@packages/core/Badge';
import {
    Favorite
} from '@packages/core/Icon';

  

const Page = React.forwardRef((props, ref) => {

    const demoRef=useRef(null);
    const [count,setCount]=useState(9);

    return <React.Fragment>

        <div style={{padding:200}}>

            {/* <Badge count={count}>
                <Button onClick={()=>setCount(count+1)}>默认</Button>
            </Badge> 
            <Badge count={0} showZero size={"small"}>
                <Button onClick={()=>setCount(count+1)}>默认</Button>
            </Badge> 
            <Badge count={<Favorite />} >
                <Button onClick={()=>setCount(count+1)}>默认</Button>
            </Badge>
            <Badge count={<Favorite />} offset={[10, 10]}>
                <Button onClick={()=>setCount(count+1)}>默认</Button>
            </Badge>
            <Badge count={25} /> 
            <Badge count={4}   style={{ backgroundColor: '#52c41a' }} /> */}

            <Badge.Ribbon text="Pushes open the window">
                <Button>And raises the spyglass.</Button>
            </Badge.Ribbon>
            
           
        </div>
    </React.Fragment>
});

export default Page;