import React ,{useContext} from 'react';
import classNames from '@packages/utils/classNames'; 
import PropTypes from 'prop-types';
import ButtonBase from '../ButtonBase';
import Loading from '@packages/core/Loading';
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
        outline,
        loading,
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
                    [`${prefixCls}-Color${capitalize(type)}${capitalize(color)}`]:color && !outline,
                    [`${prefixCls}-Type${capitalize(type)}`]:type && !outline,
                    [`${prefixCls}-${capitalize(shape)}`]:shape,
                    [`${prefixCls}-Outline${capitalize(color)}`]:color && outline,
                    [`${prefixCls}-Loading`]:loading,
                }
            )}
            disableTouchRipple={loading}
            centerRipple={shape==="circle"}
            ref={ref} 
            {...restProps}
        >
            {loading && <Loading size={18} style={{marginRight:6}} color={color} />}
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