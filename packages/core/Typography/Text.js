import React from 'react';
import Base from './Base';

const Text=({ellipsis,...restProps})=>{

    return <Base {...restProps}  ellipsis={!!ellipsis} component={"span"}/>
}

export default Text;