import React from 'react';
import classNames from '@packages/utils/classNames'; 
import { Col } from '@packages/core/Grid';
import FormContext from './FormContext';

const FormItemLabel=function({
    prefixCls,
    label,
    htmlFor
}){

    if(!label) return null;

    return (
        <FormContext.Consumer key="label">
            {
                ({
                    labelCol={},
                    labelAlign
                })=>{
                    return (
                        <Col {...labelCol} className={classNames(
                            `${prefixCls}-Label`,
                            {
                                [`${prefixCls}-LabelLeft`]:labelAlign==="left"
                            }
                            
                        )}>
                            <label
                                //for对应表单元素的id
                                htmlFor={htmlFor}
                                title={typeof label==='string'?label:''}
                                
                            >
                                {label}
                            </label>
                        </Col>
                    )
                }
            }
        </FormContext.Consumer>
    )
};

export default FormItemLabel;