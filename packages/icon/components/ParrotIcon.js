import React from 'react';

const ParrotIcon=React.forwardRef((props,ref)=>{

    const {
        onClick
    }=props;

    return (
        <span
            ref={ref}
            onClick={onClick}
        >
            
        </span>
    )
});


export default ParrotIcon;