import * as React from 'react';

export default class BaseJs extends React.PureComponent<any, any> {
    constructor(public props: any) {
        super(props);

        this.reduceTest();
        this.beToArrayTest(1,2,3,4);
        this.restTest(1,2,3,4,5,6);
        this.callTest();
        this.iteratorTest();
        this.forOfTest();
        this.destruction();
        this.arrayTest();
        this.setTest();
        this.mapTest();
        this.proxyTest();
        this.constructorTest();
        this.classQuestionTest();
        this.promiseTest();
        this.asyncTest();
    }

    public reduceTest = () => {
        const numArr = [1,2,3,4];
        const res = numArr.reduce((total, num: number) => {
            return total + num;
        }, 100);
        console.log('reduce方法(计算数组总和)：', res);
    
        const arr = [[0,1], [2,3], [4,5]];
        const formatArr = arr.reduce((total, current) => {
            return total.concat(current)
        });
        console.log('reduce方法(合并二维数组)：', formatArr);
    
        const wordArr = ["apple","orange","apple","orange","pear","orange"];
        const statistical = wordArr.reduce((total, current) => {
            // total[current] = total[current] ? total[current] + 1 : 1;
            total[current] = (total[current] + 1) || 1;
            return total;
        }, {});
        console.log('reduce方法(统计数组中有多少个不重复的单词)：', statistical);
    
        /** 
         * reduce 接收一个函数作为累加器，数组中的每个值(从左到右)开始缩减，最终计算为一个值。对于空数组则不会执行回调函数的
         * reduce语法：array.reduce((total, currentVal, currentIndex, arr) => {...}, initialValue);
         */
    }
    
    public beToArrayTest = (...rest: any) => {
        const obj_one = {0: 'a',1: 'b',2: 'c',length: 3};
        const obj_one_arr = Array.prototype.slice.call(obj_one);
        const obj_two_arr = [].slice.call(obj_one);
        const obj_three_arr = Array.from(obj_one);
        console.log('Array.prototype.slice.call(obj)的方式转换为数组：', obj_one_arr);
        console.log('[].slice.call(obj)的方式转换为数组', obj_two_arr);
        console.log('Array.from(obj)的方式转换为数组', obj_three_arr);
        console.log('拓展运算符... 也可以将某些数据结构转为数组', rest, rest instanceof Array);

        const arrMap = Array.from('juejin', (item) => {
            return item + 'kisure';
        });
        console.log('array.from：', arrMap);

        const arrOf = Array.of(1,2,3);
        console.log('array.of：', arrOf);
        /** 
         * array.from() 将伪数组对象或可遍历对象转换为真数组
         * 
         * (1)伪数组
         *    如果一个对象的所有键名都是正整数或零，并且有length属性，那么这个对象就很想数组，语法上称为"类似数组的对象"，即为伪数组。
         *    const obj = {0: 'a',1: 'b',2: 'c',length: 3}
         *    例如对象obj就是一个类似数组的对象，但它不是真正的数组，因为它不具备数据特有的方法
         * 
         * (2)有哪些是伪数组
         *    函数的arguments对象，大多数dom元素集，还有字符串 
         * 
         * (3)转化为真数组
         *    一：数组的slice方法可以将"类似数组的对象"变成真正的数组
         *    二：array.form 
         *    三：拓展运算符(...)可以将某些数据结构转化为数组，但是需要注意的是，如果这个对象没有部署遍历器接口，使用拓展运算符是无法
         *        将类似数组对象转换为数组的
         * 
         * (4)array.from() 用法
         *    它接收3个参数,第一个参数为必填项(你想要转换的类似数组对象和可遍历对象),第二个参数类似于数组的map
         *    它用来对每个元素进行处理，将处理后的值放入返回的数组中
         *    第三个参数context，绑定map中用到的this
         * 
         * (5)array.of() 将一系列值转化为数组
         *    array.of方法钟会创建一个包含所有传入参数的数组，而不管参数的数量与类型
         */
    }

