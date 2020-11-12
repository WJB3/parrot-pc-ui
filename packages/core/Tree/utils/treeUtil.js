
import toArray from '@packages/utils/toArray';

export function getPosition(level,number){
    return `${level}-${number}`
}

export function getKey(key,pos){
    if(key!==null && key!==undefined){
        return key;
    }
    return pos;
}

export function getTreeNodeProps(
    key,
    {
        keyEntities,
        expandedKeys
    }
){
    const entity=keyEntities[key];

    const treeNodeProps={
        eventKey:key,
        expanded:expandedKeys.indexOf(key)!==-1
    }

    return treeNodeProps;
}

export function convertTreeToData(rootNodes){

    function dig(node){

    }

    return dig(rootNodes);
 
}

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
              isLeaf:true,
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

  
/**
   * 
   * @param {节点数据} node  
   * @param {节点下标} index 
   * @param {节点parent} parent 
*/
export function traverseDataNodes(dataNodes,callback){

    function process(node,index,parent){
        
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


 
export function convertDataToEntities(
    dataNodes
){
    const posEntities={};
    const keyEntities={};

    traverseDataNodes(
        dataNodes,
        (item)=>{
            const { node,index,pos,parentPos,key,level }=item;
            const entity={ node,index,pos,level,key };

            const mergedKey=getKey(key,pos);

            posEntities[pos]=entity;
            keyEntities[mergedKey]=entity;

            entity.parent=posEntities[parentPos];

            if(entity.parent){
                entity.parent.children=entity.parent.children || [];
                entity.parent.children.push(entity);
            }  
        }
    );

    return {
        posEntities,
        keyEntities
    }
}


export function flattenTreeData(
    treeNodeList= [],
    expandedKeys= [],
  ){
    const expandedKeySet = new Set(expandedKeys);
    const flattenList= [];
  
    function dig(list, parent = null) {
      return list.map((treeNode, index) => {
        const pos = getPosition(parent ? parent.pos : '0', index);
        const mergedKey = getKey(treeNode.key, pos);
  
        // Add FlattenDataNode into list
        const flattenNode = {
          ...treeNode,
          parent,
          pos,
          children: null,
          data: treeNode,
          isStart: [...(parent ? parent.isStart : []), index === 0],
          isEnd: [...(parent ? parent.isEnd : []), index === list.length - 1],
        };
  
        flattenList.push(flattenNode);
  
        // Loop treeNode children
        if (expandedKeySet.has(mergedKey)) {
          flattenNode.children = dig(treeNode.children || [], flattenNode);
        } else {
          flattenNode.children = [];
        }
  
        return flattenNode;
      });
    }
  
    dig(treeNodeList);
  
    return flattenList;
  }
  
 