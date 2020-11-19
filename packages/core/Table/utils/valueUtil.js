

const INTERNAL_KEY_PREFIX="PARROT_TABLE_KEY";
import toArray from '@packages/utils/toArray';

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
