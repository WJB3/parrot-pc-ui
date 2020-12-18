

import React from 'react';

const Footer=React.forwardRef((props,ref)=>{

    const {
        prefixCls,
        children
    }=props;

    return (
        <div className={`${prefixCls}-Footer`} ref={ref}>
            {children}
        </div>
    );
});

export default Footer;