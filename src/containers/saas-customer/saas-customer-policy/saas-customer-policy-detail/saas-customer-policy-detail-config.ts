import { IPolicyFormItems, ITableColumns } from '../interface';

const customerForm: IPolicyFormItems[] = [
    {
        label: '客户',
        id: 1,
        key: 'carOwnerName',
        type: 'content',
        value: '',
        config: {
            className: 'customerName',
            formItemLayout: {
                xs:24
            }
        }
    },
    {
        label: '车牌号码',
        id: 2,
        key: 'carNumber',
        type: 'content',
        value: '',
        config: {
            formItemLayout: {
                xs: { span: 24 },
                lg: {span: 12 },
                xl: { span:8 }
            }
        }
    },
    {
        label: '车架号码',
        id: 3,
        key: 'vinNumber',
        type: 'content',
        value: '',
        config: {
            formItemLayout: {
                xs: { span: 24 },
                lg: {span: 12 },
                xl: { span:8 }
            }
        }
    },
    {
        label: '询价人',
        id: 4,
        key: 'salesmanName',
        type: 'content',
        value: '',
        config: {
            formItemLayout: {
                xs: { span: 24 },
                lg: {span: 12 },
                xl: { span:8 }
            }
        }
    },
    {
        label: '询价时间',
        id: 5,
        key: 'createdTime',
        type: 'content',
        value: '',
        config: {
            formItemLayout: {
                xs: { span: 24 },
                lg: {span: 12 },
                xl: { span:8 }
            }
        }
    }
];

const carForm: IPolicyFormItems[] = [
    {
        label: '车牌号码',
        id: 1,
        key: 'carNumber',
        type: 'content',
        value: '',
        config: {
            formItemLayout: {
                xs: { span: 24 },
                lg: {span: 12 },
                xl: { span:8 }
            }
        }
    },
    {
        label: '车架号码',
        id: 2,
        key: 'vinNumber',
        type: 'content',
        value: '',
        config: {
            formItemLayout: {
                xs: { span: 24 },
                lg: {span: 12 },
                xl: { span:8 }
            }
        }
    },
    {
        label: '发动机号',
        id: 3,
        key: 'engineNumber',
        type: 'content',
        value: '',
        config: {
            formItemLayout: {
                xs: { span: 24 },
                lg: {span: 12 },
                xl: { span:8 }
            }
        }
    },
    {
        label: '号牌类型',
        id: 4,
        key: 'plateType',
        type: 'content',
        value: '',
        config: {
            formItemLayout: {
                xs: { span: 24 },
                lg: {span: 12 },
                xl: { span:8 }
            }
        }
    },
    {
        label: '能源类型',
        id: 5,
        key: 'energyType',
        type: 'content',
        value: '',
        config: {
            formItemLayout: {
                xs: { span: 24 },
                lg: {span: 12 },
                xl: { span:8 }
            }
        }
    },
    {
        label: '初登日期',
        id: 6,
        key: 'startRegisterDate',
        type: 'content',
        value: '',
        config: {
            formItemLayout: {
                xs: { span: 24 },
                lg: {span: 12 },
                xl: { span:8 }
            }
        }
    },
    {
        label: '厂牌型号',
        id: 7,
        key: 'modelType',
        type: 'content',
        value: '',
        config: {
            formItemLayout: {
                xs: { span: 24 },
                lg: {span: 12 },
                xl: { span:8 }
            }
        }
    },
    {
        label: '核定载客(座)',
        id: 8,
        key: 'seatCount',
        type: 'content',
        value: '',
        config: {
            formItemLayout: {
                xs: { span: 24 },
                lg: {span: 12 },
                xl: { span:8 }
            }
        }
    },
    {
        label: '协商价值',
        id: 9,
        key: 'negotiatedValue',
        type: 'content',
        value: '',
        config: {
            formItemLayout: {
                xs: { span: 24 },
                lg: {span: 12 },
                xl: { span:8 }
            }
        }
    },
    {
        label: '号牌底色',
        id: 10,
        key: 'plateColorType',
        type: 'content',
        value: '',
        config: {
            formItemLayout: {
                xs: { span: 24 },
                lg: {span: 12 },
                xl: { span:8 }
            }
        }
    },
    {
        label: '是否过户车',
        id: 11,
        key: 'loanTransferFlag',
        type: 'content',
        value: '',
        config: {
            formItemLayout: {
                xs: { span: 24 },
                lg: {span: 12 },
                xl: { span:8 }
            }
        }
    },
    {
        label: '过户日期',
        id: 12,
        key: 'transferTime',
        type: 'content',
        value: '',
        config: {
            formItemLayout: {
                xs: { span: 24 },
                lg: {span: 12 },
                xl: { span:8 }
            }
        }
    },
];

