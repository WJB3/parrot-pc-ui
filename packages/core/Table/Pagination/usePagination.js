
import React ,{ useCallback, useMemo, useState } from 'react'; 
import useControlled from '@packages/hooks/useControlled';
import useCreateChainedFunction from '@packages/hooks/useCreateChainedFunction';

export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_CURRENT=1;

/**
 * 
 * @param {*} total 数据总条数
 * @param {*} pagination pagination配置项
 */

export default function usePagination(
    total,
    pagination={}, 
){

    const [current,setCurrent]=useControlled({
        controlled:pagination.current,
        default:pagination?.defaultCurrent?pagination?.defaultCurrent:DEFAULT_CURRENT
    });

    const [pageSize,setPageSize]=useControlled({
        controlled:pagination.pageSize,
        default:pagination?.defaultPageSize?pagination?.defaultPageSize:DEFAULT_PAGE_SIZE
    });
 
    const innerChange=useCallback((e,{current:currentProp,pageSize:pageSizeProp})=>{
        setCurrent(currentProp);
        setPageSize(pageSizeProp);
    },[current,pageSize]);

    console.log(pageSize);

   
    const onChange=useCreateChainedFunction(innerChange,pagination?.onChange);

    return useMemo(()=>{

        if (pagination === false) {
            return [{}];
        } 

        return [{
            ...pagination, 
            total:pagination?.total?pagination?.total:total,
            current:current,
            pageSize:pageSize,
            onChange:onChange
        }]

    },[pagination,total,current,pageSize,onChange]);
}