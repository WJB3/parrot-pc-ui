import * as React from 'react';
import classNames from 'classnames';
import Col from '../grid/col'; 
import { FormContext } from './context';  

const FormItemLabel  = ({
  prefixCls,
  label,
  htmlFor,  
  required,
  requiredMark,
}) => { 

  if (!label) return null;

  return (
    <FormContext.Consumer key="label">
      {({ 
        labelAlign,
        labelCol 
      }) => {  
 
  

        let labelChildren = label; 
  
        if (typeof label === 'string' && (label).trim() !== '') {
          labelChildren = (label).replace(/[:|：]\s*$/, '');
        }

        // Add required mark if optional
        if (requiredMark === 'optional' && !required) {
          labelChildren = (
            <>
              {labelChildren}
              <span className={`${prefixCls}-item-optional`}> 
              </span>
            </>
          );
        }

        const labelClassName = classNames({
          [`${prefixCls}-item-required`]: required,
          [`${prefixCls}-item-required-mark-optional`]: requiredMark === 'optional' 
        });

        return (
          <Col {...labelCol}  >
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
