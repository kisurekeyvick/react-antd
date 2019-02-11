import * as React from 'react';

export default class Typescript extends React.PureComponent<any, any> {
    constructor(public props: any) {
        super(props);

        this.keyofDemo();
        this.functionTest();
        this.classTest();
        this.interfaceTest();
        this.namespaceTest();
        this.genericTest();
    }

    public keyofDemo = () => {
        // keyof T 返回一个类型，这个类型是一个字符串的联合，内容是T中所有的属性名(key)
        // 例如：keyof {a:1, b:2} 得到的是类型是：'a'|'b'

        // Lookup Types / 查找类型
        // T[K]返回（类型中以K为属性名的值）的类型。K必须是 keyof T 的子集，可以是一个字符串字面量
        const a = { k1: 1, k2: "v2" };
        type T_number = (typeof a)['k1'];   // T_number为number类型
        const T_number_demo:T_number = 1;
        console.log(`Lookup Types / 查找类型:${T_number_demo}`);

        // 定义数组的类型
        const arr_num: number[] = [1,2,3,];
        // const arr_num_two: Array<number> = [1,2,3];
        console.log(`数组类型：${arr_num}`);

        // 元组类型
        // 数组合并了相同类型的对象，而元组(tuple)合并了不同类型的对象
        const arr_num_str: [number, string] = [1,'hello'];
        console.log(`元组类型：${arr_num_str}`);

        // 越界元素
        // 当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型
        let xcatliu: [string, number];
        xcatliu = ['Xcat Liu', 25];
        xcatliu.push('http://xcatliu.com/');
        console.log(`越界的元素xcatliu,${xcatliu}`);
    }

    public functionTest = () => {
        // 函数重载
        function getInfo(name: string): string;
        function getInfo(name: string, age: number): string;
        function getInfo(name: string, age?: any): string {
            if (age)
                return `姓名：${name},年龄：${age}`;
            else
                return `姓名：${name}`;
        }

        getInfo('kisure', 25);

        // 匿名函数
        // const greet = function(name: string): string { return '' };
        // ts可以给函数的参数指定类型，也可以给函数返回的值定义类型

        // const greet: (name: string) => string = function(name: string): string { return '' };
        // 我们可以给变量添加匹配匿名函数的类型

        function sum(a: number, b: number, callback: (result: number) => void) {
            callback( a + b);
        }
        console.log(`这是一个function，名叫sum，它有三个参数，第三个参数是一个function，接收name为字符串，返回无值： ${sum}`);

        /*
            -------------------------------总结------------------------------------
            函数重载是使用相同的方法名，和不同的参数数量或者类型创建多个方法的一种能力
            
        */
    }

