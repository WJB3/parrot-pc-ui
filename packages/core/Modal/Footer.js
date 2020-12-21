

import React from 'react';
import Button from '@packages/core/Button';
import Space from '@packages/core/Space';

const Footer = React.forwardRef((props, ref) => {

    const {
        prefixCls,
        cancelButtonProps,
        cancelText = "Cancel",
        okText="Confirm",
        onCancel,
        confirmLoading,
        okButtonProps,
        okColor="primary",
        onOk
    } = props;

    return (
        <div className={`${prefixCls}-Footer`} ref={ref}>
            <Space>
                <Button 
                    color={okColor}
                    type="text"
                    loading={confirmLoading}
                    onClick={onOk}
                    {...okButtonProps}
                >{okText}</Button>
                <Button 
                    color="danger" 
                    type="text" 
                    onClick={onCancel}
                    {...cancelButtonProps}
                >{cancelText}</Button>
            </Space>
        </div>
    );
});

export default Footer;