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
import themeColor from '@packages/core/styles/styles';
import useForkRef from '@packages/hooks/useForkRef';
import "./index.scss";

const sizeObj = {
    "small": "12px",
    "default": "16px",
    "large": "20px"
}

const isValidProps = value => value !== undefined && value !== null;

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

    const inputRef=useRef(null);

    const prefixCls = useContext(ConfigContext)?.getPrefixCls("InputNumber", customizePrefixCls);

    //首先确立我们的value始终是string
    const [value, setValue] = useControlled({controlled: valueProp, default: defaultValue});

    const [focused, setFocused] = useState(autoFocus);

    const renderNumber = (<div className={classNames(`${prefixCls}-HandlerWrap`)} >
        <ButtonBase className={classNames(`${prefixCls}-Handler`)} TouchRippleProps={{style:{color:themeColor.PRIMARY}}} onClick={()=>setValue(computedLastValueOutOfRange("up"))}> <KeyboardArrowUp style={{ fontSize: sizeObj[size] }} /></ButtonBase>
        <ButtonBase className={classNames(`${prefixCls}-Handler`)} TouchRippleProps={{style:{color:themeColor.PRIMARY}}} onClick={()=>setValue(computedLastValueOutOfRange("down"))}> <KeyboardArrowDown style={{ fontSize: sizeObj[size] }} /></ButtonBase>
    </div>)

  
    const getStep = (e) => {
        
        if(!e){
            return stepProp||1;
        }
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

        let val=value;

        if (!value) {
            val=0;
        }

        if (isChinese(value)) {
            //是汉字
            val=0;
        }
        if(precision && isNumber(value)){
            val=Number(val).toFixed(precision);
        } 

        return Number(val);
    }

    const handleKeyDown = (keyCode, e) => {    

        //阻止默认事件会不触发onchange 
        // if (e) {
        //     //阻止每次按下按键光标跳到前面
        //     e.persist();
        //     e.preventDefault();
        // } 

        //按键向上
        if (keyCode === KeyCode.UP) {//上键
            if(e){
                e.preventDefault();
            }
            let val=computedLastValueOutOfRange("up",e);
            setValue(val);
        } else if (keyCode === KeyCode.DOWN) {//下键
            let val=computedLastValueOutOfRange("down",e);
            setValue(val);
        } else if(keyCode===KeyCode.BACKSPACE){//回车
             
            if(precision){
                setValue("");
            }
            
            
        }
    }  

    const computedLastValueOutOfRange=(type,e,value)=>{
       
        //根据边界判断最终的值
        let val=getCanCalcValue();
         
        if(type==="up"){
            const step=getStep(e);
            let cVal=val+step;

            if(cVal>=maxProp){
                return maxProp;
            }

            return String(cVal);

        }else if(type==="down"){
            const step=getStep(e);
            let cVal=val-step; 
            if(cVal<=minProp){
                return minProp;
            }

            return String(cVal);
        }else if(type==="change" && e===null){//change变化的值
             
            if(Number(value)>=maxProp){//如果超出max值
                return String(maxProp);
            }

            if(Number(value)<=minProp){//如果低于min值
                return String(minProp);
            }

            return String(value);
        }
    }
    
    const isNumber=(val)=>{
        let reg=/^[0-9]+.?[0-9]*$/;
        //判断转后是否是数字
        if(reg.test(val)){
            return true;
        }
        return false;
    }

    const isChinese=(val)=>{
        //判断是否是汉字
        if(isNaN(parseFloat(val))){
            return true;
        }
        return false;

    }

    const handleChange=(val)=>{   
        //新打的字符
        let newWord=val.substring(val.length-1);
        //全字符
        let competeWord=val; 

        if(isNumber(newWord) && isChinese(competeWord)){
            //如果新打的字符是数字并且之前是汉字 设置新打的单词为value
            setValue(computedLastValueOutOfRange('change',null,newWord))
        }else if(isNumber(newWord) && isNumber(competeWord)){
            //如果新打的字符是数字并且总的是数字，设置value为change变化的值 
            setValue(computedLastValueOutOfRange('change',null,competeWord))
        }

         
    }   

    useEffect(() => {
        if (isInit) {
            onChange?.(getCanCalcValue(value));
        }
    }, [value, isInit]); 
 

    const getTransformValue = (value) => {
        //转化formatter、decimalSeparator的函数
 
        let val = value;

        if (!isValidProps(value)) {
            //不存在value值
            val = "";
        } else if (isChinese(value)) {
            //汉字等
            val = value;
        } else {
            //普通数值
            val = String(val);
        }
        
        if(precision && isNumber(val)){//判断是数字
            val=Number(val).toFixed(precision);
        }

        if (formatter) {
            val = formatter(val);
        } 

        if (decimalSeparator) { 
            val = val.replace(".", decimalSeparator)
        }

        return val;
    } 

    const handleRef=useForkRef(inputRef,ref);

    const setCursorPosition=()=>{
        if(inputRef.current.setSelectionRange){
            inputRef.current.setSelectionRange(inputRef.current.value.length,inputRef.current.value.length);
            inputRef.current.focus();
        } 
    }

    return (
        <InputText
            component={"input"}
            className={classNames(prefixCls)}
            renderNumber={renderNumber}
            onKeyDown={editable ? handleKeyDown : noop} 
            onPressEnter={editable ? onPressEnter : noop}
            size={size}
            ref={handleRef}
            value={getTransformValue(value)}
            onChange={handleChange} 
            {...restProps}
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