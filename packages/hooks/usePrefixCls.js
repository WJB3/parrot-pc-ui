
import { ConfigContext } from '@packages/core/ConfigContext';
import React from 'react';

export default function usePrefixCls(name,customizePrefixCls){

    return React.useMemo(()=>{

        const { getPrefixCls } = React.useContext(ConfigContext);

        const prefixCls = getPrefixCls(name, customizePrefixCls);
 
        return  prefixCls;
       
   },[name])

};

