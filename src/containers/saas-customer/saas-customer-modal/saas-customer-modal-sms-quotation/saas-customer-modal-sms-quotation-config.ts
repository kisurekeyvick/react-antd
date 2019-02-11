import { Iform } from '../interface';

interface IOption {
    name: string;
    value: string;
    key: string;
}

const stringOption = (count: number) => {
    const stringArr: string[] = [];
    for(let i = 0; i<count; i++) {
        stringArr.unshift(String(i+1));
    }
    return stringArr;
}

const formItems:Iform[] = [
    {
        label: '商业险返点',
        id: 1,
        key: 'businessDiscount',
        type: 'autoComplete',
        placeholder: '请输入或选择',
        config: {
            rule: [
            ],
            options:stringOption(40),
            initialValue: undefined,
            hasFeedback: true,
            colLayOut: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
            formItemLayout: {
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 7 }
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 14 },
                }
            }
        },
    },
    {
        label: '交强险返点',
        id: 2,
        key: 'insDiscount',
        type: 'autoComplete',
        placeholder: '请输入或选择',
        config: {
            rule: [
            ],
            options:stringOption(40),
            initialValue: undefined,
            hasFeedback: true,
            colLayOut: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
            formItemLayout: {
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 7 }
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 14 },
                }
            }
        },
    },
    {
        label: '优惠赠品',
        id: 3,
        key: 'gift',
        type: 'select',
        placeholder: '请选择优惠赠品',
        config: {
            rule: [ ],
            mode: 'multiple',
            options:[],
            initialValue: undefined,
            hasFeedback: false,
            colLayOut: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
            formItemLayout: {
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 7 }
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 14 },
                }
            }
        },
    },
    {
        label: '去税点',
        id: 4,
        key: 'taxPoint',
        type: 'checkbox',
        placeholder: '请选择',
        config: {
            rule: [
            ],
            options:[],
            initialValue: undefined,
            hasFeedback: false,
            tooltip: '优惠金额中扣除返点金额*6%的税点',
            colLayOut: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
            formItemLayout: {
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 7 }
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 14 },
                }
            }
        },
    },
    {
        label: '',
        id: 5,
        key: 'content',
        type: 'div',
        placeholder: '请输入内容',
        config: {
            rule: [
                { required: true, message: '短信内容必填' },
            ],
            options:[],
            initialValue: undefined,
            hasFeedback: true,
            colLayOut: {
                xs: { span: 24 },
                sm: { span: 24 },
            },
            formItemLayout: {
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 14 },
                }
            }
        },
    },
    {
        label: '接收人',
        id: 6,
        key: 'sendMobilePhone',
        type: 'checkbox-group',
        placeholder: '请选择',
        config: {
            rule: [
                { required: true, message: '接收人为必填项' },
            ],
            options: [
                { name: '车主', value: '', key: 'carOnwer' },
                { name: '备用联系人', value: '', key: 'backupPerson' }
            ],
            hasFeedback: true,
            initialValue: undefined,
            colLayOut: {
                xs: { span: 24 },
                sm: { span: 24 },
            },
            formItemLayout: {
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 3 }
                },
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
    formItems,
    IOption
}