import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import { themes } from './context';   // ThemeContext
import ReactJsOneChildContext from './react-js-one-child(context)';

const ForwardBtn = React.forwardRef((props: any, refs: any) => {
    return (
        <button ref={refs}>{props.children}</button>
    );
});

export default class ReactJsOne extends React.Component<any, any> {
    public forwardRef: any;
    public domEleRef: any;

    // 【使用react的context】 声明Context对象属性
    static childContextTypes = {
        theme: PropTypes.object,
    }

    // 【使用react的context】 返回Context对象，方法名是约定好的
    public getChildContext = () => {
        return {
            theme: themes
        }
    }
    
    constructor(public props: any) {
        super(props);

        this.state = {
            theme: themes.light
        };
        this.forwardRef = React.createRef(); 
        this.domEleRef = React.createRef();
    }

    /*
        -------------------------------总结------------------------------------
        关于 JSX 简介
        - 什么是 JSX
            是一种对js的拓展，是一种定义带属性树结构的语法，树结构就是我们的dom结构，属性就是dom节点中的属性

        - JSX的特点
            (1)类xml语法容易接受
            (2)增强js的语义，因为之前js主要体现在界面的逻辑方面，但是对于界面元素的表现，js是比较弱的。
            (3)结构清晰，使用jsx编写代码，就能知道生产的html
            (4)抽象程度高，提供了新的抽象层，我们不需要关心抽象层下面到底是如何去实现的
                跨平台，rn的诞生。
                使用jsx其实是独立于平台的语法，react可以在不同的平台上提供解释器
            (5)代码模块化，把一个大的项目打散成为了许多小的项目，从而实现代码的模块化

        - JSX 其实会被转化为普通的 JavaScript 对象

        - JSX用于创建虚拟dom
            - 创建虚拟dom的方式
                (1) React.createElement(
                        'h1',
                        {className: 'greeting'},
                        'Hello, world!'
                    );
                (2) jsx的方式创建

        - JSX代表Objects
            JSX会转换成一个名为React.createElement()的方法调用
            也就是说： 
                const element = (
                                <h1 className="greeting">
                                    Hello, world!
                                </h1>
                            ); 
                
                转换成：

                const element = React.createElement(
                    'h1',
                    {className: 'greeting'},
                    'Hello, world!'
                );

                再转换：

                const element = {
                    type: 'h1',
                    props: {
                        className: 'greeting',
                        children: 'Hello, world'
                    },
                };

        - JSX的基本语法
            - Boolean属性
                省略Boolean属性值会导致JSX认为bool值设置为true。如果传false，那么就必须使用属性表达式
                常用的表单元素中，比如：disabled、required、checked 和 readOnly
                例如：<Checkbox checked={true}> 可以简写为 <Checkbox checked>
                      反之：<Checkbox checked={false}> 也可以省略 checked属性

            - 自定义HTML属性
                - 在jsx中往DOM元素中传入自定义属性，React是不会渲染的
                    <div d='xxxx'>content</div>
                - 如果要使用html自定义属性，要使用data-前缀，这与html标准是一致的
                    <div data-attr='XXXX'>content</div>
                - 在自定义标签中任意的属性都是被支持的

            - HTML转义
                React会将所有要显示到DOM的字符串转义，防止XSS。所以如果JSX中含有转义后的实体字符，例如&copy;（©）则最后DOM中不会正确显示，因为React
                会自动吧&copy;中的特殊字符串转义了
                如下解决方法：
                (1) 直接使用UTF-8字符
                (2) 使用对应字符的Unicode编码查询编码
                (3) 使用数组组装 <div>{['cc ', <span>&copy;</span>, ' 2015']}</div>
                (4) 直接插入原始的HTML
    */

