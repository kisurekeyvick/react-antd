import * as React from 'react';

export default class BaseJsTwo extends React.PureComponent<any, any> {
    constructor(public props: any) {
        super(props);

        this.gorgeousDividingLine(`js基础知识(2)`)
        this.slice_splice_Test();
        this.generatorTest();
        this.breakContinueTest();
        this.whileTest();
        this.thisTest();
        this.extensionTest();
        this.returnTest();
        this.constructorTest();
        this.garbageCollectionTest();
        this.objectTest();
    }

    public gorgeousDividingLine = (str: string) => {
        console.log(`-------------------------华丽分割线---------------------------`);
        console.log(`-------------------------华丽分割线---------------------------`);
        console.log(`-------------------------${str}------------------------------`);
        console.log(`-------------------------华丽分割线---------------------------`);
        console.log(`-------------------------华丽分割线---------------------------`);
    }

    public slice_splice_Test = () => {
        const arr: Array<string | number> = ['1', '2', '3', 4, 6, 7];
        console.log(`使用slice方法截取下标为0-3的元素：${arr.slice(0,3)}`);
        console.log(`slice方法不会改变原数组，原数组的值为: ${arr}`);

        const arr_splice: Array<string | number> = ['1', '2', '3', 4, 6, 7];
        console.log(`使用splice方法截取下标为0-3的元素，并且添加'kiusre'字符串: ${arr_splice.splice(0,3,'kisure')}`);
        console.log(`使用splice方法会影响到原数组，目前原数组的值为：${arr_splice}`);

        const arr_splice_two: Array<string | number> = ['1', '2', '3', 4, 6, 7];
        arr_splice_two.splice(1, 0, '666');
        console.log(`不删除数组中的数据，而是插入数据：${arr_splice_two}`);
        // 指定要添加的数据会在开始index之前插入

        /* 
            -------------------------------总结------------------------------------
            slice()
            - 可以用来从数组中提取指定的元素
            - 该方法不会改变原数组，而是将截取到的元素封装到一个新数组中，然后返回出来
            - 参数：
                1.截取开始的index
                2.截取结束的index   当然结束的index可以不写
                    - 如果传递的index是负数，例如：-1，那么代表的树这个数组的倒数第一个
            - 语法： ArrayObj.slice(start, end)
        */
        /* 
            splice()
            - 可以用于删除数组中的制定元素，并添加新的元素
            - 使用splice() 会影响到原数组，会将制定元素从原数组中删除，并且会将删除掉的元素作为返回值返回
            - 参数：
                1.表示开始位置的index
                2.表示删除的数量        如果为0，那么就是不删除的意思
                3.第三个参数及以后的参数，会自动的插入到开始位置index前边
        */
    }

    public generatorTest = () => {
        function *say(): any {
            console.log('你好，这是一个generator函数(console的开始),执行这一步，需要使用generator函数产生对象中的方法next()才能执行到此处');
            yield;  // 你可以把yield理解为放弃函数的执行权利
            console.log('你好，这是一个generator函数(console的结束),执行这一步，需要使用generator函数产生对象中的方法next()才能执行到此处');
        }

        const say_generator =  say();
        say_generator.next();
        say_generator.next();

        /* 
            -------------------------------总结------------------------------------
            普通的函数会一路指定到底
            generator函数能够在执行到一半的时候，暂停

            generator函数有3种写法： 
            - function* say() {}
              function * say() {}
              function *say() {}
            - 运行generator函数时候，它不会直接执行函数中的代码，而是创建了一个generator对象

            理解：
            - 粗俗的理解为：踢一下走一下，使用.next()执行以后，碰到yield，就会暂停
            
            原理(粗略的实现方式)：
            - *say()这个generator函数会被分解为 function1，function2
              function1是用来执行第一个console.log，而function2是用来执行第二个console.log
        */

        function *speak(): any {
            console.log(`探究yield, 这里console值： a`);
            const param = yield;
            console.log(`探究yield, 这里console值： b`);
            console.log(`通过next()可以传入参数，这个参数会赋值给yield,所以这个值为;${param}`);
        }

        const gen = speak();
        gen.next(10);
        gen.next(5);

        /* 
            -------------------------------总结------------------------------------
            yield 传参
            - next中传入的参数，会来到yield里面，然后接受参数的方式：const param = yield;
            yield*
            - 如果在generator函数内部，调用另一个generator函数，默认情况下是没有效果的，所以需要用到yield*
              例如：
                    function* foo() {
                        yield 'a';
                        yield 'b';
                    }

                    function* bar() {
                        yield 'x';
                        yield* foo();   // 如果不用yield* 而是使用yield，那么就会返回一个遍历器
                        yield 'y';
                    }
              从语法角度上理解：如果yield表达式后面跟的是一个遍历器对象，那么需要在yield表达式后面加上"*",以此表明它返回的是一个遍历器对象
        */
    }

