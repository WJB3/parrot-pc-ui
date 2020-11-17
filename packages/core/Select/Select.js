
import React,{useContext,useEffect,useState,useRef } from 'react';
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
import Option from './Option';
import "./index.scss";

function collectOptions(childrenProp,selectIndex,onSelect){
    let children=childrenToArray(childrenProp).filter((child)=>child.type===Option);
    return children.map((child,index)=>{
        return React.cloneElement(child,{
            currentIndex:index,
            key:index,
            isSelected:selectIndex===index,
            onSelect:onSelect
        })
    })
}

const Select=React.forwardRef((props,ref)=>{
    const {
        prefixCls:customizePrefixCls,
        className,
        children:childrenProp,
        autoWidth=true
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Select",customizePrefixCls);

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

    const onSelect=(e,index)=>{ 
        setSelectIndex(index);
    }

    useEffect(()=>{
        const renderTop=selectIndex-1>=0?selectIndex:0;
        const top=-8-32*renderTop
        setOptionStyle({
            top
        })
    },[content,selectIndex]);

    useEffect(()=>{ 
        setContent(collectOptions(childrenProp,selectIndex,onSelect));
    },[childrenProp,selectIndex])

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
                fixRightBlock={<ArrowDown />}
                style={{width:100}} 
                ref={inputTextRef}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
    </Popover>

});

export default Select;