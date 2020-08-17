import React from 'react';
import classNames from '@packages/utils/classNames'; 
import PropTypes from 'prop-types';
import ButtonBase from '../ButtonBase';
import usePrefixCls from '@packages/hooks/usePrefixCls';

const Button=React.forwardRef((props,ref)=>{
    const {
        prefixCls:customizePrefixCls,
        className,
        size="default",
        children,
        type="",
    }=props;

    const prefixCls=usePrefixCls('Button',customizePrefixCls);

    return (
        <ButtonBase
            className={classNames(
                prefixCls,
                className
            )}
        >
            {children}
        </ButtonBase>
    )
});

Button.propTypes={
    prefixCls:PropTypes.string,
    className:PropTypes.string,
    size:PropTypes.oneOf(['small','default','large']),
    children:PropTypes.any,
    type:PropTypes.oneOf(['text', 'outlined', 'contained'])
};

export default Button;