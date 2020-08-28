import React from 'react';
import Affix from '@packages/core/Affix';
import Button from '@packages/core/Button';
 

const Page = React.forwardRef((props, ref) => {
  return <div style={{height:"100000px"}}>
    <div style={{height:1000}}></div>
    <Affix offsetBottom={10}  >
        <Button color="primary">测试</Button>
    </Affix>
  </div>
});

export default Page;