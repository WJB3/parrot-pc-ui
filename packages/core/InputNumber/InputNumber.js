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

const sizeObj={
    "small":"12px",
    "default":"16px",
    "large":"20px"
}
 

function noop() {}

const InputNumber = React.forwardRef(function (props, ref) {
    const {
        prefixCls: customizePrefixCls,
        className, 
        onChange,
        size="default",
        max:maxProp=Number.MAX_SAFE_INTEGER,
        min:minProp=Number.MIN_SAFE_INTEGER,
        defaultValue,
        value:valueProp,
        autoFocus, 
        readOnly,
        disabled,
        onKeyDown,
        onPressEnter,
        precision,
        //指定输入框输入的格式
        formatter, 
        ...restProps
    } = props;

    const editable=!readOnly && !disabled;

    const isInit = useInit();

    const prefixCls = useContext(ConfigContext)?.getPrefixCls("InputNumber", customizePrefixCls);

    const [value,setValue]=useControlled({controlled:valueProp,default:defaultValue});

    const [focused,setFocused]=useState(autoFocus);

    const  renderNumber=(<div className={classNames(`${prefixCls}-HandlerWrap`)} >
        <ButtonBase className={classNames(`${prefixCls}-Handler`)}> <KeyboardArrowUp style={{fontSize:sizeObj[size]}} /></ButtonBase>
        <ButtonBase className={classNames(`${prefixCls}-Handler`)}> <KeyboardArrowDown style={{fontSize:sizeObj[size]}} /></ButtonBase>
    </div>)

 
   
    const handleChange=(value,e)=>{
        //判断是否是数字
        if(typeof Number(value)==="number"){
            setValue(Number(value)); 
        }
    }

    const getRatio=(e)=>{
        let ratio=1;
        if(e.metaKey || e.ctrlKey){
            ratio=0.1;
        }else if(e.shiftKey){
            ratio=10;
        }
        return ratio;
    }

    const handleKeyDown=(keyCode,e)=>{
        if(keyCode===KeyCode.UP){
            const ratio=getRatio(e);
            step("up",e,ratio,null);
        }
    }

    const isNotCompleteNumber=(num)=>{
        //判断不是一个完整数字
        return (
            isNaN(num)||
            num===""||
            num===null||
            (num && num.toString().indexOf(".")===num.toString().length-1)
        )
    }
 
 

    const step=(type,e,ratio=1,recursive)=>{
        if(e){
            e.persist();
            e.preventDefault();
        }
        if(!editable) return ;

        const value=getCurrentValidValue(value)||0;

        if(isNotCompleteNumber(value)) return ;
    }
 
    const getTransformValue=(value)=>{
        let val=value;
        
        if(!value){
            //不存在value值
            val=0;
        }else if(isNaN(value)){
            //汉字等
            val=value;
        }else{
            //普通数值
            val=Number(val);
        }

        if(formatter){
            val=formatter(val);
        }
         
        return val; 
    }

    useEffect(()=>{
        if(isInit){
            onChange?.(value);
        }
    },[value,isInit]);
 
    return (
        <InputText
            component={"input"}
            className={classNames(prefixCls)}   
            renderNumber={renderNumber} 
            onChange={handleChange}
            onKeyDown={editable?handleKeyDown:noop}
            {...restProps}
            size={size}
            value={getTransformValue(value)}
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
    defaultValue: PropTypes.string,
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