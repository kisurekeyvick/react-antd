import * as customer from '../actions/saas-customer-action';

const defaultStatus: any = {
    workspace: {},
    renewalMan: [],
    shopSc: [],
    company: [],
    placeShortName: '',
    provinces: {}
};

export const saasCustomer = (state: any = defaultStatus, action: any = {}) => {
    switch(action.type) {
        case customer.CUSTOMERWORKSPACE:
            return {...state, ...{workspace: action.workspace}};
        case customer.RENEWALMAN:
            return {...state, ...{renewalMan: action.renewalMan}};
        case customer.SHOPSC:
            return {...state, ...{shopSc: action.shopSc}};
        case customer.COMPANY:
            return {...state, ...{company: action.company}};
        case customer.PLACESHORTNAME:
            return {...state, ...{placeShortName: action.placeShortName}};
        case customer.PROVINCES:
            return {...state, ...{provinces: action.provinces}};
        default:
            return state;
    }
}