    public restTest = (...rest: number[]) => {
        // const str: string = 'hello kisure';
        console.log('拓展运算符：', [...rest]);
        const all: number[] = [1, ...[2, 3], 4, ...[5], 6, 7];
        console.log('拓展运算符拼合数组：', all);
        /** 
         * (1) 剩余参数rest
         *     使用rest，你只要在js函数的最后一个参数前添加三个点...即可。当rest参数是函数唯一参数时，它就代表了传递给这个函数的所有参数
         *     它起到了和 [].slice.call(arguments)一样的效果，而你也不再需要将arguments进行转换了
         * 
         * (2) 拓展运算符
         *     拓展运算符可以把任意可枚举对象转换为数组，使用拓展运算符可以高效处理目标对象，在拓展目前前添加...就可以使用拓展运算符了
         */
    }

    public callTest = () => {
        const eat = function(x: number, y: number) {
            console.log('eat方法：', x+y);
        };

        const drink = function(x: number, y: number) {
            console.log('drink方法：', x-y);
        };

        eat.call(drink, 2, 3);
        // 上面这句意思是：使用eat方法来代替drink方法运行，也就是说：eat.call(drink, 2, 3) 等同于 eat(3,2);

        /** 
         * call, apply, bind是function对象自带的三个方法，这三个方法主要的作用是改变函数中的this指向
         * 
         * (1)call
         *    调用一个对象的方法，以另一个对象替换当前对象
         *    call方法  
         * 
         *          function Animal(){   
         *              this.name="animal";   
         *              this.showName=function(){   
         *                  console.log(this.name);   
         *              }   
         *          }
         *    
         *          function Dog(){   
         *              this.name="dog";   
         *          }   
         * 
         *          var animal=new Animal();   
         *          var dog=new Dog();       
         *
         *          animal.showName.call(dog); 
         *          // 这句话的意思是：把animal的方法放到dog上执行  
         * 
         *          function Animal() {
         *              this.name = name;
         *              this.showName = function() {
         *                  console.log(this.name);
         *              }
         *          }
         *      
         *          function Dog() {
         *              Animal.call(this, name);
         *              // 这句话的意思是：使用Animal对象代替this对象，那么Dog就能直接调用Animal的所有属性和方法了
         *          }
         * 
         *          var dog = new Dog('Crazy dog');
         *          dog.showName();
         * 
         * (2)apply
         *     call和apply的作用完全一样，只是接受的参数方式不一样
         *     
         *     function class1(args1,args2) {
         *         this.name = function() {
         *             console.log(args,args);
         *         }
         *     }
         * 
         *     function class2() {
         *         var args1="1";
         *         var args2="2";
         * 
         *         class1.call(this,args1,args2);
         *         class1.apply(this,[args1,args2]);
         *     }
         * 
         *     call需要把参数按照顺序传递进去，而apply则是把参数放到数组里
         * 
         * (3)bind
         *      bind也是可以改变函数体内this的指向
         *      但是bind方法会创建一个新的函数，也称为绑定函数，当调用这个绑定函数的时候，绑定函数会以创建它时传入bind()方法的第一个参数作为this。
         *      传入 bind() 方法的第二个以及以后的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数
         * 
         *      这里需要注意的是：
         *      var bar = function(){
         *          console.log(this.x);
         *      }
         * 
         *      var foo = { x:3 };
         *      var sed = { x:4 };
         *      var fiv = { x:5 };
         *      var func = bar.bind(foo).bind(sed).bind(fiv);
         *      func(); // 3
         *      原因：多次bind()是无效的，因为bind()的实现，相当于使用函数在内部包了一个call/apply，第二次bind()相当于再次包住第一次bind()，
         *      所以第二次以后的bind是无法生效的
         */

        /** 
         * 总结：
         * apply 、 call 、bind 三者都是用来改变函数的this对象的指向的；
         * apply 、 call 、bind 三者第一个参数都是this要指向的对象，也就是想指定的上下文；
         * apply 、 call 、bind 三者都可以利用后续参数传参；
         * bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用 。
         */
    }

