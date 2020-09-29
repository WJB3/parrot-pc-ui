import React, { useContext } from 'react';
import classNames from '@packages/utils/classNames';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import ButtonBase from '@packages/core/ButtonBase';
import { CheckboxSelected, CheckboxUnSelected } from '@packages/core/Icon';
import useControlled from '@packages/hooks/useControlled';
import capitalize from '@packages/utils/capitalize';
import "./index.scss";

const Checkbox = React.forwardRef((props, ref) => {
    const {
        prefixCls: customizePrefixCls,
        component: Component = "span",
        className,
        checked: checkedProp,
        defaultChecked,
        onChange,
        color = "primary",
        selectIcon = <CheckboxSelected />,
        unselectIcon = <CheckboxUnSelected />,
        indeterminate
    } = props;

    const prefixCls = useContext(ConfigContext)?.getPrefixCls("Checkbox", customizePrefixCls);

    const [checked, setChecked] = useControlled({
        controlled: checkedProp,
        default: Boolean(defaultChecked)
    });

    const handleChange = (e) => {
        setChecked(e.target.checked);
        onChange?.(e.target.checked, e);
    }

    return (
        <label
            className={
                classNames(
                    prefixCls,
                    className,
                    {
                        [`${prefixCls}-${capitalize(color)}`]: color
                    }
                )
            }
        >
            <ButtonBase
                className={
                    classNames(
                        `${prefixCls}-CheckboxBaseRipple`,
                        {
                            [`${prefixCls}-Checked`]: checked, 
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
                        onChange={(e) => handleChange(e)}
                        checked={checked}
                        ref={ref}
                    />

                    {checked ? selectIcon : unselectIcon}

                    {indeterminate && !checked && <span className={classNames(`${prefixCls}-Indeterminate`)}></span>}

                </Component>
            </ButtonBase>
        </label>
    )
});

export default Checkbox;