
import React from 'react';
import classNames from '@packages/utils/classNames';


const Element=(props)=>{

    const {prefixCls,className,style,size,shape}=props;

    const sizeStyle=typeof size==="number"
        ?{
            width:size,
            height:size,
            lineHeight:`${size}px`
        }:{};

    return <span className={classNames(
        prefixCls,
        className,
        {
            [`${prefixCls}-Large`]:size==="large",
            [`${prefixCls}-Small`]:size==="small"
        },
        {
            [`${prefixCls}-Circle`]:shape==="circle",
            [`${prefixCls}-Square`]:shape==="square",
            [`${prefixCls}-Round`]:shape==="round"
        }
    )} style={{...sizeStyle,...style}}/>
}

export default Element;