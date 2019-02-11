import * as React from 'react';
// import { compose } from 'redux';
import { store } from './redux/store/store';

import { countAddAction, countReduceAction,  } from './redux/actions/index-action'; // loadPostAction

export default class REDUX extends React.PureComponent<any, any> {
    public unsubscribe: any;

    constructor(public props: any) {
        super(props);

        this.reduxTestOne();
    }

    /* 
        -------------------------------总结------------------------------------
        redux的3大核心：action,reducer,state(store)
            - action就是一个普通的js对象，用来描述发生了什么
            - reducer是状态的管理，所有的状态修改都是在reducer中进行的
                     然后我们通过action来传递相应的参数，来判断是修改哪一个状态。
                     reducer就是将action和state串起来。reducer接收state和action，并返回state
            - store可以理解为存储数据的地方

        创建reducer
            - 例如：const counterReducer = function(state, action) {
                
             }

        创建store
            - const store = createStore(counterReducer)

        Redux三大原则
            - 单一数据源
                整个应用的state被存储在一颗对象树中，并且整个对象树只存在于唯一一个store中。
            - state是只读的
                唯一改变state的方法就是触发action，action是一个用于描述已发生事件的普通对象。
                所有的修改都会被集中处理，并且严格按照一个接一个的顺序执行。
            - 使用纯函数来执行修改
                为了描述action如何改变state tree,需要编写reducer，reducer会接收先前的state和action，然后返回新的state

        Redux能解决什么问题
            (1)解决各个组件之间数据传递
            (2)代码维护
    */

    /* 
        -------------------------------总结------------------------------------
        action
        - 什么是action
            action是把数据从应用传到store的有效载荷
        - 约束
            我们约定action内必须使用一个字符串类型的type字段来表示将要执行的动作
        - action的创建
            例如：创建一个addTodo的action创建函数
                function addTodo(text) {
                    return {
                        type: ADD_TODO
                        text
                    }
                }

            在redux中，只需要把action创建函数的结果传给dispatch方法，就可以发起一次dispatch过程
            例如：dispatch(addTodo(text));

        - 如果在redux中要使用异步的action，那么需要使用中间件
    */

    /* 
        -------------------------------总结------------------------------------
        reducer
            
    */

    /* 
        -------------------------------总结------------------------------------
        store
        - store的职责
            (1) 维持应用的state
            (2) 提供getState()方法获取state
            (3) 提供dispatch(action)方法更新state
            (4) 通过subscribe(listener)注册监听器
            (5) 通过subscribe(listener)返回的函数来注销监听器

        - Redux应用下只有一个单一的store
        - createStore() 第二个参数是可选的，用于设置state初始状态
    */

    /* 
        -------------------------------总结------------------------------------
        this.props.dispatch(异步action)     
    */

    /* 
        -------------------------------总结------------------------------------
        在react中可以使用2中方式将数据传递到不相干的组件中
        (1)redux react-redux
        (2)事件模式
            https://www.jianshu.com/p/0bd5070dc294
            http://nodejs.cn/api/events.html#events_emitter_emit_eventname_args
           
            import { EventEmitter } from 'events'; 

            当然你也可以使用facebook的事件触发
            https://github.com/facebook/emitter
        
    */

    public reduxTestOne = () => {
        console.log(`这里是redux部分，此处使用store.getState()方法获取store的数据：${store.getState()}`);
        this.unsubscribe = store.subscribe(() => {
            const storeData = store.getState();
            console.log(`这里是redux部分,此处使用store.subscribe对store进行监听：${storeData}`);
        });

        store.dispatch(countAddAction);
        store.dispatch(countReduceAction);
        // store.dispatch(loadPostAction);
    }

