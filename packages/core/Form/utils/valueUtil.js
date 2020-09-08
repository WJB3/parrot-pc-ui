 
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

export function setValue(store,namePath,value){
    const newStore=set(store,namePath,value);
    return newStore;
}

//匹配相同的namePath 相同返回true，否则返回false
export function matchNamePath(namePath,changedNamePath){
    if(!namePath||!changedNamePath||namePath.length!==changedNamePath.length){
        return false;
    }
    return namePath.every((nameUnit,i)=>changedNamePath[i]===nameUnit);
}

export function cloneByNamePathList(store,namePathList){
    let newStore={};
    namePathList.forEach(namePath=>{
        const value=getValue(store,namePath);
        newStore=setValue(newStore,namePath,value);
    });
    return newStore;
}

export function containsNamePath(namePathList,namePath){
    return namePathList && namePathList.some(path=>matchNamePath(path,namePath));
}

export function defaultGetValueFromEvent(valuePropName,...args){
    const event=args[0];
    if(event && event.target && valuePropName in event.target){
        return (event.target)[valuePropName];
    }
    return eventl
}

function isObject(obj) {
    return typeof obj === 'object' && obj !== null && Object.getPrototypeOf(obj) === Object.prototype;
}

export function setValues(store,...restValues){
 
    return restValues.reduce(
        (current,newStore)=>internalSetValues(current,newStore),
        store
    );
}

function internalSetValues(store,values){ 

    const newStore=(Array.isArray(store)?[...store]:{...store});

    if(!values){
        return newStore;
    }

    Object.keys(values).forEach(key=>{
        const prevValue=newStore[key];
        const value=values[key];

        const recursive=isObject(prevValue)&&isObject(value);
        newStore[key]=recursive?internalSetValues(prevValue,value||{}):value;
    })

    return newStore;
}