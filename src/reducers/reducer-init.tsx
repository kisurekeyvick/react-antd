import { INIT_DATA } from '../actions/action-init';

export const initGetData = (state={}, action: any) => {
    switch(action.type) {
        case INIT_DATA:
            return {...action.data};
        default:
            return state;
    }
}