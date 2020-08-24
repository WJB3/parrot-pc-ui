import React from 'react';
import setRef from '@packages/utils/setRef';

export default function useForkRef(...refs){
    return React.useMemo(()=>{
        if (refs.every(item=>item==null)) {
            return null;
        }
        return refValue => {  
            for(let i=0;i<refs.length;i++){
                setRef(refs[i],refValue)
            }
        };
    },[refs])
}