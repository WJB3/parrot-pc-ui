![哈哈](./tailuo.jpg)

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
 
前文中我们简单提到了空间复杂度和时间复杂度的概念，接下来我们深入数据结构-“栈”
    
</blockquote>

# 一、栈的概念

![哈哈](./stack.jpg)

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
 
栈是一种遵从后进先出（Last-In-First-Out）原则的有序集合。<br />

如上图，我们可以将元素PUSH(推)进栈中，这时这个元素就在栈的顶端，我们也可以将元素POP(弹)出栈。<br />

例子：超市货架上摞着10公斤的米。<br />

进栈：超市进米时，将米一袋一袋的叠上去，这就是压栈，也就是我们说的PUSH(推)进栈。压在最底下的那一袋米，一定是最先进栈的。<br />

出栈：顾客取米时，将米一袋一袋的拿走，这就是弹栈，也就是我们说的POP出栈。在最上面的那包米，处于栈的最顶层，一定是最先出栈的。
    
</blockquote>

# 二、JS模拟栈结构

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
 
前文我们提到了栈的概念，但是在Javascript中，是没有栈这种数据结构的，但是我们可以很轻松的通过JS来模拟栈这种数据结构。<br />

我们可以先模拟栈的一些方法，属性，并尝试完善它。<br />

<ul>
    <li>push(element)：添加一个或者多个元素到栈顶</li>
    <li>pop()：移除栈顶的元素，同时返回该元素</li>
    <li>peek()：查看栈顶的元素</li>
    <li>isEmpty()：判断栈是否空了，是则返回 true，否则返回 false</li>
    <li>clear()：清除栈中的所有元素</li>
    <li>size：返回栈里的元素个数，方法和 length 类似</li>
</ul>
    
</blockquote>

```js
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
```

# 三、前端相关的栈事例

## 1.十进制转二进制


<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
 
小伙伴们还记得十进制转二进制的方法吗？大概逻辑是将一个数每次取余2，先将余数记录下来，再将每次除于2的值（向下取整，舍弃小数部位）当作下一次取余的除数，循环往复直到这个值为0，然后将记录下来的余数从下往上依次排列出来即为二进制的数值。明明是最先得出的余数反而是放在最后，而后得的余数放在了前面，这是不是很符合栈的<i>“后进先出”</i>的理念呢？
    
</blockquote>

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(247, 31, 85,1); background: rgb(239, 235, 233);line-height:1.5;'>
    1.c/b，读作c除以b，或者b除c,其中c叫做被除数，b叫做除数，运算的结果叫做商。<br >
    2.c%b，读作c模上b，其中值为余数。
</blockquote>

<ul>
    <li>十进制35转为二进制</li> 
</ul>

```js
35 % 2 = 1   |   35 / 2 = 17
17 % 2 = 1   |   17 / 2 = 8
8 % 2 = 0    |   8 / 2 = 4
4 % 2 = 0    |   4 / 2 = 2
2 % 2 = 0    |   2 / 2 = 1
1 % 2 = 1    |   1 / 2 = 0
```
 
由上可以得出35的二进制为100011。

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
我们可以用栈结构的思想重构一下转化思路：<br />
1.已知十进制的值为n。<br />
2.将n模上2，将得出的余数放入栈最底部。<br />
3.将n除以2，将得出的商作为下一次循环的除数。（向下取整，舍弃小数部位）<br />
4.循环步骤 2 和步骤 3，直至 n 等于 0 为止。<br />
5.将栈的值从栈顶到栈底部依次取出来，得出最终运算结果。
</blockquote>

然后我们并不难得出Js版十进制转二进制的代码：

```js
function decimalToBinary(n){
    let stack=[];
    while(n!==0){
        stack.push(n%2);
        n=Math.floor(n/2);
    }
    return stack.reverse().join("");
}
```

## 2.十进制转十六进制内任意进制

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
从上文中十进制转二进制中我们可以看出二进制就是除数为2，那么十进制转十六进制内任意进制就是将除数变为对应进制，如二进制除数就是2，8进制除数就是8，那么十六进制初始就是16。
</blockquote>

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(247, 31, 85,1); background: rgb(239, 235, 233);line-height:1.5;'>
这里有一点需要注意的是：电脑中的十六进制数，由十个数字(0、1、2、3、4、5、6、7、8、9)和六个英文字母(A、B、C、D、E、F)表示，其分别代表10、11、12、13、14、15，最大不会大于等于16。
</blockquote>

然后我们就很容易得出Js版十进制转十六进制内任意进制的代码：

```js
function decimalToAnybase(n,binary){
    const stack=[];
    const digits = '0123456789ABCDEF';
    while(n!==0){
        stack.push(digits[n%binary]);
        n=Math.floor(n/binary);
    } 
    return stack.reverse().join("");
}
```
