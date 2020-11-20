
import validateValue from '@packages/utils/validateValue';

export function getColumnKey(column,defaultKey){

    if("key" in column && validateValue(column.key)){
        return column.key;
    }

    if(column.dataIndex){
        return Array.isArray(column.dataIndex)?column.dataIndex.join("."):column.dataIndex;
    }

    return defaultKey;
}

export function getColumnPos(index,pos){
    return pos?`${pos}-${index}`:`${index}`;
}

export function renderColumnTitle(
    title,
    props
){
    if(typeof title==="function"){
        return title(props);
    }
    return title;
}