
import React from 'react';

export default function useCreateChainedFunction(...list){

    return React.useMemo(()=>{

        const args=Array.prototype.slice.call(list,0); 
        
        if(args.length===1){
            return args[0];
        }

        return function chainedFunction(){
            for(let i=0;i<args.length;i++){
                if(args[i] && args[i].apply){
                    args[i].apply(this,arguments);
                }
            }
        }

    },[...list])
}