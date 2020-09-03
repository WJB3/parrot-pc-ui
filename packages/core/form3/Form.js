import * as React from 'react';
import { useMemo } from 'react';
import classNames from 'classnames';
import FieldForm, { List } from 'rc-field-form';
import { ConfigContext } from '../config-provider';
import { FormContext } from './context';
import useForm, { FormInstance } from './hooks/useForm';
import SizeContext, { SizeContextProvider } from '../config-provider/SizeContext';
 

const InternalForm  = (props, ref) => {
  const contextSize = React.useContext(SizeContext);
  const { getPrefixCls, direction } = React.useContext(ConfigContext);

  const { name } = props;

  const {
    prefixCls: customizePrefixCls,
    className = '',
    size = contextSize,
    form, 
    labelAlign,
    labelCol,
    wrapperCol,
    hideRequiredMark,
    layout = 'horizontal',
    scrollToFirstError,
    requiredMark,
    onFinishFailed, 
  } = props;

  const mergedRequiredMark = useMemo(() => {
    if (requiredMark !== undefined) {
      return requiredMark;
    }

    if (hideRequiredMark) {
      return false;
    }

    return true;
  }, [hideRequiredMark, requiredMark]);

  const prefixCls = getPrefixCls('form', customizePrefixCls);

  const formClassName = classNames(
    prefixCls,
    {
      [`${prefixCls}-${layout}`]: true,
      [`${prefixCls}-hide-required-mark`]: mergedRequiredMark === false,
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-${size}`]: size,
    },
    className,
  );

  const [wrapForm] = useForm(form);
  const { __INTERNAL__ } = wrapForm;
  __INTERNAL__.name = name;

  const formContextValue = useMemo(
    () => ({
      name,
      labelAlign,
      labelCol,
      wrapperCol,
      vertical: layout === 'vertical', 
      requiredMark: mergedRequiredMark,
      itemRef: __INTERNAL__.itemRef,
    }),
    [name, labelAlign, labelCol, wrapperCol, layout, mergedRequiredMark],
  );

  React.useImperativeHandle(ref, () => wrapForm);

  const onInternalFinishFailed = (errorInfo) => {
    if (onFinishFailed) {
      onFinishFailed(errorInfo);
    }

    if (scrollToFirstError && errorInfo.errorFields.length) {
      wrapForm.scrollToField(errorInfo.errorFields[0].name);
    }
  };

  return (
    <SizeContextProvider size={size}>
      <FormContext.Provider value={formContextValue}>
        <FieldForm
          id={name} 
          onFinishFailed={onInternalFinishFailed}
          form={wrapForm}
          className={formClassName}
        />
      </FormContext.Provider>
    </SizeContextProvider>
  );
}; 

export { useForm, List, FormInstance };

export default React.forwardRef(InternalForm);
