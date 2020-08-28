

//深度比较2个对象是否相等
export function deepCompare(oldData,newData){
    if(oldData===newData) return true;

    if(isObject(oldData) && isObject(newData) && Object.keys(oldData).length===Object.keys(newData).length){
        //类型为对象并且元素个数相同
        for(const key in oldData){
            if(oldData.hasOwnProperty(key)){
                if(!deepCompare(oldData[key],newData[key])){
                    return false
                }
            }
        }
    }else if(isArray(oldData) && isArray(newData) && oldData.length===newData.length){
        // 类型为数组并且数组长度相同
        for (let i = 0, length = oldData.length; i < length; i++) {
            if (deepCompare(oldData[i], newData[i])) {
                // 如果数组元素中具有不相同元素,返回false
                return false
            }
        }
    }else {
        // 其它类型,均返回false
        return false
    }
    // 走到这里,说明数组或者对象中所有元素都相同,返回true
    return true
}

//判断是否是对象
export function isObject(obj){
    return Object.prototype.toString.call(obj)==='[object Object]';
}


//判断是否是数组
export function isArray(arr){
    return Object.prototype.toString.call(arr)==='[object Array]';
}