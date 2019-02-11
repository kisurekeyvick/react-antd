import * as React from 'react';
import {Breadcrumb, Icon} from 'antd';
import * as PropTypes from 'prop-types';
import './breadcrumb-component.scss';

export default class BreadComponent extends React.Component<any, any> {
    public navArray: string[];

    static propTypes = {
        menu: PropTypes.array,
        location: PropTypes.any,
        className: PropTypes.string
    };

    constructor(public props: any) {
        super(props);

        this.navArray = [];
    }

    /**
     * 当接收到一个新的props时候，这个生命周期就会触发
     * @param nextProps 
     * @param nextContext 
     */
    public componentWillReceiveProps(nextProps: any, nextContext: any) {
        this.initMenu(nextProps);
    }

    /**
     * 时间：2018/11/10
     * 初始化面包屑数据
     * @param props 这个是从父级传过来的数据包含：menu(父级请求mock数据返回的菜单数据)，location（route返回给父组件的location信息）
     */
    public initMenu(props: any) {
        const { menu, location } = props;
        let result: string[] = [];

        const loopMenu = (item: any, array: string[]): any => {
            // 当路径匹配的话
            if (item.path === location.pathname) {
                array.push(item.title);
                return array;
            }
            
            // 当item.child存在并且是数组
            if (item.child && item.child instanceof Array) {
                for(let i = 0; i < item.child.length; i++) {
                    const arr: string[] = [...array, ...[item.title]];
                    const loopVal = loopMenu(item.child[i], arr);

                    // 如果返回的是一个数组，直接取出来，不管后面的了(暂时就先真么处理)
                    if(loopVal && loopVal instanceof Array) {
                        return loopVal;
                    }
                }
            } else 
                return null;
        };

        if (menu && menu instanceof Array) {
            result = menu.map(item => {
                if (item) {
                    const array: string[] = [];
                    return loopMenu(item, array);
                } else
                    return null;
            });

            result = result.filter(item => item);
        }

        if (result && result.length > 0) {
            this.navArray.length = 0;
            const first: any = result[0];
            this.navArray = first;
        }
    }

    public render() {
        const breadArray: any[] = [];
        const Item = Breadcrumb.Item;

        breadArray.push(
            <Item key='home' href="/saas/customer/list"><Icon type="home"/> 首页</Item>
        );

        this.navArray.forEach((item, index) => {
            breadArray.push(
                <Item key={index}>{item}</Item>
            );
        });

        return(
            <div className="kisure-antd-layout">
                <Breadcrumb>{breadArray}</Breadcrumb>
            </div>
        )
    }
}

/**
 * 2018/11/9
 * 
 * es6 Set 和 Map 数据结构
 * (1)Set
 *      数据结构Set，类似于数组，但是成员的值都是唯一的。
 *      Set本身是一个构造函数，用来生成Set数据结构。
 *      使用Set生成的数据结构可以用add来添加数据
 *      案例：
 *          const setArray = new Set();
 *          [2, 3, 5, 4, 5, 2, 2].forEach(i => setArray.add(i));
 *          console.log(setArray);  //2 3 5 4
 * 
 *      当然Set()也可以接收一个数组
 *      案例：
 *          const set = new Set([1, 2, 3, 4, 4]);
 *          [...set]    // [1,2,3,4]             
 *  
 *      我们可以使用Set对数据去重：
 *      案例:
 *          [...new Set(array)]
 * 
 *      我们想Set加入值得时候，值不会发送类型的转换，number和string会区分开来的
 *      NaN在Set看来，Set内部的NaN是相等的，所以重复多次NaN的添加，也只会添加一个
 *      Object在Set看来，是永远不会相等的，即使你两次都是添加{}，都能添加到Set内部
 *      案例：
 *          let set = new Set();
 *          set.add(5);
 *          set.add('5');
 *          set.add({});
 *          set.add({});
 *          set.add(NaN);
 *          set.add(NaN);
 *          console.log(set);   // Set(5) {5, "5", {…}, {…}, NaN}
 * 
 *     
 *      关于Set实例的属性和方法：
 *          add(value)：添加某个值，返回 Set 结构本身                           // set.add(1).add(2).add(3);
 *          delete(value)：删除某个值，返回一个布尔值，表示删除是否成功           // set.delete(2)  true
 *          has(value)：返回一个布尔值，表示该值是否为Set的成员                  // set.has(2)  false
 *          clear()：清除所有成员，没有返回值                                   // set.clear()
 * 
 *      Array.from方法可以将Set结构转化为数组：
 *          const items = new Set([1, 2, 3, 4, 5]);
 *          const array = Array.from(items);
 * 
 * (2)Map
 *      类似于对象，也是键值对的集合，但是这个"键"的范围不限于字符串，各种类型的值都可以当作键。
 *      Map的出现是为了解决js对象只能使用字符串当作key所带来的限制
 *  
 *      "键值对"的数据结构:
 *      const m = new Map();
 *      const o = {p: 'Hello World'};
 *      cosnt p = {p: 'Hello World'};
 *      m.set(o, 'content');
 *      m.get(o);   // content
 *      m.get(p);   // undefined
 * 
 *      Map也可以接受一个数组作为参数：
 *      const map = new Map([
 *          ['name', '张三'],
 *          ['title', 'Author']
 *      ]);
 *      map.has('name');    //true
 *      map.get('name');    //'张三'
 * 
 *      新建Map实例，接受数组为参数，实际上执行的是下面的算法：
 *      const items = [
 *          ['name', '张三'],
 *          ['title', 'Author']
 *      ];
 * 
 *      const map = new Map();
 * 
 *      items.forEach(([key, value]) => {
 *          return map.set(key, value)
 *      });
 */
