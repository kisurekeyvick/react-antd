interface IDomObj {
    type: string;
    props: any;
    chidlren: IDomObj[]// Array<{type: string, props: any, chidlren: IDomObj[]}>
}

/**
 * 使用typeof不能准确判断一个对象变量
 * 因为null的结果是object， Array的结果是object
 * 我们需要的是纯粹的object对象，使用方法： Object.prototype.toString.call(obj)
 * 
 * -  obj.toString 和 obj.prototype.toString 的结果是不一样的
 *    toString是Object的原型方法，而Array,function等类型作为Object的实例，都重写了toString方法
 *    不同的对象类型调用toString方法时，根据原型链的知识，调用的是对应的重写之后的toString方法，而不会直接去调用Object上原型toString方法
 *    所以obj.toString()是不能得到其对象类型的，只能将obj转换为字符串类型
 *    因此，想要得到对象的具体类型时，应该调用Object上原型toString方法
 */
const types = {
    get: (type: any) => Object.prototype.toString.call(type),
    string: '[object String]',
    number: '[object Number]',
    array: '[object Array]',
    object: '[object Object]',
    function: '[object Function]',
    null: '[object Null]',
    undefined: '[object Undefined]',
    boolean: '[object Boolean]',
};

function dom(type: string, props: any, ...chidlren: any) {
    return {
        type,
        props,
        chidlren
    };
}

/**
 * 创建dom
 * @param domObj 
 */
function generateDom(domObj: IDomObj):HTMLElement | any  {
    let $el: HTMLElement | any;

    /* 
        如果type存在，那么就创建节点，如果不存在，则创建htmltextnode
    */
    if (domObj.type) {
        $el = document.createElement(domObj.type);
    } else {
        const content: any = domObj;
        $el = document.createTextNode(content as string);
    }

    /*
        设置元素的属性
    */
    if (domObj.props) {
        Object.keys(domObj.props).forEach((key) => {
            ($el as HTMLElement).setAttribute(key, domObj.props(key));
        });
    }

    if (domObj.chidlren) {
        domObj.chidlren.forEach((child) => {
            $el.appendChild(generateDom(child));
        });
    }

    return $el;
}

/**
 * 
 * @param $parent 真实dom元素
 * @param oldNode 
 * @param newNode 
 * @param index     通过$parent，以及index，来定位目标真实dom的位置
 */
function vDom($parent: HTMLElement, oldNode: IDomObj, newNode: IDomObj, index: number = 0) {
    const $currentNode: any = $parent.childNodes[index];

    if (!oldNode) {
        // 不存在旧dom节点，但是存在新的dom节点 
        // 则在dom中添加新节点
        return $parent.appendChild(generateDom(newNode));
    }

    if (!newNode) {
        // 不存在新的dom节点，但是原本是存在这个dom节点的 
        // 则在dom中删除旧的节点
        return $parent.removeChild($currentNode);
    }

    // 当新旧dom都是有值的，那么需要深入对比值，看看到底是哪个值变了
    if (isNodeChange(oldNode, newNode)) {
        return $parent.replaceChild(generateDom(newNode), $currentNode);
    }

    // 两者为同样的字符串
    if (oldNode === newNode) {
        return;
    }

    // 对比prop更新
    if (isObjectChange(oldNode.props, newNode.props)) {
        const oldProps = oldNode.props || {};
        const newProps = newNode.props || {};
        const oldPropsKeys: any[] = Object.keys(oldProps);
        const newPropsKeys: any[] = Object.keys(newProps);

        if (newPropsKeys.length === 0) {
            oldPropsKeys.forEach((prop) => {
                ($currentNode as HTMLElement).removeAttribute(prop);
            });
        } else {
            const allKeys = new Set(...oldPropsKeys, ...newPropsKeys);
            allKeys.forEach((prop) => {
                // 没有oldprop，需要设置新的
                if (oldProps[prop] === undefined) {
                    return $currentNode.setAttribute(prop, newProps[prop]);
                }

                // 没有newprop, 需要删除旧的属性
                if (newProps[prop] === undefined) {
                    return $currentNode.removeAttribute(prop);
                }

                // 如果新旧prop都是有值的
                if (oldProps[prop] !== newProps[prop]) {
                    return $currentNode.setAttribute(prop, newProps[prop]);
                }
            });
        }
    }

    // 判断是否存在children
    if ((oldNode.chidlren && oldNode.chidlren.length) || 
        (newNode.chidlren && newNode.chidlren.length)) {
            const max: number = Math.max(oldNode.chidlren.length, newNode.chidlren.length);

            for(let i =0;i < max;i++) {
                vDom($currentNode, oldNode.chidlren[i], newNode.chidlren[i], i);
            }
    }
}

/**
 * 判断dom改变了什么
 * @param oldNode 
 * @param newNode 
 */
function isNodeChange(oldNode: IDomObj | string, newNode: IDomObj | string): boolean {
    const old = (oldNode as IDomObj);
    const ne = (newNode as IDomObj);

    if (old.type !== undefined && ne.type !== undefined)
        return old.type !== ne.type;

    return oldNode !== newNode;
}

/**
 * 查看对象的变化
 * @param old 
 * @param ne 
 */
function isObjectChange(old: any, ne: any): boolean {
    // 判断数据类型是否一致
    if (types.get(old) !== types.get(ne)) {
        return true;
    }

    // 深入判断
    if (types.get(old) === types['object']) {
        const oldKey = Object.keys(old);
        const newKey = Object.keys(ne);

        // 如果两者的key长度不一样，返回true，说明变化了
        if (oldKey.length !== newKey.length) {
            return true;
        }

        // 如果长度一样，同时两者的key长度都是为0，返回false，说明没有变化
        if (oldKey.length === 0) {
            return false;
        }

        // 如果长度一样，但是两者的key对应的值不一样
        for (let i = 0; i < oldKey.length; i++) {
            if (oldKey[i] !== newKey[i]) {
                return true;
            }
        }
    }

    return false;
}