    public middleware = () => {
        /* 
            enhancer会做一个判断，如果增强器是一个function，那么就会增强createStore
            于是运行enhancer(createStore)(reducer, preloadedState)
        */
        // function createStore(reducer: any, preloadedState: any, enhancer: any) {
        //     if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
        //         enhancer = preloadedState
        //         preloadedState = undefined
        //     }
        
        //     if (typeof enhancer !== 'undefined') {
        //         if (typeof enhancer !== 'function') {
        //             throw new Error('Expected the enhancer to be a function.')
        //         }
        
        //         return enhancer(createStore)(reducer, preloadedState)
        //     }
        
        //     if (typeof reducer !== 'function') {
        //         throw new Error('Expected the reducer to be a function.')
        //     }
        // }

        /* 
            middlewares为传入的中间件
        */        
        // const middleW = (...middlewares: any) => { 
        //     /* 
        //         此处的args代表的是：reducer 和 preloadedState(初始化state)
        //         创建完store_1以后，在创建一个middlewareAPI，middlewareAPI包含有
        //         store_1的getState属性，以及一个dispatch属性
        //         chain是由middlewares中间件通过map返回出来的，返回出来的是加强后的dispatch
        //         通过compose将所有增强的dispatch合并
        //         最终applyMiddleware返回store，这个store中存在存在一个增强后的dispatch
        //     */
        //     return (createStore: any) => (...args: any) => {
        //         const store_1 = createStore(...args)
        //         let dispatch: any = () => {
        //           throw new Error(
        //             `Dispatching while constructing your middleware is not allowed. ` +
        //               `Other middleware would not be applied to this dispatch.`
        //           )
        //         }
            
        //         const middlewareAPI = {
        //           getState: store_1.getState,
        //           dispatch: (...args) => dispatch(...args)
        //         }
        //         const chain = middlewares.map((middleware: any) => middleware(middlewareAPI))
        //         dispatch = compose(...chain)(store_1.dispatch)
            
        //         return {
        //           ...store_1,
        //           dispatch
        //         }
        //       }
        // };

        // function compose(...funcs) {
        //     /* 
        //         funcs代表的是传入的增强后的dispatch
        //         compose是将几个数组参数通过reduce的方式叠加
        //         如果funcs长度为0，那么就会返回store_1.dispatch(原生的)
        //         如果funcs长度为1，就返回funcs[0]
        //         如果funcs长度大于1，那么就通过reduce的方式，将增强的dispatch进行叠加
        //     */

        //     if (funcs.length === 0) {
        //       return arg => arg
        //     }
          
        //     if (funcs.length === 1) {
        //       return funcs[0]
        //     }
          
        //     return funcs.reduce((a, b) => (...args) => a(b(...args)))
        // }

        // function createThunkMiddleware(extraArgument) {
            // /* 
            //     redux-thunk的码源
            //     中间件运行以后，返回一个方法
            //     这个方法会接收middlewareAPI也就是说：getState: store_1.getState 和 dispatch
            //     然后会返回一个function，
            //     接收next的方法返回接收action的方法
            //     此时最里层的function会判断action是不是一个function，如果是的话，那么就会返回这个action方法
            //     如果这个action是一个function，那么就会运行action
            //         返回的这个action中存在3个参数，一个是增强后的dispatch，一个是store的getState方法，以及其他的参数
            //         于是就可以开始你在写action的时候，就可以写异步的action了，这个异步的action就能接收一个增强后的dispatch
            //     如果这个action如果不是function，那么就会返回next(action)

            //     next这个东西，如果你之传入的是一个中间件，那么它其实来自于父级function的dispatch，而这个dispatch就是store.dispatch
            //     如果是多个中间件，那么next代表的是一个中间件
            // */
        //     return ({ dispatch, getState }) => next => action => {
        //       if (typeof action === 'function') {
        //         return action(dispatch, getState, extraArgument);
        //       }
          
        //       return next(action);
        //     };
        //   }
    }

    public componentWillUnmount() {
        // 在组件销毁的时候，解除对store的监听
        this.unsubscribe();
    }

