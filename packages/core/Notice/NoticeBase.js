

import React from 'react';
import Alert from '@packages/core/Alert';


const Notice=React.forwardRef((props,ref)=>{

    const {
        className,
        message
    }=props;

    return (
        <Alert
            className={className}
            message={message}
        />
    )
});

export default Notice;