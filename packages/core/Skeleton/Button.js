import React,{useContext} from 'react';
import classNames from '@packages/utils/classNames';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import Element from './Element';
import capitalize from '@packages/utils/capitalize';

const SkeletonButton=(props)=>{
    const {
        size="default",
        prefixCls:customizePrefixCls,
        className,
        animation="pluse",
        ...otherProps
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Skeleton",customizePrefixCls);

    return (
        <div className={classNames(
            prefixCls,
            className,
            `${prefixCls}-Element`,
            {
                [`${prefixCls}-Animation-${capitalize(animation)}`]:animation
            }
        )}>
            <Element prefixCls={`${prefixCls}-Button`} size={size} {...otherProps}  />
        </div>
    )
}

export default SkeletonButton;