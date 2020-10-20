import React,{useContext} from 'react';
import classNames from '@packages/utils/classNames';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import Element from './Element';

const SkeletonAvatar=(props)=>{
    const {
        size="default",
        shape="circle",
        prefixCls:customizePrefixCls,
        className,
        active,
        ...otherProps
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Skeleton",customizePrefixCls);

    return (
        <div className={classNames(
            prefixCls,
            className,
            `${prefixCls}-Element`,
            {
                [`${prefixCls}-Active`]:active
            }
        )}>
            <Element prefixCls={`${prefixCls}-Avatar`} size={size} shape={shape} {...otherProps} />
        </div>
    )
}

export default SkeletonAvatar;