    /* 
        -------------------------------总结------------------------------------
        - 组件
            用来实现局部功能效果的代码集合， 每个组件有独立的HTML、css、js代码

        - 组件化
            应用以多组件的方式去实现，这个应用就是一个组件化的应用。

        - 模块
            向外提供特定功能的js程序，一般就是一个js程序
            模块内，存在数据以及对数据的操作(函数)，以及变量。然后将一些私有的函数对外暴露 
            
            例如：module1就是Javascript模块的基本写法
            var module1 = (function (mod){
                mod.m1 = function () { //... };
                mod.m2 = function () { //... };
        　　　　 mod.m3 = function () { //... };
        　　　　return mod;
        　　})(module1);

            作用：复用js，简化js编写，提高js运行效率

        - 模块化
            一个模块就是实现特定功能的文件，有了模块，我们就可以更方便地使用别人的代码，想要什么功能，就加载什么模块。
            应用的js都以模块来编写的，这个应用就是一个模块化应用

        - react构建组件的方法
            - 方法1：
                const Button = React.createClass({
                    getDefaultProps() {
                        return {
                            color: 'blue',
                            text: 'confirm'
                        }
                    }

                    render() {
                        const { color, text } = this.props;
                        return (
                            ......
                        )
                    }
                });

            - 方法2：
                ES6的class
                import * as React from 'react'
                export class Button extends React.Component<any, any> {
                    ......
                }
    */

    /* 
        -------------------------------总结------------------------------------      
        React的左右组件都是继承自顶层类React.Componnet。它的定义非常简洁，只是初始化了React.Component方法，声明了props，context,refs等。
        并在原型上定义了setState和forceUpdate方法

        - 无状态函数
            无状态组件只传入props和context,不存在state，也没有生命周期方法，组件本身就是组件构建方法中的render方法
            在合适的情况下，都应该使用无状态组件
            无状态组件不像之前的两种方法，在调用的时候会创建实例，它创建时，始终保持了一个实例，避免了不必要的检查和内存分配，做到了内部优化。
                (1)避免了不必要的检查：指的是shouldComponentUpdate中检查更新

        - 有状态组件
            class Header extends React.Component {
                constructor(props) {
                    super(props);
                    this.state = {
                        nameOne: props.name,
                        nameTwo: this.props.name  //super()方法中传递了props属性，this.props才可以获取到name属性
                    }
                };

                render() {
                    return (
                        <div>{this.state.nameOne}{this.state.nameTwo}</div>
                    );
                };
            };

            this.props：这个props不是子组件的props，它其实是调用super方法时，被传递到父组件React.Component中去了。this.props是Component父类中的props属性
            super中的props：这个props就是子组件的属性props

            React.Component父组件代码：
            function Component(props, context, updater) {
                this.props = props;
                this.context = context;
                this.updater = updater || ReactNoopUpdateQueue;
            }

            如果super方法中不传入props参数，那么获取this.props的值就是undefined
    */

    /* 
        -------------------------------总结------------------------------------
        - react数据流
            在react中数据是从顶向下流动的，也就是单项数据流
            如果顶层组件初始化props，那么react会向下遍历整颗组件树，重新尝试渲染所有相关的子组件
            state只关心每个组件自己内部的状态，这些状态只能在组件内改变

            理解：我们把组件看成function，props当作是参数，内部由state作为function的内部参数，返回一个虚拟dom的实现

        - state
            - 什么是state
                State是一个组件的UI数据模型，是组件渲染时的数据依据。
                它只是用来控制这个组件本身自己的状态，我们可以用state来完成对行为的控制、数据的更新、界面的渲染，由于组件不能修改传入的props，所以需要记录自身的数据变化。
            
            - 如何更新state  
                - setState
                    setState是一个异步方法，一个生命周期内所有的setState方法会合并操作

        - props
            - 什么是props
                props是react用来让组件之间相互联系的一种机制，通俗的说就像function的参数一样
            
            - 子组件prop
                - children
                    this.props.children 代表的是组件的子组件集合

                - React.Children
                    React.Children是官方提供的对this.props.children的操作方法，它提供如：map,forEach,count等方法

                    React.Children.map函数在执行的时候，无论这个children是function，object，数组，都不会报错

                    React.Children.count用于计算children的数量。this.props.children.length是不准确的，因为如果这个children是字符串(字符串是由长度的)，会把字符串的长度算进去

                    React.Children.toArray(this.props.children) 将children转化为数组

                    React.Children.only(this.props.children)    验证children只有一个子节点，并返回它。如果不是一个子节点，那么就会报错

        - state 和 props区别
            state是可变的，它是组件内部维护的一组用于反应组件UI变化的状态集合
            state是组件内部的状态(数据)，不能直接修改，必须要通过setState来改变值的状态，从而达到更新组件内部数据的作用。
            props是只读的，如果想要修改props，只能通过父组件修改。
    */

