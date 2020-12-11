

//计算出需要过渡动画的时机

export function findExpandedKeys(prev,next){

    //如果没有变化，不是添加
    if(prev.length===next.length){
        return {
            add:false,
            key:null
        }
    }

}