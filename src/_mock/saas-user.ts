import * as Mock from 'mockjs';

const userToken = Mock.mock({
    result: {
        token: '1bdf7d1494e00796da2b7bf039e73f03',
        clientID: '12be417d-2352-425c-8363-1e1dcbbb26c0'
    }
});

export const user_login_token_api = Mock.mock('/api/user/login', 'post', (param: any) => {
    return userToken;
});

const tokenLogin = Mock.mock({
    result: true
});

export const user_token_login_api = Mock.mock('/api/tokenLogin', 'post', (param: any) => {
    return tokenLogin;
});