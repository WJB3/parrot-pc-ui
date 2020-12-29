import React ,{useContext} from 'react';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import classNames from '@packages/utils/classNames';
import "./index.scss";

const Table=React.forwardRef((props,ref)=>{

    const {
        prefixCls:customizePrefixCls
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Table",customizePrefixCls);

    return (
        <div classNames={
            classNames(
                prefixCls,
                `${prefixCls}-Wrapper`
            )
        }>

        </div>
    )

});

export default Table;