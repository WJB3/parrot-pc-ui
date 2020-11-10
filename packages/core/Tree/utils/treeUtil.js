
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
        keyEntities
    }
){
    const entity=keyEntities[key];

    const treeNodeProps={
        eventKey:key,
    }

    return treeNodeProps;
}

export function convertTreeToData(rootNodes){

    function dig(node){

    }

    return dig(rootNodes);
 
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
    treeNodeList=[],
    expandedKeys=[]
){
    
    const expandedKeysSet=new Set(expandedKeys);
    const flattenList=[];

    function dig(list,parent=null){
        return list.map((treeNode,index)=>{
            const pos=getPosition(parent?parent.pos:"0",index);
            const mergedKey=getKey(treeNode.key,pos);

            const flattenNode={
                ...treeNode,
                parent,
                pos,
                children:null,
                data:treeNode,
                isStart:[...(parent?parent.isStart:[]),index===0],
                isEnd:[...(parent?parent.isEnd:[]),index===list.length-1]
            };

            flattenList.push(flattenNode);

            if(expandedKeysSet.has(mergedKey)){
                flattenNode.children=dig(treeNode.children||[],flattenNode);
            }else{
                flattenNode.children=[];
            }
            return flattenNode;
        });
    }

    dig(treeNodeList);

    return flattenList;
}

//获取数据实体包含相关信息
export function traverseDataNodes(
    dataNodes,
    callback
){

    /**
   * 
   * @param {节点数据} node  
   * @param {节点下标} index 
   * @param {节点parent} parent 
   */

    function processNode(
        node,
        index,
        parent
    ){
        //第一次为null
        const children=node ? node.children : dataNodes;
        //第一次为“0”
        const pos=node ? getPosition(parent.pos,index) : "0";

        //处理非根节点
        if(node){
            const data={
                node,
                index,
                pos,
                parentPos:parent.node?parent.pos:null,
                level:parent.level+1
            }
            callback(data);
        }

        if(children){
            children.forEach((subNode,subIndex)=>{
                processNode(subNode,subIndex,{
                    node,
                    pos,
                    level:parent?parent.level+1:-1
                });
            });
        }
    }

    processNode(null);
}