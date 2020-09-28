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
        type="contained",
        onClick,
        ...restProps
    }=props; 

    const prefixCls=usePrefixCls('Button',customizePrefixCls);

    return (
        <ButtonBase
            className={classNames(
                prefixCls,
                className,
                {
                    [`${prefixCls}-${capitalize(size)}`]:size,
                    [`${prefixCls}-Color${capitalize(type)}${capitalize(color)}`]:color,
                    [`${prefixCls}-Type${capitalize(type)}`]:type
                }
            )}
            ref={ref}
            onClick={()=>onClick?.()}
            {...restProps}
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
    color:PropTypes.string,
    onClick:PropTypes.func
};

export default Button;