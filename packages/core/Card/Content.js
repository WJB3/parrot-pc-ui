import React ,{Children, useContext} from 'react';
import classNames from '@packages/utils/classNames';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';

const Content=React.forwardRef((props,ref)=>{

    const { 
        prefixCls:customizePrefixCls, 
        style,
        className, 
        children
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Card-Content",customizePrefixCls);

    return <div className={classNames(
        prefixCls,className
    )} ref={ref} style={style}>
        {children}
    </div>;
})
 

export default Content;