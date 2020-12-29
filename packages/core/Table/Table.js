import React ,{useContext} from 'react';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import classNames from '@packages/utils/classNames';
import "./index.scss";

//1.table表格的大小默认是按照内容大小去计算的，但是如果手动给表格设置大小如table{width:300px;height:300}则按照设置大小进行计算,但是如果内容超过设置大小，表
//格还是按照内容的大小，牺牲一部分其它单元格的大小来适应内容,导致这样子的原因是table-layout:auto(默认 自适应);这个时候可以改为fixed,内容会撑大当前单元格的高度让当前行的高度变高，但是宽度不变

//2.React.memo的第二个参数如果返回true表示不渲染 false表示不缓存 默认为true
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