    public iteratorTest = () => {
        // js表示集合的数据结构: Array, Object, Map, Set
        // 用户还可以组合使用它们，定义自己的数据结构，比如数组的成员是Map，Map的成员是对象。这样就需要一种统一的接口机制，来处理所有不同的数据结构。
        // 遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制
        // 任何数据结构只要部署Iterator接口，就可以完成遍历操作

        /** 
         * 遍历器的作用：
         * (1)为各种数据结构，提供一个统一的，简便的访问接口
         * (2)使得数据结构的成员能够按照某种次序排列
         * (3)ES6创造了一种新的遍历命令 for...of 循环，iterator接口主要提供for...of消费
         * 
         * iterator的便利过程是这样的：
         * (1)创建一个指针对象，指向当前数据结构的其实位置。也就是说遍历器本质上就是一个指针对象
         * (2)第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员
         * (3)第二次调用指针对象的next方法，指针就指向数据结构的第二个成员
         * (4)....
         */
    }

    public forOfTest = () => {
        const arr: any[] = [
            { name: 'a', value: '1a' },
            { name: 'b', value: '2b' },
            { name: 'c', value: '3c' },
            { name: 'd', value: '4d' }
        ];

        for(const key in arr) {
            console.log('for...in方法遍历：', `key:${key}，值：${arr[key]['value']}`);
            // 当arr为数组的时候，key其实是arr的index值，所以这就是for...in 的缺点
        }

        for(const key of arr) {
            console.log('for...of方法遍历：',`key:${key['name']}，值：${key['value']}`); 
            // 使用for...of 循环允许遍历数组获得键值  
        }

        const arr_two = [3, 5, 7];
        // arr_two.foo = 'hello';
        for (const i in arr_two) {
            console.log('for...in方法遍历：', i); // "0", "1", "2", "foo"
        }

        for (const i of arr_two) {
            console.log('for...of方法遍历只返回具有数字索引的值：', i); // "3", "5", "7"
            // 使用for...of 循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的值
        }

        // 这里需要注意的是，for...of 是不能直接便利普通对象的，因为普通对象是没有iterator接口的，只有部署了iterator接口的
        // 普通对象才能使用

        /** 
         * for...of 有哪些显著的优点呢
         * (1)有着同for...in 一样简洁语法，但是没有for...in的那些缺点
         *      for...in 实际上遍历的是对象的属性名字，一个array数组也是一个对象，数组中的每个元素的index被视为属性名称，所以我们可以看到for...in 循环array数组时
         *      拿到的其实是每个元素的索引
         * (2)不同于 forEach 方法，它可以与 break、continue 和 return 配合使用
         * (3)提供了遍历所有数据结构的统一操作接口
         */
    }

    public destruction = () => {
        const arr: number[] = [1,2,3];
        const [x,y,m,n] = [...arr,4];
        console.log('数组解构赋值一：', x, y, m, n);
        const [x1,x2 = (()=> { console.log('解构赋值，只有当右侧的变量为undefined的时候才会使用默认值') })()] = [1,undefined];
        console.log('数组解构赋值二：', x1, x2);
        const [,,m2] = [1,2,3]; // 省略赋值
        console.log('数组解构赋值三(省略赋值)：', m2);

        const obj = { name: 'kisure', age: '25' };
        const { name, age=100 } = obj;
        console.log('对象解构赋值：', name, age);

        // let k1: any;
        // let k2: any;
        // {k1,k2} = {k1: 2, k2:3};   {k1,k2}这样的写法是错的，因为大括号放在行首，代表的是块级作用域，所以不能给块级作用域赋值的
        // 所以需要用括号把它括起来：({k1,k2} = {k1: 2, k2:3})

        // const [x3,y3] = 'kisure';
        // console.log('其他解构赋值：', x3, y3); // k,i  
        // 如果放在传统js中，这里是可以赋值的，如果左侧的是数组，等号右边不是一个数组，就会默认将其转化为类数组

        // const [x3,y3] = 1;   这里会报错，因为1不是类数组，类数组需要包含属性length

        /** 
         * 解构赋值
         */
    }

