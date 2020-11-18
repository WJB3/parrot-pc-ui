import React,{useContext} from 'react';
import {
    ConfigContext
} from '@packages/core/ConfigProvider';
import classNames from '@packages/utils/classNames';
import TableContext from './context/TableContext';
import BodyContext from './context/BodyContext';
import ResizeContext from './context/ResizeContext';
import "./index.scss";

const MemoTableContent=React.memo(
    ({children})=>children
)

const Table=React.forwardRef((props,ref)=>{

    const {
        prefixCls:customizePrefixCls,
        className,
        dataSource,
        columns
    }=props;

    const prefixCls=useContext(ConfigContext)?.getPrefixCls("Table",customizePrefixCls);

    let groupTableNode;

    let fullTable=(
        <div className={classNames(
            prefixCls,
            className
        )}>
            <MemoTableContent>
                <div className={`${prefixCls}-Container`}>

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