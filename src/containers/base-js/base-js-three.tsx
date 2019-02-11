import * as React from 'react';

export default class BaseJsThree extends React.PureComponent<any, any> {
    constructor(public props: any) {
        super(props);

        this.substrAndSubstringAndSliceTest();
        this.generatorTest();
        this.awaitAsyncTest();
    }

    public substrAndSubstringAndSliceTest = () => {
        const str: string = '123sajfsdjf';
        console.log(`使用substr,返回从目标字符串中截取的字符串(该方法不会改变原数据)：${str.substr(3)},原数据的值：${str}`);
        console.log(`使用substring,返回从目标字符串中截取的字符串(该方法不会改变原数据)：${str.substring(3)},原数据：${str}`);
        console.log(`使用slice,返回从目标字符串中截取的字符串(该方法不会改变原数据): ${str.slice(3,5)},原数据：${str}`);
        
        /*
            -------------------------------总结------------------------------------
            substr
            - stringObj.substr(index, length)
                index: 从哪个地方开始截取
                length: 截取字符串的长度
            - 不修改原字符串

            substring
            - stringObj.substring(start, end)
                start: 从哪个地方开始截取
                end：(可选参数)，结束位置
                如果start比end大，那么方法在执行前会先交换这两个参数
            - 不修改原字符串

            slice
            - stringObj.slice(start, end)
                start：从哪个地方开始截取
                end：(可选参数)，结束位置
                如果start比end大，那么方法在执行前会先交换这两个参数
            - 截取从下标start 到下标stop（不包括该元素）的之间的元素，并返回新数组/新字符串，并不修改原数组/原字符串

            三者区别在于：substring是不接受负参数的
        */
    }

    /* 
        注意：
        (1) slice可操作数组和字符串
        (2) substring和substr只能操作字符串
        (3) splice只能操作数组
    */

    public generatorTest = () => {
        /* 
            没有generator之前的黑暗时代
            - ajax('...', data, function(err, success) {
                if(success) {
                    ajax('...', data, function(err, success) {
                        if(success) {
                            ajax('...', data, function(err, success) {
                                
                            })
                        } else
                            handle(err);
                    })
                } else
                    handle(err);
            });

            有了generator的美好时代
            - try {
                r1 = yield ajax('http://url-1', data1);
                r2 = yield ajax('http://url-2', data2);
                r3 = yield ajax('http://url-3', data3);   
                
                success(r3);
              }
              catch(err) {
                handle(err);
              }
        */

        /* 
            写一个没有闭包的自增函数
            function* next_id(){
                let i = 0;
                do {
                    i++
                    yield i;
                } while(i>-1)
            }

            const id_next = next_id();
            id_next.next();             // {value: 1, done: false}
            id_next.next();             // {value: 2, done: false}
            id_next.next();             // {value: 3, done: false}
        */

        /* 
            -------------------------------总结------------------------------------
            Generator
            - Generator是什么?
                是一个生成器，也是一个状态机，内部拥有值及相关的状态，生成器返回一个迭代器Iterator对象
                我们可以通过这个迭代器，手动遍历相关的值，状态，保证正确的执行顺序
            - 怎么使用
                生成器函数的语法为function*,在其函数体内部可以使用yield和yield*关键字
                生成器函数和普通的函数不同，它可以交出函数的执行权(也就是暂停执行)。
                yield代表的就是暂停标志
            - 遍历器对象的next方法运行如下
                (1)遇到yield表达式，就暂停执行，并紧跟着在yield后面的那个表达式的值，作为返回的对象的value属性值
                (2)下一次调用next方法时，在继续往下执行，直到遇到下一个yield表达式
                (3)如果没有再遇到新的yield表达式，就一直运行到函数结束直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值
                (4)如果该函数没有return语句，则返回的对象的value属性值为undefined

            yield
            - yield* 
                如果yield表达式后面跟着的是一个遍历器对象，需要在yield表达式后面加上*，表明它返回的是一个遍历器对象
        */
    }

    public awaitAsyncTest = () => {
        /* 
            -------------------------------总结------------------------------------
            异步函数
            - async函数属于ES7，async函数可以说是目前异步操作最好的解决方案，是对Generator函数的升级和改进。

            async和await在干什么
            - async用于声明一个function是异步的
              await用于等待一个异步方法执行完成
              需要注意的是await只能出现在async函数中
          
            async起的作用
            - async输出的是一个promise，也就是说async函数返回的是一个promise对象

            await是什么
            - await 是个运算符，用于组成表达式，await 表达式的运算结果取决于它等的东西
              
            await在async中起什么作用
            - 问题：如果async函数中，如果写入的是普通函数，那么也就意味着内部是没有等待的，那么也就是和
                    普通的promise没有什么区别
              所以，这个时候await出来了，它的作用就是等待。
            
            await在等什么
            - await等待的是一个表达式，而这个表达式的计算结果是promise对象或者其他值
                await可以等待：(1)async函数 (2)普通的表达式 (3)直接量 (4)promise对象

            await等到了想要的，然后呢?
            - await如果等到的是一个promise对象，那么await就会忙起来，于是await就会阻塞后面的代码。等着promise对象resolve
                然后得到resolve的值，作为await表达式的运算结果

            需要注意的地方：
            - await命令后面如果跟上的是一个promise对象，所以存在运行的结果是rejected
                所以最好吧await命令放在try...catch代码块中或者使用catch方法

                (1)try...catch方法
                    async function func() {
                        try{
                            await somethingThatReturnsAPromise();
                        } catch(err) {
                            return err;
                        }
                    }

                    func().then((res) => {
                        console.log(res);
                    });

                (2)catch方法
                    
        */
    }

    public render() {
        return <div>
                ES6/ES5 BaseJs Three
            </div>
    }
}

// 1.关于变量提升