import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import rootReducer from './reducers/index';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware,  } from 'redux';

/**
 * 中间件
 */
// import promise from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
   
const initialState: any = {}; 
// const promiseMiddleware = promise();

const store = createStore(rootReducer, initialState, applyMiddleware(
  // promiseMiddleware,
  thunkMiddleware
));

console.log(store.getState());


ReactDOM.render(
  <Provider store= {store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();

/**
 * react-redux的核心：Provider和Connect
 * 
 * (1)connect
 *    connect的目的就是将state和dispatch绑定到react的组件上去，使得组件可以访问的到redux的数据。
 *    然后connect内部的Connect组件将你写的组件封装起来，这样组件就能够通过props来获取到父组件Connect传递过来的state和props
 * 
 *    export connect = (mapStateToProps) => (WrappedComponent) => {
 *      class Connect extends Component {
 *        static contextTypes = {
 *          store: PropTypes.object
 *        };
 * 
 *        constructor() {
 *          super();
 *          this.state = { allProps:{} };
 *        }
 * 
 *        componentWillMount() {
 *          const { store } = this.context;
 *          this._updateProps();
 *          store.subscrible(()=> this._updateProps());
 *        }
 * 
 *        _updateProps() {
 *          const { store } = this.context;
 *          let stateProps = mapStateToProps(store.getState(), this.props);
 *          this.setState({
 *            allProps:{
 *              ...stateProps,
 *              ...this.props
 *            }
 *          });
 *        }
 * 
 *        render() {
 *          return <WrappedComponent {...this.state.allProps}/>
 *        }
 *      }
 * 
 *      return Connect;
 *    }
 * 
 *    connect会接收一个组件，然后把这个组件包含在新的Connect组件中，Connect会去context里面取出store
 * 
 *    connect存在4个参数
 *    1.mapStateToProps
 *      这是一个function，能够返回一个object，作用就是告诉组件取哪些数据。
 *      如果定义了这个参数，那么只要react store发生了变化，那么mapStateToProps就会被调用
 *      这个回调函数必须返回一个纯对象，返回的对象会与组件的props合并。
 *      如果省略了这个参数，那么组件将不会监听Redux store
 * 
 *    2.mapDispatchToProps
 *      如果传递的是一个对象，那么每个定义在该对象的函数都将被当作 Redux action creator。
 *      如果传递的是一个函数，该函数将会接收一个dispatch函数，然后由你来决定如何返回一个对象，这个对象和通过dispatch
 *        函数与action creator 以某种方式绑定在一起
 * 
 *    3.mergeProps
 * 
 *    4.options
 * 
 *    使用：
 *    import { increment } from '../actionsCreators';
 * 
 *    哪些redux全局的state是我们组件想要通过props来获取的
 *    function mapStateToProps(state) {
 *      return {
 *        value: state.counter
 *      }
 *    }
 * 
 *    有哪些action 创建函数使我们想要通过props获取的
 *    function mapDispatchToProps(dispatch) {
 *      return {
 *        onIncrement: () => dispatch(increment())
 *      }
 *    }
 * 
 *    export default connect(
 *      mapStateToProps,
 *      mapDispatchToProps
 *    )(Counter)
 * 
 * 2018/10/21
 *  对于connect的理解
 *  connect这个方法其实就是将组件在Connect这个类的render方法中进行渲染，并获取connect中出传入的各种额外数据
 *  (1)mapStateToProps
 *    connect的第一个参数告诉组件需要重redux状态树中提取哪些部分当做props传给当前组件，如果我们不传入这个参数，那么React组件将不会和Redux的状态树
 *    产生任何关系
 * 
 *    const mapState = mapStateToProps || defaultMapStateToProps;
 *    这一步是我们使用connect的时候，如果没有传第一个参数，那么就会默认的返回一个空的对象(defaultMapStateToProps是一个空的对象)
 *    如果第一个参数存在，那么就会把当前的store和props作为参数传递给mapState
 * 
 *    // ......
 * 
 *    class Connect extends Componet {
 *      configureFinalMapState(store, props) {
 *        const mappedState = mapState(store.getState(), props);
 *        const isFactory = typeof mappedState === 'function';
 * 
 *        this.finalMapStateToProps = isFactory ? mappedState : mapState；
 *        this.doStatePropsDependOnOwnProps = this.finalMapStateToProps.length !== 1
 * 
 *        if(isFactory) {
 *          return this.computeStateProps(store, props)
 *        }
 * 
 *        if (process.env.NODE_ENV !== 'production') {
 *          checkStateShape(mappedState, 'mapStateToProps');
 *        }
 * 
 *        return mappedState
 *      }
 *    }
 * 
 *    Connect这个class中有 finalMapStateToProps 这个方法，这个方法就是用来计算出最终从redux状态树中提取出哪些值作为当前组件的props
 *    
 *  (2)mapDispatchToProps
 *    它接收store的dispatch作为第一个参数，同事接收this.props作为可选的第二个参数。
 *    利用这个，我们可以将actionCreator和dispatch绑定在一起，最终会将这个绑定好的方法作为props传给当前的组件
 * 
 *    mapDispatchToProps的设计思路和mapStateToProps是一样的，唯一的区别在于接收的第一个参数是store.dispatch，而mapStateToProps接收的参数是：store.getState
 * 
 *  (3)mergeProps
 *    mergeProps是一个函数，它接收：stateProps、dispatchProps 和 ownProps 作为实际参数
 *    stateProps使我们传给connect的第一个参数最终返回的props
 *    dispatchProps是我们传给connect的第二个参数的最终产物
 * 
 * 
 *  关于redux的性能优化，来自于 react-redux的connect优化
 *    问题：在redux中，每个action被派发，所有的reducer都会被执行一遍。虽然每个reducer都会通过switch来进行判断，但是所有的reducer加起来，还是不容小视的
 *    大多数情况下，应用的action都是和某个reducer对应，因此我们可以指定特殊情况，让redux在特殊情况下只执行和action对应的那个reducer
 *    
 *    const specialActions = (reducer, reg, actions) => {
 *      return (state, action) => {
 *        if (actions.indexOf(action.type) !== -1) {
 *          return reducer(state);
 *        }
 * 
 *        if (action.type.match(reg)) {
 *          return reducer(state)
 *        }
 * 
 *        return state;
 *      }
 *    }
 * 
 *    combineReducers({
 *      counter:specialActions(counter, /COUNTER$/, [SELECT_RADIO]),
 *      radio:specialActions(radio, /RADIO$/, [INCREMENT_COUNTER])
 *    });
 * 
 *  (2)同步分发多个action
 *      
 *    
 * (2)Provider
 *    Provider是顶层组件的作用，将store共享给全局，实现将store进行上下文传递
 * 
 *    export default class Provider extends Component {
 *      getChildContext() {
 *        return { store: this.store }
 *      }
 *      
 *      constructor(props, context) {
 *        super(props, context)
 *        this.store = props.store
 *      }
 * 
 *      render() {
 *        return Children.only(this.props.children);
 *      }
 *    } 
 * 
 *    Provider.propTypes = {
 *      store: storeShape.isRequired,
 *      children: PropTypes.element.isRequired
 *    };
 * 
 *    Provider.childContextTypes = {
 *      store: storeShape.isRequired
 *    };
 * 
 *    (1)this.props.children 用于获取当前组件的所有子组件  
 *    (2)children是react内部定义的顶级对象，这个对象封装了一些方便操作子组件的方法
 *        children.only 用于获取仅有的子组件，没有或者超过一个子组件都会报错，所以我们需要确保Provider中的直接子集是单个封闭元素，
 *        切勿多个子组件平行放置
 *    (3)constructor
 *        Provider初始化的时候，通过props获取到的store对象
 *    (4)getChildContext
 *        将外部的store对象放入context对象中，这样子组件如果使用了connect，那么都可以访问到context对象中的store  
 *        使用该方法，那么父组件就可以往context内存放对应的值
 */

 /**
  * react context
  * context的作用就是缩短父组件到子组件的属性传递路径
  */

/**
 * 关于redux： http://www.redux.org.cn/docs/introduction/ThreePrinciples.html
 * 
 * 1.三大原则
 * (1)单一数据源
 *  整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。
 * 
 * (2)state是只读
 *  唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。
 * 
 * (3)使用纯函数来执行修改
 *  为了描述 action 如何改变 state tree ，你需要编写 reducers。
 * 
 * 2.关于store
 *   action就是描述已经发生了什么，reducer是用来根据action来更新state的function，而store就是把它们联系起来的对象
 * 
 *   store拥有一下职责：
 *    (1)提供getState() 方法获取state
 *    (2)提供dispatch(action) 方法更新state
 *    (3)通过subscribe(listener) 注册监听器
 * 
 *   redux存在一个方法 createStore 
 *   createStore(reducer, initState,)  的第一个参数传入reducer,第二个参数是可选的用于设置state的初始状态，第三个参数是一个组合 store creator 的高阶函数
 *   
 *   这里需要注意的是：当store创建以后，Redux会dispatch一个action到reducer上，用来初始的state来填充store。
 *   
 * 3.关于combineReducers
 *    combineReducers的作用就是吧一个由多个不同reducer函数作为value的object，合并成一个最终的reducer函数，然后就对这个reducer调用 createStore 方法。
 *    由combineReducers() 返回的state对象，会将传入的每个reducer返回的state按其传递给combineReducers()是对应的key进行命名
 * 
 *    例如：rootReducer = combineReducers({potato: potatoReducer, tomato: tomatoReducer})
 *    那么这个rootReducer的值就是：
 *    {
 *      potato: {
 *        //....
 *      },
 *      tomato: {
 *        //....
 *      }
 *    }
 * 
 *    需要注意的是：
 *    (1) 所有未匹配到的action，必须把它接收到的第一个参数也就是 state 原封不动的返回
 *    (2) 永远不能返回undefined。当过早 return 时非常容易犯错。为了避免错误扩散，遇到这种情况时 combineReducers 会抛异常。
 *    (3) 如果传入的state是undefined，一定要返回对应reducer的初始state
 *    (4) 初始state禁止使用undefined
 * 
 * 4.applyMiddleware  
 *    参考：https://segmentfault.com/a/1190000016386740
 * 
 *    args代表的就是：reducer, preloadedState, enhancer
 * 
 *    export function applyMiddleware(middleware) {
 *      return createStore => (...args) => {
 *        const store = createStore(...args);
 *        // 这一步先获取createStore返回的store对象
 *    
 *        let dispatch = () => {
 *          throw new Error(
 *            `Dispatching while constructing your middleware is not allowed. `
 *          );
 *        }
 *        // 一开始默认设置dispatch为报错
 * 
 *        const middlewareAPI = {
 *          getState: store.getState,
 *          dispatch: (...args) => dispatch(...args)
 *        }
 *        // middlewareAPI中的getState 就是createStore返回的store里面的方法
 *        // dispatch: (...args) => dispatch(...args)
 *           这里的dispatch并不是store.dispatch,而是一个外部的变量dispatch,这个变量最终指向的是覆盖后的dispatch
 *           之所以这样做，是因为对于redux-thunk这样的异步中间件，内部调用store.dispatch的时候任然会走一遍所有的"中间件"
 *         
 *        const chain = middlewares.map(middleware => middleware(middlewareAPI));
 *        // chain是一个数组，数组的每个元素都是这样一个函数 next => action => { XXX } 这个函数可以理解为接受一个dispatch
 *            返回一个dispatch,接受的dispatch是后一个中间件返回的dispatch
 * 
 *        dispatch = compose(...chain)(store.dispatch);
 *        // compose的主要作用就是返回 f(g(h(..args)))
 *        function compose(...funcs) {
 *            if (funcs.length === 0) {
 *              return (arg)=> arg;
 *            }
 * 
 *            if (funcs.length === 1) {
 *              return funcs[0];
 *            }
 * 
 *            return funcs.reduce((a, b) => (...args) => a(b(...args)));
 *        }
 *      
 *        当我们运行compose的时候，传入store.dispatch作为最后一个"中间件"，然后就会返回一个新的dispatch,然后再向外
 *        传递到前一个中间件，直至返回最终的dispatch,当覆写后的dispatch调用的时候，每个"中间件"的执行又是从外向内的
 *        "洋葱圈"模型   
 * 
 *        return {
 *          ...store,
 *          dispatch
 *        }
 *      }
 *    }
 * 
 *    值得学习的是：为了让"中间件"只能应用一次，applyMiddleware 并不是作用在 store 的实例上。而是作用在 createStore 工厂方法上
 *    当多次调用 applyMiddleware(store, middlewares)的话就会给同一个实例重复添加同样的中间件。所以applyMiddleware的形式就是：
 *    (...middlewares) => (createStore) => createStore
 *    这样每一次应用中间件时都是创建一个新的实例，避免了中间件重复应用的问题
 *    
 * 5.middleware
 *    中间件的作用就是对dispatch进行包装，返回一个带有被包装的dispatch的store
 */