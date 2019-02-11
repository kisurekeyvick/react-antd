import { ISettingFormItems, ITableColumns } from '../interface';

const formItems: ISettingFormItems[] = [
    {
        label: '分配方式选择',
        id: 1,
        key: 'assign',
        type: 'radioGroup',
        config: {
            options: [
                { name: '1.按照客户类型平均分配', value: 1 },
                { name: '2.按照成交率分配，成交率高的续保员分的新客户更多', value: 2 }
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
            initialValue: undefined
        }
    },
    {
        label: '成交率第一分配比例上浮',
        id: 2,
        key: 'ratio',
        type: 'inputNumber',
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
                    xs: { span: 14 },
                },
            },
            min: 0,
            rule: [],
            initialValue: undefined
        }
    },
    {
        label: '当前分配比例',
        id: 3,
        key: '',
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
                    sm: { span: 24 },
                    md: { span: 16 },
                    lg: { span: 19 },
                    xl: { span: 20 },
                    xxl: { span: 21 }
                }
            }
        }
    },
    {
        label: '使用说明',
        id: 4,
        key: '',
        type: 'pureText',
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
                    sm: { span: 24 },
                    md: { span: 16 },
                    lg: { span: 19 },
                    xl: { span: 20 },
                    xxl: { span: 21 }
                }
            },
            content: '该分配规则只分配没有续保员的新增客户，指定续保员的客户不受影响。第一种方式主要考虑分配公平性，会按照新转续，续转续、间转续等各种客户类型平均分 配给续保员， 第二种分配方式考虑提升团队整体成交率，激励大家提高成交率，建议使用系统4周后，积累成交数据再使用该分配方式。'
        }
    }
];

const tableColumns: ITableColumns[] = [
    {
        title: '续保员',
        dataIndex: 'salesmanName',
        key: 'salesmanName',
        id: 1
    },
    {
        title: '成交率排名',
        dataIndex: 'ranking',
        key: 'ranking',
        id: 2
    },
    {
        title: '成交率',
        dataIndex: 'rate',
        key: 'rate',
        id: 3
    },
    {
        title: '分配比例',
        dataIndex: 'assignRate',
        key: 'assignRate',
        id: 4
    }
];

export {
    ISettingFormItems,
    ITableColumns,
    formItems,
    tableColumns
}