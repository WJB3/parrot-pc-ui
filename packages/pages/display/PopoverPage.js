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
    <Popover trigger="hover"  title="Titke" content={content} defaultVisible={true}>
      <Button  >hover</Button>
    </Popover>
    <Popover trigger="click"  title="Titke" content={content} defaultVisible={true}>
      <Button  >click</Button>
    </Popover>
    <Popover trigger="focus"  title="Titke" content={content} defaultVisible={true}>
      <Button  >focus</Button>
    </Popover>

    <PopoverA   title="Titlasdasdasdasaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaae" content={content}>
        <Button color="primary" >Hover me</Button>
    </PopoverA>
 
  </div>
});

export default Page;