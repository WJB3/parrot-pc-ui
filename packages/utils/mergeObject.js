
/**
 * 
 * @param  {...any} objects 传入多个object数组 深拷贝返回一个新数组
 */
export default function mergeObject(...objects){

    const mergeObject={};

    function fillProps(merge,clone){
        Object.keys(clone).forEach(key=>{
            const value=clone[key];
        
            if(value && typeof value==="object"){
                merge[key]=merge[key]||{};
                fillProps(merge[key],value)
            }else{
                merge[key]=value;
            }
        })
    }

    objects.forEach(clone=>fillProps(mergeObject,clone))

    return mergeObject;

}