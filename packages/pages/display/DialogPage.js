import React from 'react';
import Dialog from '@packages/core/Dialog';
import Button from '@packages/core/Button'; 


const Page = React.forwardRef((props, ref) => {

    const handleClick = () => { 
            for (let i = 0; i < 3; i += 1) {
              setTimeout(() => {
                Dialog.confirm({ 
                  content: <Button onClick={()=>Dialog.destroyAll()}>Click to destroy all</Button>,
                  onOk() {
                    console.log('OK');
                  },
                  onCancel() {
                    console.log('Cancel');
                  },
                });
              }, i * 500);
            } 
    }

    return <div style={{ padding: 200 }}> 
        <Button color="primary" outline onClick={handleClick}>{"点击测试Dialog"}</Button> 
    </div>
});

export default Page;