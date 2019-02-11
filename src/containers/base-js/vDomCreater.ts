import {diff, patch} from './diff';

// 虚拟DOM元素的class
class Element {
    public type: any;
    public props: any;
    public children: any[];

    constructor(type: any, props: any, children: any) {
        this.type = type;
        this.props = props;
        this.children = children;
    }
}

/**
 * 设置DOM属性
 * @param node  节点元素 
 * @param key   属性
 * @param value 属性对应的值
 */
function setAttr(node: HTMLElement, key: string, value: any) {
    switch(key) {
        case 'value':
            if (node.tagName.toUpperCase() === 'INPUT' || node.tagName.toUpperCase() === 'TEXTAREA') {
                (node as (HTMLInputElement | HTMLTextAreaElement)).value = value;
            } else {
                node.setAttribute(key, value);
            }
            break;
        case 'style':
            node.style.cssText = value;
            break;
        default:
            node.setAttribute(key, value);
            break;
    }
}

/**
 * 返回虚拟dom，js对象
 * @param type 
 * @param props 
 * @param children 
 */
function createElement(type: any, props: any, children: any) {
    return new Element(type, props, children);
}

/**
 * 将虚拟vNode转化为真实DOM
 * @param eleObj 
 */
function render(eleObj: Element) {
    const ele: HTMLElement = document.createElement(eleObj.type);

    for(const key in eleObj.props) {
        // 设置属性方法
        setAttr(ele, key, eleObj.props[key]);
    }

    // 遍历儿子，如果是虚拟dom则继续渲染，不是就代表的是文本节点
    eleObj.children.forEach((child) => {
        child = (child instanceof Element) ? render(child) :
                document.createTextNode(child);
        ele.appendChild(child);
    });

    return ele;
}

/**
 * 将元素插入到页面内
 * @param el 
 * @param target 
 */
function renderDom(el: HTMLElement, target: HTMLElement) {
    target.appendChild(el);
}

/* 
    (1)node.style.cssText
        通过js给节点添加多个样式属性

    (2)查看css属性
        第一种 获取内联样式单个属性：document.querySelector('#div').style.属性
        第二种 查看所有属性：document.querySelector('#div').getAttribute("style")
                           document.querySelector('#div').style.cssText

        需要注意的是，这2中方法只能获取内联样式，但是获取不到 外部/内部 样式表中的样式属性
        外部/内部 样式表： 
            1 <head>
            2 <style>
            3 　　#div1 { width:200px; height:200px; background:black}   //这里是内部样式表
            4 </style>
            5 <link rel="stylesheet" type="text/css" href="example.css" >   //这里是外部样式表，引用了外部的example.css文件
            6 </head>
    (3)查看样式表
        window.getComputedStyle(dom, null)[属性名字]
            此方法第二个参数是存放伪元素的(:after之类的)，如果不需要则，设置为null
            这个方法是获得计算后的style

        当然window.getComputedStyle不兼容IE，对应IE的方法：dom.currentStyle[属性名字]

    (4)修改css属性
        obj.style.cssText = 'color:red; font-size:13px;.......';
        obj.setAttribute('style', '......');
*/

/* 
    - 虚拟dom用在更新dom上的

    - DOM Diff比较两个虚拟DOM区别 => 其实就是比较两个对象的区别
        DOM Diff作用 就是根据两个虚拟对象创建出补丁，这个补丁用来描述改变的内容，然后将这个补丁用来更新dom
    
    差异计算
    - 先序深度优先遍历
        所谓的深度优先遍历就是说会一个一个的dom树去查找，查找完整支dom树以后，再换一个dom树
                       ul(0)
            li(1)      li(2)      li(5)
                    p(3)    p(4)
        遍历的顺序是从0-5

        (1)用js对象模拟DOM
        (2)把虚拟DOM转成真实DOM并插入页面中
        (3)如果有事件发生修改了虚拟DOM，那么就会比较新旧的DOM，然后得到差异对象
        (4)将差异对象应用到真正的DOM树上

    算法
        二叉树：
                                    A
                            B               C
                        D       E       F       G

    - 深度优先遍历
        沿着树的深度遍历树的节点，尽可能深的搜索树的分支，遍历顺序：ABDECFG

    - 广度优先遍历
        又叫宽度优先搜索或横向优先搜索，从根节点开始沿树的宽度搜索遍历，遍历顺序：ABCDEFG

    
        二叉树：
                                    A
                        B                       E
                            c                           F
                        D                           G
                                                H       K

    - 前序遍历
        先访问根，再遍历左子树，再遍历右子树。典型的递归思想。
        ABCDEFGHK

    - 中序遍历
        先遍历左子树，再访问根，再遍历右子树
        BDCAEHGKF

    - 后序遍历
        先遍历左子树，再遍历右子树，再访问根
        DCBHKGFEA
*/

export {
    Element,
    renderDom,
    createElement,
    render,
    diff,
    patch,
    setAttr
}

// url: https:// https://www.bilibili.com/video/av31174086?from=search&seid=4734024983627124416