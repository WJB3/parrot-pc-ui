import React,{useContext,useState} from 'react';
import classNames from '@packages/utils/classNames'; 
import PropTypes from 'prop-types'; 
import {
    ConfigContext,
    SizeContext
} from '@packages/core/ConfigProvider'; 
import useControlled from '@packages/hooks/useControlled';
import capitalize from '@packages/utils/capitalize';
import { Fade } from '@packages/core/Transition';
import { CloseSquare } from '@packages/core/Icon';
import "./index.scss"; 

const InputText=React.forwardRef(function(props,ref){
    const {
        prefixCls:customizePrefixCls,
        className,  
        size:customizeSize="default",
        placeholder,
        maxLength,
        value:valueProp,
        defaultValue,
        onFocus,
        onBlur,
        onChange,
        onKeyDown,
        id,
        prefix,
        suffix,
        type="text",
        onPressEnter,
        allowClear,
        component:Component="input",
        style,
        //textarea的样式
        textareaStyles={},
        renderNumber
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("InputText",customizePrefixCls); 
 
    const size=useContext(SizeContext)||customizeSize;

    const [value,setValue]=useControlled({
        controlled:valueProp,
        default:defaultValue
    });

    const [active,setActive]=useState(false);

    const handleFocus=(e)=>{
        setActive(true);
        onFocus?.(e);
    };

    const handleBlur=(e)=>{
        setActive(false);
        onBlur?.(e);
    }

    const handleChange=(e)=>{ 
        onChange?.(e.target.value,e);
        setValue(e.target.value);
    } 

    const handleKeyDown=(e)=>{
        onKeyDown?.(e.keyCode,e); 

        if(e.keyCode===13){
            onPressEnter?.(e);
        } 
        
    }

    const handleClearValue=(e)=>{
        onChange?.("",e);
        setValue("");
    }

    return (
        <div style={style} className={classNames(
            `${prefixCls}`,
            className,
            {
                [`${prefixCls}-${capitalize(size)}`]:size,
                [`${prefixCls}-Focus`]:active
            } 
        )}>
            <div className={classNames(
                `${prefixCls}-InputWrapper`
            )}>

                {
                    prefix && <span className={classNames(`${prefixCls}-InputWrapper-Prefix`)}>
                        {prefix}
                    </span>
                }

                <Component 
                    placeholder={placeholder}
                    value={(value||value==0)?value:""}
                    className={
                        classNames(
                            `${prefixCls}-Input`
                        )
                    }
                    ref={ref} 
                    id={id}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    maxLength={maxLength}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    type={type}
                    style={textareaStyles}
                />

              

                {
                    (suffix || allowClear) && <span className={classNames(`${prefixCls}-InputWrapper-Suffix`)}>
                        {allowClear && <Fade in={value?true:false} mountOnEnter unmountOnExit>
                            <CloseSquare  
                                style={{fontSize:16,color: "rgba(0,0,0,.4)",margin:"0 8px"}} 
                                onClick={handleClearValue}
                            />
                        </Fade>}
                        {suffix}
                    </span>
                }
            </div>

            {renderNumber}
        </div>
    )
});

InputText.propTypes={
    //自定义后缀
    prefixCls:PropTypes.string,
    //自定义类名
    className:PropTypes.string, 
    //input 尺寸大小
    size:PropTypes.oneOf(['small','default','large']), 
    //最大长度
    maxLength:PropTypes.number,
    //占位符
    placeholder:PropTypes.any,
    //输入框内容
    value:PropTypes.any,
    //输入框默认内容
    defaultValue:PropTypes.string,
    //焦点事件
    onFocus:PropTypes.func,
    //离开焦点事件
    onBlur:PropTypes.func,
    //输入框内容变化的回调事件
    onChange:PropTypes.func,
    //输入框的id
    id:PropTypes.string,
    //input前缀
    prefix:PropTypes.any,
    //input后缀
    suffix:PropTypes.any,
    //number
    renderNumber:PropTypes.any,
    //style
    style:PropTypes.any,
    //textareaStyles
    textareaStyles:PropTypes.any

};

export default InputText;