import React from 'react';
import classNames from '@packages/utils/classNames';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import TouchRipple from '@packages/core/TouchRipple';
import usePrefixCls from '@packages/hooks/usePrefixCls'

const ButtonBase=React.forwardRef((props,ref)=>{
    const {
        component:Component='button',
        type="button",
        disabled=false,
        disableRipple = false,
        tabIndex = 0,
        children,
        prefixCls:customizePrefixCls,
        ...restProps
    }=props;
 
    const prefixCls=usePrefixCls('ButtonBase',customizePrefixCls);

    let ComponentProp=Component;

    if (ComponentProp === 'button' && restProps.href) {
        ComponentProp = 'a';
    }

    const buttonProps = {};
    if (ComponentProp === 'button') {
        buttonProps.type = type;
        buttonProps.disabled = disabled;
    } else {
        if (ComponentProp !== 'a' || !other.href) {
          buttonProps.role = 'button';
        }
        buttonProps['aria-disabled'] = disabled;
    }

    return (
        <ComponentProp
            tabIndex={disabled?-1:tabIndex}
            prefixCls={prefixCls}
            {...buttonProps}
        >
            {children}
            {!disableRipple && !disabled && <TouchRipple /> }
        </ComponentProp>
    )

});

ButtonBase.propTypes={
    //ButtonBase的component
    component:PropTypes.any,
    //ButtonBase的type类型
    type:PropTypes.oneOf(['submit', 'reset', 'button']),
    //ButtonBase是否禁用
    disabled:PropTypes.bool,
    //ButtonBase是否启动表单相关属性
    tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    //ButtonBase的孩子节点
    children:PropTypes.node,
    //ButtonBase是否禁用涟漪
    disableRipple:PropTypes.bool
}

export default ButtonBase;