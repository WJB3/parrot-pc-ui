import React,{Fragment,useRef, useContext,isValidElement,cloneElement} from 'react';
import classNames from '@packages/utils/classNames'; 
import { Row } from '@packages/core/Grid';
import PropTypes from 'prop-types'; 
import usePrefixCls from '@packages/hooks/usePrefixCls';
import FormItemLabel from './FormItemLabel';
import FormItemInput from './FormItemInput';
import capitalize from '@packages/utils/capitalize';
import FormContext from './FormContext';
import useForm ,{HOOK_MARK} from './useForm';
import { getNamePath } from './utils/valueUtil';
 
import { 
    getValue,
    defaultGetValueFromEvent
} from './utils/valueUtil';
import { toArray } from './utils/typeUtil';

const MemoInput=React.memo(
    ({children})=>children,  
    (prev,next)=>{
        return prev.value===next.value && prev.update===next.update
    }
);

function getFieldId(namePath,formName){
    if(namePath.length) return undefined;

    const mergedId=namePath.join('_');

    return formName?`${formName}_${mergedId}`:mergedId;
}

function hasValidName(name){
    return !(name===undefined||name===null);
}

const FormItem=function(props){

    const {
        prefixCls:customizePrefixCls,
        //类名前缀
        className, 
        children,
        noStyle,//为true时不带样式，作为纯字段控件使用
        hidden,//是否隐藏字段（依然会收集和校验字段）
        style,
        required,//必填样式设置
        rules,
        name,//	字段名，支持数组
        trigger="onChange",//设置收集字段值变更的时机,默认是onChange
        validateTrigger,//设置字段校验的时机,默认是onChange
        getValueProps,//为子元素添加额外的属性
        valuePropName="value",//子节点的值的属性
        getValueFromEvent,//设置如何将 event 的值转换成字段值
    }=props;

    const prefixCls=usePrefixCls('FormItem',customizePrefixCls);

    const {
        name:formName,
        validateTrigger:contextValidateTrigger,
        getFieldsValue,
        getInternalHooks
    }=useContext(FormContext);

    const updateRef = React.useRef(0);
    
    updateRef.current += 1;

    const fieldId=getFieldId(name,formName);

    const validatePromise=useRef(null);

    const touched=useRef(false);

    const dirty=useRef(false);

    const errors=useRef([]);

    const isFieldValidating=()=>!!validatePromise.current;

    const isFieldTouched=()=>touched.current;

    const hasName=hasValidName(name);

    const mergedValidateTrigger=validateTrigger!==undefined?validateTrigger:contextValidateTrigger;

    const {dispatch}=getInternalHooks(HOOK_MARK);

    function renderLayout(baseChildren,fieldId,meta,isRequired){
        if(noStyle && !hidden){
            return baseChildren;
        }

        return (
            <Row
                className={classNames(prefixCls)}
                style={style}
            >
                <FormItemLabel 
                    htmlFor={fieldId}
                    required={isRequired}
                    prefixCls={prefixCls}
                />
                <FormItemInput
                    prefixCls={prefixCls}
                    {...meta}
                >
                    {baseChildren}
                </FormItemInput>
            </Row>
        )
    }
     
    //有设置required或者在规则里面有定义字段
    const isRequired=required!==undefined?
        required:rules && !!(rules.some(rule=>{
            if(rule && typeof rule==='object' && rule.required){
                return true;
            }
            return false;
    }));

    const getMeta=()=>{
        let prevValidating=isFieldValidating();

        const meta={
            touched:isFieldTouched(),
            validating:prevValidating,
            errors:errors.current,
            name:getNamePath(name)
        }

        return meta;
    };

    const getControlled=(childProps={})=>{
        
        const value=getValue(getFieldsValue(true),getNamePath(name));

        const mergedGetValueProps=getValueProps||((val)=>({[valuePropName]:val}));

        const originTriggerFunc=childProps[trigger];

        const control={
            ...childProps,
            ...mergedGetValueProps(value)
        };

        control[trigger]=(...args)=>{
            touched.current=true;
            dirty.current=true;

            let newValue;
            if(getValueFromEvent){
                newValue=getValueFromEvent(...args);
            }else{
                newValue=defaultGetValueFromEvent(valuePropName,...args);
            }

            if(normalize){
                newValue=normalize(newValue,value,getFieldsValue(true));
            }

            dispatch({
                type:"updateValue",
                namePath,
                value:newValue
            });

            if(originTriggerFunc){
                originTriggerFunc(...args);
            } 
        }

        const validateTriggerList=toArray(mergedValidateTrigger || []);

        validateTriggerList.forEach((triggerName)=>{
            const originTrigger=control[triggerName];
            control[triggerName]=(...args)=>{
                if(originTrigger){
                    originTrigger(...args);
                }

                if(rules &&rules.length){
                    dispatch({
                        type:"validateField",
                        namePath,
                        triggerName
                    })
                }
            } 
        })

        return control;
    }

    //==================================Children=================================
    const mergedControl={
        ...getControlled(),
    }

    let childNode=null;

    if(Array.isArray(children) && hasName){
        childrenNode=children;
    }else if(isValidElement(children)){
        const childProps={...children.props,...mergedControl};
        if(!childProps.id){
            childProps.id=fieldId;
        }
         
        const triggers=new Set([
            ...toArray(trigger),
            ...toArray(mergedValidateTrigger)
        ])

        triggers.forEach(eventName=>{
            childProps[eventName]=(...args)=>{
                mergedControl[eventName]?.(...args);
                children.props[eventName]?.(...args);
            }
        });

        childNode=(
            <MemoInput
                value={mergedControl[props.valuePropName||'value']}
                update={updateRef.current}
            >
                {cloneElement(children,childProps)}
            </MemoInput>
        )
    }else{
        childNode=children;
    }

    return(
        <Fragment>
            {renderLayout(childNode,fieldId,getMeta(),isRequired)}
        </Fragment>
    ) 
};


export default FormItem;