    /* 
        -------------------------------总结------------------------------------  
        - PropTypes
            react提供了可以对props进行验证的功能(PropTypes)
            PropTypes是组件类自身的属性，提供了很多验证器，来验证传入的数据是否有效。
            当传入的数据无效时候，js控制台会抛出错误

            - 注意
                在生产环境下，为了性能考虑会将PropTypes忽略掉
    */

    /* 
        -------------------------------总结------------------------------------
        - 虚拟dom
            - 什么是虚拟dom
                在react中，render执行的结果得到的轻量级js对象，称之为虚拟dom。
                虚拟dom就是一个js对象，它用来描述真实dom

            - 为什么虚拟dom性能好
                (1)减少了对真实dom的创建，以及真实dom的对比，取而代之的，虚拟dom创建的是js对象，对比的也是js对象。

            - 虚拟dom的作用
                虚拟dom具备批处理(在短时间内对想要对真实dom的改变操作汇总成一次，然后改动真实dom)和高效的Diff算法。
                它能够帮我们收集短时间来的多次改动，汇总成为一次改动，这样对浏览器的压力会减少很多

            - 为什么要使用虚拟dom
                DOM操作是一件成本较高的事情。对于浏览器而言，每一次操作dom都会伴随着大量的计算。当页面的操作变得复杂
                每一次操作需要改动的元素更多的时候，浏览器的压力也会越来越大

            - 虚拟dom vs 直接操作原生dom
                原生(innerHTML): render html string + 重新创建所有 DOM 元素
                虚拟DOM(Virtual DOM): render Virtual DOM + diff + 必要的 DOM 更新
                
                和DOM操作比起来，js计算很廉价，虚拟dom的render + diff 但是它只是纯js方面的计算。如果是小部分的更新，比渲染html字符串要慢。
                但是若涉及到不同的区域，修改dom，那么一定是虚拟dom比较快

            - 个人理解
                DOM不存在于js引擎中，DOM不属于js。DOM其实是浏览器引出的一组让js操作HTML文档的API。
                调用DOM的开销比较大，而虚拟dom的执行完全是在js引擎中的，而js的开销比较小。

            - 对React虚拟DOM的误解
                React并没有说React比原生操作DOM快，React给我们的保证是，在不需要手动的优化情况下，它依然可以给我们提供过得去的性能
                React掩盖了底层的DOM操作，可以用更声明式的方式来描述我们目的，从而让代码更容易维护
            
        - 回流(reflow)与重绘(repaint)
            url: http://www.cnblogs.com/dll-ft/p/5810639.html
            - 概念(页面显示过程分为如下几个步骤)
                (1)生成dom树(包括display:none的节点)
                (2)在dom树的基础上根据节点的集合属性(margin,padding,width,height等)生成render树
                (3)在render树的基础上继续渲染颜色背景色等样式

            - 回流
                当render树的一部分或者全部因为大小边距等问题发生改变而需要重建的过程

                - 什么会引起回流
                    (1)页面渲染初始化
                    (2)DOM结构发生变化，例如：节点被删除
                    (3)render树变化，例如：减少了padding    (你可以理解为抽脂手术)
                    (4)窗口resize事件触发
                    (5)获取某些属性，引发回流 很多浏览器会对回流做优化，他会等到足够数量的变化发生，在做一次批处理回流。
                        但是除了render树的直接变化。 当获取一些属性时，浏览器为了获得正确的值也会触发回流。这样就使得浏览器的优化失效了

                        这些属性包括：
                            offsetTop, offsetLeft, offsetWidth, offsetHeight
                            scrollTop/Left/Width/Height
                            clientTop/Left/Width/Height
                            width,height
                            调用了getComputedStyle(), 或者 IE的 currentStyle

                - 减少回流
                    (1)避免逐项更改样式，最好一次性更改style属性
                    (2)避免循环操作dom。创建一个documentFragment或div，在它上面应用所有dom操作，然后再把它添加到window.document
                    (3)避免多次读取offsetLeft等属性

                - 补充
                    (1)改变字体大小会引发回流
                    (2)display:none 指的是元素完全不陈列出来，不占据空间，设计到了dom的结构，所以才会产生回流和重绘
                    (3)visibility：hidden 指的是元素不可见但存在，保留空间，不影响结构，所以只产生重绘

            - 重绘
                诸如颜色背景等不会引起页面布局变化，而只需要重新渲染的过程

        - 网页呈现的过程
            (1)浏览器请求服务器获取页面HTML代码
            (2)浏览器要先在内存中，解析dom结构，并在浏览器内存中渲染出一颗dom树
            (3)浏览器将dom树呈现到页面上

        - DOM的本质是什么
            浏览器中的概念，用js中的对象来表示页面上的元素，并提供操作DOM对象的API

            - React中的虚拟dom
                用js对象来模拟页面上的DOM和DOM嵌套

            - 为何存在虚拟dom
                为实现DOM元素高效率的更新

            - Dom和虚拟Dom的区别
    */

