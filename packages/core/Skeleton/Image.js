import React,{useContext} from 'react';
import classNames from '@packages/utils/classNames';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import {
    Image
} from '@packages/core/Icon';

const SkeletonImage=(props)=>{
    const { 
        prefixCls:customizePrefixCls,
        className,
        active,
        ...otherProps
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Skeleton",customizePrefixCls);

    return (
        <div className={classNames(
            prefixCls,
            className  
        )}>
            <Image />
        </div>
    )
}

export default SkeletonImage;