import React, { useContext } from 'react';
import classNames from '@packages/utils/classNames';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import ButtonBase from '@packages/core/ButtonBase';
import { CheckboxSelected, CheckboxUnSelected } from '@packages/core/Icon';
import useControlled from '@packages/hooks/useControlled';
import capitalize from '@packages/utils/capitalize'; 
import CheckGroupContext from './CheckboxGroupContext';
import createChainedFunction from '@packages/utils/createChainedFunction';
import {
    Zoom
} from '@packages/core/Transition';
import "./index.scss";

const Checkbox = React.forwardRef((props, ref) => {
    const {
        prefixCls: customizePrefixCls,
        component: Component = "span",
        className,
        checked: checkedProp,
        defaultChecked,
        onChange:onChangeProp,
        color = "primary",
        selectIcon = <CheckboxSelected />,
        unselectIcon = <CheckboxUnSelected />,
        indeterminate,
        children,
        value
    } = props;

    const prefixCls = useContext(ConfigContext)?.getPrefixCls("Checkbox", customizePrefixCls);

    const checkboxGroup=useContext(CheckGroupContext);

    let ischecked=checkedProp;

    if(checkboxGroup){
        if(typeof ischecked==='undefined'){
            ischecked=checkboxGroup.value?checkboxGroup.value.indexOf(value)>-1?true:false:false;
        }
    }

    const [checked, setChecked] = useControlled({
        controlled: ischecked,
        default: Boolean(defaultChecked)
    });

    const onChange=createChainedFunction(onChangeProp,checkboxGroup && checkboxGroup.onChange);

    const handleChange = (e) => {
        setChecked(e.target.checked);
        onChange?.(e.target.checked, e,value); 
    } 

    return (
        <label
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
                        `${prefixCls}-CheckboxBaseRipple`,
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
                        type="checkbox"
                        className={
                            classNames(
                                `${prefixCls}-Input`
                            )
                        }
                        onChange={handleChange}
                        checked={checked}
                        ref={ref}
                        value={value}
                        onClick={()=>console.log("onclick")}
                    />

                    {checked ? <Zoom visible={checked}>{selectIcon}</Zoom> : unselectIcon}

                    {indeterminate && !checked && <span className={classNames(`${prefixCls}-Indeterminate`)}></span>}

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
    )
});

export default Checkbox;