import React ,{useContext} from 'react';
import classNames from '@packages/utils/classNames';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';

const Meta=React.forwardRef((props,ref)=>{

    const { 
        prefixCls:customizePrefixCls, 
        style,
        className,
        image,
        height
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Card-Meta",customizePrefixCls);

    return <div className={classNames(
        prefixCls,className
    )} ref={ref} style={{ backgroundImage:`url("${image}")`,height:height,...style}}>
    </div>;
})
 

export default Meta;