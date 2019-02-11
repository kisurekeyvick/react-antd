import { render, Element, setAttr } from './vDomCreater';

interface INode {
    type: string;
    props: any;
    children: any;
}

function diff(oldTree: any, newTree: any) {
    const patches = {};
    
    walk(oldTree, newTree, 0, patches);

    return patches;
}

const ATTRS = 'ATTRS';
const TEXT = 'TEXT';
const REMOVE = 'REMOVE';
const REPLACE = 'REPLACE';
let Index: number = 0;

/**
 * 递归树 将比较后的结果放到补丁包中
 * @param oldNode 老节点
 * @param newNode 新节点
 * @param index   索引
 * @param patches 补丁包
 */
function walk(oldNode: INode, newNode: INode, index: number, patches: any) {
    const currentPatch: any[] = [];  // 每个元素都有补丁对象

    if (!newNode) {
        // 如果没有新节点  push进去属性index，告诉react需要删除那个index下的节点
        currentPatch.push({type: REMOVE, index});
    }
    // 判断节点是否为字符串
    else if (isString(oldNode) && isString(newNode)) {
        if(oldNode !== newNode) {
            currentPatch.push({type: TEXT, text: newNode});
        }
    } else if (oldNode.type === newNode.type) {
        // 比较属性是否存在更改
        const attrs = diffAttr(oldNode.props, newNode.props);
        // 为了防止attrs里面什么都没有属性，需要判断这个补丁包存在要修改的属性
        if (Object.keys(attrs).length > 0) {
            currentPatch.push({type: ATTRS, attrs});
        }

        // 如果有儿子节点  那么就遍历儿子
        diffChildren(oldNode.children, newNode.children, patches);
    } else {
        // 如果以上三种都是不满足的话，说明节点被替换了 这时候往数组中push需要替换的节点 newNode
        currentPatch.push({type: REPLACE, newNode});
    }

    // 当前元素确实存在补丁包的话，那么将元素和补丁对应起来 放到大的补丁包中
    if (currentPatch.length > 0)
        patches[index] = currentPatch;
}

/**
 * 比较属性
 * @param oldAttrs 老节点的属性
 * @param newAttrs 新节点的属性
 */
function diffAttr(oldAttrs: any, newAttrs: any) {
    const patches = {};

    // 判断老的属性中和新的属性中差异
    for(const key in oldAttrs) {
        if (oldAttrs[key] !== newAttrs[key]) {
            patches[key] = newAttrs[key];
        }
    }

    // 判断新节点的属性不在老节点属性范围中
    for(const key in newAttrs) {
        if (!oldAttrs.hasOwnPropperty(key)) {
            patches[key] = newAttrs[key];
        }
    }

    return patches;
}

/**
 * 比较节点的children
 * @param oldChildren   老的chilren 
 * @param newChildren   新的children
 * @param index         dom的index
 * @param patches       补丁包
 */
function diffChildren(oldChildren: any[], newChildren: any[], patches: any) {
    // 比较老的第一个和新的第一个
    oldChildren.forEach((child, idx: number) => {
        // 此处传入的Index是需要递增的，所有的应该基于一个Index来实现
        walk(child, newChildren[idx], ++Index, patches);
    });
}

/**
 * 判断是否为字符串
 * @param node 
 */
function isString(node: any) {
    return Object.prototype.toString.call(node) === '[object String]';
}


/* 
    规则
    - 当节点相同的时候，去看一下属性是否相同，如果属性不同，则产生一个属性的补丁包 例如： {type: 'ATTRS', attr:{class: 'list-group'}}
    - 如果新的节点不存在了，那么会产生一个补丁包 例如：{type:'REMOVE', index: XXXX}         // 这个index代表删除的位置
    - 如果节点类型不同的时候，直接采用替换模式，产生补丁包：{ type:'REPLACE', newNode: newNode }，就会产生一个新节点，把老节点替换掉
    - 如果文本发生变化， 补丁包：{type:'TEXT', text: 1.....}
*/

/* ---------------------------------------------------- patch部分  作用：更新视图 -------------------------------------------------------------- */
interface IPatch {
    type: string;
    [key:string]: any;
}

let allPatchs: any;
let patchIndex: number = 0;     // 默认索引指向当前的节点
// 给元素打补丁，重新更新视图
function patch(node: HTMLElement, patches: any) {
    // 给某个元素打补丁
    allPatchs = patches;

    patchWalk(node);
}

/**
 * 给某个元素打补丁
 * @param node 
 * 打补丁的方向是从儿子开始打补丁，儿子打完补丁就会往父级大补丁，然后再是祖级打补丁，一次类推
 */
function patchWalk(node: HTMLElement) {
    const currentPatch = allPatchs[patchIndex++];
    const childNodes = node.childNodes;
    childNodes.forEach((child: HTMLElement) => patchWalk(child));
    if (currentPatch) {
        // 如果存在补丁
        doPatch(node, currentPatch);
    }
}

/**
 * 开始打补丁
 * @param node  给当前的节点大补丁 
 * @param patches 补丁
 */
function doPatch(node: HTMLElement, patches: any[]) {
    patches.forEach((pa: IPatch) => {
        switch(pa.type) {
            case 'ATTRS': 
                for(const key in pa.attrs) {
                    const value = pa.attrs[key];
                    if (value) {
                        setAttr(node, key, value);
                    } else {
                        node.removeAttribute(key);
                    }
                }
                break;
            case 'TEXT': 
                node.textContent = pa.text;
                break;
            case 'REMOVE': 
                (node.parentNode as HTMLElement).removeChild(node);
                break;
            case 'REPLACE': 
                const newNode = (pa.newNode instanceof Element) ? render(pa.newNode) : document.createTextNode(pa.newNode);
                (node.parentNode as HTMLElement).replaceChild(newNode, node);
                break;
        }
    });
}

export {
    diff,
    patch
}


/*
    存在问题
    - 当前代码存在： 如果是平级元素有互换，那会导致重新渲染
    - 新增节点也不会被更新
*/