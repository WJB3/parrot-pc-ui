
import React from 'react';
import classNames from '@packages/utils/classNames';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import RadioGroupContext from './RadioGroupContext';
import useControlled from '@packages/hooks/useControlled';
import "./index.scss";

const RadioGroup=React.forwardRef((props,ref)=>{

    const {
        Component="div",
        className,
        value:valueProp,
        defaultValue,
        name="check-group",
        prefixCls:customizePrefixCls,
        children,
        onChange
    }=props;

    const prefixCls = React.useContext(ConfigContext)?.getPrefixCls("RadioGroup", customizePrefixCls);

    const [value,setValue]=useControlled({
        controlled:valueProp,
        default:defaultValue
    }); 

    const handleChangeCheckbox=(checked,event,name)=>{
        if(name&&checked===true){
            setValue(name);
            onChange?.(value,e);
        }
    }
    
    return (
        <RadioGroupContext.Provider value={{name,onChange:handleChangeCheckbox,value}}>
            <Component
                className={
                    classNames(
                        prefixCls,
                        className
                    )
                }
                ref={ref}
            >
                {children}
            </Component>
        </RadioGroupContext.Provider>
    )
});

export default RadioGroup;