    public classTest = () => {
        // 《原型》
        // function Person(name, age) {
        //     this.name = name;       // 这个是实例属性
        //     this.age = age;
        //     this.run = function() {   // 这个就是实例方法
        //         console.log(`${this.name}在运动`);
        //     }
        // }

        // // 原型链上面的属性会被多个实例共享  而构造函数不会上面的属性不会
        // Person.prototype.say = () => {
        //     console.log(`hello kisure, this is ts`);
        // }

        // Person.speak = function () {
        //     console.log('hello，我是静态方法');
        // }
        // // 静态方法是不需要实例化的，也就是说我们直接访问构造函数就能读取到属性

        // const person_one = new Person('kisure', 25);
        // Person.speak()

        // // 所谓的实例方法，也就是需要new一个构造函数所产生的


        // // 《继承--对象冒充实现继承》
        // function Me(...rest) {
        //     Person.call(this, ...rest);  // 对象冒充实现继承
        //     // 但是对象冒充，是没有办法继承原型链上的方法
        // }

        // // 《继承--对象冒充继承 + 原型链继承》
        // function He(...rest) {
        //     Person.call(this, ...rest);
        // }
        // He.prototype = new Person(); // 【原型链实现继承】 写法1
        // He.prototype = Person.prototype; // 【原型链实现继承】 写法2
        
        // 原型链实现继承以后，可以继承构造函数中的属性和方法，也可以继承原型链上面的属性和方法 


        // 《ES6中的class》
        class Person {
            name: string;
            constructor(name: string) { // 构造函数，会在实例化的时候出发
                this.name = name;
            }

            run() {
                console.log(`使用ts来创建class，这是Person类中的方法(相当于ES5中原型链上的方法),${this.name}`);
            }

            speak() {
                console.log(`${this.name}在运动`);
            }
        }

        const me = new Person('kisure');
        me.run();

        // 《ES6中实现继承 extends super》
        class Me extends Person {
            constructor(name: string) {
                super(name);
            }
        }
        const me_two = new Me('使用extends和super来继承父类： 哈哈哈哈');
        me_two.speak();
        // 使用super能够执行父类Person的构造函数，再使用extends能够继承父类person原型链上的方法

        /* 
            super 实际上用在两种语法中
            1：constructor内的super()  其实是子类中调用父类的构造函数，必须至少执行一次。 (你可以理解为初始化父类的构造函数)
            2：一般方法内的super.method()

            extends
            1.当父类和子类中都有相同的方法的时候，就会执行子类中的方法。
        */

        // 《ES6中使用接口来确保class拥有指定的解构》
        interface ILogger {
            log(arg: string): any
        }

        class Logger implements ILogger {
            name: string;

            constructor(name: string) {
                this.name = name;
            }

            log(arg: string): any {
                console.log(`log类实现Ilogger，打印当前姓名：${this.name},以及传入的参数${arg}`);
            }
            // 我们定义了一个ILogger的接口，来实现他的打印日志。
        }

        const logMe = new Logger('kisure');
        logMe.log('你揍是个弟弟');

        // 《ts中的修饰符》
        /* 
            public：公有            在类里面、子类、类的外面都可以访问
            protected：保护类型     在类里面、子类里面可以访问、在class外部没法访问 
            private：私有           在类中可以访问，但是在子类和外部都无法访问
        */
        class Pepole {
            public name: string;
            private age: number;
            protected sex: string;

            constructor(name: string, age: number, sex: string) {
                this.name = name;
                this.age = age;
                this.sex = sex;
            }

            speak() {
                console.log(`People这个class中
                    public(${this.name})：能够在class,子类和class外部能够被访问
                    protected(${this.sex})：能够在class，子类中能够被访问
                    private(${this.age})：只能在当前的class被访问`);
            }
        }

        class MeThree extends Pepole {
            constructor(name: string, age: number, sex: string) {
                super(name, age, sex);
            }

            work() {
                console.log(`这个是People的子class，访问公有属性：${this.name},访问保护类型属性：${this.sex},但是不能访问私有属性 this.sex`);
            }
        }

        const me_three = new MeThree('hhhh', 25, 'male');
        me_three.speak();
        me_three.work();

        // 《ts中的静态属性 静态方法》
        /* 
            ES5中的静态属性
            function StaticPerson () {
                this.run_one = function() {
                    console.log('这个是StaticPerson方法中的属性')
                }
            }

            StaticPerson.name = '这个是静态属性';
            StaticPerson.run_two = function() { console.log('这个是静态方法'); }

            const stPerson = new StaticPerson();
            StaticPerson.name

            这里也可以举例一个jquery的案例：
            $('#div').css(....) 这个$其实相当于是function的名字
            
            function $(element) {
                return new Base(element);
            }

            function Base(element) {
                this.element = '这个是你获取的dom节点';
                this.css = function(arr,value) {
                    this.element.style.arr = value;
                }
            }

            $.get('url', () => {})  // 这个get方法其实就是$这个function的静态方法
        */
        
        class StaticPerson {
            static sex = 'male';
            name: string;

            constructor(name: string) {
                this.name = name;
            }

            static say() {
                console.log(`这个是StaticPerson这个类的静态方法，并且console出静态属性sex的值${StaticPerson.sex}`);
            }
        }

        StaticPerson.say();

        /* 
            静态方法：
            (1) 静态方法中是无法直接调用class里面的属性
            (2) 可以直接通过class访问静态属性和方法
        */

        // 《ts中的多态》
        class Animal {
            name: string;

            constructor(name: string) {
                this.name = name;
            }

            eat() {
                console.log('。。。。。这个是animal这个class的一个实例方法');
            }
        }

        class Dog extends Animal {
            constructor(name: string) {
                super(name);
            }

            eat() {
                console.log(`这只小狗叫${this.name},喜欢吃肉`);
            }
        }

        class Cat extends Animal {
            constructor(name: string) {
                super(name);
            }

            eat() {
                console.log(`这只小猫叫${this.name},喜欢吃鱼`);
            }
        }

        const dog = new Dog('旺旺');
        const cat = new Cat('喵喵');
        dog.eat();
        cat.eat();

        /* 
            多态：父类定义一个方法不去实现，让继承它的子类去实现，每个子类有不同的表现
            多态属于继承
        */

        // 《ts中的抽象方法》
        // 例如：我们需要定义一个标准，规定animal这个class要求它的子类必须要包含eat这个方法
        abstract class Animals {
            name: string;

            constructor(name: string) {
                this.name = name;
            }

            abstract eat(): any;
        }

        class Cats extends Animals {
            constructor(name: string) {
                super(name);
            }

            // 继承了抽象class，那么就必须姚实现抽象class中的方法
            eat() {
                console.log(`这个class继承了抽象class，必须要实现eat方法，所以console出${this.name}喜欢吃肉`);
            }
        }

        const cats = new Cats('咕咕');
        cats.eat();

        /* 
            ts中的抽象类：它是提供其他class继承的基类，不能直接被实例化
            用abstract关键字定义抽象class和抽象function，抽象class中的抽象方法不包含具体实现，并且必须在派生class中实现
            抽象类：abstract修饰，里面可以没有抽象方法，但是有抽象方法的class，必须声明为抽象class
            
            注意注意：抽象方法只能出现在抽象方法中,并且抽象class不能被实例化
            在我看来，抽象class更像是一个标准化，告诉子类必须要去实现抽象class中的方法
        */

        /*
            -------------------------------总结------------------------------------
            ES5原型
            例如：   function Person (name, age) {
                        this.name = name;
                        this.age = age; 
                        this.say = function() {
                            console.log(`${this.name}说： 这个是实例方法，只属于每个实例的方法，他是不会被共享的`);
                        }
                    }
                    // 所有的实例属性都不可能会被共享的，因为它是实例的属性

                    Person.proptype.speak = function() {
                        console.log('这个是原型链上的方法，原型链上的方法会被多个实例共享');
                    }

            ES5中的继承
            例如：   function Me(name, age) {
                        // 对象冒充继承，这一步可以使得实例属性能够被赋值
                        Person.call(this, name, age);
                    }

                    // 原型链的继承方式
                    Me.prototype = new Person();    // 写法1
                    Me.prototype = Person.prototype;    // 写法2

            ES6中的class， class的继承，抽象class，class中的修饰符，多态，接口实现，静态属性/方法
                    abstract class Animal {
                        name: string;
                        protected age: number;
                        private sex: string;
                        constructor(name: string, age: number, sex: string) {
                            this.name = name;
                            this.age = age;
                            this.sex = sex;

                            console.log(`设置了私有属性${this.sex}`);
                        }

                        abstract eat(): any;
                    }

                    interface ILogger {
                        log(arg: string): any
                    }

                    class Cat extends Animal implements ILogger {
                        static num:number = 20;

                        constructor(name: string, age: number, sex: string) {
                            super(name, age, sex);
                        }

                        eat() {
                            console.log(`静态class继承：${this.name}`);
                        }

                        static detail() {
                            console.log(`这是一个静态方法，能够访问当前class中的静态属性，猫的数量为${this.num}`);
                        }

                        log() {
                            console.log(`接收实现，必须要实现的方法，这个是打印日志`);
                        }
                    }

                    const cat = new Cat('喵喵',2, 'female');
                    cat.eat();
                    cat.log();

                    (1)class的继承
                        class A extends B { // extends 的作用就是继承父类
                            constructor(...) {
                                super(...)  //这里的super就是执行父类的构造函数(constructor)，也就是初始化
                            }
                        }

                        需要注意的是，父类和子类中如果都存在相同的方法，那么就会执行子类中的class
                        extends只能写一个class

                    (2)抽象(ahstract)class
                        抽象的class可以看做是对class的约束，当继承抽象class的时候，需要子类去实现抽象类中的方法
                        抽象的方法只能存在于抽象class中

                    (3)class中的修饰符
                        public      公共的，class中，子类中，外部都可以被访问
                        private     只有在class中才能被访问，其他的不能访问
                        protected   在class和子类中可以被访问

                    (4)多态
                        所谓的多态就是：父类定义一个方法，由子类去实现父类的方法，但是每个子类的表现形式不一样

                    (5)接口实现
                        使用implements，接口中定义的方法，class必须要去实现

                    (6)静态属性/方法
                        静态的属性和方法可以直接通过class的名字就可以访问，但是在静态的方法中是获取不到class中的属性
        */
    }

