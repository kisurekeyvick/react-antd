import { IFormItems, ITableColumns } from 'src/components/search/search-component-interface';

const formItems: IFormItems[] = [
    {
        key: 'QCustomerInfo',
        id: 1,
        label: '客户查询',
        placeholder: '请输入姓名/手机/车牌/vin后四位',
        type: 'inputText',
        config: {
            grid: {
                control: { 'sm': 20 }
            },
            initialValue: undefined,
        }
    },
    {
        key: 'QCustomerIntention',
        id: 2,
        label: '客户意向',
        placeholder: '请选择',
        type: 'select',
        config: {
            options: [],
            grid: {
                control: { 'sm': 20 }
            },
            initialValue: undefined,
        }
    },
    {
        key: 'QDirection',
        id: 3,
        label: '呼叫类型',
        placeholder: '请选择',
        type: 'select',
        config: {
            options: [],
            grid: {
                control: { 'sm': 20 }
            },
            initialValue: undefined,
        }
    },
    {
        key: 'QInsType',
        id: 4,
        label: '投保类型',
        placeholder: '请选择',
        type: 'select',
        config: {
            options: [],
            grid: {
                control: { 'sm': 20 }
            },
            initialValue: undefined,
        }
    },
    {
        key: 'QSalesman',
        id: 5,
        label: '续保员',
        placeholder: '请选择',
        type: 'select',
        config: {
            options: [],
            grid: {
                control: { 'sm': 20 }
            },
            initialValue: undefined,
        }
    },
    {
        key: 'QCallTime',
        id: 6,
        label: '通话日期',
        type: 'rangePicker',
        config: {
            format: 'YYYY-MM-DD',
            grid: {
                control: { 'sm': 20 }
            },
            initialValue: undefined,
        },
    },
];

const tableColumns: ITableColumns[] = [
    {
        title: '通话ID',
        dataIndex: 'id',
        key: 'id',
        id: 1
    },
    {
        title: '客户',
        dataIndex: 'name',
        key: 'name',
        id: 2
    },
    {
        title: '车牌',
        dataIndex: 'carNumber',
        key: 'carNumber',
        id: 3
    },
    {
        title: '车架号',
        dataIndex: 'carVinNumber',
        key: 'carVinNumber',
        id: 4
    },
    {
        title: '客户类型',
        dataIndex: 'insType',
        key: 'insType',
        id: 5
    },
    {
        title: '呼叫类型',
        dataIndex: 'directionName',
        key: 'directionName',
        id: 6
    },
    {
        title: '时长',
        dataIndex: 'billTime',
        key: 'billTime',
        id: 7
    },
    {
        title: '通话时间',
        dataIndex: 'time',
        key: 'tine',
        id: 8
    },
    {
        title: '操作',
        key: 'operation',
        render: ()=> {},
        id: 9
    }
];

export {
    IFormItems,
    ITableColumns,
    formItems,
    tableColumns
}