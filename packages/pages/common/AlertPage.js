import React from 'react'; 
import Alert from '@packages/core/Alert';
import {
    Add
} from '@packages/core/Icon';


const Page= React.forwardRef((props,ref)=>{
    return <React.Fragment>
        <div style={{padding:200}}>
            <Alert>
                Primary
            </Alert> 
            <Alert color="second" >
                Second
            </Alert> 
            <Alert color="warning" >
                Warning
            </Alert> 
            <Alert color="info">
                Info
            </Alert> 
            <Alert color="error">
                Error
            </Alert> 
            <Alert color="success">
                Success
            </Alert> 
        </div>
    </React.Fragment>
});

export default Page;