

//可以让函数依次执行

export default function createChainedFunction(...params){

    const args=Array.prototype.slice.call(arguments,0);

    if(args.length===1){
        return args[0];
    }

    return function chainedFunction(){
        for(let i=0;i<args.length;i++){
            if(args[i] && args[i].apply){
                args[i].apply(this,arguments);
            }
        }
    }
}