    public arrayTest = () => {
        console.log('array方法(copyWithin)：', [1,2,3,4,5].copyWithin(0,2,4)); // [3,4,3,4,5]
        // 这句话的意思是：从index为0开始替换数据，而替换的数据来自于数组index为2到index为4(不包括4)之间的数据

        console.log('array方法(copyWithin)：', [1,2,3,4,5].copyWithin(0,-2,-1)); // [4,2,3,4,5]
        // 如果为负数，-2代表的是倒数第二个，-1代表倒数第一个

        console.log('array方法(copyWithin)：', [1,2,3,4,5].copyWithin(0,2)); // [3,4,5,4,5]
        // 如果end没有值，那么默认取到最后
        // 需要注意的是，如果有超出部分，就会自动截取（数组的长度永远保持不变）

        /** 
         * 数组实例copyWithin方法
         * 语法：Array.prototype.copyWithin(target, start = 0, end = this.length)
         * start如果为负数，则表示倒数
         * end如果是为负数，则表示倒数
         */

        console.log('array方法(fill)：', ['1',2,3,4,5].fill('kisure',2,4));
        // 字符串填充

        /** 
         * fill方法  按指定字符串填充数组
         * 语法：Array.prototype.fill(string, start = 0, end = this.length);
         */

        // const arr = ['a', 'b', 'c', 'd'];
        // for(const index of arr.keys()) {
        //     console.log('使用for...of循环遍历键名：', index);

                // 使用for...of循环遍历键名： 0
                // 使用for...of循环遍历键名： 1
                // 使用for...of循环遍历键名： 2
                // 使用for...of循环遍历键名： 3
        // }

        // for(const value of arr.values()) {
        //     console.log('使用for...of循环遍历键名：', value);

                // 使用for...of循环遍历键名： a
                // 使用for...of循环遍历键名： b
                // 使用for...of循环遍历键名： c
                // 使用for...of循环遍历键名： d
        // }

        // for(const entry of arr.entries()) {
        //     console.log('使用for...of循环遍历键值对：', value);

                // 使用for...of循环遍历键值对： (2) [0, "a"]
                // 使用for...of循环遍历键值对： (2) [1, "b"]
                // 使用for...of循环遍历键值对： (2) [2, "c"]
                // 使用for...of循环遍历键值对： (2) [3, "d"]
        // }
        /** 
         * keys()   对键名的遍历
         * entries()   对键值对的遍历    
         * values()    对键值的遍历
         * 以上三种方法，都可以使用for...of循环进行遍历
         */
    }

    public setTest = () => {
        // 类似数组 只有value 没有键key
        // 通过构造函数方式创建一个Set实例
        // 参数是一个数组（或者是类似数组）（只要有iterator）
        // 存在iterable接口的： Array, Set, Map, string, 元素集合, arguments
        // 会默认去重

        const setVal: Set<number | string> = new Set([1,2,3,4,5]);
        console.log('new一个Set对象', setVal);
        console.log('使用set对象add方法添加数据', setVal.add('kisure'), setVal);
        // Set完成add()方法以后，会返回修改后的值，也就是说我们可以进行链式结构，操作如下：
        setVal.add('hello').add('yes');
        console.log('Set使用add方法进行链式添加数据', setVal);
        console.log('Set使用delete方法进行删除其组员，结果返回一个bool值，成功返回true，失败返回false', `当前删除结果：${setVal.delete('yes')}`, setVal);
        // clear 清空 没有返回值，也不需要参数
        console.log('Set使用clear方法进行清空所有数据', setVal.clear(), `此时的数据为：${setVal}`);
        setVal.add(1).add('kisure').add('right');
        console.log('Set使用has方法判断是否存在某一项数据', setVal.has('kisure'));

        const setVal_two: Set<any> = new Set([1,2,3,'kisure', 'good', true, NaN]);
        setVal_two.forEach((item, index, input) => {
            console.log(`
                使用set进行forEach循环数据,
                // Set实例只有value没有key
                // item,index都是当前项
                // input是当前set实例(setVal_two)
                item:${item},
                index:${index},
                input:${input}`
            );
        });

        // for (const key of setVal_two.keys()) {
        //     console.log(key);

                // 1 2 3 kisure good true NaN
                // 所以set数据结构只有值，没有key，key就是value
        // }

        // for (const key of setVal_two.values()) {
        //     console.log(key);

                // 1 2 3 kisure good true NaN
        // }
        

        /*
            -------------------------------数组去重------------------------------------
            const arrNum: number[] = [1,2,1,2,1,2,3,4,5,6,7,3,9];
            const formatVal: number[] = [...new Set(arrNum)];
            console.log('使用[...new Set([.....])]方法可以进行数组去重', formatVal);
            或者可以使用Array.from()
            console.log(Array.from(new Set(arrNum)));
        */

        /*
            -------------------------------总结------------------------------------
            数据结构Set  它类似于数组，但是它的成员是唯一的，没有重复的值
            add     添加项目,添加完成返回实例对象，所以可以进行链式方法： setObj.add(...).add(...).add(...)
            delete  删除某一项，成功返回true，失败返回false
            clear   清除所有项
            has     判断是否存在某一项，存在返回true，不存在返回false
        */
    }

