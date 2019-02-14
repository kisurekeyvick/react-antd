import * as React from 'react';
import * as PropTypes from 'prop-types';
import UserLogin from './user-login/user-login';
import UserRegister from './user-register/user-register';
import './user.scss';

export default class User extends React.PureComponent<any, any> {
    static propTypes = {
        param: PropTypes.string.isRequired,
        history: PropTypes.any.isRequired
    }

    constructor(public props: any) {
        super(props); 
    }

    public render() {
        const loginProps = {
            history: this.props.history
        };

        return <div className='user-container-box'>
                    {
                        this.props.param === 'login' ?
                        <UserLogin {...loginProps}/> :
                        <UserRegister />
                    } 
                </div>
    }
}
