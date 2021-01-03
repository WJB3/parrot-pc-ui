
import React ,{ useMemo, useState } from 'react'; 
import useControlled from '@packages/hooks/useControlled';

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

    return useMemo(()=>{

        if (pagination === false) {
            return [{}];
        }

        return [{
            ...pagination, 
            total:pagination?.total?pagination?.total:total,
            defaultCurrent:pagination?.defaultCurrent?pagination?.defaultCurrent:DEFAULT_CURRENT,
            defaultPageSize:pagination?.defaultPageSize?pagination?.defaultPageSize:DEFAULT_PAGE_SIZE
        }]

    },[pagination,total]);
}