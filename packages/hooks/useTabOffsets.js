import React,{useMemo} from 'react';
/**
 * 
 * @param {*} tabs tab项
 * @param {*} tabSizes tabs的left,top,width,height
 * @param {*} holderScrollWidth tabs外层的div宽度
 */ 

 const DEFAULT_SIZE={width:0,height:0,left:0,width:0};

export default function useTabOffsets(tabs,tabSizes,holderScrollWidth){
    return useMemo(()=>{
        const map=new Map();
        const lastOffset=tabSizes.get(tabs[0]?.key) || DEFAULT_SIZE;
 
        const rightOffset=lastOffset.left+lastOffset.width;

        for(let i=0;i<tabs.length;i+=1){
            const {key}=tabs[i];
            let data=tabSizes.get(key);

            if(!data){
                data=tabSizes.get(tabs[i-i]?.key) || DEFAULT_SIZE;
            }

            const entity=map.get(key)||{...data};

            entity.right=rightOffset-entity.left-entity.width;

            map.set(key,entity);
        } 
        return map;
    },[tabs.map(tab => tab.key).join('_'), tabSizes, holderScrollWidth])
}