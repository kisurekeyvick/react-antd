import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from '../reducers/index-reducer';
import thunk from 'redux-thunk';

const initStore = {
    counter: {},
    post: {},
};

/* 
    - compose
        compose的作用就是组合多个函数
        compose(funcA, funcB, funcC) ==> compose(funcA(funcB(funcC()))))
    - applyMiddleware
        为redux添加中间件
*/
export const store = createStore(rootReducer, initStore, compose(
    applyMiddleware(thunk)
));