    public mapTest = () => {
        // 构造函数方式创建一个Map实例
        // new Map([[key, value],[key, value]])
        // 参数是一个数组，数组的每一项也是一个数组，格式是key，value
        // 一个对象，属性名必须是字符串，如果你写的不是字符串，也会默认为字符串

        const map_one: Map<number, string> = new Map([[1, 'kisure',],[2, 'tang'], [2, 'hello']]);
        // 如果定义了相同的属性名字，那么后者的值就会替代前者的值
        console.log(`使用new Map进行创建一个Map类型的数据结构：${map_one}`);
        console.log(`使用Map结构中的get来获取数据`, map_one.get(1));
        // Map数据结构中get(key)的方式来获取value值
        console.log(`使用Map结构中的set来获取数据`, map_one.set(1,'hahahahahahahah'), map_one.set(8,'8888hahahahahahahah'));
        // Map数据结构中set(key, value)的方式来设置某一项的值
        // 如果set(key, value)中的key是不存在的，那么就相当于添加数据
        console.log(`查看使用Map的set方法设置值以后的实例对象的值`, map_one);
        console.log(`使用Map结构中的has来判断key有没有对应的值`, map_one.has(1));
        console.log(`使用Map结构中的delete来删除属性key`, map_one.delete(1), `删除后的Map结构：${map_one}`);

        map_one.forEach((value, key, input) => {
            console.log(`Map结构使用forEach循环，当前值value:${value}`);
            console.log(`Map结构使用forEach循环，当前值key:${key}`);
            console.log(`Map结构使用forEach循环，当前值input:${input}`);
        });

        // 将数组变成Map结构
        // const arr_one = ['one', 'two', 'three', 'four'];
        // const map_two = new Map();
        // for (const [index, value] of arr_one.entries()) {
        //     console.log('index:', index);
        //     console.log('value:', value);
        //     map_two.set(index, value);
        // }

        /* 
            -------------------------------总结------------------------------------
            set     添加数据或者修改数据    如果第一个参数(key)在Map实例中是不存在的，那么就会添加新的数据，如果是存在的key，那么就会覆盖原先的值
            get     获取数据
            has     判断是否存在某个key
            delete  删除某个key
        */
    }

    public proxyTest = () => {
        // proxy 对默认操作的拦截/改写
        // new Proxy({目标对象target}, {拦截的方法})

        const obj = { name: 'kisure', age: '25' };
        const proxy_one = new Proxy(obj, {
            // 让proxy_one代理obj 需要通过proxy_one去操作代理obj
            get(target, key, proxy) {
                // 三个参数：target(目标对象，这里指的是obj)   key(属性的名字)   proxy(实例，这里指的是proxy_one)
                console.log('这个是get拦截');
                // 这里需要写return,return什么就会获取什么，如果不写return那么就会获取到undefined
                return target[key];
            },
            // get: 只要是获取，就会触发get     例如： proxy_one.name 就会触发get
            set(target, propKey, value, receiver) {
                // target：目标对象
                // propKey: 你所要设置的属性名
                // value: 设置的属性值
                // receiver：实例对象
                // 这里需要注意的是，set里面最后需要返回一个bool值， return true代表的是设置成功，return false代表的是设置失败
                console.log('set被触发');
                target[propKey] = value;
                return true;
            },
            has(target, propKey: string) {
                // target：目标对象
                // propKey：目标对象的属性名字
                // has的作用就是拦截 propKey in proxy的操作，最后返回一个布尔值
                console.log('has被触发');
                if (propKey.startsWith('_')) {
                    // 如果属性以下划线为开头，那么就返回false
                    return false;
                }

                return propKey in target;
            },
        });
        console.log(proxy_one.name);    // 这一步会触发代理中的get方法
        proxy_one.name = 'right';       // 这一步是修改某个属性的值，就会触发set
        console.log(`在修改name属性值以后，触发set方法后，name的值为：${proxy_one.name}`);
        console.log(`使用propKey in proxy，触发has方法`, '_name' in proxy_one);

        const func = (params?: any) => {
            console.log(`propxy代理function，合并后的值：`, {...{name: 'hello kisure'}, ...params})
            return {...{name: 'hello kisure'}, ...params};
        };
        const proxy_two = new Proxy(func, {
            apply(target, object, args) {
                // 只要是：function的直接执行，call/apply/bind()() 执行都会触发apply
                // args：函数的执行参数
                // object：给函数修改this的
                console.log(`触发apply,对应的值，target:${target},object:${object},args:${args}`);

                if (object) {
                    object.fn = target;
                    object.fn(...args); 
                    delete object.fn;
                } else {
                    target(...args); 
                }
            }
        });
        proxy_two();
        const d = {name: 'nice niec', age: '12306'};
        proxy_two.call(d, d);
    }

