import React from 'react';
import Dialog from '@packages/core/Dialog';
import Button from '@packages/core/Button';
import Alert from '@packages/core/Alert';


const Page = React.forwardRef((props, ref) => {

    const handleClick = () => {
        Dialog.confirm({
            title:"Do you Want to delete these items?",
            content:"Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.",
            onOk:()=>{  
                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                }).catch(() => console.log('Oops errors!'))},
            onCancel:()=>{console.log("onCancel")}
        })
    }

    return <div style={{ padding: 200 }}> 
        <Button color="primary" outline onClick={handleClick}>{"点击测试Dialog"}</Button>
        <Alert color="error">This is an error alert — check it out!</Alert>
        <Alert color="warning">This is a warning alert — check it out!</Alert>
        <Alert color="info">This is an info alert — check it out!</Alert> 
    </div>
});

export default Page;