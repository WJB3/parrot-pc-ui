import React,{useRef} from 'react';
import Tooltip from '@packages/core/Tooltip';
import Button from '@packages/core/Button';  



const Page = React.forwardRef((props, ref) => {

  const buttonRef=useRef(null);

  return <div style={{padding:100}}>
    <Tooltip  title="Add" getPopupContainer={()=>buttonRef.current} arrow placement={"left"} destroyTooltipOnHide onVisibleChange={(visible)=>console.log(visible)}>
      <Button ref={buttonRef}>Grow</Button>
    </Tooltip>
    {/* <TooltipM title="Add" arrow   placement={"top"}>
      <Button>Grow</Button>
    </TooltipM>
    
    <TooltipA title="Add" placement={"top"}>
      <Button>Grow</Button>
    </TooltipA>
    <Tooltip title="Add"  arrow>
      <Button>Grow</Button>
    </Tooltip>
    <Tooltip title="Add"  arrow placement={"right"}>
      <Button>Grow</Button>
    </Tooltip>
    <Tooltip title="Add"   arrow placement={"bottom"}>
      <Button>Grow</Button>
    </Tooltip> */}
  </div>
});

export default Page;