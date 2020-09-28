import React from 'react';
import Tooltip from '@packages/core/Tooltip';
import Button from '@packages/core/Button';
import TooltipM from '@material-ui/core/Tooltip';


const Page = React.forwardRef((props, ref) => {
  return <div style={{padding:100}}>
    
    <TooltipM title="Add" arrow open={true} placement={"top"}>
      <Button>Grow</Button>
    </TooltipM>
    <Tooltip title="Add" visible={true} arrow>
      <Button>Grow</Button>
    </Tooltip>
    <Tooltip title="Add" visible={true} placement={"rightTop"}>
      <Button>Grow</Button>
    </Tooltip>
  </div>
});

export default Page;