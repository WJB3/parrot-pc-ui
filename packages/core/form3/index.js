import Form, { useForm, FormInstance, FormProps } from './Form';
import Item, { FormItemProps } from './FormItem';
import List from './FormList';
import { FormProvider } from './context'; 

 

Form.Item = Item;
Form.List = List;
Form.useForm = useForm;
Form.Provider = FormProvider;
 

export { FormInstance, FormProps, FormItemProps  };

export default Form;
