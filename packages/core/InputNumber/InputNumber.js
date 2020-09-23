import React, { useContext, useEffect, useState, useRef } from 'react';
import {
    KeyboardArrowUp,
    KeyboardArrowDown,
} from '@packages/core/Icon';
import ButtonBase from '@packages/core/ButtonBase';
import classNames from '@packages/utils/classNames';
import PropTypes from 'prop-types';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import InputText from '@packages/core/InputText';
import useControlled from '@packages/hooks/useControlled';
import useInit from '@packages/hooks/useInit';
import KeyCode from '@packages/utils/KeyCode';
import "./index.scss";

const sizeObj = {
    "small": "12px",
    "default": "16px",
    "large": "20px"
}


function noop() { }

const InputNumber = React.forwardRef(function (props, ref) {
    const {
        prefixCls: customizePrefixCls,
        className,
        onChange,
        size = "default",
        max: maxProp = Number.MAX_SAFE_INTEGER,
        min: minProp = Number.MIN_SAFE_INTEGER,
        defaultValue,
        value: valueProp,
        autoFocus,
        readOnly,
        disabled,
        onKeyDown,
        onPressEnter,
        precision,
        //指定输入框输入的格式
        formatter,
        decimalSeparator,
        step: stepProp = 1,
        ...restProps
    } = props;

    const editable = !readOnly && !disabled;

    const isInit = useInit();

    const prefixCls = useContext(ConfigContext)?.getPrefixCls("InputNumber", customizePrefixCls);

    //首先确立我们的value始终是string
    const [value, setValue] = useControlled({ controlled: valueProp ? String(valueProp) : valueProp, default: defaultValue ? String(defaultValue) : defaultValue });

    const [focused, setFocused] = useState(autoFocus);

    const renderNumber = (<div className={classNames(`${prefixCls}-HandlerWrap`)} >
        <ButtonBase className={classNames(`${prefixCls}-Handler`)}> <KeyboardArrowUp style={{ fontSize: sizeObj[size] }} /></ButtonBase>
        <ButtonBase className={classNames(`${prefixCls}-Handler`)}> <KeyboardArrowDown style={{ fontSize: sizeObj[size] }} /></ButtonBase>
    </div>)

  
    const getStep = (e) => {
        //获取步数
        if (e.metaKey || e.ctrlKey) {
            return 0.1;
        } else if (e.shiftKey) {
            return 10;
        }
        return stepProp || 1;
    }

    const getCanCalcValue = () => {
        //这里返回的值永远是number类型
        //获取可以计算的值
        if (!value) {
            return 0;
        }
        if (isNaN(parseFloat(value))) {
            return 0;
        }
        return Number(value);
    }

    const handleKeyDown = (keyCode, e) => {
 
        if (e) {
            //阻止每次按下按键光标跳到前面
            e.persist();
            e.preventDefault();
        }

        let val=getCanCalcValue();
        const step=getStep(e);

        //按键向上
        if (keyCode === KeyCode.UP) {
            val = val + step;
        } else if (keyCode === KeyCode.DOWN) {
            val = val - step;
        } else {

        }

        // console.log(val)
        setValue(String(val))
    }


    const getTransformValue = (value) => {
 
        let val = value;

        if (!value) {
            //不存在value值
            val = "0";
        } else if (isNaN(value)) {
            //汉字等
            val = value;
        } else {
            //普通数值
            val = String(val);
        }

        if (formatter) {
            val = formatter(val);
        }

        if (decimalSeparator) {
            val = val.replace(".", decimalSeparator)
        }

        return val;
    }

    const handleChange=(value)=>{
        console.log(value)
    }

    useEffect(() => {
        if (isInit) {
            onChange?.(value);
        }
    }, [value, isInit]); 

    console.log(getTransformValue(value))

    return (
        <InputText
            component={"input"}
            className={classNames(prefixCls)}
            renderNumber={renderNumber}
            onKeyDown={editable ? handleKeyDown : noop}
            onPressEnter={editable ? onPressEnter : noop}
            {...restProps}
            size={size}
            value={getTransformValue(value)}
            onChange={handleChange}
        />
    )
});

InputNumber.propTypes = {
    //自定义后缀
    prefixCls: PropTypes.string,
    //自定义类名
    className: PropTypes.string,
    //input 尺寸大小
    size: PropTypes.oneOf(['small', 'default', 'large']),
    //最大长度
    maxLength: PropTypes.number,
    //占位符
    placeholder: PropTypes.any,
    //输入框内容
    value: PropTypes.string,
    //输入框默认内容
    defaultValue: PropTypes.any,
    //焦点事件
    onFocus: PropTypes.func,
    //离开焦点事件
    onBlur: PropTypes.func,
    //输入框内容变化的回调事件
    onChange: PropTypes.func,
    //输入框的id
    id: PropTypes.string,
    //input前缀
    prefix: PropTypes.any,
    //input后缀
    suffix: PropTypes.any

};

export default InputNumber;