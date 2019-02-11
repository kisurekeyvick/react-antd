interface IConfig {
    rule: any[];
    initialValue: any;
    [key: string]: any;
    options?: any[];
    format?: string;
}

interface IFormItem {
    label: string;
    id: number;
    key: string;
    type: string;
    config: IConfig;
    placeholder?: string;
}

interface ITableColumns {
    title: string;
    key: string;
    id: number;
    dataIndex?: string; 
    [key: string]: any;
}

interface IOrderMethod {
    method: string; 
    describe: string; 
    formId: number[];
}

const successOrderMethod: IOrderMethod[] = [
    {
        method: '1',
        describe: '单商业险',
        formId: [1,2,4,5,6,8]
    },
    {
        method: '2',
        describe: '单商业险',
        formId: [1,3,4,7,9]
    },
    {
        method: '3',
        describe: '双险',
        formId: [1,2,3,4,5,6,7,8,9]
    }
];

const orderDetailFormItem: IFormItem[] = [
    {
        label: '成单保险公司',
        id: 1,
        key: 'insCompany',
        type: 'select',
        placeholder: '请选择',
        config: {
            rule: [
                { required: true, message: '保险公司为必填项' }
            ],
            options: [ ],
            formItemLayout: {
                labelCol: {
                    xs: { span: 24 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                }
            },
            initialValue: undefined
        }
    },
    {
        label: '交强险投保单号',
        id: 2,
        key: 'insPolicyNum',
        type: 'inputText',
        placeholder: '请输入',
        config: {
            rule: [
                { required: true, message: '交强险投保单号为必填项' }
            ],
            formItemLayout: {
                labelCol: {
                    xs: { span: 24 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                }
            },
            initialValue: undefined
        }
    },
    {
        label: '商业险投保单号',
        id: 3,
        key: 'bussinessPolicyNum',
        type: 'inputText',
        placeholder: '请输入',
        config: {
            rule: [
                { required: true, message: '商业险投保单号为必填项' }
            ],
            formItemLayout: {
                labelCol: {
                    xs: { span: 24 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                }
            },
            initialValue: undefined
        }
    },
    {
        label: '出单日期',
        id: 4,
        key: 'createdTime',
        type: 'datePicker',
        config: {
            rule: [
                { required: true, message: '出单日期为必填项' }
            ],
            format: 'YYYY-MM-DD HH:mm',
            formItemLayout: {
                labelCol: {
                    xs: { span: 24 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                }
            },
            initialValue: undefined
        }
    },
    {
        label: '交强险保费(元)',
        id: 5,
        key: 'insCipremium',
        type: 'inputNumber',
        config: {
            rule: [
                { required: true, message: '交强险保费为必填项' }
            ],
            formItemLayout: {
                labelCol: {
                    xs: { span: 24 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                }
            },
            initialValue: undefined
        }
    },
    {
        label: '车船税(元)',
        id: 6,
        key: 'taxAmount',
        type: 'inputNumber',
        config: {
            rule: [
                { required: true, message: '车船税为必填项' },
            ],
            formItemLayout: {
                labelCol: {
                    xs: { span: 24 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                }
            },
            initialValue: undefined
        }
    },
    {
        label: '商业险保费(元)',
        id: 7,
        key: 'bussinessCipremium',
        type: 'inputNumber',
        config: {
            rule: [
                { required: true, message: '商业险保费为必填项' },
            ],
            formItemLayout: {
                labelCol: {
                    xs: { span: 24 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                }
            },
            initialValue: undefined
        }
    },
    {
        label: '交强险起保时间',
        id: 8,
        key: 'insTime',
        type: 'datePicker',
        config: {
            rule: [
                { required: true, message: '交强险起保时间为必填项' },
            ],
            format: 'YYYY-MM-DD HH:mm',
            formItemLayout: {
                labelCol: {
                    xs: { span: 24 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                }
            },
            initialValue: undefined
        }
    },
    {
        label: '商业险起保时间',
        id: 9,
        key: 'bussinessTime',
        type: 'datePicker',
        config: {
            rule: [
                { required: true, message: '交强险起保时间为必填项' },
            ],
            format: 'YYYY-MM-DD HH:mm',
            formItemLayout: {
                labelCol: {
                    xs: { span: 24 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                }
            },
            initialValue: undefined
        }
    }
]

const giftDetailFormItem: IFormItem[] = [
    {
        label: '返现(元)',
        id: 1,
        key: 'backAmount',
        type: 'inputNumber',
        placeholder: '请输入',
        config: {
            rule: [
                { required: false, message: ' ' },
            ],
            formItemLayout: {
                labelCol: {
                    xs: { span: 24 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 8 }
                }
            }, 
            initialValue: undefined
        }
    }
]

const giftTableColumns: ITableColumns[] = [
    {
        title: '产品方案',
        dataIndex: 'name',
        key: 'name',
        id: 1
    },
    {
        title: '数量',
        dataIndex: 'mount',
        key: 'mount',
        id: 2
    },
    {
        title: '面值',
        dataIndex: 'marketPrice',
        key: 'marketPrice',
        id: 3
    },
    {
        title: '成本',
        dataIndex: 'costPrice',
        key: 'costPrice',
        id: 4
    },
    {
        title: '成本部门',
        dataIndex: 'costDepartmentName',
        key: 'costDepartmentName',
        id: 5
    },
];

export {
    IConfig,
    IFormItem,
    ITableColumns,
    IOrderMethod,
    successOrderMethod,
    orderDetailFormItem,
    giftDetailFormItem,
    giftTableColumns
}
