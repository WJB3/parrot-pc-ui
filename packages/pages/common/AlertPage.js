import React from 'react'; 
import Alert from '@packages/core/Alert';


const Page= React.forwardRef((props,ref)=>{
    return <React.Fragment>
        <div style={{padding:200}}>
            <Alert>
                Primary
            </Alert> 
            <Alert color="second">
                Second
            </Alert> 
            <Alert color="warning">
                Second
            </Alert> 
            <Alert color="info">
                Second
            </Alert> 
            <Alert color="error">
                Second
            </Alert> 
            <Alert color="success">
                Second
            </Alert> 
        </div>
    </React.Fragment>
});

export default Page;