
import React, { useContext } from 'react';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import classNames from '@packages/utils/classNames';
import ButtonBase from '@packages/core/ButtonBase';


const SelectOption=React.forwardRef((props,ref)=>{
    
    const {
        prefixCls:customizePrefixCls,
        className,
        children
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("SelectOption",customizePrefixCls);

    return (
        <ButtonBase className={classNames(
            className,
            prefixCls
        )}>
            {children}
        </ButtonBase>
    )


});

export default SelectOption;