    /* 
        -------------------------------总结------------------------------------
        react-redux
        - Provider
            使用<Provider store={store}>children</Provider>
            在children(这个组件必须是要嵌套在<provider>中的)只要使用connet()方法就能获得redux store

            - store redux的store
            - children 组件级的跟组件  
    */

    public reactRedux = () => {
        // const createProvider = (storeKey = 'store', subKey) {
        //     /* 
        //         createProvider这个方法内部存放一个叫Provider的class
        //         Provider组件主要创建context
        //         创建context的方法：
        //             (1) 父级组件
        //                 - 给child提供context【申明context中的属性，并且返回context对象】
        //                 getChildContext() {

        //                 }

        //                 - 申明提供给子组件的context对象的属性
        //                 static childContextTypes() {

        //                 }

        //             (2) 子组件
        //                 - 子组件需要申明一个静态属性contextTypes，才能够访问到context的相关属性
        //                 static contextTypes = {

        //                 }

        //         (2) Provider的value属性来自于props的store，然后通过创建context
        //         (3) Provider中只能存在一个组件元素，否则会报错
        //     */

        //     const subscriptionKey = subKey || `${storeKey}Subscription`
        
        //     class Provider extends Component {
        //         getChildContext() {
        //           return { [storeKey]: this[storeKey], [subscriptionKey]: null }
        //         }
        
        //         constructor(props, context) {
        //           super(props, context)
        //           this[storeKey] = props.store;
        //         }
        
        //         render() {
        //           return Children.only(this.props.children)
        //         }
        //     }
        
        //     if (process.env.NODE_ENV !== 'production') {
        //       Provider.prototype.componentWillReceiveProps = function (nextProps) {
        //         if (this[storeKey] !== nextProps.store) {
        //           warnAboutReceivingStore()
        //         }
        //       }
        //     }
        
        //     Provider.propTypes = {
        //         store: storeShape.isRequired,
        //         children: PropTypes.element.isRequired,
        //     }
        //     Provider.childContextTypes = {
        //         [storeKey]: storeShape.isRequired,
        //         [subscriptionKey]: subscriptionShape,
        //     }
        
        //     return Provider
        // };

        /* 
            connect
            - connect的作用就是将React的组件和Redux store连接起来
            - 参数
                mapStateToProps
                    (1) mapStateToProps是一个function，它的作用就是建立一个从外部state对象到
                        UI组件的props对象的映射。执行后返回一个对象，里面的每一个键值对就是一个映射
                    (2) mapStateToProps会订阅store，那么组件将会监听对应的Redux store的变化，每当store更新的时候，就会自动执行，重新计算UI组件的参数
                        从而触发UI组件的重新渲染
                    (3) mapStateToProps的第一个参数总是state对象，还可以使用第二个参数，这个参数代表的是组件的props
                        如果传入这个参数以后，如果容器组件的props发生变化以后，也会引发组件的重新渲染

                    - 为什么会触发更新呢？
                        function makeSelectorStateful(sourceSelector, store) {
                            const selector = {
                                // run其实做了两个事情
                                //1、去计算nextProps的值
                                //2、如果有更新，设置shouldComponentUpdate=true 跟 props
                                run: function runComponentSelector(props) {
                                try {
                                    const nextProps = sourceSelector(store.getState(), props)
                                    // 注意这里只是进行了一个浅比较，当不等的时候，shouldComponentUpdate = true
                                    if (nextProps !== selector.props || selector.error) {
                                    selector.shouldComponentUpdate = true
                                    selector.props = nextProps
                                    selector.error = null
                                    }
                                } catch (error) {
                                    selector.shouldComponentUpdate = true
                                    selector.error = error
                                }
                                }
                            }

                            return selector
                        }

                mapDispatchToProps

                mergeProps

                options
                

        */
    }

    public render() {
        return <p>
            Redux
        </p>
    }
}
