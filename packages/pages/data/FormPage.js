import React, { useState } from 'react';
import Form from '@packages/core/Form';
//import  {Form}  from 'antd';
import Button from '@packages/core/Button';
import axios from 'axios';
//import Slide from '@material-ui/core/Slide';
import { Fade,Zoom ,Grow,Collapse,Slide} from '@packages/core/Transition';
 
 

const t = {
    entering: {
        opacity: 1,
    },
    entered: {
        opacity: 1,
    },
}


const Page = React.forwardRef((props, ref) => {

    const [visible, setVisible] = useState(false);

    const [children,setChildren]=useState([]);
    
    console.log(visible)

    return <div>
        <Slide
            in={visible}
            timeout={10000}
            direction="up"
            mountOnEnter
        >
            <div style={{
                width: 100,
                height: 100,
                backgroundColor: 'red',
            }}></div>
        </Slide> 

        <Button onClick={() => setVisible(!visible)}>切换</Button>
    </div>
});


export default Page;