    /* 
        -------------------------------总结------------------------------------
        生命周期
        我们把生命周期分为两类：(1)当组件在挂载或卸载   (2)当组件接收新的数据，组件更新

        - 当组件在挂载或卸载
            - 组件挂载
                组件挂载过程主要就是给组件状态的初始化

                constructor

                componentWillMount 

                render

                componentDidMount

                组件卸载

                componentWillUnmount    // 执行一些清理方法，如：事件回收，清除定时器

        - 组件更新
            componentWillReceiveProps(nextProps)
                // 如果组件是由父组件更新props而更新的，那么在shouldComponentUpdate之前会执行次生命周期函数。
                // 此方法可以作为React在props传入后，渲染之前setState的机会。在这个方法中调用setState是不会二次渲染的

            shouldComponentUpdate(nextProps, nextState)
                // 该方法接收需要更新的props 和 state。当方法返回true时候更新，返回false时候不更新
                // 需要注意的是，无状态组件是没有生命周期的，每一次渲染到无状态组件的时候，都会重新渲染

            componentWillUpdate(nextProps, nextState)
                // 这一步是不能执行setState的
                // 该方法会提供需要更新的props和state

            render

            componentDidUpdate(prevProps, prevState)
                // 该方法提供更新前的props和state

        - DOM真正被添加到html中的什么周期方法是：componentDidMount和componentDidUpdate
    */

    /* 
        -------------------------------总结------------------------------------ 
        ReactDOM的API
        -  findDOMNode
            在componentDidMount 和 componentDidUpdate生命收起中，我们能获取真正的DOM元素
            获取真实DOM：ReactDOM.findDOMNode(this.refs.child);

            - findDOMNode 和 ref 之间的区别
                ReactDOM.findDOMNode(this)  获取真实的组件dom

                ref表示的是组件真正实例的引用，也就是ReactDOM.render()返回的组件实例
                ref是可以挂在到组件上，也可以是dom元素上
                ref是不能在函数式组件上使用的，因为它没有实例
                ref挂在到具体dom元素节点上，表示具体的dom元素实例
                ref挂在于子组件，只能在子组件内被访问，父组件是访问不了子组件的ref的

        -  render
            为什么只有在最顶层组件，我们才不得不使用ReactDOM呢？
            - ReactDOM.render(创建的模板, 要渲染的真实dom目标)  这一步是将虚拟dom更新到浏览器真实DOM上，其中包括了创建元素，添加属性，绑定事件等
                参数：
                    - 第一个参数不接受字符串，只接收react的实例
                    - 第二个参数是插入模板的位置

        -  unmountComponentAtNode             
            移除一个已经初始化DOM过的React组件，清理它的操作和状态。如果容器中没有安装任何组件，那么调用此函数不会执行任何操作。
            如果这个组件被销毁则返回true,反之返回false

            React.unmountComponentAtNode(document.getElementById('reactDemo')[0]);

        refs
        - 什么是refs
            refs提供了一个对真实dom(组件)的引用，我们可以直接通过这个引用直接操作DOM(组件)

        - 为什么会用到refs
            当需要处理DOM元素的focus，文本的选择，媒体的播放，第三方DOM库集成
            以上都是react无法控制的局面，于是才会用到refs

        - 如何使用refs
            (1)v16版本之前，通过函数回调的方式，将当前组件的dom绑定到一个变量上
                例如：<CustomTextInput ref={ele => { this.textInput = ele}} />
            (2)v16版本之后，使用React.createRef()，通过这个api我们可以创建出一个ref的变量，然后再将这个变量赋值给组件声明中ref属性就好了
                render函数中：ref={this.textInput}的方式将ref和input这个真实DOM联系起来
                例如：
                constructor() {
                    this.domRef = React.createRef();
                }
                ....

                render() {
                    return (
                        <input type="button" value="Focus the text input" ref={this.domRef}
                    )
                }

            - 不同之处
                v16之后，我们需要通过this.domRef.current来访问真实的dom，也就说说真实dom是通过current属性来引用的
                
        - 传递refs
            - React.forwardRef()通过接收一个函数来传递refs
                例如：
                const ForwardBtn = React.createRef((props, refs) => {
                    <button ref={ref}>{props.children}</button>
                });

                const ref = React.createRef();
                <ForwardBtn ref={ref}>hello kisure</ForwardBtn>

        refs和findDOMNode
        - findDOMNode是直接访问真实dom，而refs是访问组件的实例
    */