    public breakContinueTest = () => {
        outer:
        for(let i =0; i<5; i++) {
            console.log(`@这是一个外层的循环,当前索引值为:${i}`);
            for(let j =0; j<5; j++) {
                if (j === 4) {
                    break outer;
                }
                console.log(`这是一个内层的循环,当前索引值为:${i}`);
            }
        }

        /* 
            -------------------------------总结------------------------------------
            break
            - break关键字可以退出switch或者循环语句(循环语句包括：while, do while, for)
            - break只会对离它最近的循环产生影响

            可以为一个循环语句创建一个label，来标识当前的循环
            - 语法：
                label: 循环语句
            - 使用：
                使用break的时候，后面跟上你所要break的循环标识，这样break终止的循环就不是最近的，而是你指定的循环
        */

        outer_continue:
        for(let i =0; i<5; i++) {
            for(let j =0; j<5; j++) {
                if(i === 2) {
                    continue outer_continue;
                }

                console.log(`内层continue测试，当前index:${j}`);
            }

            console.log(`for循环中使用continue，当满足条件i===2的时候，会跳过当次循环,当前循环i的值为${i}`);
        }

        /* 
            -------------------------------总结------------------------------------
            continue
            - continue关键字只能作用于循环
            - continue用于跳过当次循环
            - continue默认只会对离它最近的循环起作用 
            - 和break一样，continue也可以通过循环的标识，来跳过当次你指定的循环
        */

        /*
            程序执行之前，添加计时器
            - console.time('计时器的名字');   可以用来开始一个计时器
            - console.timeEnd('kisure');    可以用来结束一个计时器
        */
    }

    public whileTest = () => {
        const num: number[] = [];

        while(true) {
            if (num.length === 10) {
                break;
            } else {
                const value: number = (num[num.length -1]+1) || 1;
                num.push(value);
            }

            console.log(`使用while循环，往数组中添加数据，当前数组的值为:${num}`);
        }

        /* 
            -------------------------------总结------------------------------------
            while语句
            - 语法：
                while(条件表达式) {
                    // 大括号内部叫做循环体
                }
            - while语句在执行时
                先对表达式求值，进行判断，如果值为true，则执行循环体
                循环体执行完毕以后，继续对表达式进行判断，以此类推
                如果值为false，那么就会终止循环
            - 终止循环
                (1)可以使用break来终止
                (2)在while()中写入判断 

            do...while循环
            - 语法：
                do {
                    ....语句
                } while (条件表达式 )
            - 执行流程：
                do...while语句在执行时，会率先执行循环体
                循环执行完毕以后，再对while后的表达式进行判断
                如果为true，则继续执行循环体，执行完毕继续判断依次类推
                如果为false，则终止循环

            两者之间区别在于：do...while 可以保证循环至少执行一次
        */
    }

    public thisTest = () => {
        // const name: string = 'kisure';
        // const obj = {
        //     name: 'hello',
	    //     sayName
        // };
        // function sayName() {
        //     console.log(this.name);
        // }

        // sayName();
        // obj.sayName();

        /* 
            -------------------------------总结------------------------------------
            解析器在调用function时候，每次都会向函数内部传递进一个隐含的参数
            这个隐含的参数就是this
            - this
                this其实是一个参数，只不过是浏览器传入进来的，this指向的是一个对象
                这个对象我们称之为函数执行的上下文对象
                根据函数调用方式的不同，this会指向不同的对象
                - 1.以函数的形式调用时，this永远指向的是window
                  2.以方法的形式调用时，this就是调用方法的那个对象
        */
    }

