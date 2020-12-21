import React from 'react';
import Dialog from '@packages/core/Dialog';
import Button from '@packages/core/Button';
import Alert from '@packages/core/Alert';


const Page = React.forwardRef((props, ref) => {

    const handleClick = () => {
        Dialog.confirm()
    }

    return <div style={{ padding: 200 }}> 
        <Button color="primary" outline onClick={handleClick}>{"点击测试Dialog"}</Button>
        <Alert color="error">This is an error alert — check it out!</Alert>
        <Alert color="warning">This is a warning alert — check it out!</Alert>
        <Alert color="info">This is an info alert — check it out!</Alert>
        <Alert color="success">This is a success alert — check it out!</Alert>
    </div>
});

export default Page;