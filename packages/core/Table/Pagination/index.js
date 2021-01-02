
import usePagination from './usePagination';
import usePaginationData from './usePaginationData';
import Pagination from '@packages/core/Pagination';
import classNames from '@packages/utils/classNames';
import capitalize from '@packages/utils/capitalize';


export default function renderPagination(dataSource,pagination,prefixCls){

    const [paginationData,mergedPagination]=usePaginationData(dataSource,pagination)

    const renderPagination=React.useCallback((position)=>(
        <Pagination 
            className={classNames(`${prefixCls}-Pagination-${capitalize(position)}`)}
        />
    ),[mergedPagination.position,prefixCls]);

    return React.useMemo(()=>{
        let topPaginationNode;
        let bottomPaginationNode;

        const defaultPosition = 'right';

        if(dataSource.length && pagination!==false){
            if(mergedPagination.position!==null && Array.isArray(mergedPagination.position)){
                const topPos=mergedPagination.position.find(p=>p.indexOf("top")!==-1);
                const bottomPos=mergedPagination.position.find(p=>p.indexOf("bottom")!==-1);


            }
        }
    },[mergedPagination]);
}


export {
    usePagination,
    usePaginationData
}