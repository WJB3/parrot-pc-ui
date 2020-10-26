import React, { useEffect,useContext } from 'react';
import classNames from '@packages/utils/classNames'; 
import ButtonBase from '@packages/core/ButtonBase';
import useControlled from "@packages/hooks/useControlled";
import createChainedFunction from '@packages/utils/createChainedFunction';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import capitalize from '@packages/utils/capitalize';
import Paper from '@packages/core/Paper';
import "./index.scss"; 

const Switch = React.forwardRef((props, ref) => {
    const {
        Component = "span", 
        prefixCls:customizePrefixCls,
        className,
        onChange: onChangeProp,
        defaultChecked,
        checked: checkedProp,
        value,  
        color="primary"
    } = props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Switch",customizePrefixCls);

    const [isChecked, setChecked] = useControlled({
        controlled: checkedProp,
        default: Boolean(defaultChecked)
    });

    const onChange = createChainedFunction(onChangeProp);

    const handleChangeSwitch = (event) => {
        const checkFlag = event.target.checked;
        setChecked(checkFlag);
        onChange?.(checkFlag, event);
    } 
 

    return (
        <label
            className={
                classNames(
                    prefixCls,className,
                    {
                        [`${prefixCls}-${capitalize(color)}`]:color,
                        [`${prefixCls}-Checked`]:isChecked
                    }
                )
            }
        > 
            <ButtonBase
                className={
                    classNames(
                        `${prefixCls}-BaseRipple`, 
                    )
                }
                centerRipple 
            >
                <Component
                    className={
                        classNames(
                            `${prefixCls}-BaseRipple-InputWrapper`,
                        )
                    }
                >
                    <input
                        type="checkbox"
                        className={
                            classNames(
                                `${prefixCls}-BaseRipple-InputWrapper-Input`
                            )
                        }
                        onChange={handleChangeSwitch} 
                        checked={isChecked}
                        name={name}
                        value={value}
                        ref={ref}
                    />

                    <Paper className={
                        classNames(
                            `${prefixCls}-BaseRipple-InputWrapper-Thumb`, 
                        )
                    } /> 

                </Component>
            </ButtonBase>

      
            <Component
                className={
                    classNames(
                        `${prefixCls}-FixBlock`,   
                    )
                }
            />  
        </label>
    )
})

export default Switch;