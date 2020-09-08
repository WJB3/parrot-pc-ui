import * as React from 'react';
import { List } from 'rc-field-form';
import { StoreValue } from 'rc-field-form/lib/interface';
 
 
 

 

const FormList  = ({ children, ...props }) => { 

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