    public interfaceTest = () => {
        /* 
            接口的作用
            在面向对象的编程语言中，接口是一种规范的意义，它定义了行为和动作的规范，在程序设计里，接口起到限制和规范的作用
            接口定义了某一批类所需要遵守的规范，它只规定这些class必须提供某些方法
        */

        // 《ts中的属性接口 --- 函数类型的接口》

        interface IFunc {
            (key: string, value: string): string;
        }

        const func: IFunc = (key: string, value: string): string => {
            console.log(`使用接口定义function类型的接口 ${key}${value}`);
            return `使用接口定义function类型的接口 ${key}${value}`;
        };

        func('one', 'two');

        // 《ts中的可索引接口 --- 数组、对象的约束》 
        interface IUserArr {
            [index: number]: string;
        }

        interface IUserObj {
            [index: string]: string;
        }

        const userArr: IUserArr = ['Tom', 'Peter'];
        const userObj: IUserObj = { name: 'tom' };
        console.log(`使用ts中的可索引接口(数组)：${userArr}`);
        console.log(`使用ts中的可索引接口(对象)：${userObj.name}`);

        // 《ts中的class类型 --- 对class的约束，和抽象类有点类似》
        interface IAnimal {
            name: string;
            eat(food: string): any;
        }

        class Dog implements IAnimal {
            // implements 代表的就是实现，这里的意思是实现接口IAnimal里面的方法和属性
            name: string;

            constructor(name: string) {
                this.name = name;
            }

            eat(food: string) {
                console.log(`${this.name}喜欢吃${food}`);
            }
        }

        const dog = new Dog('咕咕');
        dog.eat('骨头');

        // 《ts中的接口继承》
        interface IAnimalExt extends IAnimal {
            drink(drink: string): any;
        }

        class Cat implements IAnimalExt {
            name: string;

            constructor(name: string) {
                this.name = name;
            }

            eat(food: string) {
                console.log(`${this.name}喜欢吃${food}`);
            }

            drink(drink: string) {
                console.log(`${this.name}喜欢喝${drink}`);
            }
        }

        const cat = new Cat('咪咪');
        cat.eat('骨头');
        cat.drink('牛奶');

        /*
            -------------------------------总结------------------------------------
            (1)函数类型接口
            (2)数组、对象的约束
            (3)class类型
            (4)接口的继承
            接口的作用就是约束和规范，定义了某些属性和方法，使用该接口的class或者对象或者function需要是实现接口中的内容
            需要注意的是，接口只关注你实现了这个方法，它不关注你是怎么实现的，内部是怎么样子的
        */
    }

