import * as React from 'react';

export default class ReactJsTwo extends React.Component<any, any> {
    constructor(public props: any) {
        super(props);
    }

    /* 
        -------------------------------总结------------------------------------
        vDOM模型
        - vDOM的构成：标签名，节点属性(包含样式，属性，事件)，子节点，标识id
            
        - 创建react元素
            // 输入JSX
            const app = <Nav color="blue"><Profile>click</Profile></Nav>;
            // 输出JavaScript
            const app = React.createElement(
                Nav,
                { color: 'blue' },
                React.createElement(Profile, null, "click")
            )
    */

    /* 
        -------------------------------总结------------------------------------
        生命周期
        - 首次挂载
            (1) getDefaultProps
            (2) getInitialState
            (3) componentWillMount
                这里如果使用setState,是不会在成重新render的，因为state会合并
            (4) render
            (5) componentDidMount

        - 卸载组件
            (1) componentWillUnmount
        
        - 重新挂载组件
            (1) getInitialState
            (2) componentWillMount
            (3) render
            (4) componentDidMount

            需要注意的是，重新挂载组件时候，不需要再运行一次：getDefaultProps

            - 为什么只会执行一次
                因为实例之间共享引用(组件的第一个实例初始化时，才会被调用，react就会将这个属性保存起来，而第二个实例只需要调用这个属性就行，不需要再执行一次)
        
        - 再次渲染组件
            (1) componentWillReceiveProps
            (2) shouldComponentUpdate
            (3) componentWillUpdate
            (4) render
            (5) componentDidUpdate

        当使用 static defaultProps = {} 其实就是调用内部的getDefaultProps方法
        constructor中的this.state = {} 其实就是调用内部的getInitialStat方法

        禁止在 shouldComponentUpdate 和 componentWillUpdate 中调用setState，这会造成循环调用，直至耗光浏览器内存后页面奔溃
    */

