

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
  