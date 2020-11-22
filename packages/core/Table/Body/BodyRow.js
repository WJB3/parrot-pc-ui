

import React , { useContext } from 'react';
import BodyContext from '../context/BodyContext';

const BodyRow=(props)=>{

    const {
        rowComponent:RowComponent
    }=props;

    const {
        flattenColumns
    }=useContext(BodyContext);

    const baseRowNode=(
        <RowComponent 

        />
    )

    return (
        <>
            {baseRowNode}
        </>
    )
}

export default BodyRow;