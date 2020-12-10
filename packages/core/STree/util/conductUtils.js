

//通过expandedKeys收集上层expandedKeys
export function conductExpandParent(
    expandedKeys,
    keyEntities
){

    let newExpandedKeys=new Set();

    function conduct(key){

        newExpandedKeys.add(key);

        if(keyEntities[key] && keyEntities[key].parent){
            conduct(keyEntities[key].parent.key)
        }
        
    }

    (expandedKeys||[]).forEach(key=>conduct(key));

    return [...newExpandedKeys];

}