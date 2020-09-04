import * as React from 'react'; 
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import useMemo from 'rc-util/lib/hooks/useMemo';  
import Col from '../grid/col'; 
import { FormContext } from './context';
import useCacheErrors from './hooks/useCacheErrors';
import useForceUpdate from '../_util/hooks/useForceUpdate';

 
 

const FormItemInput = ({ 
  wrapperCol,
  children, 
  onDomErrorVisibleChange,  
}) => { 

  const formContext = React.useContext(FormContext);  
  React.useEffect(
    () => () => {
      onDomErrorVisibleChange(false);
    },
    [],
  ); 
  // Pass to sub FormItem should not with col info
  const subFormContext = { ...formContext };
  delete subFormContext.labelCol;
  delete subFormContext.wrapperCol;

  return (
    <FormContext.Provider value={subFormContext}>
      <Col {...wrapperCol} className={className}>
        <div className={`${baseClassName}-control-input`}>
          <div className={`${baseClassName}-control-input-content`}>{children}</div>
 
        </div> 
      </Col>
    </FormContext.Provider>
  );
};

export default FormItemInput;
