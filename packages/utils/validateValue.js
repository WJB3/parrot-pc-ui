
/**
 * 验证value是否是否有值
 * @param {*} value 
 */

export default function validateValue(value){
    //验证是否有值
    return value!==null && value!==undefined;
}

export function haveValue(value){
    if(Array.isArray(value)){
        return (value || []).length>0;
    }
    if(typeof value==="object" || !Array.isArray(value)){
        return (Object.keys(value) || []).length>0;
    }
}