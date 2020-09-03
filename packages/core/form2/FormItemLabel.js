import * as React from 'react';
import classNames from 'classnames';
import Col, { ColProps } from '../grid/col';
import { FormLabelAlign } from './interface';
import { FormContext, FormContextProps } from './context';
import { RequiredMark } from './Form';
import { useLocaleReceiver } from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale/default';

 

const FormItemLabel  = ({
  prefixCls,
  label,
  htmlFor,
  labelCol,
  labelAlign, 
  required,
  requiredMark,
}) => {
  const [formLocale] = useLocaleReceiver('Form');

  if (!label) return null;

  return (
    <FormContext.Consumer key="label">
      {({
        vertical,
        labelAlign: contextLabelAlign,
        labelCol: contextLabelCol
      }) => {
        const mergedLabelCol = labelCol || contextLabelCol || {};

        const mergedLabelAlign = labelAlign || contextLabelAlign;

        const labelClsBasic = `${prefixCls}-item-label`;
        const labelColClassName = classNames(
          labelClsBasic,
          mergedLabelAlign === 'left' && `${labelClsBasic}-left`,
          mergedLabelCol.className,
        );

        let labelChildren = label;  
       
         

        // Add required mark if optional
        if (requiredMark === 'optional' && !required) {
          labelChildren = (
            <>
              {labelChildren}
              <span className={`${prefixCls}-item-optional`}>
                {formLocale?.optional || defaultLocale.Form?.optional}
              </span>
            </>
          );
        }

        const labelClassName = classNames({
          [`${prefixCls}-item-required`]: required,
          [`${prefixCls}-item-required-mark-optional`]: requiredMark === 'optional', 
        });

        return (
          <Col {...mergedLabelCol} className={labelColClassName}>
            <label
              htmlFor={htmlFor}
              className={labelClassName}
              title={typeof label === 'string' ? label : ''}
            >
              {labelChildren}
            </label>
          </Col>
        );
      }}
    </FormContext.Consumer>
  );
};

export default FormItemLabel;
