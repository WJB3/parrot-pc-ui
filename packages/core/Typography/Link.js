import React from 'react';
import Typography from './Typography';

const Link=React.forwardRef(({ellipsis,rel,...restProps},ref)=>{

    const mergedProps={
        ...restProps,
        rel:rel===undefined && restProps.target==="_blank"?'no reffer':rel
    }

    delete mergedProps.navigate;

    return <Typography {...mergedProps} ref={ref} ellipsis={!!ellipsis} component={"a"}/>
})

export default Link;