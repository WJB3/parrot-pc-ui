import React from 'react'; 
import Button from '@packages/core/Button';
import Popconfirm from '@packages/core/Popconfirm';
import { Popconfirm as PopconfirmA } from 'antd'; 
 

const Page = React.forwardRef((props, ref) => {
  return <React.Fragment>
      <div style={{padding:200}}>
      <Popconfirm 
        okText="Yes"
        cancelText="No"
        onCancel={()=>{console.log("onCancel")}}
        onConfirm={()=>{console.log("onConfirm")}}
    >
        <Button color="danger">Delete</Button>
    </Popconfirm>
     
 
    </div>
  </React.Fragment>
});

export default Page;