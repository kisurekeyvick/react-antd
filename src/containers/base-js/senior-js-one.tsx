import * as React from 'react';

export default class SeniorJsOne extends React.PureComponent<any, any> {
    constructor(public props: any) {
        super(props);

        this.preInterpretation();
        this.scopeChain();
        this.demotest();
        this.ajaxTest();
    }

    public preInterpretation = () => {
        const num: number = 12;
        const obj: any = {name: 'kisure', age: 25};
        console.log(`js高级 预解释：${num} 和 ${obj}`);
        /* 
            栈内存
            const num = 12
            const obj =>xxxfffoo  这是一个地址，指向的是堆内存

            堆内存
            xxxfffoo => {name: 'kisure', age: 25}
        */

        /* 
            -------------------------------总结------------------------------------
            标题：《预解释》
            
            - js基本数据类型
                number, string, undefined, symble, boolean, null, object

            - 引用数据类型
                object: [], {}, /^s/, Date
                - 引用数据类型都是通过地址找到对应的空间，然后访问空间中对应的属性值
                    例如：obj.name

                function
                - 首先开辟一个堆内存，然后将函数中的代码当作字符串存起来，然后再把存储字符串的地址赋值给函数名


                两者区别：基本数据类型是按照值来操作的，而引用数据类型是按照引用地址来操作的

                当浏览器加载html页面的时候，首先会提供一个供全局js代码执行的环境 -- 全局作用域(global/window)

            - 预解释
                预解释是在栈内存发生的，因为栈内存提供js代码执行的环境

                在当前的作用域中，js代码执行之前，浏览器首先会默认的把所有带var和function的进行提前的声明或者定义
                - 声明
                    例如：var num   告诉浏览器在全局作用域中有一个num的变量
                - 定义
                    例如：num = 12  给变量进行赋值

                - 针对于var和function两者之前预解释还存在区别
                    var 在预解释的时候只是提前的声明
                    function 在预解释的时候提前声明 + 定义(也就是将地址赋值给函数名)

                - 预解释只会发生在当前的作用域下，例如：开始只对window下进行预解释，只有函数执行的时候才会对函数中的进行预解释

            - js中的内存分类
                (1)栈内存：提供js代码执行的环境 -> 也就是作用域(全局作用域/私有作用域)
                (2)堆内存：用来存储引用数据类型的值 -> 对象存储的是属性名和属性值，函数存储的是代码字符串
        */
    }

