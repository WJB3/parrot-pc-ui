![哈哈](./tree.jpg)

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(247, 31, 85,1); background: rgb(239, 235, 233);line-height:1.5;'>

不知道你是否和我一样，在处理类似于树形结构的数据时，常常会想到递归，但是每次都要百度好久，而且还经常会出错，就算百度出来了，似懂非懂，而且这部分的知识也不属于自己，所以我们这次来好好研究下“树”这个数据结构。
    
</blockquote>

# 一、什么是树？


<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>

树是一种分层数据的抽象模型。一种重要的非线性数据结构，直观地看，它是数据元素（在树中称为结点）按分支关系组织起来的结构，很象自然界中的树那样。 如下都是生活中常见的树的例子：
    
</blockquote>

## 1.林氏衍繁系族谱

![哈哈](./zupu.jpg)

## 2.社会组织机构
![哈哈](./zuzhi.jpg)

## 3.生活中的树
![哈哈](./shu.jpg)


# 二、前端中常见的树

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>

在我们写前端的过程中，其实也很容易遇到树这种数据结构。
    
</blockquote>

## 1.DOM树

![哈哈](./dom.jpg)


<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>

如上，浏览器将接收到的HTML代码，通过HTML解析器解析构建为一颗DOM树。
    
</blockquote>

## 2.前端常用组件-树形控件

![哈哈](./treekong.jpg)

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>

如上图，一个产品的树形分类图示，可以很直观的展示产品的多级分类。
    
</blockquote>

## 3.前端常用组件-级联选择

![哈哈](./caskong.jpg)

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>

如上图，一个选择省市县的多级联动选择器。
    
</blockquote>

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(247, 31, 85,1); background: rgb(239, 235, 233);line-height:1.5;'>

其实JS中并没有树，但是可以用Object和Array来模拟树。如下，根节点是一个Object，children是一个Array。里面包含了多个像根节点那样结构的Object，所以可以无限的循环下去，但是并不是所有的树都满足这样的结构，如children可以使用c代替等等，根节点是数组而不是对象等。但是如果数据结构是这样满足分层结构的数据，我们就可以称之为“树”。
    
</blockquote>

```js
{
    value:"China",
    label:"中国",
    children:[
        {
            value:"anhui",
            label:"安徽省",
            children:[
                {
                    value:"hefei",
                    label:"合肥市"
                },
                {
                    value:"wuhu",
                    label:"芜湖市"
                },
            ]
        },
        {
            value:"zhejiang",
            label:"浙江省",
            children:[
                {
                    value:"hangzhou",
                    label:"杭州市"
                },
                {
                    value:"ningbo",
                    label:"宁波市"
                }
            ]
        }
    ]
}
```

# 三、树的常用操作-深度优先遍历/广度优先遍历
<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(247, 31, 85,1); background: rgb(239, 235, 233);line-height:1.5;'>

在这里我们不探讨图的深度/广度优先遍历，只讨论树的深度/广度优先遍历

</blockquote>

![哈哈](./tree1.jpg)

## 1.深度优先遍历

### 1.一句话解释

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>

一句话解释深度优先遍历DFS(Depth-First-Traversal)：尽可能深的搜索树的分支。对于上图我们的树的遍历顺序为A、B、D、E、C、F、G。可以用读书来模拟这样的一种行为，对于上图有三层结构，我们可以将第一层（A）当作书籍的索引。第二层（B、C）当作书籍的章。第三层（D、E、F、G）当作书籍的一小节一小节。那么深度优先遍历就相当于我们按照顺序一页一页的读这本书籍。
</blockquote>

### 2.深度优先遍历算法口诀

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>

1.访问根节点。<br />
2.对根节点的children挨个进行深度优先遍历。

</blockquote>

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>
我们通过上图来解释一下这个口诀吧。<br />
1.首先访问根节点A，然后对根节点A的children挨个进行深度遍历。<br >
2.B节点相当于A节点的第一个children,对于B以及下面的树结构来说，B算是一个根节点，然后我们访问根节点B。然后对根节点B的children挨个进行深度遍历。<br />
3.D节点相当于对于B节点的第一个children，对于D以及下面的树结构来说，D算是一个根节点，然后我们访问根节点D。此时D节点下面已经没有节点了，所以也就没有children，这个时候开始访问B节点的第二个children-E。<br />
4.对于E以及下面的树结构来说，E算是一个根节点，然后我们访问根节点E。此时E节点下面已经没有节点了，所以也就没有children。<br />
5.此时B节点已经完全访问完了，此时我们开始访问A节点的第二个children-C。<br />
6.对于C已经下面的树结构来说，C算是一个根节点，然后我们访问根节点C。然后对根节点C的children挨个进行深度遍历。<br />
7.F节点相当于C节点的第一个children，对于F节点以及下面的树结构来说，F算是一个根节点，然后我们访问根节点F。此时F节点下面以及没有节点了，所以也就没有children，这个时候开始访问C节点的第二个children-G。<br />
8.对于G以及下面的书结构来说，G算是一个根节点，然后我们访问根节点G。此时G节点下面已经没有节点了，所以也就没有children。<br />
9.此时C节点已经完全访问完了，对于A这个根节点来说，已经没有下一个children了，所以整个树就已经遍历完成了。<br />
所以我们的树的遍历顺序为A、B、D、E、C、F、G。
</blockquote>
 

## 2.广度优先遍历

### 1.一句话解释

<blockquote style='padding: 10px; font-size: 1em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid rgba(0,189,170,1); background: rgb(239, 235, 233);line-height:1.5;'>

一句话解释深度优先遍历BFS(Breadth-First-Traversal)：先访问离根节点最近的节点。对于上图我们的树的遍历顺序为A、B、C、D、E、F、G。可以用读书来模拟这样的一种行为，对于上图有三层结构，我们可以将第一层（A）当作书籍的索引。第二层（B、C）当作书籍的章。第三层（D、E、F、G）当作书籍的一小节一小节。那么广度优先遍历就相当于我们先大图阅读一下每一章，再通过每一章来阅读每一小节。
</blockquote>