    public extensionTest = () => {
        const arr: number[] = [2,5,6,34,23,78,45];
        const max: number = Math.max(...arr);
        const max_method_two: number = Math.max.apply(null,arr);
        console.log(`使用Math.max来算出当前数组中的最大值：${max}`);
        console.log(`使用Math.max.apply(null,arr)来算出当前数组中的最大值：${max_method_two}`);

        const obj = {
            fun: function() {
                const f = () => {
                    console.log(`这里使用箭头函数做测试，当前的this指向的是obj：${this}`);
                    console.log(`箭头函数是没有arguments的`);
                }

                f();
            }
        };

        obj.fun();

        /* 
            箭头函数
            - 箭头函数都是匿名函数
                1.箭头函数是没有this指向的，箭头函数中的this来自于它的上一级的作用域下的this
                2.箭头函数是没有arguments
                3.箭头函数是不可以用作构造函数，因为不可以使用new执行
        */

        // 《案例1：》
        // console.log(num);   // undefined
        // console.log(getNum);    // function getNum(){...}
        // var num: number = 1;
        // function getNum() {
        //     console.log(num);
        // }
        // console.log(num);
        // const num: number = 1;

        // 《案例2：》
        // if (0) {
        //      console.log(getNum);
        //     var a = 1;
        //     function getNum() {}
        // }
        // console.log(a);
        // console.log(getNum);

        /* 
            -------------------------------总结------------------------------------
            在if(){}中的函数只会提前声明，不会定义。
            当条件成立的时候，会先给函数赋值，代码再执行。
        */

        // 《案例3》
        // const list:any = document.querySelector('li');   //假设list存在5个
        // for(var i = 0; i< list.length; i++) {
        //     list[i].onclick = function() {
        //         alert(i);    
        //     }
        // }
        // console.log(i)   // console.log出的值为4

        /* 
            -------------------------------总结------------------------------------
            - console出的结果为4，点击每一项li，都会弹出4，因为这个i是循环以后的结果
            - onclick绑定事件是一个异步的过程，因为当li上的点击事件属于人为的，有可能点击有可能不点击。如果onclick不属于异步事件的话
                代码永远会停留在循环中。当我们点击触发这个onclick事件的时候，拿到的这个i是我们循环结束以后产生的i(此时的i为4)
                之所以i会变成4，是因为你用var来声明变量，所以这个i其实是全局的
            - 如果使用let来声明变量i，那么在{}块级作用域下，这个属性时属于这个作用域下的私有属性。点击li的时候，每一个弹框事件都是
                找私有的变量。
        */

        /* 
            -------------------------------总结------------------------------------
            - var只会提前声明
              function会提前声明，并且定义
            - 使用let和const声明的变量，是没有变量提升的
            - 使用let和const声明的变量，不可以重复声明
            - 使用let和const声明的变量，不会给window增加属性
            - const声明的变量，一旦声明，必须赋值。并且它是一个常量，不可以重新赋值
            - ES5中只有全局作用域和私有作用域(函数作用域)，ES6额外提供了块级作用域
            - 一个{}就是一个块级作用域
              花括号如果想表示一个对象，是不可以放在行首的。如果放在行首，会被认为是块级作用域
        */
    }

    public returnTest = () => {
        function sum(...regs: number[]): number {
            return regs.reduce((total: number, current: number) => {
                return total + current;
            }, 0);
        }

        console.log(`return值返回： ${sum(1,2,3,4,5)}`);

        /* 
            -------------------------------总结------------------------------------
            return 返回的结果就是function的执行结果
        */
    }

