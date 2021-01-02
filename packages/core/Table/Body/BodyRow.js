

import React ,{ useContext } from 'react';
import Cell from '../Cell';
import BodyContext from '../context/BodyContext';
import TableContext from '../context/TableContext';
import { getColumnsKey } from '../utils/valueUtil';

const BodyRow=(props)=>{

    const {
        rowComponent:RowComponent,
        cellComponent,
        index,
        record
    }=props;

    const {
        prefixCls
    }=useContext(TableContext);

    const {
        flattenColumns
    }=useContext(BodyContext);

  

    //====================== Base or row================
    const columnsKey = getColumnsKey(flattenColumns); 
    
    const baseRowNode=(
        <RowComponent>
            {
               flattenColumns.map((column,colIndex)=>{
                   const {render,dataIndex,className:columnClassName}=column;
                   const key=columnsKey[colIndex];
                   
                   return (
                        <Cell 
                            className={columnClassName}    
                            ellipsis={column.ellipsis}
                            align={column.align}
                            component={cellComponent}
                            prefixCls={prefixCls}
                            key={key}
                            index={index}
                            dataIndex={dataIndex}
                            render={render}
                            record={record}
                        />
                   )
               }) 
            }
        </RowComponent>
    );

    return (
        <>
            {baseRowNode}
        </>
    ) 

}

export default BodyRow;