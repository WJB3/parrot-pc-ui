import * as React from 'react';
import { List } from 'rc-field-form';
import { StoreValue } from 'rc-field-form/lib/interface';
import devWarning from '../_util/devWarning';
 
 

 

const FormList  = ({ children, ...props }) => {
  devWarning(!!props.name, 'Form.List', 'Miss `name` prop.');

  return (
    <List {...props}>
      {(fields, operation) => {
        return children(
          fields.map(field => ({ ...field, fieldKey: field.key })),
          operation,
        );
      }}
    </List>
  );
};

export default FormList;
