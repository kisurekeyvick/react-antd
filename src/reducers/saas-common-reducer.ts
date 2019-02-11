import * as common from 'src/actions/saas-common-action';

const defaultStatus:any = {
    menu: [],
    dictionary: {}
};

export const saasCommon = (state: any = defaultStatus, action: any ={}) => {
    switch(action.type) {
        case common.SAASMENU:
            return {...state, ...{menu: action.menu}};
        case common.SAASDICTIONARY:
            return {...state, ...{dictionary: action.dictionary}}
        default:
            return state;
    }
}
