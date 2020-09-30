
import React from 'react';

const Typography=React.forwardRef((props,ref)=>{

    const {
        component:Component="article",
        className,
        children
    }=props;

    return (
        <Component
            className={className}
            ref={ref}
        >
            {children}
        </Component>
    )

});

export default Typography;