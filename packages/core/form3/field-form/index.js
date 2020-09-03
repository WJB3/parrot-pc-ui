import * as React from 'react';
import { FormInstance } from './interface';
import Field from './Field';
import List from './List';
import useForm from './useForm';
import FieldForm from './Form';
import { FormProvider } from './FormContext';

const InternalForm = React.forwardRef(FieldForm) 

 

const RefForm = InternalForm;

RefForm.FormProvider = FormProvider;
RefForm.Field = Field;
RefForm.List = List;
RefForm.useForm = useForm;

export { FormInstance, Field, List, useForm, FormProvider };

export default RefForm;
