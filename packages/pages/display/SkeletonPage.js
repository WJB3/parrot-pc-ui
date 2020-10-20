import React from 'react';
import { Skeleton } from 'antd';
import SkeletonA from '@packages/core/Skeleton';
 

const Page = React.forwardRef((props, ref) => {
  return <div style={{padding:200}}>
     <Skeleton   paragraph={true} title={true}>{
        "SkeletonPage"     
    }</Skeleton>

    <SkeletonA /> 
  </div>
});

export default Page;