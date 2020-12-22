import React ,{useContext, useState } from 'react'; 
import Alert from '@packages/core/Alert';
import Button from '@packages/core/Button'; 
import { red } from '@material-ui/core/colors';


const Page= React.forwardRef((props,ref)=>{

    const [count,setCount]=useState(0); 

    return <React.Fragment>
        <div style={{padding:200}}>
            <Alert 
                message="Primary" 
                color="warning"  
                closable 
                destroyOnHidden  
                description="destroyOnHiddendestroyOnHiddendestroyOnHidden"
                action={
                    <Button outline color="danger">UNDO</Button>
                }
            /> 
            <Button onClick={()=>setCount(count+1)} >测试</Button>

            <div style={{padding:10,width:300,height:300}}> 
                <div style={{background:'red',width:"100%",height:"100%"}} className={"a"}>asdasdasda</div>
            </div>
           
        </div>
    </React.Fragment>
});

export default Page;