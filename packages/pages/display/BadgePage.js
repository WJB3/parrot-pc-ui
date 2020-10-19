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

            <Badge count={count}>
                <Button >默认</Button>
            </Badge> 

            <Button onClick={()=>setCount(count+1)}>+1</Button>
        
            <Badge.Ribbon text="Pushes open the window">
                <Button>And raises the spyglass.</Button>
            </Badge.Ribbon>
            
           
        </div>
    </React.Fragment>
});

export default Page;