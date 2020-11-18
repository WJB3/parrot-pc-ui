
import React,{ useContext,useEffect,useState,useRef,useMemo  } from 'react';
import InputText from '@packages/core/InputText';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import classNames from '@packages/utils/classNames';
import Popover from '@packages/core/Popover';
import {
    ArrowDown 
} from '@packages/core/Icon';
import childrenToArray from '@packages/utils/childrenToArray';
import useControlled from '@packages/hooks/useControlled';
import Option from './Option';
import "./index.scss";

function collectOptions(childrenProp,selectIndex,onSelect,selectValue){
    let children=childrenToArray(childrenProp).filter((child)=>child.type===Option);
    return children.map((child,index)=>{
        return React.cloneElement(child,{
            currentIndex:index,
            key:index,
            isSelected:selectIndex===index,
            onSelect:onSelect,
            selectValue:selectValue
        })
    })
}

function collectKeyValue(childrenProp){
    let children=childrenToArray(childrenProp).filter((child)=>child.type===Option); 
    return children.map((item)=>({
        children:item.props.children,
        value:item.props.value
    }))
}

const Select=React.forwardRef((props,ref)=>{
    const {
        prefixCls:customizePrefixCls,
        className,
        children:childrenProp,
        autoWidth=false,
        value:valueProp,
        defaultValue,
        onChange:onChangeProp,
        onSelect:onSelectProp,
        inputWidth
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Select",customizePrefixCls);

    const keyValue=collectKeyValue(childrenProp); 

    const [value,setValue,isControlled]=useControlled({
        controlled:valueProp,
        default:defaultValue
    }); 

    const [selectIndex,setSelectIndex]=useState(-1);

    const inputTextRef=useRef(null);

    const [ visible,setVisible]=useState(false);

    const [optionStyle,setOptionStyle]=useState({top:-8})

    const [ content,setContent ]=useState(null);

    const handleFocus=(e)=>{
        setVisible(true);
    } 

    const handleBlur=(e)=>{
        setVisible(false);
    }

    const onSelect=(e,index,value)=>{  
        setSelectIndex(index);
        setValue(value);
        onSelectProp?.(value);
    }

    useEffect(()=>{
        const renderTop=selectIndex-1>=0?selectIndex:0;
        const top=-8-32*renderTop
        setOptionStyle({
            top
        })
    },[content,selectIndex]);

    const inputTextValue=useMemo(()=>{
        const findValue=keyValue.find(item=>item.value===value);
        return findValue?.children;
    },[value]);
 
    useEffect(()=>{
        onChangeProp?.(value);
    },[value]);

    useEffect(()=>{ 
        setContent(collectOptions(childrenProp,selectIndex,onSelect,value));
    },[childrenProp,selectIndex,value])

    return <Popover
        content={content}
        visible={visible}
        arrow={false} 
        className={classNames(
            `${prefixCls}-Popover`,
            {
                [`${prefixCls}-Popover-AutoWidth`]:autoWidth
            }
        )}
        style={optionStyle}
        disabledPopper
        getPopupContainer={()=>inputTextRef.current} 
    >
            <InputText 
                className={classNames(
                    prefixCls,
                    {
                        [`${prefixCls}-AutoWidth`]:autoWidth
                    }
                   
                )} 
                value={inputTextValue}
                fixRightBlock={<ArrowDown />}
                style={{width:inputWidth}} 
                ref={inputTextRef}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
    </Popover>

});

export default Select;