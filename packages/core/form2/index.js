import Form, { useForm, FormInstance } from './Form';
import Item  from './FormItem';
import List from './FormList';
import { FormProvider } from './context'; 

 

Form.Item = Item;
Form.List = List;
Form.useForm = useForm;
Form.Provider = FormProvider;
 

export { FormInstance };

export default Form;
