
//布尔值
let isDone: boolean = false;

//数字
let decLiteral: number = 6;

//字符串
let name: string = "bob";

//null
let nullDemo:null=null;

//undefined
let undefinedDemo:undefined=undefined;

//数组
let list: number[] = [1, 2, 3];

//元组
let tuple:[number,string]=[1,"12"];

//any 
let anyDemo:any="1223";

//联合类型
let joinDemo:string|number="123";

//接口
interface IPerson{
    //只读属性 无法赋值
    readonly id?:number,
    name:string,
    // ?代表可选属性 可有可无
    age?:number
}

let wjb:IPerson={
    name:"qwe"
}

//函数
function add(x:number,y:number,z?:number):number{
    return x+y+z;
}

let a=add(1,2,3);

//类型推论，ts会在我们没有明确指出变量类型时自动给变量添加类型
let str="123";

//str=123;

//类
class Animate {
    protected name:string;
    constructor(name:string){
        this.name=name;
    }
    run(){
        return `${this.name} is running`
    }
}
const shake=new Animate("snake");
console.log(shake.run());

//继承
class Dog extends Animate{
    bark(){
        return `${this.name} is barking`;
    }
}
const xiaobao=new Dog("小宝");
console.log(xiaobao.run())
console.log(xiaobao.bark())

//枚举
enum Direction{
    Up=10,
    Down
}

console.log(Direction.Down)
console.log(Direction[0])


 