import React,{useContext} from 'react';
import classNames from '@packages/utils/classNames';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import capitalize from '@packages/utils/capitalize';
import {
    Image
} from '@packages/core/Icon';

const SkeletonImage=(props)=>{
    const { 
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
            <Image className={classNames(`${prefixCls}-Image`)}/>
        </div>
    )
}

export default SkeletonImage;