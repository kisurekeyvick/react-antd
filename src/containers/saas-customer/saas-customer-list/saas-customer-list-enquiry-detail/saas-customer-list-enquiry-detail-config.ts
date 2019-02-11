import {ICustomerFormItems, ITableColumns} from '../interface';

const customerForm: ICustomerFormItems[] = [
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
        label: '询价人',
        id: 3,
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
        id: 4,
        key: 'updatedTime',
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
        label: '报价单号',
        id: 5,
        key: 'quotationNumber',
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

const carForm: ICustomerFormItems[] = [
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
        key: 'energyTypeCode',
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

const personForm: ICustomerFormItems[] = [
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
        key: 'insuredMan',
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
        key: 'beinsuredOwnerMobilePhone',
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

const compulsoryInsForm: ICustomerFormItems[] = [
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
];

const bussinessInsForm: ICustomerFormItems[] = [
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
];

const otherForm: any = {
    carOwnerName: {
        name: '客户',
        value: '',
        key: 'carOwnerName'
    },
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

const bussinessTableColums: ITableColumns[] = [
    {
        title: '险种',
        dataIndex: 'policyItemMapName',
        key: 'policyItemMapName',
        id: 1
    },
    {
        title: '保额',
        dataIndex: 'insItemValue',
        key: 'insItemValue',
        id: 2
    },
    {
        title: '保费',
        dataIndex: 'insItemCost',
        key: 'insItemCost',
        id: 3
    },
    {
        title: '不计免赔',
        dataIndex: 'noReduceCost',
        key: 'noReduceCost',
        id: 4
    }
];

export {
    ICustomerFormItems,
    ITableColumns,
    customerForm,
    otherForm,
    carForm,
    personForm,
    compulsoryInsForm,
    bussinessInsForm,
    bussinessTableColums
}
