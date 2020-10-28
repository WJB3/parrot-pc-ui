import React,{useRef} from 'react';
import Popover from '@packages/core/Popover';
import Button from '@packages/core/Button';  
import {Popover as PopoverA} from 'antd';



const Page = React.forwardRef((props, ref) => {
    const content = (
        <div>
          <p>Content</p>
          <p>Content</p>
        </div>
      );

  return <div style={{padding:300}}>
    
    <Popover trigger="click"  arrow={false} title="Titke" content={content} defaultVisible={true}>
      <Button  >click</Button>
    </Popover>            
  
  </div>
});

export default Page;