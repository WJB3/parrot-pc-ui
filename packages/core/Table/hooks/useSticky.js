

import React from 'react';

const defaultContainer=window;

export default function useSticky(
    sticky,
    prefixCls
){
    const {offsetHeader=0,offsetScroll=0,getContainer=()=>defaultContainer}=typeof sticky==="object"?sticky:{};

    const container=getContainer()||defaultContainer;

    return React.useMemo(()=>{

        const isSticky=!!sticky;

        return {
            isSticky
        }

    },[offsetScroll,offsetHeader,prefixCls,container]);
}