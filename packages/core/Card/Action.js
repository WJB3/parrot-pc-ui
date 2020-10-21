import React ,{Children, useContext} from 'react';
import classNames from '@packages/utils/classNames';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import ButtonBase from '@packages/core/ButtonBase';

const Action=React.forwardRef((props,ref)=>{

    const { 
        prefixCls:customizePrefixCls, 
        style,
        className, 
        children
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Card-Action",customizePrefixCls);

    return <ButtonBase className={classNames(
        prefixCls,className
    )} ref={ref} style={style}>
        {children}
    </ButtonBase>;
})
 

export default Action;