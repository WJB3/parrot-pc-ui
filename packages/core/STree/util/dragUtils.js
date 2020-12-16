
/**
 * 获取drag节点的子节点
 * @param {*} dragNodeKey 
 * @param {*} keyEntities 
 */
export function getDragChildrenKeys(dragNodeKey,keyEntities){

    const dragChildrenKeys = [];

    const entity = keyEntities[dragNodeKey];

    function dig(list= []) {
        list.forEach(({ key, children }) => {
          dragChildrenKeys.push(key);
          dig(children);
        });
    }

    dig(entity.children);

    return dragChildrenKeys;
}