    public scopeChain = () => {
        /* 
           var scope = 'global';
           function fn() {
               console.log(scope);      // undefined
               var scope = 'local';
               console.log(scope);      // local
           } 

           原因：
           - 由于函数作用域的特性，局部变量在整个函数体始终是有定义的，也就是说，在函数体内局部变量会遮盖同名的全局变量
             所以，当程序运行到var语句的时候，局部变量才会被真正赋值

             等同于：
             var scope = 'global';
             function fn() {
                 var scope;
                 console.log(scope);    // undefined
                 scope = 'local';
                 console.log(scope);    // local
             }
        */

        /*
            -------------------------------总结------------------------------------
            标题：《作用域链和作用域》
            - 理解上下文和作用域
                作用域是基于函数的
                上下文是基于对象的
                也就是说作用域是涉及到它所被调用函数中的变量访问，而上下文始终是this所代表的值，它是拥有控制当前执行代码的对象的引用

            - 作用域
                (1)什么是作用域
                    - 对某一变量和方法具有访问权限的代码空间，作用域是在函数中维护的
                    - 表示变量或函数其作用的区域，指代了它们在什么样的上下文中执行，亦即上下文执行环境
                (2)作用域有什么用
                    - 提高了程序的逻辑局部性，增强程序的可靠性，避免命名冲突
                    - 代码模块化提供了便利
                    - 同样命名的变量可以同时出现在不同的函数中，但是变量不会冲突
                (3)作用域分类
                    - 全局作用域，局部作用域，eval作用域

            - ES6和ES5中的作用域
                案例：
                function range () {
                    var name = 'ukerxi';
                    let nameOuter = 'outer';

                    for (var j = 0; j < 1; j++) {
                        console.log(name)               // ukerxi
                        var kisure = 'kisure';
                    }
                    console.log("输出j变量", j);         // j
                    for (let i = 0; i < 1; i++) {
                        console.log(nameOuter)          // outer
                    }
                    console.log(i)                      // 报错
                    console.log(kisure);                // kisure   <!注意！！！这里之所以能访问到kisure这个变量是因为var的是在循环中定义的。
                    
                    如果是在range里面创建一个function，然后再这个function中定义这个kisure， 那么range内部就访问不到kisure变量>
                }

                ES6中新添加的let和const关键字，具有块级作用域。
                var声明的变量是全局或者整个函数块中的
                let声明的变量只在其声明的块或子块中可用

                - let/const 和 var在作用域上主要的区别
                    var声明的变量的作用域整个封闭函数。而let/const可能只能在函数中的某个子块中，外部是访问不了的

            - 作用域链
                url：https://www.cnblogs.com/buchongming/p/5858026.html
                - 作用域链的产生
                    每一次进入新的执行环境，都会创建一个用于搜索变量和函数的作用域链
                - 作用域链是什么
                    函数被创建的作用域中对象的集合
                - 作用域链的作用
                    可以保证对执行环境有权访问的所有变量和函数的有序访问

            标题：《闭包》
            - 闭包
                能够访问另一个函数作用域的变量的函数
                简单的将：闭包就是一个函数，这个函数能够访问其他函数作用域中的变量

                function outer() {
                    const a = '6';
                    const inner = function() {
                        console.log(a);
                    };
                    return inner;   // inner就是一个闭包函数，因为它能访问到outer函数中的作用域
                }

            - 为什么闭包函数能够访问其他函数额作用域
                url: https://www.jianshu.com/p/26c81fde22fb

                从堆栈的角度看js函数：
                    基本变量的值一般都是存在栈内存中，而对象类型的变量是存储在堆内存中，栈内存存储对应控件地址。

                例如：
                    var a = 1;
                    function fn(){
                        var b = 2;
                        function fn1(){
                            console.log(b);
                        }
                        fn1();
                    }
                    fn();

                    (1) 在执行fn前，此时我们在全局执行环境(浏览器就是window作用域)，全局作用域中存在一个变量a
                    (2) 进入fn，此时栈内存就会push一个fn的执行幻境，这个环境里有变量b和函数对象fn1,这里可以访问自身执行环境和全局执行环境所定义的变量
                    (3) 进入fn1，此时栈内存就会push 一个fn1的执行环境，这里面没有定义其他变量，但是我们可以访问到fn和全局执行环境中的变量。
                        这是因为程序在访问变量时，是向底层栈一个个找，如果找到全局执行环境里没有对应变量，则程序抛出undefined的错误
                    (4) 随着fn1()执行完毕，fn1的执行环境被销毁。接着执行fn，fn环境也被销毁，只剩下全局的执行环境下，现在没有b变量和fn1函数对象了，
                        只剩下a和fn(函数声明作用域是window下)

                - 在函数内访问某个变量是根据函数的作用域来判断变量是否存在，而函数作用域链是程序根据函数所在的执行环境栈来初始化的。
                    所以之前function中，fn1运行打印变量b，根据fn1的作用域链的找到对应fn执行环境下的变量b。
                  所以当程序在调用某个函数时，做了以下工作：准备执行环境，初始函数作用域链和arguments参数对象

                再例如：
                    function outer() {
                        var  a = '变量1'
                        var  inner = function () {
                                console.info(a)
                        }
                        return inner    // inner 就是一个闭包函数，因为他能够访问到outer函数的作用域
                    }
                    var  inner = outer()   // 获得inner闭包函数
                    inner()   //"变量1"

                    当程序执行完var inner = outer()时候，其实outer的执行环境并没有被销毁。因为它里面的变量a仍然被inner的函数作用域链所引用。
                    当程序执行完inner(),这时候，inner和outer环境才会被销毁

                《！！由于闭包会携带包含它的函数的作用域，因为会比其他函数占用更多内容，过度使用闭包，会导致内存占用过多。》
            - 
        */
    }

    public demotest = () => {
        /* 
            -------------------------------总结------------------------------------
            === 和 == 的区别
            - == 的操作符会先将两边的值进行强制类型转换在比较是否相等    要求两个值相等
                例如：55 == '55'   当一个操作数是字符串，另一个操作数是数值的时候，操作符==会把字符串转换成数值，所以结果返回true

              === 操作符不会进行类型转换    要求值相等，并且类型相同

            - NaN == NaN // false
              NaN === NaN // false
              NaN比较特殊，表示的是非数字，它和任何数做相等比较，包括自己本身，都会返回false。
              所以判断NaN最好用isNaN()函数

            - null == undefined // true
              null === undefined // false
        */
    }

    public objTest = () => {
        const obj = {x: 1, y: 2};
        delete obj.x;
        console.log(`使用delete方法对obj进行属性的删除${obj}`);

        /* 
            -------------------------------总结------------------------------------
            对象
            - 什么是对象
                多个数据的封装体，保存多个数据的容器
        */
    }

