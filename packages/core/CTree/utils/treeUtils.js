



/** 
 * @param {*} dataNodes 
 * 获取node、key、index、pos、parentPos、level
 *     const treeData = [
        {
          title: 'parent 1',
          key: '0-0',
          children: [
            {
              title: 'parent 1-0',
              key: '0-0-0', 
              children:[
                {
                  title:"parent 1-0-0",
                  key: '0-0-0-0',  
                },
                {
                  title:"parent 1-0-1",
                  key: '0-0-0-1',  
                }
              ]
            },
            {
              title: 'parent 1-1',
              key: '0-0-1' 
            },
          ],
        }
    ];
*/
/**获取对应的title、key、level */

 

export function getKey(key,pos){
  if(key!==null && key!==undefined){
      return key;
  }
  return pos;
}

export function getPosition(level,number){
  return `${level}-${number}`
}

export function convertDataToEntities(
  dataNodes
){
 
  const keyEntities={};
  const posEntities={};

  traverseDataNodes(
    dataNodes,
    (item)=>{
      const {node,index,pos,parentPos,key,level}=item;
      const entity={node,index,pos,level,key}; 

      posEntities[pos]=entity;
      keyEntities[key]=entity;

      entity.parent=posEntities[parentPos];

      if(entity.parent){
        entity.parent.children=entity.parent.children||[];
        entity.parent.children.push(entity);
      }
    }
  )

  return {
    posEntities,
    keyEntities
  }

}

export function traverseDataNodes(
  dataNodes,
  callback
){

  function process(node,index,parent){
    //这里相当于深度优先遍历
    //深度优先遍历算法口诀1.访问根结点2.对根节点的children挨个进行深度优先遍历

    const children=node?node.children:dataNodes;
    const pos=node?getPosition(parent.pos,index):"0";

    if(node){
      const info={
        key:getKey(node?.key,pos),
        pos:pos,
        level:parent.level+1,
        node:node,
        parentPos:parent.node?parent.pos:null,
        index:index
      }

      callback?.(info);
    }

    if(children){
      children.forEach((subNode,subIndex)=>{
        process(
          subNode,
          subIndex,
          {
            pos:pos,
            node:node,
            level:parent?parent.level+1:-1
          }
        )
      })
    }

  }

  process(null);

}

export function flattenTreeData(
  treeNodeList=[],
  expandedKeys=[]
){

  const expandedKeySet=new Set(expandedKeys);
  const flattenList=[];

  function dfs(list,parent=null){
    return list.map((treeNode,index)=>{
      const pos=getPosition(parent?parent.pos:"0",index);
      const mergedKey=getKey(treeNode.key,pos);

      //又是一个深度遍历
      const flattenNode={
        ...treeNode,
        parent,
        pos,
        children:null,
        data:treeNode,
        isStart:[...(parent?parent.isStart:[]),index===0],
        isEnd:[...(parent?parent.isEnd:[]),index===list.length-1],
      };

      flattenList.push(flattenNode);

      //loop treeNode children
      if(expandedKeySet.has(mergedKey)){
        flattenNode.children=dfs(treeNode.children||[],flattenNode);
      }else{
        flattenNode.children=[];
      }

      return flattenNode;
    })
  }

  dfs(treeNodeList);

  return flattenList;

}
  
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

export function arrAdd(list, value) {
  const clone = list.slice();
  if (clone.indexOf(value) === -1) {
    clone.push(value);
  }
  return clone;
}

export function arrDel(list, value) {
  const clone = list.slice();
  const index = clone.indexOf(value);
  if (index >= 0) {
    clone.splice(index, 1);
  } 
  return clone;
}