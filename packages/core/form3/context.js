import * as React from 'react';
import omit from 'omit.js';
import { FormProvider as RcFormProvider } from 'rc-field-form';
 

/**
 * Form Context
 * Set top form style and pass to Form Item usage.
 */
 
export const FormContext = React.createContext({
  labelAlign: 'right',
  vertical: false,
  itemRef: (() => {}) 
});

/**
 * Form Item Context
 * Used for Form noStyle Item error collection
 */
 
export const FormItemContext = React.createContext({
  updateItemErrors: () => {},
});

/**
 * Form Provider
 *
 */
 

export const FormProvider  = props => {
  const providerProps = omit(props, ['prefixCls']);
  return <RcFormProvider {...providerProps} />;
};
