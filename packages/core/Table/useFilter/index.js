

import React from 'react';
import { getColumnPos } from '../utils/columnsUtil';


function collectFilterStates(
    columns,
    init,
    pos
){
    let filterStates=[];

    (columns||[]).forEach((column,index)=>{
        const columnPos = getColumnPos(index, pos);

        if("children" in column){
            filterStates=[...filterStates,...collectFilterStates(column.children,init,columnPos)]
        }else if(column.filters || "filterDropdown" in column || "onFilter" in column){
            if("filteredValue" in column){

            }
        }

    })
}

function useFilter({
    prefixCls,
    dropdownPrefixCls,
    mergedColumns,
    onFilterChange,
    getPopupContainer,
    locale: tableLocale
}){
    

    return [transformColumns,,getFilters];
}