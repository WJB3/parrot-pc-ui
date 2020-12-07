

import React ,{useContext} from 'react';
import { ConfigContext } from '@packages/core/ConfigProvider';
import {  } from '@packages/core/Tree';
import classNames from '@packages/utils/classNames';
import VirtualList from '@packages/core/VirtualList';

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
            <VirtualList>
                
            </VirtualList>
        </div>
    ) 

});

export default Tree;