import { IAction } from './reducer-interface';

export const postReducer = (state = {list: [{'title': 'hello kisure'}]}, action: IAction) => {
    switch(action.type) {
        case 'LOAD_POSTS':
            return {...state, list: action.payload};
        default:
            return state;
    }
};
