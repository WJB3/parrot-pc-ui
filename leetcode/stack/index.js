

function Stack(){
    let items=[];
    this.push=function(element){
        items.push(element);
    };
    this.pop=function(){
        return items.pop();
    }
    this.peek=function(){
        return items[items.length-1]
    }
    this.isEmpty=function(){ 
        return items.length===0; 
    }
    this.clear=function(){
        items.length=0;
    }
    this.size=function(){
        return items.length;
    }
}

function decimalToBinary(n){
    let stack=[];
    while(n!==0){
        stack.push(n%2);
        n=Math.floor(n/2);
    }
    return stack.reverse().join("");
}

function a(n){
    return function(){
        decimalToBinary(n)
    }
}
 

function runningtime(fn){
    function time2stamp(){
        var d = new Date();
        return Date.parse(d)+d.getMilliseconds();
    }
    let t1=time2stamp();
    fn.apply(this);
    let t2=time2stamp();
    console.log("耗时：" + (t2 - t1) + " 毫秒");
}

function decimalToAnybase(n,binary){
    const stack=[];
    const digits = '0123456789ABCDEF';
    while(n!==0){
        stack.push(digits[n%binary]);
        n=Math.floor(n/binary);
    } 
    return stack.reverse().join("");
}

function greeting(){
    console.log("greetring starting...");
    sayHi()
    console.log("greetring ending...")
}

function sayHi(){
    console.log("sayHi...")
}

greeting();

console.log("ending....")