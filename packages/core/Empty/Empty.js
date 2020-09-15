import React,{useContext} from 'react';
import classNames from '@packages/utils/classNames'; 
import PropTypes from 'prop-types'; 
import ConfigContext from '@packages/cores/ConfigCotext';
import usePrefixCls from '@packages/hooks/usePrefixCls'; 
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
        size="default"
    }=props;

    const prefixCls=usePrefixCls('Input',customizePrefixCls);

    const {size}=useContext();

   

    return (
        <div ref={ref} className={classNames(
            prefixCls,className 
        )}>
             
        </div>
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