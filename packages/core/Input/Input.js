import React from 'react';
import classNames from '@packages/utils/classNames'; 
import PropTypes from 'prop-types'; 
import usePrefixCls from '@packages/hooks/usePrefixCls';
import childrenToArray from '@packages/utils/childrenToArray';
import capitalize from '@packages/utils/capitalize';

import "./index.scss";


const spaceSize = {
    small: 8,
    default: 16,
    large: 24,
};

const Input=React.forwardRef(function(props,ref){
    const {
        prefixCls:customizePrefixCls,
        className, 
        children,
        component:Component='div',  
        size="default"
    }=props;

    const prefixCls=usePrefixCls('Input',customizePrefixCls);

   

    return (
        <Component ref={ref} className={classNames(
            prefixCls,className 
        )}>
             
        </Component>
    )
});

Input.propTypes={
    prefixCls:PropTypes.string,
    className:PropTypes.string, 
    children:PropTypes.any, 
    size:PropTypes.oneOf(['small','default','large']),
    component:PropTypes.string
};

export default Input;