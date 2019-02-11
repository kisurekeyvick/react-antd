import { IConfig, IForm} from '../interface';

const registerForm: IForm[] = [
    {
        label: '邮箱',
        id: 1,
        key: 'email',
        type: 'input',
        placeholder: '请输入邮箱',
        config: {
            rule: [
                { required: true, message: '请输入邮箱！' }
            ],
            type: 'text',
            icon: 'mail',
            initialValue: undefined,
            hasFeedback: true
        }
    },
    {
        label: '密码',
        id: 2,
        key: 'password',
        type: 'input',
        placeholder: '至少6位密码，区分大小写',
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
        label: '再次确认密码',
        id: 3,
        key: 'passwordAgain',
        type: 'input',
        placeholder: '确认密码',
        config: {
            rule: [
                { required: true, message: '请确认密码！' }
            ],
            type: 'text',
            icon: 'lock',
            initialValue: undefined,
            hasFeedback: true
        }
    },
    {
        label: '手机号',
        id: 4,
        key: 'phone',
        type: 'input',
        placeholder: '手机号',
        config: {
            rule: [
                { required: true, message: '请输入手机号！' }
            ],
            type: 'text',
            icon: 'mobile',
            options: [
                { name: '+86', value: '86' },
                { name: '+87', value: '87' },
            ],
            initialValue: undefined,
            hasFeedback: true
        }
    },
    {
        label: '验证码',
        id: 4,
        key: 'verificationCode',
        type: 'input',
        placeholder: '请输入验证码',
        config: {
            rule: [
                { required: true, message: '请输入验证码！' }
            ],
            type: 'text',
            icon: 'mobile',
            initialValue: undefined,
            hasFeedback: true
        }
    }
];

export {
    IConfig, 
    IForm,
    registerForm
}
