import { IConfig, IForm} from '../interface';

const loginFormItem: IForm[] = [
    {
        label: '用户名',
        id: 1,
        key: 'userName',
        type: 'input',
        placeholder: '请输入用户名',
        config: {
            rule: [
                { required: true, message: '请输入用户名！' }
            ],
            type: 'text',
            icon: 'user',
            initialValue: undefined,
            hasFeedback: true
        }
    },
    {
        label: '密码',
        id: 2,
        key: 'password',
        type: 'input',
        placeholder: '请输入密码',
        config: {
            rule: [
                { required: true, message: '请输入密码！' }
            ],
            type: 'password',
            icon: 'lock',
            initialValue: undefined,
            hasFeedback: true
        }
    },
    {
        label: '记住密码',
        id: 3,
        key: 'remember',
        type: 'checkbox-group',
        config: {
            rule:[],
            initialValue: true,
            hasFeedback: false
        }
    }
];

const loginPhoneFormItem: IForm[] = [
    {
        label: '手机号',
        id: 1,
        key: 'phone',
        type: 'input',
        placeholder: '请输入手机号',
        config: {
            rule: [
                { required: true, message: '请输入手机号！' }
            ],
            type: 'text',
            icon: 'mobile',
            initialValue: undefined,
            hasFeedback: true
        }
    },
    {
        label: '验证码',
        id: 2,
        key: 'verificationCode',
        type: 'input',
        placeholder: '请输入验证码',
        config: {
            rule: [
                { required: true, message: '请输入验证码！' }
            ],
            type: 'text',
            icon: 'mail',
            initialValue: undefined,
            hasFeedback: true
        }
    },
    {
        label: '记住密码',
        id: 3,
        key: 'remember',
        type: 'checkbox-group',
        config: {
            rule:[],
            initialValue: true,
            hasFeedback: false
        }
    }
];

export {
    IConfig,
    IForm,
    loginFormItem,
    loginPhoneFormItem
}
