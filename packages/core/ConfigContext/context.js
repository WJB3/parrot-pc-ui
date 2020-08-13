
import React from 'react';

let globalPrefix="parrot-pc";

export const ConfigContext=React.createContext({
    getPrefixCls:(suffixCli,customizePrefixCls)=>{
        if(customizePrefixCls) return customizePrefixCls;

        return `${globalPrefix}-${suffixCli}`
    }
})