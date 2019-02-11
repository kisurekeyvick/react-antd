import { combineReducers } from 'redux'; 
import { postReducer } from './post-reducer';
import { countReducer } from './count-reducer';

// 通过combineReducers把多个reducers进行合并
const rootReducer = combineReducers({
    counter: countReducer,
    post: postReducer
});

export {
    rootReducer
}