    /*
        -------------------------------总结------------------------------------
        - JSX
            JSX的存在是为了方便开发人员写起来比较简单。

            JSX会先被转化成 => React.createElement() => 虚拟dom（js对象）=> 真实dom

        - 虚拟dom的好处
            (1) 性能提升了，将dom的比对 改为了js对象比对
            (2) 使得跨端应用得以实现。 RN就是一个很好的例子。因为虚拟dom是一个js对象，js对象在浏览器中可以被识别，同时在原生的应用里面也可以被识别
                所以虚拟dom不管是在网页中还是原生应用中，都可以被识别

        - 虚拟dom中的diff算法
            diff算法是查找原始的虚拟dom和新的虚拟dom的差异

            同级比较：
                两个虚拟dom做比对，找到同层的差异，找到差异之后去更新真实的dom。
                在做比对的时候，使用同层比对，如果第一层的dom节点不一致，那么就不会再继续对比下一层。否则将继续对比下一层，直至找到差异。

        - setState()
            setState((prevState) => { }, () => {
                // 这里执行的代码，是setState更新完state以后的，因为setState是异步的
            });
    */

    /* 
        -------------------------------总结------------------------------------
        react事件系统
        react内部事件系统实现可以分为两个阶段：事件注册，事件触发
            - ReactEventListener    负责事件注册和事件分发，React将DOM的事件全部注册到document节点上，
                                    事件分发主要主要调用dispatchEvent进行，从事件触发组件开始，向父元素遍历。
            - ReactEventEmitter     负责每个组件上事件的执行
            - EventPluginHub        负责回调函数的存储

        JSX中声明一个React事件
            render() {
                return (
                    <button onClick={this.handleClick}>点击</button>
                )
            }

            当用户点击button的时候，会触发click事件，DOM会将event传入ReactEventListener，它将事件分发到当前组件及以上的父组件。
            然后ReactEventEmitter会对每个组件进行事件的执行，先构造React合成事件，然后以队列的方式调用JSX中声明的callback
            先构造react合成事件，然后以队列的方式调用JSX中声明的callback

        事件委派
            - react底层主要对合成事件做了两件事情：事件委派和自动绑定
                (1)事件委派
                    react不会直接将事件处理函数直接绑定到真实的dom节点上，而是把所有的事件绑定到结构的外层，使用统一的事件监听器，这个事件监听器上维持了一个映射
                    来保存所有组件内部的事件监听和处理函数。当组件挂载或者卸载时，只是在统一的事件监听器上插入或者删除一些对象。当事件发生时，会第一时间被这个监听器
                    处理，然后在映射中找到真正的处理函数并调用。

                (2)自动绑定
                    在react组件中，每个方法的上下文都会指向该组件的实例，也就是说会自动绑定this。当然我们使用ES6class的话，需要手动的去绑定this

        事件触发
            url：https://www.lzane.com/tech/react-event-system-and-source-code/#%E4%BA%8B%E4%BB%B6%E8%A7%A6%E5%8F%91

            当我们点击一个按钮，click事件最终会将事件冒泡到document，并触发react监听在document上的dispatchEvent方法。
            触发方式：点击按钮 -> 浏览器捕获，找到目标，冒泡（浏览器 -> click事件【事件捕获】 -> window -> document -> div -> button【找到目标】 -> button【开始冒泡】-> div -> document）
                    -> react事件监听是在document上的，当时间冒泡到document的时候，会进入React事件系统 -> 想某个方法中传入原生事件，react进行事件的合成和需要出发的回调数组 -> 
                    react遍历回调数组 -> 合成事件 -> react在vDom上模拟捕获和冒泡，并收集所有需要执行的事件回调和对应的节点 -> 按照返回的合成事件和事件触发队列forEach触发回调，如果有stopPropagation则break掉
                    -> click事件处理完毕

        react为什么要自己实现一个事件系统
            (1)性能
                react存在vDom,再有diff算法决定DOM树哪些节点需要新增，替换或者修改。如果直接在DOM节点上插入原生的事件监听，则会频繁的调用addEventListener和removeEventListener，这会造成性能上的浪费
                react采用事件代理的方法，对于大部分的事件都是在document上监听的(除了极少不会冒泡到document的事件，例如：video)，然后根据event的target来判断事件触发的结点。

            (2)复用
                在不同的平台和浏览器上，因为用户界面上的事件十分的相似，所以封装了一个事件系统，将不同平台的事件都封装成合成事件。
                WEB平台上加入ReactBrowserEventEmitter，Native上加入ReactNativeEventEmitter。
                同的浏览器而言，React帮我们统一了事件，做了浏览器的兼容。
    */

