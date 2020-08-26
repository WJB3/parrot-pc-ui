import React from 'react';
import { Fade,Zoom,Collapse,Slide,Grow } from '@packages/core/Transition';
import Button from '@packages/core/Button';
import Paper from '@packages/core/Paper';
 
const Page= React.forwardRef((props,ref)=>{

    const [visible,setVisible]=React.useState(false);

    return <React.Fragment>
        <Button onClick={()=>setVisible(!visible)}>测试</Button>
{/*        
        <Fade visible={visible}>
            <Paper shadow={6} style={{height:100,width:100,backgroundColor:'yellow'}}></Paper>
        </Fade>

        <Fade visible={visible} timeout={5000}>
            <Paper shadow={6} style={{height:100,width:100,backgroundColor:'red'}}></Paper>
        </Fade>

        <Zoom visible={visible}>
            <Paper shadow={6} style={{height:100,width:100,backgroundColor:'red'}}></Paper>
        </Zoom>

        <Zoom visible={visible} timeout={5000}>
            <Paper shadow={6} style={{height:100,width:100,backgroundColor:'red'}}></Paper>
        </Zoom>

        <Collapse visible={visible}>
            <Paper shadow={6} style={{height:100,width:100,backgroundColor:'red'}}></Paper>
        </Collapse>

        <Collapse visible={visible} timeout={5000}>
            <Paper shadow={6} style={{height:100,width:100,backgroundColor:'red'}}></Paper>
        </Collapse> */}

        {/* <Slide visible={visible} direction={"left"}>
            <Paper shadow={6} style={{height:100,width:100,backgroundColor:'red'}}></Paper>
        </Slide>

        <Slide visible={visible} timeout={5000} direction={"right"}>
            <Paper shadow={6} style={{height:100,width:100,backgroundColor:'red'}}></Paper>
        </Slide> */}

        <Grow visible={visible} >
            <Paper shadow={6} style={{height:100,width:100,backgroundColor:'red'}}></Paper>
        </Grow>

        <Grow visible={visible} >
            <Paper shadow={6} style={{height:100,width:100,backgroundColor:'red'}}></Paper>
        </Grow>
       
    </React.Fragment>
});

export default Page;