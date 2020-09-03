import React,{useMemo} from 'react';
import classNames from '@packages/utils/classNames'; 
import PropTypes from 'prop-types'; 
import usePrefixCls from '@packages/hooks/usePrefixCls';
import capitalize from '@packages/utils/capitalize';
import { FormContext } from './FormContext';
import useForm from './useForm';

const Form=React.forwardRef((props,ref)=>{

    const {
        prefixCls:customizePrefixCls,
        //类名前缀
        className,
        //类名
        name,
        //表单名称，会作为表单字段 id 前缀使用
        component:Component="form",
        //设置 Form 渲染元素，为 false 则不创建 DOM 节点
        validateTrigger = 'onChange',
        //统一设置字段校验规则
    }=props;

    const prefixCls=usePrefixCls('Form',customizePrefixCls);

    const formContextValue=useMemo(()=>({
        name
    }),[name])

    return(
        <FormContext.Provider value={formContextValue}>
            <Component
                id="name"
                onSubmit={(event) => {
                    event.preventDefault();
                    event.stopPropagation(); 
                }}
            >
                {children}
            </Component>
        </FormContext.Provider>
    )


});


export default Form;