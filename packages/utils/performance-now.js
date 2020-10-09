(function(){
    var loadTime;
    
    if((typeof performance!=="undefined" && performance!==null) && performance.now){
        module.exports=function(){
            return performance.now();
        }
    }else if(Date.now){
        loadTime=Date.now();
        module.exports=function(){
            return Date.now()-loadTime;
        }
    }else{
        loadTime=new Date().getTime();
        module.exports=function(){
            return new Date().getTime()-loadTime;
        }
    }
}).call(this);