    /* 
        -------------------------------总结------------------------------------
        表单
        - 受控组件和非受控组件
            (1)什么叫受控组件
                每当表单的状态发生变化的时候，都会被写入组件的state中

            (2)受控组件更新state的流程
                设置初始化state的值，以初始化表单
                当表单发生变化的时候，调用onchange事件处理器
                事件处理器通过合成事件对象e拿到改变后的状态，并更新应用的state
                setState触发视图的重新渲染，完成表单组件值的更新

            (3)受控组件的好处
                每一次的state变化都会伴随相关联的处理函数，这使得可以直接修改或者验证用户的输入

            (4)什么叫非受控组件
                如果一个表单没有对应的value props时候，那么就可以成为非受控组件。
                它的值来源于DOM元素，如果需要对应的值，则需要配合refs来从dom中获取表单的值

            (5)受控组件和非受控组件之间的对比
                - 区别
                    非受控组件的状态并不会受应用状态的控制，而受控组件的值来源于组件的state
    */

    /* 
        -------------------------------总结------------------------------------
        组件之间的相互通讯
        - 没有嵌套关系的组件之间的通讯
            react中存在context来实现跨级父子组件间的通讯
            
            - context
                context提供了一种在组件之间可以共享值的方法而无需通过树的每个级别显示传递props
            
            - context api
                (1)React.createContext  创建Context对象
                    
                (2)Context.provider  Context的生产者
                    其中对应的 value属性，其实相当于：getChildContext()

                (3)Context.comsumer  Context的消费者

                (4)Class.contextType
    */

    public componentWillMount() {

    }

    public componentDidMount() {
        // 此处可以获取真实dom
        const realComponentDom = ReactDOM.findDOMNode(this);
        console.log(`
            这里是声明周期：组件初始化，组件完成挂载
            获取真实dom
            使用ReactDOM.findDOMNode(this) 获取真实dom：${realComponentDom}
            使用ref 获取组件实例或者组件实例上dom节点：${this.domEleRef}
            使用React.forwardRef()来传递ref，this.forwardRef引用的是button的真实dom：${this.forwardRef}
        `);
    }

    public componentWillReceiveProps(nextProps: any) {
        // 组件接收父组件的props
        // nextProps 接收的父组件的props
    }

    public shouldComponentUpdate(nextProps: any, nextState: any) {
        // 组件是否要更新  true更新  false不更新
        // nextProps将要更新的props
        // nextState将要更新的state
        return true;
    }

    public componentWillUpdate() {
        // 组件将要更新
    }

    public componentDidUpdate() {
        // 组件完成更新
        // 此处可以获取真实dom
    }

    public componentWillUnmount() {
        // 组件将要卸载
    }

    public say = () => {
        
    }

    public render() {
        return <div>
                React.js  One
                <div>{['cc ', <span key='1'>&copy;</span>, ' 2015']}</div>      
                <p>
                    {
                        // <ThemeContext.Provider value={{theme:this.state.theme}}>
                        //     <ReactJsOneChildContext />
                        // </ThemeContext.Provider>
                        //  这是最新的react提供context的api方法
                    }
                </p>
                <ReactJsOneChildContext />
                <div ref={this.domEleRef}><em>dom ref</em></div>
                <ForwardBtn ref={this.forwardRef}>hello kisure</ForwardBtn>
            </div>
    }
}

/* 
    (1)无状态组件的好处，什么叫做避免了不必要的检查和内存分配?
    (2)如果顶层组件初始化 props，那么 React 会向下遍历整棵组件树，重新尝试渲染所有相关的子组件?
    (3)React 提供的获取 DOM 元素的方法 获取真实dom的方法
*/