const personForm: IPolicyFormItems[] = [
    {
        label: '车主姓名',
        id: 1,
        key: 'name',
        type: 'content',
        value: '',
        config: {
            formItemLayout: {
                xs: { span: 24 },
                lg: {span: 12 },
                xl: { span:8 }
            }
        }
    },
    {
        label: '车主性质',
        id: 2,
        key: 'ownerProp',
        type: 'content',
        value: '',
        config: {
            formItemLayout: {
                xs: { span: 24 },
                lg: {span: 12 },
                xl: { span:8 }
            }
        }
    },
    {
        label: '车主证件类型',
        id: 3,
        key: 'certType',
        type: 'content',
        value: '',
        config: {
            formItemLayout: {
                xs: { span: 24 },
                lg: {span: 12 },
                xl: { span:8 }
            }
        }
    },
    {
        label: '车主身份证',
        id: 4,
        key: 'certNum',
        type: 'content',
        value: '',
        config: {
            formItemLayout: {
                xs: { span: 24 },
                lg: {span: 12 },
                xl: { span:8 }
            }
        }
    },
    {
        label: '被保险人',
        id: 5,
        key: 'beinsuredOwnerName',
        type: 'content',
        value: '',
        config: {
            formItemLayout: {
                xs: { span: 24 },
                lg: {span: 12 },
                xl: { span:8 }
            }
        }
    },
    {
        label: '投保人手机',
        id: 6,
        key: 'mobilePhone',
        type: 'content',
        value: '',
        config: {
            formItemLayout: {
                xs: { span: 24 },
                lg: {span: 12 },
                xl: { span:8 }
            }
        }
    },
];

const compulsoryInsForm: IPolicyFormItems[] = [
    {
        label: '交强险保费',
        id: 1,
        key: 'compulsoryCost',
        type: 'content',
        value: '',
        config: {
            formItemLayout: {
                xs: { span: 24 },
                lg: {span: 12 },
                xl: { span:8 }
            }
        }
    },
    {
        label: '交强险期限',
        id: 2,
        key: 'insTime',
        type: 'content',
        value: '',
        config: {
            formItemLayout: {
                xs: { span: 24 },
                lg: {span: 12 },
                xl: { span:8 }
            }
        }
    },
    {
        label: '车船税',
        id: 3,
        key: 'taxAmount',
        type: 'content',
        value: '',
        config: {
            formItemLayout: {
                xs: { span: 24 },
                lg: {span: 12 },
                xl: { span:8 }
            }
        }
    },
    {
        label: '承保单号',
        id: 4,
        key: 'policyNum',
        type: 'content',
        value: '',
        config: {
            formItemLayout: {
                xs: { span: 24 },
                lg: {span: 12 },
                xl: { span:8 }
            }
        }
    }
];

const bussinessInsForm: IPolicyFormItems[] = [
    {
        label: '折扣比例',
        id: 1,
        key: 'insDiscount',
        type: 'content',
        value: '',
        config: {
            formItemLayout: {
                xs: { span: 24 },
                lg: {span: 12 },
                xl: { span:8 }
            }
        }
    },
    {
        label: '商业险期限',
        id: 2,
        key: 'insTime',
        type: 'content',
        value: '',
        config: {
            formItemLayout: {
                xs: { span: 24 },
                lg: {span: 12 },
                xl: { span:8 }
            }
        }
    },
    {
        label: '承保单号',
        id: 3,
        key: 'policyNum',
        type: 'content',
        value: '',
        config: {
            formItemLayout: {
                xs: { span: 24 },
                lg: {span: 12 },
                xl: { span:8 }
            }
        }
    },
];

const bussinessTableColums: ITableColumns[] = [
    {
        title: '险种',
        dataIndex: 'policyItemMapName',
        key: 'policyItemMapName',
        id: 1
    },
    {
        title: '保额(元)',
        dataIndex: 'insItemValue',
        key: 'insItemValue',
        id: 1
    },
    {
        title: '保费(元)',
        dataIndex: 'insItemCost',
        key: 'insItemCost',
        id: 1
    },
];

const otherForm: any = {
    policyCompany: {
        name: '保险公司',
        value: '',
        key: 'policyCompany'
    },
    insTotalCost: {
        name: '保费合计(车船税)',
        value: '',
        key: 'insTotalCost'
    },
    compulsoryInsPlanCost: {
        name: '强制保险费用',
        value: '',
        key: 'compulsoryInsPlanCost'
    },
    bussinessInsPlanCost: {
        name: '商业保险费用',
        value: '',
        key: 'bussinessInsPlanCost'
    }
};

const giftTableColums: ITableColumns[] = [
    {
        title: '产品方案',
        dataIndex: 'giftName',
        key: 'giftName',
        id: 1
    },
    {
        title: '数量',
        dataIndex: 'giftNumber',
        key: 'giftNumber',
        id: 2
    },
    {
        title: '面值(元)',
        dataIndex: 'giftMarketPrice',
        key: 'giftMarketPrice',
        id: 3
    },
    {
        title: '成本(元)',
        dataIndex: 'giftCostPrice',
        key: 'giftCostPrice',
        id: 4
    },
    {
        title: '成本部门',
        dataIndex: 'costDepartmentName',
        key: 'costDepartmentName',
        id: 5
    },
];

const giftForm: IPolicyFormItems[] = [
    {
        label: '面值总额',
        id: 1,
        key: 'faceTotalAccount',
        type: 'content',
        value: '',
        config: {
            formItemLayout: {
                xs: { span: 24 },
                lg: {span: 12 },
                xl: { span:8 }
            }
        }
    },
    {
        label: '返现金额',
        id: 2,
        key: 'cashback',
        type: 'content',
        value: '',
        config: {
            formItemLayout: {
                xs: { span: 24 },
                lg: {span: 12 },
                xl: { span:8 }
            }
        }
    },
]

export {
    IPolicyFormItems,
    ITableColumns,
    customerForm,
    carForm,
    personForm,
    compulsoryInsForm,
    bussinessInsForm,
    bussinessTableColums,
    otherForm,
    giftTableColums,
    giftForm
}
