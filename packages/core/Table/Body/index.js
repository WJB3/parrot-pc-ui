

import React from 'react';
import ExpandedRow from './ExpandedRow';
import TableContext from '../context/TableContext';
import BodyContext from '../context/BodyContext';
import BodyRow from '../Body/BodyRow';


const Body=(props)=>{
    const {
        data,
        getRowKey,
        emptyNode
    }=props;

    const {prefixCls}=React.useContext(TableContext);

    const { flattenColumns }=React.useContext(BodyContext);

    const colSpan=React.useMemo(()=>{
        return flattenColumns.reduce((num,column)=>num+column.colSpan,0);
    },[flattenColumns]); 

    return React.useMemo(()=>{ 

        let rows;
        if(data.length){
            rows=data.map((record,index)=>{
                const key=getRowKey(record,index);

                return (
                    <BodyRow
                        key={key}
                        rowKey={key}
                        rowComponent={"tr"}
                        cellComponent={"td"}
                        getRowKey={getRowKey}
                        index={index}
                        record={record}
                    />
                )
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
                    colSpan={colSpan}
                >
                    {emptyNode}
                </ExpandedRow>
            )
        }

        return (
            <tbody className={`${prefixCls}-Body`}>
                {rows}
            </tbody>
        )

    },[
        data,
        prefixCls
    ]);
}


export default Body;