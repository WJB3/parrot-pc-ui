import React,{Fragment,useRef, useContext} from 'react';
import classNames from '@packages/utils/classNames'; 
import { Row } from '@packages/core/Grid';
import PropTypes from 'prop-types'; 
import usePrefixCls from '@packages/hooks/usePrefixCls';
import FormItemLabel from './FormItemLabel';
import FormItemInput from './FormItemInput';
import capitalize from '@packages/utils/capitalize';
import FormContext from './FormContext';
import useForm from './useForm';
import { getNamePath } from './utils/valueUtil';
import { toArray } from './utils/typeUtil';

function getFieldId(namePath,formName){
    if(namePath.length) return undefined;

    const mergedId=namePath.join('_');

    return formName?`${formName}_${mergedId}`:mergedId;
}

const FormItem=function(props){

    const {
        prefixCls:customizePrefixCls,
        //类名前缀
        className, 
        children:childrenProp,
        noStyle,//为true时不带样式，作为纯字段控件使用
        hidden,//是否隐藏字段（依然会收集和校验字段）
        style,
        required,//必填样式设置
        rules,
        name,//	字段名，支持数组
        trigger="onChange",//设置收集字段值变更的时机,默认是onChange
        validateTrigger,//设置字段校验的时机,默认是onChange
    }=props;

    const prefixCls=usePrefixCls('FormItem',customizePrefixCls);

    const {
        name:formName,
        validateTrigger:contextValidateTrigger,
        getFieldsValue,
        getInternalHooks
    }=useContext(FormContext);

    const fieldId=getFieldId(name,formName);

    const validatePromise=useRef(null);

    const touched=useRef(false);

    const errors=useRef([]);

    const isFieldValidating=()=>!!validatePromise.current;

    const isFieldTouched=()=>touched.current;

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
        const mergedValidateTrigger=validateTrigger!==undefined?validateTrigger:contextValidateTrigger;

    }

    return(
        <Fragment>
            {renderLayout(childNode,fieldId,getMeta(),isRequired)}
        </Fragment>
    ) 
};


export default FormItem;