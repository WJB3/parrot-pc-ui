
import React ,{ useMemo, useState } from 'react';
import mergeObject from '@packages/utils/mergeObject';

export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_CURRENT=1;

/**
 * 
 * @param {*} total 数据总条数
 * @param {*} pagination pagination配置项
 */

export default function usePagination(
    total,
    pagination, 
){
    
    return useMemo(()=>{

        if (pagination === false) {
            return [{}];
        }

        return [{
            ...pagination,
            current:pagination?.current?pagination.current:DEFAULT_CURRENT,
            pageSize:pagination?.pageSize?pagination?.pagination:DEFAULT_PAGE_SIZE,
            total:pagination?.total?pagination?.total:total
        }]

    },[pagination,total,pagination.current]);
}