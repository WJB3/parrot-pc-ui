import * as React from 'react';
import {
  Store,
  FormInstance,
  FieldData,
  ValidateMessages,
  Callbacks,
  InternalFormInstance,
} from './interface';
import useForm from './useForm';
import FieldContext, { HOOK_MARK } from './FieldContext';
import FormContext, { FormContextProps } from './FormContext';
import { isSimilar } from './utils/valueUtil';
 
 
 
const Form  = (
  {
    name,
    initialValues,
    fields,
    form,
    preserve,
    children,
    component: Component = 'form',
    validateMessages,
    validateTrigger = 'onChange',
    onValuesChange,
    onFieldsChange,
    onFinish,
    onFinishFailed,
    ...restProps
  } ,
  ref,
) => {
  const formContext = React.useContext(FormContext);

  // We customize handle event since Context will makes all the consumer re-render:
  // https://reactjs.org/docs/context.html#contextprovider
  const [formInstance] = useForm(form);
  const {
    useSubscribe,
    setInitialValues,
    setCallbacks,
    setValidateMessages,
    setPreserve,
  } = formInstance.getInternalHooks(HOOK_MARK);

  // Pass ref with form instance
  React.useImperativeHandle(ref, () => formInstance);

  // Register form into Context
  React.useEffect(() => {
    formContext.registerForm(name, formInstance);
    return () => {
      formContext.unregisterForm(name);
    };
  }, [formContext, formInstance, name]);

  // Pass props to store
  setValidateMessages({
    ...formContext.validateMessages,
    ...validateMessages,
  });
  setCallbacks({
    onValuesChange,
    onFieldsChange: (changedFields, ...rest) => {
      formContext.triggerFormChange(name, changedFields);

      if (onFieldsChange) {
        onFieldsChange(changedFields, ...rest);
      }
    },
    onFinish: (values) => {
      formContext.triggerFormFinish(name, values);

      if (onFinish) {
        onFinish(values);
      }
    },
    onFinishFailed,
  });
  setPreserve(preserve);

  // Set initial value, init store value when first mount
  const mountRef = React.useRef(null);
  setInitialValues(initialValues, !mountRef.current);
  if (!mountRef.current) {
    mountRef.current = true;
  }

  // Prepare children by `children` type
  let childrenNode = children;
  const childrenRenderProps = typeof children === 'function';
  if (childrenRenderProps) {
    const values = formInstance.getFieldsValue(true);
    childrenNode = (children)(values, formInstance);
  }

  // Not use subscribe when using render props
  useSubscribe(!childrenRenderProps);

  // Listen if fields provided. We use ref to save prev data here to avoid additional render
  const prevFieldsRef = React.useRef();
  React.useEffect(() => {
    if (!isSimilar(prevFieldsRef.current || [], fields || [])) {
      formInstance.setFields(fields || []);
    }
    prevFieldsRef.current = fields;
  }, [fields, formInstance]);

  const formContextValue = React.useMemo(
    () => ({
      ...formInstance,
      validateTrigger,
    }),
    [formInstance, validateTrigger],
  );

  const wrapperNode = (
    <FieldContext.Provider value={formContextValue}>{childrenNode}</FieldContext.Provider>
  );

  if (Component === false) {
    return wrapperNode;
  }

  return (
    <Component
      {...restProps}
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();

        formInstance.submit();
      }}
    >
      {wrapperNode}
    </Component>
  );
};

export default Form;
