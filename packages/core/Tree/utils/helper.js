

/** 从下到上获取expandKeys
 * @param keyList
 * @param keyEntities
 */

export function conductExpandParent(keyList, keyEntities) {
    const expandedKeys = new Set();
  
    function conductUp(key) {
      if (expandedKeys.has(key)) return;
  
      const entity = keyEntities[key];
      if (!entity) return;
  
      expandedKeys.add(key);
  
      const { parent } = entity; 
  
      if (parent) {
        conductUp(parent.key);
      }
    }
  
    (keyList || []).forEach(key => {
      conductUp(key);
    });
  
    return [...expandedKeys];
}

/**
 * 得到checkedKeys和halfCheckedKeys
 * 当同级节点全部选上时 父节点选上  当选中父节点时 子节点全部选上
 * @param {*} list 
 * @param {*} value 
 */
export function conductCheckedKey(keyList,keyEntities){
  let checkedKeys=[];
  let halfCheckedKeys=[];

  (keyList || []).forEach(key=>{
    
  })
}
 

  
  export function arrDel(list, value) {
    console.log("ArrDel")
    console.log(list)
    console.log(value)
    const clone = list.slice();
    const index = clone.indexOf(value);
    if (index >= 0) {
      clone.splice(index, 1);
    }
    console.log(clone)
    return clone;
  }
  
  export function arrAdd(list, value) {

    const clone = list.slice();
    if (clone.indexOf(value) === -1) {
      clone.push(value);
    }
    return clone;
  }