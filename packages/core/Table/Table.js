import React, { useContext } from 'react';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import classNames from '@packages/utils/classNames';
import TableContext from './context/TableContext';
import BodyContext from './context/BodyContext';
import Header from './Header/Header';
import Paper from '@packages/core/Paper';
import Empty from '@packages/core/Empty'; 
import Body from './Body';
import useColumns from './hooks/useColumns';
import { usePaginationData } from './Pagination';
import "./index.scss";

const EMPTY_DATA = [];

//1.table表格的大小默认是按照内容大小去计算的，但是如果手动给表格设置大小如table{width:300px;height:300}则按照设置大小进行计算,但是如果内容超过设置大小，表
//格还是按照内容的大小，牺牲一部分其它单元格的大小来适应内容,导致这样子的原因是table-layout:auto(默认 自适应);这个时候可以改为fixed,内容会撑大当前单元格的高度让当前行的高度变高，但是宽度不变

//2.React.memo的第二个参数如果返回true表示不渲染 false表示不缓存 默认为true

//3.rowspan的作用是指定单元格纵向跨越的行数。

//4.tr设置border会产生失效 如果td没有占满整个tr  tr有10个colspan 而其中的td只有5个

//5.通过转换cloumns 如果有children 则给其余的columns添加rowspan 而colspan和rowspan默认都是0

//6.为了css选择器更好的选择 我们给每个属性都增加了colspan rowspan
const Table = React.forwardRef((props, ref) => {

    const {
        prefixCls: customizePrefixCls,
        //是否显示表头
        showHeader = true,
        columns:columnsProp,
        dataSource=EMPTY_DATA,
        rowKey="key",
        bordered=false,
        renderEmpty=<Empty type="normal" />,
        pagination
    } = props;

    const prefixCls = useContext(ConfigContext)?.getPrefixCls("Table", customizePrefixCls);

    let hasData=!!dataSource.length;

    const emptyNode=React.useMemo(()=>{ 
        if(hasData){
            return null;
        }
        if(typeof renderEmpty==="function"){
            return renderEmpty();
        }
        return renderEmpty;
    },[hasData,renderEmpty]);

    const getRowKey=React.useMemo(()=>{
        if (typeof rowKey === 'function') {
            return rowKey;
        }
        return (record)=>{
            const key=record && record[rowKey];
            return key;
        }
    },[rowKey]);

    const TableContextValue=React.useMemo(
        ()=>({
            prefixCls
        }),
        [
            prefixCls
        ]
    );

    const [ columns,flattenColumns ]=useColumns(
        {
            columns:columnsProp
        }
    );

    const columnContext=React.useMemo(
        ()=>({
            columns,
            flattenColumns
        }),
        [columns,flattenColumns]
    );

    const BodyContextValue=React.useMemo(
        ()=>({
            ...columnContext,
        }),
        [
            columnContext
        ]
    );
  

    const bodyTable=(
        <Body 
            data={mergedData}
            emptyNode={emptyNode}
            getRowKey={getRowKey}
        />
    )

    let fullTable = (
        <Paper className={
            classNames(
                prefixCls,
            )
        }>
            <div className={
                classNames(
                    `${prefixCls}-Container`,
                    {
                        [`${prefixCls}-Bordered`]:bordered
                    }
                )
            }>
                <div className={
                    classNames(`${prefixCls}-Content`)
                }>
                    <table style={{ tableLayout: "auto" }}>
                        {showHeader !== false && <Header {...columnContext} />}
                        {bodyTable}
                    </table>
                </div>
            </div>
        </Paper>
    )

    return (
        <TableContext.Provider value={TableContextValue}>
            <BodyContext.Provider value={BodyContextValue}>
                <div className={classNames(`${prefixCls}-Wrapper`)}>
                    {fullTable}
                </div>
            </BodyContext.Provider> 
        </TableContext.Provider>
    )

});

export default Table;