/**
 * 
 * @param {*} node 子节点 
 * @param {*} parentNode  父节点
 * 判断是否可滚动
 */

export default function scrollable(node){
    if(!node || !node?.parentNode){
        return false;
    }

    const nodeWidth=node?.scrollWidth;
    const parentWidth=node?.parentNode?.getBoundingClientRect().width;

    if(nodeWidth>parentWidth){
        return true ;
    }

    return false;
}