import React,{ useContext } from 'react';
import classNames from '@packages/utils/classNames'; 
import PropTypes from 'prop-types';  
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import {
    Empty as EmptyIcon
} from '@packages/core/Icon';
import capitalize from '@packages/utils/capitalize';
import "./index.scss";
 

const Empty=React.forwardRef(function(props,ref){
    const {
        prefixCls:customizePrefixCls,
        className,   
        type,
        style,
        description,
        height
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Empty",customizePrefixCls); 

    return (
        <div ref={ref} className={classNames(
            prefixCls,
            className,
            {
                [`${prefixCls}-${capitalize(type)}`]:type
            }
        )}  style={{...style}} >
            <div className={classNames(
                `${prefixCls}-Image`
            )} style={{height:height}}> 
                <EmptyIcon />
            </div>
            {<p className={classNames(
                `${prefixCls}-Description`
            )}>{description ? description :"暂无数据"}</p>}
        </div>
    )
});

Empty.propTypes={
    prefixCls:PropTypes.string,
    className:PropTypes.string,  
};

export default Empty;