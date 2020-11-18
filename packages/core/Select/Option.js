
import React, { useContext } from 'react';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import classNames from '@packages/utils/classNames';
import ButtonBase from '@packages/core/ButtonBase';
import "./index.scss";


const SelectOption=React.forwardRef((props,ref)=>{
    
    const {
        prefixCls:customizePrefixCls,
        className,
        children,
        currentIndex,
        isSelected,
        onSelect,
        value,
        selectValue
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("SelectOption",customizePrefixCls);

    const handleClick=(e)=>{
        onSelect?.(e,currentIndex,value)
    } 
  
    return (
        <ButtonBase 
            className={classNames(
                className,
                prefixCls,
                {
                    [`${prefixCls}-Selected`]:selectValue===value
                }
            )}
            component="button"
            onClick={handleClick}
        >
            {children}
        </ButtonBase>
    )


});

export default SelectOption;