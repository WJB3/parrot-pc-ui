

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
export function conductCheckedKey(keyList,keyEntities,checked){
   
  const keys=new Set(
    keyList.filter(key=>{
      const hasEntity=!!keyEntities[key];
      return hasEntity;
    })
  )

  const levelEntities=new Map();
  let maxLevel=0;

  Object.keys(keyEntities).forEach(key=>{
    const entity=keyEntities[key];
    const {level}=entity;

    let levelSet=levelEntities.get(level);
    if(!levelSet){
      levelSet=new Set();
      levelEntities.set(level,levelSet);
    }
    levelSet.add(entity);
    maxLevel=Math.max(maxLevel,level);
  });

  let result;

  if (checked === true) {
    result = fillConductCheck(keys, levelEntities, maxLevel);
  } else {
    result = cleanConductCheck(
      keys,
      checked.halfCheckedKeys,
      levelEntities,
      maxLevel, 
    );
  } 

  return result;

}
  
  export function arrDel(list, value) {
    const clone = list.slice();
    const index = clone.indexOf(value);
    if (index >= 0) {
      clone.splice(index, 1);
    } 
    return clone;
  }
  
  export function arrAdd(list, value) {
    const clone = list.slice();
    if (clone.indexOf(value) === -1) {
      clone.push(value);
    }
    return clone;
  }

  export function parseCheckedKeys(keys){

    if(!keys){
      return null;
    }

    let keyProps;
    if(Array.isArray(keys)){
      keyProps={
        checkedKeys:keys,
        halfCheckedKeys:undefined
      }
    }else if(typeof keys==="object"){
      keyProps={
        checkedKeys:keys.checked||undefined,
        halfCheckedKeys:keys.halfChecked||undefined
      }
    }else{
      return null;
    }

    return keyProps;
  }


  function fillConductCheck(
    keys,
    levelEntities,
    maxLevel
  ){
    const checkedKeys=new Set(keys);
    const halfCheckedKeys=new Set();
 
    //从上到下添加checkedKey
    for(let level=0;level<=maxLevel;level+=1){
      const entities=levelEntities.get(level)||new Set();

      entities.forEach(entity=>{
        const { key,node,children=[] }=entity;

        if(checkedKeys.has(key)){
          children 
            .forEach(childEntity => {
              checkedKeys.add(childEntity.key);
            });
        }
      })
    }

    //从下到上添加checkedKeys
    const visitedKeys=new Set();
    for(let level=maxLevel;level>=0;level-=1){
      const entities = levelEntities.get(level) || new Set();
      entities.forEach((entity)=>{
        const {parent,node}=entity;

        if(!parent){
          return ;
        }

        let allChecked=true;
        let partialChecked=false;

        (parent.children || [])
          .forEach(({key})=>{
            const checked=checkedKeys.has(key);
            if(allChecked && !checked){
              allChecked=false;
            }
            if (!partialChecked && (checked || halfCheckedKeys.has(key))) {
              partialChecked = true;
            }
          })
          if (allChecked) {
            checkedKeys.add(parent.key);
          }
          if (partialChecked) {
            halfCheckedKeys.add(parent.key);
          }
          visitedKeys.add(parent.key);    
      })
    }

    return {
      checkedKeys: Array.from(checkedKeys),
      halfCheckedKeys:  Array.from(removeFromCheckedKeys(halfCheckedKeys, checkedKeys)),
    };

  }

  function removeFromCheckedKeys(halfCheckedKeys, checkedKeys) {
    const filteredKeys = new Set();
    halfCheckedKeys.forEach(key => {
      if (!checkedKeys.has(key)) {
        filteredKeys.add(key);
      }
    });
    return filteredKeys;
  }

  function cleanConductCheck(
    keys,
    halfKeys,
    levelEntities,
    maxLevel, 
  ) {
    const checkedKeys = new Set(keys);
    let halfCheckedKeys = new Set(halfKeys);
  
    // Remove checked keys from top to bottom
    for (let level = 0; level <= maxLevel; level += 1) {
      const entities = levelEntities.get(level) || new Set();
      entities.forEach(entity => {
        const { key, node, children = [] } = entity;
  
        if (!checkedKeys.has(key) && !halfCheckedKeys.has(key)) {
          children
            .forEach(childEntity => {
              checkedKeys.delete(childEntity.key);
            });
        }
      });
    }
  
    // Remove checked keys form bottom to top
    halfCheckedKeys = new Set();
    const visitedKeys = new Set();
    for (let level = maxLevel; level >= 0; level -= 1) {
      const entities = levelEntities.get(level) || new Set();
  
      entities.forEach(entity => {
        const { parent, node } = entity;
   
  
        let allChecked = true;
        let partialChecked = false;

        if(!parent) return ;
  
        (parent.children || [])
          .forEach(({ key }) => {
            const checked = checkedKeys.has(key);
            if (allChecked && !checked) {
              allChecked = false;
            }
            if (!partialChecked && (checked || halfCheckedKeys.has(key))) {
              partialChecked = true;
            }
          });
  
        if (!allChecked) {
          checkedKeys.delete(parent.key);
        }
        if (partialChecked) {
          halfCheckedKeys.add(parent.key);
        }
  
        visitedKeys.add(parent.key);
      });
    }
  
    return {
      checkedKeys: Array.from(checkedKeys),
      halfCheckedKeys: Array.from(removeFromCheckedKeys(halfCheckedKeys, checkedKeys)),
    };
  }
  