    /* 
        -------------------------------总结------------------------------------
        setState机制
        - setState异步更新
            (1) this.state是一个对象，单纯的直接去修改一个对象(例如： this.state.name = 1)，react是不会驱动UI的更新。
            (2) 因为setState是异步的(状态更新可能是异步的)，所以如果是相邻的状态更新，是会被合并的
                例如：
                    // 初始化时候 count 的值为0
                    function incrementMultiple() {
                        this.setState({count: this.state.count + 1});
                        this.setState({count: this.state.count + 1});
                        this.setState({count: this.state.count + 1});
                    }
                因为异步更新，所以count的值为1

        - 进阶理解setState
            (1)setState的调用会引起四个生命周期的依次调用：shouldComponentUpdate， componentWillUpdate, render, componentDidUpdate。
            (2)无论是挂载，更新，在render之前的生命周期函数，this.state和props是不会更新的。直到render函数执行完毕，this.state才会得到更新
                (需要注意的是如果shouldcomponentUpdate返回false，那么render是不会执行的。但是this.state还是会更新，只是表面上你没有看出来)
            (3)异步更新设计意图：
                因为每一次render执行完以后，react就会拿着执行的结果和旧的vDOM做比较，然后更新DOM树。所以，多个setState进行合并，render函数就能
                将合并后的this.setState()的结果一次性的与vDOM比较然后更新，这样就能有效的提高效率。
                其次，在render中实现state更新，能够预防组件在进行更新过程中如果出现意外只更新到一半，去做更重要的事情，当更重要的事情做完以后
                在回来更新只更新到一半的东西，这样就会导致生命周期函数可能会执行多次
        
        - 码源理解setState
            react组件继承于React.Component，而setState是React.Componnet的方法。所以对于组件来说setState是原型方法
            (1)this.setState首先会把state推入 pendingState 队列中
            (2)然后将组件标记为dirty
            (3)react中如果不存在更新事务，则会开启一次新的更新事务，更新事务以后会将组件标记为dirty
            (4)然后会判断是否处于批量更新
            (5)如果是批量更新，就会保存组件与dirtyComponent中，在事务结束的时候才会通过某个 方法将所有的临时 state merge 并计算出最新的 props 及 state，然后将其批量执行，最后再关闭结束事务。
            (6)如果不是批量更新，则直接开启一次新的更新事务，在标记组件为dirty以后，直接开始更新组件，然后关闭事务


        案例：
        // https://www.jianshu.com/p/b38a7a4eda2b
        class Example extends React.Component {
            constructor() {
                super();
                this.state = {
                    val: 0
                };
            }
            
            componentDidMount() {
                this.setState({val: this.state.val + 1});
                console.log(this.state.val);    // 第 1 次 log  0

                this.setState({val: this.state.val + 1});
                console.log(this.state.val);    // 第 2 次 log  0

                setTimeout(() => {
                    this.setState({val: this.state.val + 1});
                    console.log(this.state.val);  // 第 3 次 log    2

                    this.setState({val: this.state.val + 1});
                    console.log(this.state.val);  // 第 4 次 log    3
                }, 0);
            }

            render() {
                return null;
            }
        };

        解释：
            (1)componentDidMount生命周期中，前2个属于同一个调用栈，后2个属于同一个调用栈。
              在 componentDidMount 这个调用栈中，存在一个 batchedUpdates 方法，它是早在setState调用前就已经处于 batchedUpdates 执行的事务中。
              而 batchedUpdate 这个方法是由 ReactMount.js 中的方法来调用的。也就是说，整个react组件渲染到DOM过程中就处于一个大的事务中。
              所以，在componentDidMount中调用setState，isBatchingUpdates被设置为true，头两次的setState的结果并没有立即生效，而是被放进dirtyComponents中
              
              而setTimeout中两次setState，因为没有前置的batchedUpdate调用，所以isBatchingUpdates设置为false，也就导致了新的state立马生效
              并没有走到dirtyComponents这个分支上

            (2)同步更新和异步更新之间的区别
                setTimeout(() => {
                    this.setState({value: this.state.value + 1})
                    console.log(this.state.value) // 第三次输出
                    this.setState({value: this.state.value + 1})
                    console.log(this.state.value) // 第四次输出
                }, 0);
                如上代码属于同步更新

                同步更新：绕过React通过addEventListener直接添加的事件处理函数和setTimeout/setInterval产生的异步调用
                异步更新：是由React引发的事件处理（比如：onClick引发的事件处理），调用setState会异步更新this.state；

        - setState的更新机制
            每次setState 产生新的state会依次存入一个队列中，然后会根据isBathingUpdates变量来判断是否直接更新this.state还是放进dirtyComponent里
            isBathingUpdates是默认为false的，也就表示setState会同步更新
            但是当react在调用事件处理函数之前就会调用batchedUpdates，这个函数会把isBathingUpdates修改为true，于是由react控制的事件处理过程
            setState不会同步更新this.state
        
        在react生命周期函数里，以render函数为界，无论是挂载过程还是更新过程，在render之前的生命周期函数，this.state和props都不会发生更新的。直到render执行完毕以后，this.state才会得到更新
        当然，如果 shouldComponentUpdate 函数返回false，这个时候更新的过程就会被中断，render函数也不会被调用，但是react不会放弃掉对this.state的更新，所以虽然不调用render，依然会更新。

        react事务
            - 什么是事务
                事务就是将需要执行的方法使用  wrapper  封装起来，再通过事务提供的 perform 方法执行。
                而在 perform 之前，先执行所有 wrapper 中的
    */

    /* 
        -------------------------------总结------------------------------------
        diff算法
        - tree diff
            新旧两棵DOM树,逐层对比的过程，就是Tree Diff。当整颗DOm树逐层对比完毕，则所有需要被按需更新的元素，必然能够找到

        - component diff
            在进行tree diff的时候，每一层中，组件级别的对比，叫做Component Diff
            如果对比前后，组件的类型相同，则暂时认为此组件不需要被更新
            如果对比前后，组件的类型不同，则需要移除旧组件，然后创建新组件，并追加到页面上

        - element diff
            在进行组件对比的时候，如果两个组件类型相同，则需要进行元素级别的对比，这叫做Element Diff

        
    */

    public render() {
        return <div>
            <p>ReactJsTwo</p>
        </div>
    }
}
