import React,{useRef} from 'react';
import Tooltip from '@packages/core/Tooltip';
import Button from '@packages/core/Button';  



const Page = React.forwardRef((props, ref) => {

  const buttonRef=useRef(null);

  return <div style={{padding:100}}>
    <Tooltip  title="Add" getPopupContainer={()=>buttonRef.current} arrow placement={"bottom"} onVisibleChange={(visible)=>console.log(visible)}>
      <Button ref={buttonRef}>Grow</Button>
    </Tooltip>
   
  </div>
});

export default Page;