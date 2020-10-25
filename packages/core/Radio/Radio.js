

import React, { useContext } from 'react';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import classNames from '@packages/utils/classNames';
import ButtonBase from '@packages/core/ButtonBase';
import {
    RadioChecked,
    RadioUncheck
} from '@packages/core/Icon';
import useControlled from '@packages/hooks/useControlled';
import capitalize from '@packages/utils/capitalize';
import RadioGroupContext from './RadioGroupContext';
import createChainedFunction from '@packages/utils/createChainedFunction';
import {
    Zoom
} from '@packages/core/Transition';
import "./index.scss";

const Radio = React.forwardRef((props, ref) => {

    const {
        prefixCls: customizePrefixCls,
        component: Component = "span",
        className,
        checked:checkedProp,
        defaultChecked,
        color="primary",
        value,
        children,
        onChange:onChangeProp
    } = props;

    const prefixCls = useContext(ConfigContext)?.getPrefixCls("Radio", customizePrefixCls);

    const radioGroup=useContext(RadioGroupContext);

    let isChecked=checkedProp; 

    if(radioGroup){
        if(typeof isChecked==='undefined'){
            isChecked=radioGroup.value?radioGroup.value===value?true:false:false;
        }
    }

    const [checked,setChecked]=useControlled({
        controlled:isChecked,
        default:Boolean(defaultChecked)
    });

    const onChange=createChainedFunction(onChangeProp,radioGroup && radioGroup.onChange);
    
    const handleChange = (e) => { 
        setChecked(e.target.checked);
        onChange?.(e.target.checked, e,value); 
    } 

    return <label
        className={
            classNames(
                prefixCls,
                className,
            )
        }
    >
        <ButtonBase
            component="span"
            className={
                classNames(
                    `${prefixCls}-RadioBaseRipple`,
                    {
                        [`${prefixCls}-Checked`]: checked,
                        [`${prefixCls}-${capitalize(color)}`]: color
                    }
                )
            }
            centerRipple
            square
        >
            <Component
                className={
                    classNames(
                        `${prefixCls}-InputWrapper`,

                    )
                }
            >
                <input
                    type="radio"
                    className={
                        classNames(
                            `${prefixCls}-Input`
                        )
                    }
                    onChange={(e) => handleChange(e)}
                    checked={checked}
                    ref={ref}
                    value={value}
                />

                {checked ? <Zoom in={checked}><RadioChecked /></Zoom> : <RadioUncheck />}

            </Component>

        </ButtonBase>
        {children && <Component
            className={
                classNames(
                    `${prefixCls}-labelWrapper`
                )
            }
        >
            {children}
        </Component>}
    </label>
});

export default Radio;
