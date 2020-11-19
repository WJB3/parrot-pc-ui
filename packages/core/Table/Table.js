import React,{useContext,useMemo,useRef} from 'react';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import classNames from '@packages/utils/classNames';
import TableContext from './context/TableContext';
import BodyContext from './context/BodyContext';
import ResizeContext from './context/ResizeContext';
import validateValue from '@packages/utils/validateValue';
import useSticky from './hooks/useSticky';
import mergeObject from '@packages/utils/mergeObject';
import { getPathValue } from './utils/valueUtil';

import "./index.scss";

const MemoTableContent=React.memo(
    ({children})=>children
)

const Table=React.forwardRef((props,ref)=>{

    const {
        prefixCls:customizePrefixCls,
        className,
        dataSource,
        columns,
        scroll,
        sticky,
        components,
        //是否显示表头
        showHeader=true,
    }=props;

    let groupTableNode;
    let scrollXStyle;
    let scrollYStyle;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Table",customizePrefixCls);

    //=========================Customize=============================
    const mergedComponents=useMemo(
        ()=>mergeObject(components),
        [components]
    );

    const getComponent=React.useCallback(
        (path,defaultComponent)=>
            getPathValue(mergedComponents,path)||defaultComponent,
        [mergedComponents]
    )

    //========================Render=================================
    const TableComponent=getComponent(['table'],'table');

    const scrollBodyRef = React.useRef();

    const { isSticky }=useSticky(sticky,prefixCls);

    const fixHeader=scroll && validateValue(scroll.y);

    const bodyTable=(

    );

    if(fixHeader || isSticky){

    }else{
        groupTableNode=(
            <div 
                style={{
                    ...scrollXStyle,
                    ...scrollYStyle
                }}
                className={`${prefixCls}-Content`}
                ref={scrollBodyRef}
            >
                <TableComponent>
                    {bodyTable}
                </TableComponent>
            </div>
        )
    }

    const TableContextValue=useMemo(
        ()=>{
            getComponent
        },
        [getComponent]
    )

    

    let fullTable=(
        <div className={classNames(
            prefixCls,
            className
        )}>
            <MemoTableContent value={TableContextValue}>
                <div className={`${prefixCls}-Container`}>
                    {groupTableNode}
                </div>
            </MemoTableContent>
        </div>
    )

    return <div 
        className={
            classNames(
                `${prefixCls}-Wrapper`
            )
        }
    >
        <TableContext.Provider>
            <BodyContext.Provider>
                <ResizeContext.Provider>
                    {fullTable}
                </ResizeContext.Provider>
            </BodyContext.Provider>
        </TableContext.Provider>
    </div>
});

export default Table;