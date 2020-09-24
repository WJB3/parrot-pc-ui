import React, { useContext, useEffect, useState, useRef } from 'react';
import {
    EyeOn,
    EyeOff,
} from '@packages/core/Icon'; 
import classNames from '@packages/utils/classNames';
import PropTypes from 'prop-types';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import InputText from '@packages/core/InputText';
import useControlled from '@packages/hooks/useControlled';
import "./index.scss";

const sizeObj = {
    "small": "12px",
    "default": "16px",
    "large": "20px"
}

const InputPassword = React.forwardRef(function (props, ref) {
    const {
        prefixCls: customizePrefixCls,
        className,
        onChange,
        size = "default", 
        defaultValue,
        value: valueProp, 
        visibilityToggle=true,
        iconRender,
        ...restProps
    } = props; 

    const prefixCls = useContext(ConfigContext)?.getPrefixCls("InputPassword", customizePrefixCls);

    //首先确立我们的value始终是string
    const [value, setValue] = useControlled({controlled: valueProp, default: defaultValue});   
  
    const [visible,setVisible]=useState(false);//是否可见

    const handleChange=(val)=>{   
        setValue(val);
    }   

    const renderPassword=()=>{
        if(iconRender){
            return <div  onClick={()=>setVisible(!visible)}>
                {iconRender(visible)}
            </div>
        }
        return <div onClick={()=>setVisible(!visible)}>
            {visible?<EyeOn style={{fontSize:sizeObj[size]}} />:<EyeOff style={{fontSize:sizeObj[size]}} />}
        </div>
    }
 
 
    return (
        <InputText
            component={"input"}
            className={classNames(prefixCls)}   
            size={size}
            ref={ref}
            value={value?value:""}
            type={visible?"text":"password"}
            onChange={handleChange} 
            suffix={visibilityToggle?renderPassword():null}
            {...restProps}
        />
    )
});

InputPassword.propTypes = {
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

export default InputPassword;