    public constructorTest = () => {
        //  传统构造函数
        // function Person(name, age) {
        //     this.name = name;
        //     this.age = age;
        // }

        // Person.prototype.skill = () => {
        //     console.log('学习');
        // }

        // Es6中构造函数
        class Person {
            name: string;

            constructor(name: string) { // 此处的constructor相当于传统构造函数的Person
                // class本身的函数
                // this：指向当前的实例
                this.name = name;  // 增加私有属性
            }
        }

        const he = new Person('kisure');
        console.log(`使用es6构造函数class：${he.name}`);

        // Es6中的class必须使用new去执行，否则，直接运行Person()会直接报错

        const Test = class DemoClass {
            constructor() {
                console.log(`class的名字是：`,Test.name);
            }
        }
        new Test();

        /*
            -------------------------------总结------------------------------------
            constructor是类的默认方法，通过new命令生成实例，自动调用该方法
            constructor方法会默认返回实例对象（即this），它可以指定返回另外一个对象
            class必须使用new调用，否则会报错，这与传统构造函数存在区别.
        */
    }

    public classQuestionTest = () => {
        // class的执行问题
        // 关于变量提升
        // FF();                   // 这一步是可以的，因为function会变量提升
        // function FF() {
            
        // }
    }

    public promiseTest = () => {
        const pro = new Promise((resolve, reject) => {
            if (Math.random() > 0.5)
                resolve(`ES6 promise 根据随机小数来判断成功失败，这里是成功`);
            else
                reject(`ES6 promise 根据随机小数来判断成功失败，这里是失败`);
        });

        // pro.then((success) => {
        //     console.log(success);
        // }, (error) => {
        //     console.log(error);
        // });
        // 这是第一种写法

        pro.then((success) => {
            console.log(success);
        }).catch((error) => {
            console.log(error);
            /* 
                由catch来捕获错误信息，如果new promise中存在错误那么就会被捕获，如果then中的回调出现错误，那么也会被捕获
            */
        });
        
    }

    public asyncTest = () => {
        const pro = new Promise((resolve, reject) => {
            resolve('kisure');
        });

        async function funcA() {
            // await 后面是一个promise的实例，如果不是也会默认转化为promise
            // await 会直接让promise实例的回调执行，返回执行的参数(这里指的是resolve('kisure')中的kisure)
            // await 可以认为它是一个语法糖，不用通过then就可以拿到resolve或者是reject的参数
            const value = await pro;
            return value;
        }

        funcA().then((res: any) => {
            console.log(`这是一个async函数，这里是成功：${res}`);
        })
        .catch((error) => {
            console.log(`这是一个async函数，这里是失败：${error}`);
        });

        /* 
            -------------------------------总结------------------------------------
            async函数默认会返回Promise对象，所以执行这个函数以后，就可以使用then或者catch
        */
    }

    public render() {
        return <div>
            ES6 BaseJs One
        </div>
    }  
}

/** 
 * 存在问题
 * (1)typescript 中Set<number | string> 的<number | string>的意思。
 */