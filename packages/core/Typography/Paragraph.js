import React from 'react';
import Typography from './Typography';

const Paragraph=({...restProps})=>{

    return <Typography {...restProps}  component={"div"}/>
}

export default Paragraph;