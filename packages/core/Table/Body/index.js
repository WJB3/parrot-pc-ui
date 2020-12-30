

import React from 'react';
import ExpandedRow from './ExpandedRow';
import TableContext from '../context/TableContext';


const Body=(props)=>{
    const {
        data,
        getRowKey,
        emptyNode
    }=props;

    const {prefixCls}=React.useContext(TableContext);

    return React.useMemo(()=>{ 

        let rows;
        if(data.length){
            rows=data.map((record,index)=>{
                const key=getRowKey(record,index);
            })
        }else{
            //如果是空的
            rows=(
                <ExpandedRow
                    expanded
                    className={`${prefixCls}-PlaceHolder`}
                    prefixCls={prefixCls}
                    component={"tr"}
                    cellComponent={"td"} 
                >
                    {emptyNode}
                </ExpandedRow>
            )
        }

        return (
            <tbody className={`${prefixCls}-TBody`}>
                {rows}
            </tbody>
        )

    },[
        data,
        prefixCls
    ]);
}


export default Body;