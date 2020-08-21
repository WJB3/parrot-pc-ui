import React from 'react';
import classNames from '@packages/utils/classNames'; 
import PropTypes from 'prop-types'; 
import usePrefixCls from '@packages/hooks/usePrefixCls';
import capitalize from '@packages/utils/capitalize';
import "./index.scss";

const Paper=React.forwardRef((props,ref)=>{
    const {
        prefixCls:customizePrefixCls,
        className,
        component: Component = 'div',
        square=false,
        shadow=1,
        children,
        style
    }=props;

    const prefixCls=usePrefixCls('Paper',customizePrefixCls);

    return (
        <Component
            className={classNames(
                prefixCls,
                className,
                {
                    [`${prefixCls}-Round`]:!square,
                    [`${prefixCls}-Shadow${shadow}`]:shadow
                }
            )}
            ref={ref}
            children={children}
            style={style}
        />
             
    )
});

Paper.propTypes={
    prefixCls:PropTypes.string,
    className:PropTypes.string, 
    children:PropTypes.any,
    component:PropTypes.string,
    square:PropTypes.bool,
    shadow:PropTypes.number,
    style:PropTypes.object
};

export default Paper;