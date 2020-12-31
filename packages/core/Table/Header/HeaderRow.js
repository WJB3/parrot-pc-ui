

import React ,{useContext} from 'react';
import Cell from '../Cell';
import TableContext from '../context/TableContext';
 
const HeaderRow=(props)=>{

    const {
        rowComponent:RowComponent,
        cellComponent:CellComponent,
        cells,
    }=props;

    const { prefixCls }=useContext(TableContext); 

    return (
        <RowComponent className={`${prefixCls}-Tr`}>
            {
                cells.map((cell,cellIndex)=>{ 
                    return (
                        <Cell
                            {...cell}
                            prefixCls={prefixCls}
                            component={CellComponent}
                        />
                    )
                })
            }
        </RowComponent>
    ) 
}

export default HeaderRow;