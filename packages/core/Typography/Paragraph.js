import React from 'react';
import Typography from './Typography';

const Paragraph=({ellipsis,...restProps})=>{

    return <Typography {...restProps}  component={"div"}/>
}

export default Paragraph;