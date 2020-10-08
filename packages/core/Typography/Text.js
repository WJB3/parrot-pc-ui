import React from 'react';
import Typography from './Typography';

const Text=({ellipsis,...restProps})=>{

    return <Typography {...restProps}  ellipsis={!!ellipsis} component={"span"}/>
}

export default Text;