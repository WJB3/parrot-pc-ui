import React,{useContext} from 'react';
import classNames from '@packages/utils/classNames';
import {ConfigContext} from '@packages/core/ConfigProvider';
import {
    svgBaseProps
} from '../utils';

const Icon=React.forwardRef((props,ref)=>{
    const {
        className,
        viewBox,
        component:Component,
        children,
        rotate
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Icon",customizePrefixCls); 

    const svgStyle=rotate?{msTransform:`rotate(${rotate}deg)`,transform:`rotate(${rotate}deg)`}:undefined;

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
                )
            }
        >
            {renderInnerNode()}
        </span>
    )

});

export default Icon;