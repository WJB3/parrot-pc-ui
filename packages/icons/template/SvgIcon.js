import React from 'react';
import classNames from '@packages/utils/classNames';
import useThemeColor from '@packages/hooks/useThemeColor';
import PropTypes from 'prop-types';

const SvgIcon=React.forwardRef((props,ref)=>{
    const {
        children,
        className,
        viewBox = '0 0 24 24',
        color,
        style,
        component:Component="svg",
        ...restProps
    }=props;

    return (
        <Component 
            className={
                classNames(
                    className
                )
            }
            focusable="false"
            viewBox={viewBox}
            color={useThemeColor(color)}
            ref={ref}
            style={style}
            {...restProps}
        >
            {children}
        </Component>
    )
});

SvgIcon.propTypes={
    children:PropTypes.node,
    className:PropTypes.string,
    color:PropTypes.string,
    viewBox: PropTypes.string,
    style:PropTypes.object,
    component:PropTypes.any
}

export default SvgIcon;