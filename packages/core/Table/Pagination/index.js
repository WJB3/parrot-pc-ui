import React from 'react';
import usePagination from './usePagination';
import usePaginationData from './usePaginationData';
import Pagination from '@packages/core/Pagination';
import classNames from '@packages/utils/classNames';
import capitalize from '@packages/utils/capitalize';


export default function renderPagination(dataSource,pagination,prefixCls){

    const [paginationData,mergedPagination]=usePaginationData(dataSource,pagination); 

    const renderPaginationNode=React.useCallback((position)=>(
        <div className={classNames(`${prefixCls}-Pagination`,`${prefixCls}-Pagination-${capitalize(position)}`)}>
        <Pagination 
            {...mergedPagination}
        />
        </div>
    ),[mergedPagination.position,prefixCls]);

    return React.useMemo(()=>{ 

        let paginationNode=null;

        const defaultPosition = 'right';

        if(dataSource.length && pagination!==false){
            paginationNode=renderPaginationNode(defaultPosition);
        }

        return [paginationData,paginationNode]
    },[paginationData,mergedPagination]);
}


export {
    usePagination,
    usePaginationData
}