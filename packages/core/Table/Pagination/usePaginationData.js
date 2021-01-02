import React from 'react';
import usePagination ,{ DEFAULT_PAGE_SIZE } from './usePagination';




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
        const {current,pageSize}=mergedPagination;
        
        return [dataSource.slice((current-1)*pageSize,current*pageSize),mergedPagination];

    },[dataSource,mergedPagination]);

}