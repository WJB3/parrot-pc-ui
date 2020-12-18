import React ,{useContext} from 'react';
import classNames from '@packages/utils/classNames'; 
import PropTypes from 'prop-types';
import ButtonBase from '../ButtonBase';
import {
    ConfigContext
} from '@packages/core/ConfigProvider'; 
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
        shape="round",
        ...restProps
    }=props; 

    const prefixCls=useContext(ConfigContext)?.getPrefixCls('Button',customizePrefixCls);

    return (
        <ButtonBase
            className={classNames(
                prefixCls,
                className,
                {
                    [`${prefixCls}-${capitalize(size)}`]:size,
                    [`${prefixCls}-Color${capitalize(type)}${capitalize(color)}`]:color,
                    [`${prefixCls}-Type${capitalize(type)}`]:type,
                    [`${prefixCls}-${capitalize(shape)}`]:shape
                }
            )}
            centerRipple={shape==="circle"}
            ref={ref} 
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