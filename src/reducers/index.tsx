import { combineReducers } from 'redux';

import { initGetData } from './reducer-init';
import { saasCustomer } from './saas-customer-reducer';
import { saasCommon } from './saas-common-reducer';

const rootReducer = combineReducers({
    initGetData,
    saasCustomer,
    saasCommon
});

export default rootReducer;   

/**
 * combineReducers
 * 
 * 基于redux的应用程序中最常见的state结构是一个简单的js对象
 * 类似这种state结构写reducer的方式是拆分成多个reducer，拆分之后的reducer都是相同的结构(state,action)
 * 并且每个函数独立负责管理特定切片state的更新
 * 多个拆分之后的reducer可以响应一个action，在需要的情况下独立的更新他们自己的切片state，最后组合成新的state
 * 
 * combineReducers的作用就是接收拆分后的reducer函数组成的对象，返回一个新的reducer函数
 */

/**
 *    combineReducers的作用就是吧一个由多个不同reducer函数作为value的object，合并成一个最终的reducer函数，然后就对这个reducer调用 createStore 方法。
 *    由combineReducers() 返回的state对象，会将传入的每个reducer返回的state按其传递给combineReducers()是对应的key进行命名
 * 
 *    例如：rootReducer = combineReducers({potato: potatoReducer, tomato: tomatoReducer})
 *    那么这个 rootReducer 的值就是：
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
 */