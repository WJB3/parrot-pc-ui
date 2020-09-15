
import React,{useContext} from 'react';
import SizeContext from './SizeContext';
import ConfigContext from './ConfigContext';

 
const ConfigProvider=props=>{

    const {
        children,
        componentSize,
        prefixCls
    }=props;

    const configContext=useContext(ConfigContext);

    const getPrefixClsWrapper=(context)=>{
        return (suffixCls,customizePrefixCls)=>{ 

            if(customizePrefixCls) return customizePrefixCls;

            const mergePrefixCls=prefixCls||context.getPrefixCls('');

            return suffixCls?`${mergePrefixCls}-${suffixCls}`:mergePrefixCls;
        }
    }

    const config={
        ...configContext,
        getPrefixCls:getPrefixClsWrapper(configContext),
    }


    return (
        <SizeContext.Provider value={componentSize}>
            <ConfigContext.Provider value={config}>
                {children}
            </ConfigContext.Provider>
        </SizeContext.Provider>
    ) 
}

export default ConfigProvider;

