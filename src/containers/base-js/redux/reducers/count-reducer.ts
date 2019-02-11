import { IAction } from './reducer-interface';

export const countReducer = (state= {count: 1}, action: IAction) => {
    switch(action.type) {
        case 'COUNT_ADD':
            return {...state, count: (state.count || 0) + 1};
        case 'COUNT_REDUCE':
            return {...state, count: (state.count || 0) - 1};
        default:
            return state;
    }
};
