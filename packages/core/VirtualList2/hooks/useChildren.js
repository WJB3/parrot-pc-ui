import React from 'react';
import { Item } from '../Item';

export default function useChildren(
    list,
    startIndex,
    endIndex,
    setNodeRef,
    renderFunc
){

    console.log("useChildren")
    return list.slice(startIndex,endIndex+1).map((item,index)=>{
        const eleIndex=startIndex+index;
        const node=renderFunc(item,eleIndex); 

        return  (
            <Item key={undefined} setRef={ele=>setNodeRef(item,ele)}>
                {node}
            </Item>
        ) 
    })
}