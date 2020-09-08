import React from 'react';
import classNames from '@packages/utils/classNames'; 
import { Col } from '@packages/core/Grid';
import FormContext from './FormContext';

const FormItemInput=function({
    prefixCls,
    children,
    label
}){

    if(!label) return null;

    return (
        <FormContext.Consumer key="input">
            {({
                wrapperCol={}
            })=>{

                return (<Col {...wrapperCol} className={classNames(
                    `${prefixCls}-Controll`
                )}>
                    <div className={classNames(`${prefixCls}-Controll-Input`)}>
                        <div className={classNames(`${prefixCls}-Controll-Input-Content`)}>
                            {children}
                        </div>
                    </div>
                </Col>)
            }}
        </FormContext.Consumer>
    )
};

export default FormItemInput;