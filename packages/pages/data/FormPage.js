import React, { useState } from 'react';
import Form from '@packages/core/Form';
//import  {Form}  from 'antd';
import Button from '@packages/core/Button';
import axios from 'axios';
import { Transition,SwitchTransition } from 'react-transition-group';
import { Fade } from '@packages/core/Transition';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

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
       
   
        <Fade
            in={visible}
            onEnter={() => console.log("onenter")}
            onEntering={() => console.log("onentering")}
            onEntered={() => console.log("onentered")}
            onExit={() => console.log("onexit")}
            onExiting={() => console.log("onexiting")}
            onExited={() => console.log("onexited")}
            timeout={1000}   
            mountOnEnter 
        >
            <div style={{
                width: 100,
                height: 100,
                backgroundColor: 'red',
            }}></div>
        </Fade> 

        <Button onClick={() => setVisible(!visible)}>切换</Button>
    </div>
});


export default Page;