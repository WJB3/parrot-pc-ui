

import React from 'react';

const Content=React.forwardRef((props,ref)=>{

    const {
        prefixCls,
        children
    }=props;

    return (
        <div className={`${prefixCls}-Content`} ref={ref}>
            {children}
        </div>
    );
});

export default Content;