

//传入有值的多个数组 ，如果有值直接返回 ，没有就返回一个空数组
export default function sequenceReturnOnlyArr(){
    const newArr=Array.prototype.slice.call(arguments);
    const findOne=newArr.find(item=>item && item.length);
    return findOne || [];
}