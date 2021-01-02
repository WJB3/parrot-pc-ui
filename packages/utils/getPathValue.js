

import toArray from '@packages/utils/toArray';
/**
 * 根据路径深度获取对应的value值
 * @param {*} record {a:{b:{c:"a"}}}
 * @param {*} path [a,b,c]
 */
//根据path来获取最终的value的值
export default function getPathValue(record,path){

    const pathList=toArray(path);

    let current=record;

    for(let i=0;i<pathList.length;i++){
        current=current[pathList[i]];
    }
    
    return current;

}

