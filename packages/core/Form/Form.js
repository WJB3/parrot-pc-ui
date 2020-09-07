import React,{ useMemo } from 'react'; 
import classNames from '@packages/utils/classNames';  
import usePrefixCls from '@packages/hooks/usePrefixCls'; 
import FormContext from './FormContext';
import useForm ,{HOOK_MARK} from './useForm';
import capitalize from '@packages/utils/capitalize';
import "./index.scss";

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
        form,
        //经 Form.useForm() 创建的 form 控制实例，不提供时会自动创建
        labelCol,
        //label的栅格布局方式
        labelAlign,
        //label文本的对齐方式
        wrapperCol,
        //input的栅格布局方式
        children,
        layout="horizontal",//表单布局
        initialValues,
    }=props;

    const prefixCls=usePrefixCls('Form',customizePrefixCls);

    const formContext = React.useContext(FormContext);

    const [formInstance]=useForm(form);

    const {
        setInitialValues
    }=formInstance.getInternalHooks(HOOK_MARK);

    console.log(formInstance.getInternalHooks(HOOK_MARK))

    // Set initial value, init store value when first mount
    const mountRef = React.useRef(null);
    console.log(setInitialValues)
    setInitialValues(initialValues, !mountRef.current);
    if (!mountRef.current) {
        mountRef.current = true;
    }


     // Register form into Context
    React.useEffect(() => {
        formContext.registerForm(name, formInstance);
        return () => {
            formContext.unregisterForm(name);
        };
    }, [formContext, formInstance, name]);

    const formContextValue=useMemo(()=>({
        name,
        labelCol,
        labelAlign,
        wrapperCol,
        validateTrigger,
        ...formInstance
    }),[name])

    return(
        <FormContext.Provider value={formContextValue}>
            <Component
                id={name}
                onSubmit={(event) => {
                    event.preventDefault();
                    event.stopPropagation(); 
                }}
                className={classNames(
                    prefixCls,
                    {
                        [`${prefixCls}-${capitalize(layout)}`]:true
                    }
                )}
            >
                {children}
            </Component>
        </FormContext.Provider>
    ) 
});


export default Form;