

export default function mergeObject(
    ...objects
){
    const merged={};

    function fillProps(obj,clone){
        if(clone){
            Object.keys(clone).forEach(key=>{
                const value=clone[key];
                if(value && typeof value==="object"){
                    obj[key]=obj[key]||{};
                    fillProps(obj[key],value);
                }else{
                    obj[key]=value;
                }
            })
        }
    }

    objects.forEach(clone=>{
        fillProps(merged,clone);
    });

    return merged;
}