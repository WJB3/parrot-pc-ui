import React,{ useContext } from 'react';
import PropTypes from 'prop-types';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import useForkRef from '@packages/hooks/useForkRef';
import classNames from '@packages/utils/classNames';
import ScrollNumber from './ScrollNumber';
import useThemeColor from '@packages/hooks/useThemeColor';
import "./index.scss";


const Badge=React.forwardRef(function(props,ref){

    const {
        prefixCls:customizePrefixCls,
        className,
        style,
        children,
        count,
        overflowCount=99,
        dot=false,
        showZero=false,
        //包含状态
        color:colorProp
    }=props;

    const handleRef=useForkRef(ref);

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Badge",customizePrefixCls);

    const color=useThemeColor(colorProp);

    const getNumberedDisplayCount=()=>{
        return count>overflowCount?`${overflowCount}+`:count;
    }

    const isZero=()=>{
        const numberedDisplayCount=getNumberedDisplayCount();
        return numberedDisplayCount==='0'||numberedDisplayCount===0;
    }

    const isDot=()=>{
        return (dot && !isZero())||color;
    }

    const displayCount=()=>{
        return getNumberedDisplayCount();
    }

    const renderBadgeNumber=()=>{

        const displayNumber=displayCount();

        return <ScrollNumber 
            prefixCls={`${prefixCls}`}
            count={displayNumber}
            className={classNames(
                {
                    [`${prefixCls}-Count`]:!isDot()
                }
            )}

        />
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

