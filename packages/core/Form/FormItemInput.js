import React,{useMemo} from 'react';
import classNames from '@packages/utils/classNames'; 
import { Col } from '@packages/core/Grid';
import FormContext from './FormContext';
import useCacheErrors from '@packages/hooks/useCacheErrors';
import useCacheMemo from '@packages/hooks/useCacheMemo';
import { Fade } from '@packages/core/Transition';

const FormItemInput=function({
    prefixCls,
    children,
    label,
    errors,
    help,
    onDomErrorVisibleChange
}){

    if(!label) return null;

    const [visible,cacheErrors]=useCacheErrors(
        errors,
        changedVisible=>{console.log(changedVisible)},
        !!help
    );

    React.useEffect(
        ()=>()=>{
            onDomErrorVisibleChange(false);
        },
        []
    );

    const memoErrors=useCacheMemo(
        ()=>cacheErrors,
        visible,
        (_,nextVisible)=>nextVisible
    );

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

                    <Fade timeout={500} in={visible}> 
                        <div className={classNames(`${prefixCls}-Explain`)}>
                            {memoErrors.map((error,index)=>(
                                <div key={index} role="alert">{error}</div>
                            ))}
                        </div>
                    </Fade>


                </Col>)
            }}
        </FormContext.Consumer>
    )
};

export default FormItemInput;