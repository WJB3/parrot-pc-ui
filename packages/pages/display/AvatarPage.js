import React from 'react';
import Avatar from '@packages/core/Avatar';
import Tooltip from '@packages/core/Tooltip';
import Space from '@packages/core/Space';
import {
  Favorite
} from '@packages/core/Icon';
 

const Page = React.forwardRef((props, ref) => {
  return <div style={{padding:200}}>
    <Space size="large" >
        
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> 
   
    </Space>
    <Space size="large">
        
    </Space>
  </div>
});

export default Page;