

![哈哈](./dijia.jpeg)

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>

哈喽，小伙伴们，我是你们的宝哥，最近我一直在忙于打造自己的组件库，所以就没有多余的时间来编写掘金文章，我本来是抱着很困难的心态来写组件库的，但是遇到Tree组件这样的复杂的结构，数据结构与算法薄弱的我彻底被打倒了。所以准备专心先把算法这块整好，经过我一系列的百度搜索，大家一致认为提升算法的最好方法就是刷题，刷什么题呢，这里我刷<a href="https://leetcode-cn.com/problemset/all/">leetcode</a>来巩固。
    
</blockquote>


# 一、时间复杂度

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>

在计算机科学中，时间复杂性，又称时间复杂度，算法的时间复杂度是一个函数，它定性描述该算法的运行时间。这是一个代表算法输入值的字符串的长度的函数。
    
</blockquote>

![哈哈](./time.jpg) 

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(247, 31, 85,1); background: rgb(239, 235, 233);line-height:1.5;'>
下文中的m代表循环体内的代码时间复杂度
</blockquote>

## 1.O(1)

```js
//时间复杂度为O(1)
let i=0;
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
因为每次执行代码文件，对于一个普通语句，代码只会被执行一次，所以这行代码的时间复杂度为O(1)。对应上图中的粉色线。
</blockquote>

## 2.O(m×n)


```js
//时间复杂度为O(n)
for(let i=0;i<n;i++){   // 循环次数为 n
    console.log(i);//循环体内复杂度为O(1)
}
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
因为每次执行代码文件，对于一个循环语句，假设循环体的时间复杂度为 O(m)，循环次数为 n，则这个
循环的时间复杂度为 O(m×n)。所以这行代码的时间复杂度为O(1×n)=O(n)。对应上图中的绿色线。
</blockquote>

## 3.O(m×n2×n1)

```js
for(let i=0;i<n1;i++){// 循环次数为 n1
    for(let j=0;j<n2;j++){// 循环次数为 n2
        console.log(i);//循环体内复杂度为O(1)
    }
}
```
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
因为每次执行代码文件，对于多个循环语句，假设循环体的时间复杂度为 O(m)，各个循环的循环次数分别是n1, n2...，则这个循环的时间复杂度为 O(m×n2×n1)。分析的时候应该由里向外分析这些循环。所以这行代码的时间复杂度为O(1×n2×n1)=O(n2×n1)。对应上图中的最左边的黑线。
</blockquote>

## 4.O(1)+O(n)=O(n)

```js
let i=0;//对于一个普通语句 代码复杂度为O(1)
for(let j=0;j<n;j+=1){//对于一个循环语句 代码复杂度为O(m×n)
    console.log(j);
}
```
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
因为每次执行代码文件，对于顺序执行的语句或者算法，总的时间复杂度等于其中最大的时间复杂度。所以这行代码的时间复杂度为O(n)。
</blockquote>

## 5.O(logN)

```js
let i=1;
while(i<n){
    console.log(i);
    i*=2;
}
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
因为每次执行代码文件，我们可以看下这段代码的逻辑，不断的求出i×2的n次方，不难得出这段代码运行的次数为logN。所以这行代码的时间复杂度为O(logN)。
</blockquote>

## 6.max(O(n^2), O(n))

```js
let flag=true;

if(flag){
    for(let j=0;j<n;j+=1){//对于一个循环语句 代码复杂度为O(m×n)
        console.log(j);
    }
}else{
    for(let i=0;i<n1;i++){// 循环次数为 n1
        for(let j=0;j<n2;j++){// 循环次数为 n2
            console.log(i);//循环体内复杂度为O(1)
        }
    }
}

``` 
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
因为每次执行代码文件，对于条件判断语句，总的时间复杂度等于其中 时间复杂度最大的路径 的时间复杂度。 所以这行代码的时间复杂度为max(O(n^2), O(n))=O(n^2)。
</blockquote>

# 二、空间复杂度


<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>

在计算机科学中，空间复杂度是对一个算法在运行过程中临时占用存储空间大小的量度。
    
</blockquote>

## 1.O(1)


```js
//空间复杂度为O(1)
let i=0;
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
因为每次执行代码文件，都只生成一个单个变量，单个变量所占用的内存永远都是1。
</blockquote>

## 2.O(n)

```js
const list=[];
for(let i=0;i<n;i++){
    list.push(i);
}
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
因为每次执行代码文件，都声明一个数组，我们每次循环时给数组里面添加了n个值，相当于占用了n个内存单元，所以我们这里的空间复杂度即为O(n)。
</blockquote>

## 3.O(n^2)

```js
const matrix=[];
for(let i=0;i<n;i++){
    matrix.push([])
    for(let j=0;j<n;j+=1){
        matrix[i].push(j);
    }
}
```

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
因为每次执行代码文件，都声明一个数组，双重循环会给数组添加n*n个值，相当于占用了n*n个内存单元，所以我们这里的空间复杂度为O(n*n)。
</blockquote>