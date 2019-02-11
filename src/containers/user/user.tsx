import * as React from 'react';
import UserLogin from './user-login/user-login';
// import UserRegister from './user-register/user-register';
import './user.scss';

export default class User extends React.PureComponent<any, any> {
    constructor(public props: any) {
        super(props); 
    }

    public render() {
        return <div className='user-container-box'>
                    <UserLogin />
                </div>
    }
}

// 
// <UserRegister />
