

import React from 'react';
import Close from './Close';

const Title=React.forwardRef((props,ref)=>{

    const {
        prefixCls,
        children,
        closable,
        closeIcon,
        onCancel,
    }=props;

    return (
        <div className={`${prefixCls}-Title`} ref={ref}>
            <div className={`${prefixCls}-Title-Message`}>{children}</div>
            {closable && <Close prefixCls={prefixCls} closable={closable} closeIcon={closeIcon} onCancel={onCancel} />}
        </div>
    );
});

export default Title;