import React,{useContext} from 'react';
import classNames from '@packages/utils/classNames';
import {ConfigContext,SizeContext} from '@packages/core/ConfigProvider';
import {
    svgBaseProps
} from '../utils';
import capitalize from '@packages/utils/capitalize';

const Icon=React.forwardRef((props,ref)=>{
    const {
        className,
        viewBox,
        component:Component,
        children,
        rotate,
        prefixCls:customizePrefixCls,
        size:sizeProp="default"
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Icon",customizePrefixCls); 

    const svgStyle=rotate?{msTransform:`rotate(${rotate}deg)`,transform:`rotate(${rotate}deg)`}:undefined;

    const size=useContext(SizeContext)||sizeProp;

    const innerSvgProps={
        ...svgBaseProps,
        style:svgStyle,
        viewBox
    }

    const renderInnerNode=()=>{
        if(Component){
            return <Component {...innerSvgProps}>{children}</Component>
        }

        if(children){
            return (
                <svg {...innerSvgProps} viewBox={viewBox}>
                    {children}
                </svg>
            )
        }

        return null;
    }

    return (
        <span
            ref={ref}
            className={
                classNames(
                    className,
                    prefixCls,
                    {
                        [`${prefixCls}-${capitalize(size)}`]:size
                    }
                )
            }
        >
            {renderInnerNode()}
        </span>
    )

});

export default Icon;