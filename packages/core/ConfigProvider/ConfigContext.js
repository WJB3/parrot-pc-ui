
import React from 'react';

let globalPrefix="parrot-pc";

const ConfigContext=React.createContext({
    getPrefixCls:(suffixCls,customizePrefixCls)=>{
        if(customizePrefixCls) return customizePrefixCls;

        return suffixCls?`${globalPrefix}-${suffixCls}`:globalPrefix;
    }
})

export default ConfigContext;