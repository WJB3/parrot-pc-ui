

import React from 'react';
import Empty from '@packages/core/Empty';
 
 

const Page = React.forwardRef((props, ref) => {
  return <div style={{padding:200}}> 
    <Empty type="normal" />
  </div>
});

export default Page;