import React, { useEffect,useState } from 'react';
import { Skeleton } from 'antd';
import SkeletonA from '@packages/core/Skeleton';
 

const Page = React.forwardRef((props, ref) => {

  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    },3000)
  },[])

  return <div style={{padding:200}}>
  
     <SkeletonA avatar title={true} paragraph={false}>
        {"Aaa"}
     </SkeletonA>
  </div>
});

export default Page;