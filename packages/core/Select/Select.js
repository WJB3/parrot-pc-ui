
import React,{useContext,useEffect,useState} from 'react';
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

function collectOptions(children){
    return childrenToArray(children).filter((child)=>child.type===Option);
}

const Select=React.forwardRef((props,ref)=>{
    const {
        prefixCls:customizePrefixCls,
        className,
        children:childrenProp
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Select",customizePrefixCls);

    const [ content,setContent ]=useState(null);

    useEffect(()=>{
        setContent(collectOptions(childrenProp));
    },[childrenProp])

    return <Popover
        content={content}
        visible={true}
        arrow={false}
        style={{left:"10px!important",color:"red"}}
        className={classNames(
            `${prefixCls}-Popover`
        )}
    >
            <InputText 
                className={classNames(
                    prefixCls
                )} fixRightBlock={<ArrowDown />}>
        
            </InputText>
    </Popover>

});

export default Select;