import React,{ useContext } from 'react';
import PropTypes from 'prop-types';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import useForkRef from '@packages/hooks/useForkRef';
import classNames from '@packages/utils/classNames';
import "./index.scss";


const Badge=React.forwardRef(function(props,ref){

    const {
        prefixCls:customizePrefixCls,
        className,
        style,
        children,
        count,
        showZero=false
    }=props;

    const handleRef=useForkRef(ref);

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Badge",customizePrefixCls);

    const renderBadgeNumber=()=>{
        
    }

    return (
        <span className={
            classNames(
                prefixCls,
                className
            )
        } style={style} ref={handleRef}>
            {children}
            {renderBadgeNumber()}
        </span>
    )


});

Badge.propTypes={
    prefixCls:PropTypes.string,
    className:PropTypes.string,
    style:PropTypes.object,
    children:PropTypes.any
};

export default Badge;

