

import React from 'react';
import classNames from '@packages/utils/classNames';

const Content=React.forwardRef((props,ref)=>{

    const {
        prefixCls,
        children,
        bodyStyle,
        bodyClassName
    }=props;

    return (
        <div className={classNames(`${prefixCls}-Content`,bodyClassName)} ref={ref} style={bodyStyle}>
            {children}
        </div>
    );
});

export default Content;