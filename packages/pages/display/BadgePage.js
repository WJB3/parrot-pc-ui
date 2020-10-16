import React,{useEffect, useRef,useState} from 'react';
import Button from '@packages/core/Button';
import Badge from '@packages/core/Badge';

 
const Demo=(props,ref)=>{

    const [count,setCount]=useState(props.count);

    if(count!==props.count){
        console.log("count!==props.count")
    }
   
    useEffect(()=>{
        console.log(count)
        console.log("useEffect")
        // let timeout=setTimeout(()=>{
            console.log("settimout")
            setCount(props.count);
        // });

    },[props.count])

  
 

    return <div>
        {count}
    </div>
}

const Page = React.forwardRef((props, ref) => {

    const demoRef=useRef(null);
    const [count,setCount]=useState(0);

    return <React.Fragment>

        <div style={{padding:200}}>

            <Badge count={5}>
                <Button onClick={()=>setCount(count+1)}>默认</Button>
            </Badge>

            <Demo count={count} />
        </div>
    </React.Fragment>
});

export default Page;