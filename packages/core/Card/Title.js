import React from 'react';

const Title=React.forwardRef((props,ref)=>{

    const {
        children
    }=props;

    return children||null;
})
 

export default Title;