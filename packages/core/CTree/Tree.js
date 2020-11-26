

import React ,{useContext} from 'react';
import { ConfigContext } from '@packages/core/ConfigProvider';
import {  } from '@packages/core/Tree';
import classNames from '@packages/utils/classNames';

const Tree=React.forwardRef(function(props,ref){

    const {
        treeData,
        prefixCls:customizePrefixCls,

    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Tree",customizePrefixCls);

    return (
        <div className={
            classNames(prefixCls)
        }>

        </div>
    ) 

});

export default Tree;