    public thisObj = () => {
        /* 
            function Person(color){
                this.color = color;
                this.getColor = function() {
                    return this.color;
                };
                this.setColor = function(color) {
                    this.color = color;
                }
            }

            Person('red')   // this指向window
            var p = new Person('red');      // this指向p
            p.getColor();                   // this指向p
            var obj = {};
            p.setColor.call(obj, 'red');    // this指向obj
            var selector = p.selector;
            selector();                     // this指向window
        */    
    }

    public ajaxTest = ()=> {
        function Ajax(url: string, method: string = 'GET', params?: any) {
            // 创建XMLHttpRequest对象
            const request = new XMLHttpRequest();
            
            request.open(method, url);

            if (method === 'POST') {
                request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                request.send(params);
            } else
                request.send(null);

            // 为XMLHttpRequest对象添加onreadystatechange响应函数
            request.onreadystatechange = function() {
                // 判断响应是否完成：XMLHttpRequest对象的readyState属性值为4的时候响应完成
                if (request.readyState === 4) {
                    // 再判断响应是否可用：XMLHttpRequest对象status属性值为200
                    if (request.status === 200 || request.status === 304) {
                        // 打印响应结果：responseText
                        const res = request.responseText;
                        console.log(`原生ajax请求，当前数据：${res}`);
                    }
                }
            }
        }

        console.log(Ajax);

        /* 
            -------------------------------总结------------------------------------
            《AJAX》
            - 什么是AJAX
                AJAX是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术
                AJAX = 异步js和XML

            -AJAX能做什么,优缺点
                -优点 
                      AJAX最大的优点就是能在不刷新整个网页的前提下与服务器通讯维护数据。
                      这使得Web应用程序更为迅捷地响应用户交互，并避免了在网络上发送那些没有改变的信息，减少用户等待时间，带来非常好的用户体验。
                -缺点
                      AJAX干掉了Back和History功能，即对浏览器机制的破坏
                
            - XMLHttpRequest
                该对象是对js的一个拓展，可使用网页与服务器进行通讯

            - onreadystatechange
                (1)这个事件处理函数由服务器触发，而不是用户
                (2)在AJAX执行过程中，服务器会通知客户端当前的通讯状态。依靠更新 XMLHttpRequest 对象的 readyState 来实现
                    改变 readyState 属性是服务器对客户端操作的一种方式。
                    每次 readyState 属性的改变都会触发 onreadystatechange 事件

            - request.open
                (1) 建立请求，但还没有发送请求
                (2) XMLHttpRequest对象的open方法允许开发人员用一个ajax调用服务器发送请求
                (3) 参数
                    - method
                        (1)get
                            使用get请求的时候，参数是在url中显示的，
                            使用get请求发送的数据量小，而post请求发送的数据量大
                            使用get请求，需要注意缓存问题
                                例如：request.open("get", "Server.aspx?username=" + encodeURIComponent(username)
                                            + "&age=" + encodeURIComponent(age) + "&random=" + Math.random());    // 这里会用Math.random来取随机小数
                        (2)post
                            使用post是不需要担忧缓存问题
                            post请求必须设置Content-Type值为 application/x-www-form-urlencoded

                    - url
                        字符串路径

                    - asynch
                        表示是否要异步传输，默认值为true
                        true    
                        false   如果设置为false，那么就会等待Ajax请求执行完毕以后，才会继续执行后面的代码

            - request.readyState
                0   代表为初始化，还没有调用open方法
                1   代表正在加载，open方法以及调用，但是send方法还未调用
                2   代表已加载完毕，send方法已被调用，请求已开始
                3   代表交互中，服务器正在发送响应
                4   代表完成，服务器发送完毕

                - 每一次readyState值发生改变，都会触发onreadystatechange事件。如果把onreadystatechange事件赋给一个function
                    那么每次readyState值的改变都会引发该函数的执行

                - readyState值的变化会因为浏览器的不同而有所差异，但是当请求结束时候，每个浏览器都会把readyState的值统一设置为4

            - request.status
                服务器发送的每一个响应也都带有首部信息。三位数的状态码是服务器发送的响应中最重要的首部信息，并且属于超文本传输协议中的一部分

                - 平常见到的状态码
                    404 没有找到页面
                    403 禁止访问
                    500 内部服务器出错
                    200 一切正常
                    304 没有被修改

                - 通过状态码可以判断服务器是否已发送一个成功的响应
        */
    }

    public render() {
        return <div>
                ES6/ES5 Senior One
            </div>
    }
}
