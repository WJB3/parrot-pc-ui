import * as React from 'react';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import { Field } from 'rc-field-form';
import FieldContext from 'rc-field-form/lib/FieldContext';
import { supportRef } from 'rc-util/lib/ref';
import omit from 'omit.js';
import Row from '../grid/row'; 
import FormItemLabel from './FormItemLabel';
import FormItemInput from './FormItemInput';
import { FormContext, FormItemContext } from './context';
import { toArray, getFieldId } from './util';
import { cloneElement, isValidElement } from 'react';
import useFrameState from './hooks/useFrameState';
import useItemRef from './hooks/useItemRef';
 


const MemoInput = React.memo(
  ({ children }) => children,
  (prev, next) => {
    return prev.value === next.value && prev.update === next.update;
  },
);

 
function hasValidName(name) {
  return !(name === undefined || name === null);
}

function FormItem(props) {
  const {
    name,
    fieldKey,
    noStyle,
    dependencies,
    prefixCls: customizePrefixCls,
    style,
    className,
    shouldUpdate,
    hasFeedback,
    help,
    rules,
    validateStatus,
    children,
    required,
    label,
    trigger = 'onChange',
    validateTrigger,
    hidden,
    ...restProps
  } = props;
  const destroyRef = React.useRef(false); 
  const { name: formName, requiredMark } = React.useContext(FormContext);
  const { updateItemErrors } = React.useContext(FormItemContext);
  const [domErrorVisible, innerSetDomErrorVisible] = React.useState(!!help);
  const prevValidateStatusRef = React.useRef(validateStatus);
  const [inlineErrors, setInlineErrors] = useFrameState({});

  const { validateTrigger: contextValidateTrigger } = React.useContext(FieldContext);
  const mergedValidateTrigger =
    validateTrigger !== undefined ? validateTrigger : contextValidateTrigger;

  function setDomErrorVisible(visible) {
    if (!destroyRef.current) {
      innerSetDomErrorVisible(visible);
    }
  }

  const hasName = hasValidName(name);

  // Cache Field NamePath
  const nameRef = React.useRef([]);

  // Should clean up if Field removed
  React.useEffect(() => {
    return () => {
      destroyRef.current = true;
      updateItemErrors(nameRef.current.join('__SPLIT__'), []);
    };
  }, []);

  const prefixCls = 'ant-form'

  // ======================== Errors ========================
  // Collect noStyle Field error to the top FormItem
  const updateChildItemErrors = noStyle
    ? updateItemErrors
    : (subName, subErrors) => {
        setInlineErrors((prevInlineErrors = {}) => {
          if (!isEqual(prevInlineErrors[subName], subErrors)) {
            return {
              ...prevInlineErrors,
              [subName]: subErrors,
            };
          }
          return prevInlineErrors;
        });
      };

  // ===================== Children Ref =====================
  const getItemRef = useItemRef();

  function renderLayout(
    baseChildren,
    fieldId,
    meta,
    isRequired,
  ) {
    if (noStyle && !hidden) {
      return baseChildren;
    }
  

    const itemClassName = {
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-with-help`]: domErrorVisible || help,
      [`${className}`]: !!className,

      // Status
      [`${prefixCls}-item-has-feedback`]: mergedValidateStatus && hasFeedback,
      [`${prefixCls}-item-has-success`]: mergedValidateStatus === 'success',
      [`${prefixCls}-item-has-warning`]: mergedValidateStatus === 'warning',
      [`${prefixCls}-item-has-error`]: mergedValidateStatus === 'error',
      [`${prefixCls}-item-has-error-leave`]:
        !help && domErrorVisible && prevValidateStatusRef.current === 'error',
      [`${prefixCls}-item-is-validating`]: mergedValidateStatus === 'validating',
      [`${prefixCls}-item-hidden`]: hidden,
    };

    // ======================= Children =======================
    return (
      <Row
        className={classNames(itemClassName)}
        style={style}
        key="row"
        {...omit(restProps, [
          'colon',
          'extra',
          'getValueFromEvent',
          'getValueProps',
          'hasFeedback',
          'help',
          'htmlFor',
          'id', // It is deprecated because `htmlFor` is its replacement.
          'initialValue',
          'isListField',
          'label',
          'labelAlign',
          'labelCol',
          'normalize',
          'preserve',
          'required',
          'validateFirst',
          'validateStatus',
          'valuePropName',
          'wrapperCol',
        ])}
      >
        {/* Label */}
        <FormItemLabel
          htmlFor={fieldId}
          required={isRequired}
          requiredMark={requiredMark}
          {...props}
          prefixCls={prefixCls}
        />
        {/* Input Group */}
        <FormItemInput
          {...props}
          {...meta}
          errors={mergedErrors}
          prefixCls={prefixCls}
          onDomErrorVisibleChange={setDomErrorVisible}
          validateStatus={mergedValidateStatus}
        >
          <FormItemContext.Provider value={{ updateItemErrors: updateChildItemErrors }}>
            {baseChildren}
          </FormItemContext.Provider>
        </FormItemInput>
      </Row>
    );
  }

  const isRenderProps = typeof children === 'function';

  // Record for real component render
  const updateRef = React.useRef(0);
  updateRef.current += 1;

  if (!hasName && !isRenderProps && !dependencies) {
    return renderLayout(children) ;
  }

  const variables = {};
  if (typeof label === 'string') {
    variables.label = label;
  }

  console.log("Field")

  return (
    <Field
      {...props}
      messageVariables={variables}
      trigger={trigger}
      validateTrigger={mergedValidateTrigger}
      onReset={() => {
        setDomErrorVisible(false);
      }}
    >
      {(control, meta, context) => {
        const { errors } = meta;

        const mergedName = toArray(name).length && meta ? meta.name : [];
        const fieldId = getFieldId(mergedName, formName);

        if (noStyle) {
          nameRef.current = [...mergedName];
          if (fieldKey) {
            const fieldKeys = Array.isArray(fieldKey) ? fieldKey : [fieldKey];
            nameRef.current = [...mergedName.slice(0, -1), ...fieldKeys];
          }
          updateItemErrors(nameRef.current.join('__SPLIT__'), errors);
        }

        const isRequired =
          required !== undefined
            ? required
            : !!(
                rules &&
                rules.some(rule => {
                  if (rule && typeof rule === 'object' && rule.required) {
                    return true;
                  }
                  
                  return false;
                })
              );

        // ======================= Children =======================
        const mergedControl = {
          ...control,
        };

        let childNode  = null;
 
        if (Array.isArray(children) && hasName) {
          
          childNode = children;
        }  else if (isValidElement(children)) {
         

          const childProps = { ...children.props, ...mergedControl };
          if (!childProps.id) {
            childProps.id = fieldId;
          }

          if (supportRef(children)) {
            childProps.ref = getItemRef(mergedName, children);
          }

          // We should keep user origin event handler
          const triggers = new Set([
            ...toArray(trigger),
            ...toArray(mergedValidateTrigger),
          ]);

          triggers.forEach(eventName => {
            childProps[eventName] = (...args) => {
              mergedControl[eventName]?.(...args);
              children.props[eventName]?.(...args);
            };
          });

          childNode = (
            <MemoInput
              value={mergedControl[props.valuePropName || 'value']}
              update={updateRef.current}
            >
              {cloneElement(children, childProps)}
            </MemoInput>
          );
        } else if (isRenderProps && (shouldUpdate || dependencies) && !hasName) {
          childNode = (children)(context);
        } else {
          
          childNode = children;
        }

        return renderLayout(childNode, fieldId, meta, isRequired);
      }}
    </Field>
  );
}

export default FormItem;
