import React,{useState} from 'react';
import Drawer from '@packages/core/Drawer';
import Button from '@packages/core/Button';


const Page = React.forwardRef((props, ref) => {

    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
      setVisible(true);
    };
  
    const onClose = () => {
      setVisible(false);
    };


    return <div style={{ padding: 200 }}>
        <Button color="primary" outline onClick={showDrawer}>{"点击测试Drawer"}</Button>
        <Drawer 
            title="Basic Drawer"
            visible={visible} 
            closable
            onClose={onClose}
            afterVisibleChange={(visible)=>console.log(visible)}
            direction={"up"}
            footer={
              <div
                style={{
                  textAlign: 'right',
                }}
              >
                <Button onClick={onClose} type="text" color="primary" style={{ marginRight: 8 }}>
                  Cancel
                </Button>
                <Button onClick={onClose} type="text" color="primary">
                  Submit
                </Button>
              </div>
            }
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Drawer>
    </div>
});

export default Page;