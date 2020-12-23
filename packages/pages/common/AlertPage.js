import React ,{useContext, useState } from 'react'; 
//import Alert from '@packages/core/Alert';
import Button from '@packages/core/Button'; 
import { Alert } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
// or 'rsuite/dist/styles/rsuite-default.css'


const Page= React.forwardRef((props,ref)=>{

    const [count,setCount]=useState(0); 

    return <React.Fragment>
        <div style={{padding:200}}>
            {/* <Alert 
                message="Primary" 
                color="warning"  
                closable 
                destroyOnHidden  
                description="destroyOnHiddendestroyOnHiddendestroyOnHidden"
                action={
                    <Button outline color="danger">UNDO</Button>
                }
            />  */}
            <Button onClick={()=>Alert.info("aaaa",1000000)} >测试</Button>

            <div style={{padding:10,width:300,height:300}}> 
                <div style={{background:'red',width:"100%",height:"100%"}} className={"a"}>asdasdasda</div>
            </div>
           
        </div>
    </React.Fragment>
});

export default Page;