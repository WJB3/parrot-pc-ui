
import validateValue from '@packages/utils/validateValue';

export function getKey(key,pos){
    //如果有key返回key 有pos返回pos
    if(key){
        return key;
    }else{
        return pos;
    }
}

export function getPos(level,index){
    //根据level和index来获取位置
    return `${level}-${index}`;
}

/**
 * 
const treeData2=[
  {
    title: 'parent 1',
    key: '0-0', 
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',  
      },
      {
        title: 'parent 1-1',
        key: '0-0-1' 
      },
    ],
  }
];-》  
 */

//->index  对应的下标  -> key 对应的key ->level 数据对应的层级 -> children 孩子节点 -> parent 父节点 ->pos 给出的对应的位置

//转化我们想要的数据
export function convertDataToEntities(
    treeData
){
    const posEntities={};
    const keyEntities={};

    traverseSingleData(
        treeData,
        (dfsData)=>{
             
            const { node,index,level,pos,parentPos,key }=dfsData;

            const entity={ node,index,level,pos,key };

            keyEntities[key]=entity;
            posEntities[key]=entity;

            //如果有父数据
            entity.parent=posEntities[parentPos];

            if(entity.parent){
                entity.parent.children=entity.parent.children||[];
                entity.parent.children.push(entity);
            }

        }
    )

    return {
        keyEntities,
        posEntities
    }

}

//转化单个data
export function traverseSingleData(
    treeData,
    callback
){

    
    function dfs(node,index,level,parentPos){

        const children=node?node.children:treeData;  
        const pos=node?getPos(parentPos,index):"0";

        if(node){
 
            const info={  
                node:node,
                index:index,
                level:level,
                pos:pos,
                parentPos:parentPos,
                key:getKey(node.key,pos)
            }

            callback?.(info)

        }

        if(children){
            children.forEach((subNode,subIndex)=>{
                dfs(
                    subNode,
                    subIndex,
                    validateValue(level)?level+1:0,
                    pos
                )
            })
        } 

    }

    dfs(null);

}
/**
 * 
 * @param {*} treeData 
 * @param {*} expandedKeys 
 * children: (2) [{…}, {…}]
    data: {title: "parent 1", key: "0-0", children: Array(2)}
    isEnd: [true]
    isStart: [true]
    key: "0-0"
    parent: null
    pos: "0-0"
    title: "parent 1"
 */

export function flattenTreeData(treeData=[],expandedKeys=[]){
    const expandedKeySet=new Set(expandedKeys);
    const flattenList=[];

    function dfs(list,parent=null){
        return list.map((treeNode,index)=>{
            const pos=getPos(parent?parent.pos:"0",index);
            const mergedKey=getKey(treeNode.key,pos);

            const flattenNode={
                ...treeNode,
                parent,
                pos,
                children:null,
                data:treeNode,
                isStart:[...(parent?parent.isStart:[]),index===0],
                isEnd:[...(parent?parent.isEnd:[]),index===list.length-1]
            }

            flattenList.push(flattenNode);

            if(expandedKeySet.has(mergedKey)){
                flattenNode.children=dfs(treeNode.children||[],flattenNode);
            }else{
                flattenNode.children=[];
            }

            return flattenNode;
        })
    }

    dfs(treeData);

    return flattenList;
}