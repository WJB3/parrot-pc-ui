
import { ConfigContext } from '@packages/core/ConfigContext';
import React from 'react';

export default function usePrefixCls(name,customizePrefixCls){

    const { getPrefixCls } = React.useContext(ConfigContext);

    return React.useMemo(()=>{

        const prefixCls = getPrefixCls(name, customizePrefixCls);
 
        return  prefixCls;
       
   },[name])

};