    public genericTest = () => {
        // 《ts中的泛型》
        /* 
            泛型：考虑到api的可重用性，尤其是组件，使得组件不仅能够支持当前的数据类型，同时也能支持未来数据的支持
            这在创建大型的系统时，为你提供了十分灵活的功能

            通俗的理解：泛型就是用来解决 class 接口 方法的复用性，以及对不特定数据类型的支持
        */

        // 《ts中的泛型函数》
        function getVal<T>(value: T):T {
            console.log(`这里使用泛型，传入参数，然后console.log出值：${value}`);
            return value;
        }
        // T表示泛型 具体是什么类型，是调用这个function的时候才会决定的

        getVal<string>('hello');
        getVal<number>(123);

        // 《ts中的泛型class》
        class MinClass<T> {
            // 添加<T>表示这是一个泛型
            public list: T[] = [];
            add(value: T): void {
                this.list.push(value);
                console.log(`这是一个泛型的class，此处是添加数据，添加的值为${value}`);
            }
            min():T {
                let min = this.list[0];
                for(let i = 0; i< this.list.length; i++) {
                    if (min > this.list[i]) {
                        min = this.list[i];
                    }
                }

                return min;
            }
        }

        const mine = new MinClass<number>();    /* 这一步进行实例化的时候，指定了类的T代表的是类型是number类型 */
        mine.add(2);

        // 《ts中的泛型接口》
        interface IConfig {
            <T>(value: T):T;
        }

        const getData: IConfig = function<T>(value: T):T {
            console.log(`使用泛型接口，定义变量的类型，传入的值为：${value}`);
            return value;
        };

        getData<number>(1);

        /* 
            -------------------------------总结------------------------------------
            (1)ts中的泛型class
            (2)ts中的泛型接口
            (3)ts中的泛型函数
        */
    }

    public namespaceTest = () => {
        // namespace Kisure {
        //     interface IPerson {
        //         name: string;
        //         age: number;
        //         run: (name: string, age: number) => string;
        //     }
        
        //     export interface IMe extends IPerson {
        //         sex: string;
        //     }
        
        //     export class Person implements IPerson {
        //         name: string;
        //         age: number;
        //         sex: string;
                
        //         constructor(name: string, age: number, sex: string) {
        //             this.name = name;
        //             this.age = age;
        //             this.sex = sex;
        //         }
        
        //         run(name: string, age: number): string {
        //             return `${this.age}岁的${this.name}正在殴打${age}岁的${name};`
        //         }
        //     }
        // }

        // const Me: Kisure.IMe = new Kisure.Person('kisure', 25, 'male');
        // Me.run('小米', 24);
    }

    public render() {
        return <div>
            Typescript demo
        </div> 
    }
}

// 命名空间存在问题，需要解决
// 关于ajax那一块，需要掌握
// const arr: Array<string | number> = ['1', '2', '3', 4, 6, 7];
