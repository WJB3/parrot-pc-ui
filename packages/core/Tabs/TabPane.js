import React ,{forwardRef} from 'react';
import PropTypes from 'prop-types'; 
import classNames from '@packages/utils/classNames'; 
import "./index.scss";

const TabPane=forwardRef(function(props,ref){

    const {
        forceRender,
        prefixCls, 
        children,
        active,
        style,
        className
    }=props;

    const mergeStyle={};

    if(!active){
        mergeStyle.display='none';
    }

    return (
        <div
            role="tanpanel"
            tabIndex={active?0:-1}
            style={{...mergeStyle,...style}}
            className={
                classNames(
                    `${prefixCls}-TabPane`,className,
                    active && `${prefixCls}-TabPane-Active`
                )
            }
            ref={ref}
        >
            {(active || forceRender) && children}
        </div>
    )

})

TabPane.propTypes={
    prefixCls:PropTypes.string,
    className:PropTypes.string,
    active:PropTypes.bool,
    forceRender:PropTypes.bool,
    children:PropTypes.any,
    style:PropTypes.object
}

export default TabPane;