import { ICustomerFormItems, ITableColumns } from '../interface';

const customerBaseForm: ICustomerFormItems[] = [
    {
        label: '车主',
        id: 1,
        key: 'carOwnerName',
        type: 'content-phone',
        value: '',
        config: {
            formItemLayout: {
                xs: { span: 24 },
                lg: {span: 12 },
                xl: { span:8 }
            },
            phone: ''
        }
    },
    {
        label: '备用联系人',
        id: 2,
        key: 'backupManName',
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
        label: '客户类型',
        id: 3,
        key: 'insType',
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
        label: '续保员',
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
        label: '提醒方式',
        id: 5,
        key: 'nextFollowWayName',
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
        label: '提醒时间',
        id: 6,
        key: 'nextFollowTime',
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
        label: '上次跟进',
        id: 7,
        key: 'lastFollowTime',
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
    carNumber: {
        label: '车辆',
        value: '',
        key: 'carNumber'
    },
    carBrandType: {
        label: '品牌',
        value: '',
        key: 'carBrandType'
    },
    processStatus: {
        label: '招揽状态',
        value: '',
        key: 'processStatus',
        tagColor: 'blue'
    },
    insIntention: {
        label: '客户意向',
        value: '',
        key: 'insIntention',
        tagColor: 'blue'
    }
};

export {
    ICustomerFormItems,
    ITableColumns,
    customerBaseForm,
    otherForm
}
