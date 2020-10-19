import React,{ cloneElement, useContext } from 'react';
import PropTypes from 'prop-types';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import useForkRef from '@packages/hooks/useForkRef';
import classNames from '@packages/utils/classNames';
import ScrollNumber from './ScrollNumber';
import useThemeColor from '@packages/hooks/useThemeColor';
import { Grow,Zoom } from '@packages/core/Transition';
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
        color:colorProp,
        offset,
        size,
        text
    }=props;

    const handleRef=useForkRef(ref);

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Badge",customizePrefixCls);

    const color=useThemeColor(colorProp); 

    const isZero=()=>{
        const numberedDisplayCount=displayCount();
        return numberedDisplayCount==='0'||numberedDisplayCount===0;
    }

    const isDot=()=>{
        return (dot && !isZero())||(color !== null && color !== undefined);
    }

    const displayCount=()=>{  
        return count>overflowCount?`${overflowCount}+`:count;
    }

    const isHidden=()=>{
        const displayNumber=displayCount();
        const isEmpty = displayNumber === null || displayNumber === undefined || displayNumber === '';
        return (isEmpty || (isZero() && !showZero)||count<0) && !isDot();
    }

    const renderDisplayComponent=()=>{
        if(!count || typeof count!=="object"){
            return undefined;
        }

        return cloneElement(count)
    }

    const renderBadgeNumber=()=>{

        const displayNumber=displayCount(); 

        return <ScrollNumber 
            prefixCls={`${prefixCls}`}
            count={displayNumber}
            className={classNames(
                {
                    [`${prefixCls}-Count`]:!isDot(),
                    [`${prefixCls}-Dot`]:isDot(),
                    [`${prefixCls}-Small`]:size==="small", 
                }
            )}
            displayComponent={renderDisplayComponent()}
            style={{backgroundColor:color,...style,right:offset?-offset[0]:0,marginTop:offset?.[1]}}

        />
    }

    const renderText=()=>{
        const hidden=isHidden();
        return hidden||!text?null:<span className={`${prefixCls}-Text`}>{text}</span>;
    } 

    if(!children && color){
        return <div className={classNames(prefixCls)}>
            <span className={classNames(`${prefixCls}-Color`)} style={{...style,color:color,backgroundColor:color}}></span>
            <span className={classNames(`${prefixCls}-Text`)}>{text}</span>
        </div>
    }

    return (
        <span className={
            classNames(
                prefixCls,
                className,
                {
                    [`${prefixCls}-NotWrapper`]:!children
                }
            )
        }  ref={handleRef}>
            {children}
            <Zoom visible={!isHidden()} extraStyle={children?"translate(50%,-50%)":""}> 
                {renderBadgeNumber()}
            </Zoom>
            {renderText()}
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