    public constructorTest = () => {
        // function Person (name, age) {
        //     this.name = name;
        //     this.age = age;
        //     this.speak = function() {
        //         console.log('hello');
        //     }
        // }

        // const me = new Person('kisure', 25);
        // console.log(me instanceof Person);  // true
        // console.log(me instanceof Object);   // true
        // 这是因为，所有的对象都是Object的发展下来的

        /* 
            -------------------------------总结------------------------------------
            有一点需要注意的是在构造函数中 speak方法是每一次被实例化的时候，都会被重新创建
            这样导致的问题就是，构造函数执行一次，就会执行一次创建新的方法
            如果创建1W次，那么这1W个方法都是一模一样的功能(虽然功能一样，但是位于不同的实例中)

            原型prototype
            - 我们所创建的每一个函数，解析器都会向函数中添加一个属性prototype
              这个属性对应着一个对象，这个对象就是我们所谓的原型对象
            - 如果我们把函数作为普通函数调用，那么它的prototype是没有任何的作用
            - 如果这个函数以构造函数形式调用，它所创建的对象中都会有一个隐含的属性
                指向改构造函数的原型对象

            - 当我们访问对象的一个属性或方法时，它会先在对象自身中寻找，如果有，则直接使用
                如果没有，则会去原型对象中寻找，如果找到，则直接使用。
        */
        
        /* 
            -------------------------------总结------------------------------------
            构造函数执行流程
            - 1.立刻建立一个新的对象
              2.将新建的对象设置为构造函数中的this，在构造函数中可以使用this，来引用新建的对象
              3.逐行执行构造函数中的代码
              4.将新的对象作为返回值返回

            原型
            - 1.原型的作用就是将对象的公有属性和方法，统一添加到构造函数的原型对象中
                这样就不需要为每一个对象添加，也不会影响到全局作用域。并且每个对象都具有这些属性和方法了
        */

        /* 
            -------------------------------总结------------------------------------
            instanceof 和 typeof

            - typeof
                typeof 主要用于判断一个变量的类型，我们可以利用typeof来判断number, string, object, boolean, function, undefined, symbol

                js 在底层存储变量的时候，会在变量的机器码的低位1-3位存储其类型信息
                000：对象
                010：浮点数
                100：字符串
                110：布尔
                1  ：整数
                null：所有机器码均为0
                undefined：用-2^30整数表示

                所以 typeof在判断null的时候就会出现问题，由于null的所有机器码均为0，所以直接被当做对象看待了

            - instanceof
                语法：对象 instanceof 构造函数
                在typeof在检测object类型的时候，总会返回object。所以js提供了另一个接口来实现对对象类型的判断
                instanceof 利用原型链继承关系做判断，它针对对象类型。它其实是对对象的继承关系做检测

                例如： me instanceof Person    意思就是：检查me是不是Person的实例
        */

        /* 
            -------------------------------总结------------------------------------
            属性 in object
            - in 用于检查对象中是否含有某一个属性，如果对象中没有但是原型中有，也会返回true

            hasOwnProperty
            - 对象中存在hasOwnProperty方法，它的作用就是查询对象本身是否存在某个属性，只有当对象本身存在某个属性的时候，才会返回true

            hasOwnProperty这个属性从哪里来?
            - 首先我们知道原型对象也是对象，所以它也有原型，当我们使用一个对象的属性或方法时，会在自身中寻找
                自身如果有某个属性，则直接使用。
                自身如果没有某个属性，则去原型对象中查找
                原型对象中没有某个属性，则去原型对象的原型中寻找，直到找到Object对象的原型
                Object对象的原型没有原型
        */
    }

    public garbageCollectionTest = () => {
        // 垃圾回收

        let obj: any = new Object();
        obj = null;
        console.log(`垃圾回收机制 ${obj}`);

        /* 
            -------------------------------总结------------------------------------
            垃圾回收
            - 1.当一个对象没有任何变量或属性对它进行引用，此时我们将永远无法操作改对象
                此时这种对象就是一种垃圾。这种对象过多会占用大量的内存空间，导致程序运行变慢
                所以这种垃圾需要清理

            - 2.在js中拥有自动的垃圾回收机制，会自动的将这些垃圾对象从内存中销毁

            - 3.回收条件
                栈内存存储一个变量变量，这个变量指向堆内存的某一个值。
                当我们把这个变量设置为null的时候，相当于栈内存的变量和堆内存的联系断了，于是浏览器就会把堆内存的值销毁
                所以：当我们把一个变量设置为null，那么这个变量就会被回收。
        */
    }

    public objectTest = () => {
        /* 
            -------------------------------总结------------------------------------
            new一个构造函数，经过了那些步骤 
            例如 const me = new Person(....)
            - 1.创建一个新的对象, const me = {};
            - 2.新对象的__proto__属性指向构造函数的原型对象
            - 3.将构造函数的作用域赋值给新对象(也就是this，指向新的对象)
            - 4.执行构造函数内部的代码，将属性添加给person中的this对象
            - 5.返回新对象me
        */
    }

    public render() {
        return <div>
            ES6/ES5 BaseJs Two
        </div>
    } 
}
