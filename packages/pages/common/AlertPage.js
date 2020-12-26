import React ,{useContext, useState } from 'react'; 
import Alert from '@packages/core/Alert';
import Button from '@packages/core/Button'; 
//import { Alert } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
// or 'rsuite/dist/styles/rsuite-default.css'


const Page= React.forwardRef((props,ref)=>{

    const [count,setCount]=useState(0); 

    return <React.Fragment>
        <div style={{padding:200}}>
            <Alert 
                message="我是谁" 
            />
            <Alert 
                message="我是谁"
                type="message" 
            />
            <Alert 
                message="我是谁" 
                color="warning"   
            />
            <Alert 
                message="我是谁" 
                color="warning"
                type="message"   
            />
            <Alert 
                message="我是谁" 
                color="primary"   
            /> 
            <Alert 
                message="我是谁" 
                color="primary" 
                type="message"  
            />   
             <Alert 
                message="我是谁" 
                color="danger"   
            />
             <Alert 
                message="我是谁" 
                color="danger"   
                type="message"  
            /> 
             <Alert 
                message="我是谁" 
                color="second"   
            />      
             <Alert 
                message="我是谁" 
                color="second"   
                type="message"  
            />  
            <Alert 
                message="我是谁" 
                color="info"   
            />   
            <Alert 
                message="我是谁" 
                color="info"
                type="message"   
            /> 
             <Alert 
                message="我是谁" 
                color="success"   
            /> 
              <Alert 
                message="我是谁" 
                color="success"   
                type="message"
            />    
        </div>
    </React.Fragment>
});

export default Page;