
 
import toArray from '@packages/utils/toArray';

/**
 * 取路径深处的值
 * @param {*} record 
 * @param {*} path 
 */
export function getPathValue(
    record,
    path
){
    if(!path && typeof path!=="number"){
        return record;
    }

    const pathList=toArray(path);

    let current=record;

    for(let i=0;i<pathList.length;i+=1){
        if(!current){
            return null;
        }
        const prop=pathList[i];
        current=current[prop];
    }

    return current;

}
