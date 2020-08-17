import React from 'react';
import classNames from '@packages/utils/classNames'; 
import PropTypes from 'prop-types';
import ButtonBase from '../ButtonBase';
import usePrefixCls from '@packages/hooks/usePrefixCls';
import capitalize from '@packages/utils/capitalize';
import "./index.scss";

const Button=React.forwardRef((props,ref)=>{
    const {
        prefixCls:customizePrefixCls,
        className,
        size="default",
        children,
        color="default",
        type="contained"
    }=props;

    const prefixCls=usePrefixCls('Button',customizePrefixCls);

    return (
        <ButtonBase
            className={classNames(
                prefixCls,
                className,
                {
                    [`${prefixCls}-${size}`]:size,
                    [`${prefixCls}-Color${capitalize(type)}${capitalize(color)}`]:color,
                    [`${prefixCls}-Type${capitalize(type)}`]:type
                }
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
    type:PropTypes.oneOf(['text', 'outlined', 'contained']),
    color:PropTypes.string
};

export default Button;