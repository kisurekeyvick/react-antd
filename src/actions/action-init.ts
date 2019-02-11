import axios from 'axios';

export const INIT_DATA = 'INIT_DATA'

function initGet(json: any) {
    return {
        type:INIT_DATA,
        data: json
    };
}

function initData() {
    return (dispatch: any) => {
        return axios.get('/data.json').then((res) => {
            dispatch(initGet)
        }).catch((err) => {
            console.log(err);
        });
    }
}

export function init() {
    return (dispatch: any) => {
        return dispatch(initData());
    }
}

/**
 * 关于异步action
 * 
 * 
 */