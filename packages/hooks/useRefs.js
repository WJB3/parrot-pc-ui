import React ,{useRef} from 'react';

export default function useRefs(){

    const cacheRefs=useRef(new Map());

    function getRef(key){
        if(!cacheRefs.current.has(key)){
            cacheRefs.current.set(key,React.createRef());
        }
        return cacheRefs.current.get(key);
    }

    function removeRef(key){
        cacheRefs.current.delete(key);
    }

    return [getRef,removeRef];


}