import React,{useContext } from 'react'; 
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import capitalize from '@packages/utils/capitalize';
import useThemeColor from '@packages/hooks/useThemeColor';
import classNames from '@packages/utils/classNames';
import Paper from '@packages/core/Paper';
import "./index.scss";

const Ribbon=React.forwardRef(function(props,ref){
    const {
        prefixCls:customizePrefixCls,
        children,
        className,
        style,
        text,
        placement='end',
        color:colorProp
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("BadgeRibbon",customizePrefixCls);

    const color=useThemeColor(colorProp);

    return (
        <div className={classNames(`${prefixCls}-Wrapper`)}>
            {children}
            <Paper 
                style={{backgroundColor:color,...style}}
                className={classNames(
                    prefixCls,
                    `${prefixCls}-Placement-${capitalize(placement)}`,
                    className
                )}
            >
                <span className={classNames(`${prefixCls}-Text`)} >{text}</span>
                <span className={classNames(`${prefixCls}-Corner`)} style={{color:color}}></span>
            </Paper>
        </div>
    )
});

export default Ribbon;