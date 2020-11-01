import React ,{useContext} from 'react';
import classNames from '@packages/utils/classNames';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import { TreeContext } from './TreeContext';

const Tree=React.forwardRef((props,ref)=>{

    const {
        className,
        prefixCls:customizePrefixCls
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Tree",customizePrefixCls);

    return <TreeContext.Provider
        value={{

        }}
    >
        <div className={
            classNames(
                prefixCls,
                className
            )
        }>
            
        </div>
    </TreeContext.Provider>
    
});

export default Tree;