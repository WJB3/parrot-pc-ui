 
import { toArray } from './typeUtil';

export function get(entity,path){
    let current=entity;

    for(let i=0;i<path.length;i++){
        if(current===null || current ===undefined){
            return undefined;
        }

        current=current[path[i]];
    }

    return current;
}

export function set(entity,paths,value){
    if(!paths.length){
        return value;
    }

    const [path,...restPath]=paths;

    let clone;

    if(!entity && typeof path==='number'){
        clone=[];
    }else if(Array.isArray(entity)){
        clone=[...entity]
    }else{
        clone={...entity}
    }

    clone[path]=set(clone[path],restPath,value);

    return clone;
}

export function getNamePath(path){//将name转化为name数组
    return toArray(path);
}

export function getValue(store,namePath){
    const value=get(store,namePath);
    return value;
}