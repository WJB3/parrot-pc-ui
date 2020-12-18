import React ,{useContext, useState } from 'react'; 
import Alert from '@packages/core/Alert';
import Button from '@packages/core/Button';
import {
    Add
} from '@packages/core/Icon';

const TestContext=React.createContext(null);

const Child=React.memo(()=>{ 
    return <div>{`child${count}`}</div>
})

const Parent=React.memo(()=>{
    console.log("parent render");
    return <Child />
})


const Page= React.forwardRef((props,ref)=>{

    const [count,setCount]=useState(0); 

    return <React.Fragment>
        <div style={{padding:200}}>
            <Alert>
                Primary
            </Alert> 
            <Button onClick={()=>setCount(count+1)}>测试</Button>
           
        </div>
    </React.Fragment>
});

export default Page;