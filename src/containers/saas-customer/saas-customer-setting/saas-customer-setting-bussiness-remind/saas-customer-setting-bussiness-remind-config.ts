import { ISettingFormItems, ITableColumns } from '../interface';

interface ITableValue {
    customerGrade: string; 
    day: any; 
    id:number; 
    key: number;
}

const formItems: ISettingFormItems[] = [
    {
        label: '保险到期提前激活天数',
        id: 1,
        key: 'advanceFollowDays',
        type: 'inputNumber',
        config: {
            rule: [
                { required: false, message: ' ' }
            ],
            formItemLayout: {
                labelCol: {
                    xs: { span: 10 },
                    sm: { span: 10 },
                    md: { span: 8 },
                    lg: { span: 5 },
                    xl: { span: 4 },
                    xxl: { span: 3 }
                },
                wrapperCol: {
                    xs: { span: 14 },
                }
            },
            hasFeedback: true,
            initialValue: undefined
        }
    },
    {
        label: '启用',
        id: 2,
        key: 'activate',
        type: 'switch',
        config: {
            checked: '开',
            unChecked: '关',
            formItemLayout: {
                labelCol: {
                    xs: { span: 10 },
                    sm: { span: 10 },
                    md: { span: 8 },
                    lg: { span: 5 },
                    xl: { span: 4 },
                    xxl: { span: 3 }
                },
                wrapperCol: {
                    xs: { span: 14 },
                }
            },
            hasFeedback: false,
            initialValue: false
        }
    },
    {
        label: '客户维护周期',
        id: 2,
        key: 'cycle',
        type: 'table',
        config: {
            formItemLayout: {
                labelCol: {
                    xs: { span: 10 },
                    sm: { span: 10 },
                    md: { span: 8 },
                    lg: { span: 5 },
                    xl: { span: 4 },
                    xxl: { span: 3 }
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 20 },
                }
            },
            hasFeedback: false,
        }
    }
];

const tableColumns: ITableColumns[] = [
    {
        title: '客户级别',
        dataIndex: 'customerGrade',
        key:'customerGrade',
        id: 1
    },
    {
        title: '回访周期(天)',
        dataIndex: 'day',
        key: 'day',
        id: 2
    }
];

const tableValue: ITableValue[] = [
    {
        customerGrade: '首次新增',
        day: null,
        id: 1,
        key: 1
    },
    {
        customerGrade: '高意向',
        day: null,
        id: 2,
        key: 2
    },
    {
        customerGrade: '中意向',
        day: null,
        id: 3,
        key: 3
    },
    {
        customerGrade: '低意向',
        day: null,
        id: 4,
        key: 4
    },
];

export {
    ISettingFormItems,
    ITableColumns,
    ITableValue,
    formItems,
    tableColumns,
    tableValue
};
