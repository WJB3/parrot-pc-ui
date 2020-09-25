import React,{useState} from 'react';
import Popper from '@packages/core/Popper';
import Button from '@packages/core/Button';
import {Fade} from '@packages/core/Transition';


const Page = React.forwardRef((props, ref) => {

    const [visible, setVisible] = useState(false);

    const buttonRef=React.useRef(null);

    return <React.Fragment>
        <Button onClick={()=>setVisible(!visible)} ref={buttonRef}>切换</Button>

        <Popper visible={visible} mountNode={buttonRef}>
            {
                (props)=>{ 
                    return <Fade {...props.TransitionProps}><div style={{backgroundColor:"red"}}>{"fade"}</div></Fade>
                }
            }
        </Popper>
    </React.Fragment>
});

export default Page;