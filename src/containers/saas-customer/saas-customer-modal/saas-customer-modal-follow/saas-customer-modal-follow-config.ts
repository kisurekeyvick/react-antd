import { Iform } from '../interface';

const formItems: Iform[] = [
    {
        label: '跟进结果',
        id: 1,
        key: 'result',
        type: 'select',
        placeholder: '请选择',
        config: {
            rule: [
                { required: true, message: '跟进结果为必填项' },
            ],
            options:[],
            hasFeedback: true,
            initialValue: undefined,
            formItemLayout: {
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 18 },
                }
            }
        },
    },
    {
        label: '意向级别',
        id: 2,
        key: 'intentionLevel',
        type: 'button-group',
        placeholder: '请选择',
        config: {
            rule: [
                { required: true, message: '意向级别为必填项' },
            ],
            options:[],
            hasFeedback: true,
            initialValue: undefined,
            formItemLayout: {
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 18 },
                }
            }
        },
    },
    {
        label: '跟进内容',
        id: 3,
        key: 'content',
        type: 'textarea',
        placeholder: '请输入',
        config: {
            rule: [
                
            ],
            hasFeedback: false,
            initialValue: undefined,
            row: {
                sm: 24
            },
            formItemLayout: {
                wrapperCol: {
                    xs: { span: 21 },
                }
            }
        },
    },
    {
        label: '下次跟进',
        id: 4,
        key: 'nextFollowway',
        type: 'button-group-custom-time',
        placeholder: '请选择',
        config: {
            rule: [   
            ],
            options:[
                { name: '明天', value: '1' },
                { name: '3天后', value: '3' },
                { name: '一周后', value: '7' },
                { name: '自定义', value: '', tag: 'custom' }
            ],
            hasFeedback: false,
            initialValue: undefined,
            formItemLayout: {
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 18 },
                }
            }
        },
    },
    {
        label: '发消息提醒我',
        id: 5,
        key: 'remindMe',
        type: 'chexkbox',
        config: {
            rule: [
            ],
            icon: {
                content: '设置提醒后，会在跟进时间通过app和pc发送消息提醒'
            },
            hasFeedback: false,
            initialValue: undefined,
            formItemLayout: {
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 14 },
                }
            }
        },
    }
];

export {
    Iform,
    formItems
}