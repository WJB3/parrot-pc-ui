

import React from 'react';

import Button from '@packages/core/Button';

const Close=React.forwardRef((props,ref)=>{

    const {
        prefixCls, 
        closable,
        closeIcon:CloseIcon,
        onCancel
    }=props;

    return (
        <Button className={`${prefixCls}-Close`} type="text" shape="circle" ref={ref} size="large" onClick={onCancel}>
            {closable && <CloseIcon   />}
        </Button>
    );
});

export default Close;