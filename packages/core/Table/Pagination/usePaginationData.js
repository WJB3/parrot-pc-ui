import React from 'react';
import usePagination from './usePagination';


export default function usePaginationData(
    dataSource,
    pagination,
){

    const [ mergedPagination ] = usePagination(
        dataSource.length,
        pagination, 
    );

    return React.useMemo(()=>{
        //当为一个空对象时
        if(Object.getOwnPropertyNames(mergedPagination).length===0){
            return [dataSource,mergedPagination];
        }
        const {current:currentProp,pageSize:pageSizeProp,defaultCurrent,defaultPageSize}=mergedPagination;

        let current=currentProp?currentProp:defaultCurrent;

        let pageSize=pageSizeProp?pageSizeProp:defaultPageSize;
        
        return [dataSource.slice((current-1)*pageSize,current*pageSize),mergedPagination];

    },[dataSource,mergedPagination]);

}