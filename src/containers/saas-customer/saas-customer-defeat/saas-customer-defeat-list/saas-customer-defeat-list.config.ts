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
        key: 'QCheckStatus',
        id: 2,
        label: '审核状态',
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
        id: 3,
        label: '续保员',
        placeholder: '请选择',
        type: 'select',
        config: {
            options: [],
            grid: {
                control: { 'sm': 20 }
            },
        }
    },
    {
        key: 'QApplyDefeatTime',
        id: 4,
        label: '提交审核日期',
        type: 'rangePicker',
        config: {
            format: 'YYYY-MM-DD',
            grid: {
                control: { 'sm': 20 }
            },
            initialValue: undefined,
        },
    },
    {
        key: 'QDefeatTime',
        id: 5,
        label: '审核日期',
        type: 'rangePicker',
        config: {
            format: 'YYYY-MM-DD',
            grid: {
                control: { 'sm': 20 }
            },
            initialValue: undefined,
        },
    },
    {
        key: 'QInsType',
        id: 6,
        label: '投保类型',
        placeholder: '请选择',
        type: 'select',
        config: {
            options: [],
            grid: {
                control: { 'sm': 20 }
            },
        },
    },
];

const tableColumns: ITableColumns[] = [
    {
        title: '客户名称',
        dataIndex: 'name',
        key: 'name',
        id: 1
    },
    {
        title: '车牌号',
        dataIndex: 'carNumber',
        key: 'carNumber',
        id: 2
    },
    {
        title: '车架号',
        dataIndex: 'carVinNumber',
        key: 'carVinNumber',
        id: 3
    },
    {
        title: '审核状态',
        dataIndex: 'checkStatus',
        key: 'checkStatus',
        id: 4
    },
    {
        title: '投保类型',
        dataIndex: 'insuredTypeName',
        key: 'insuredTypeName',
        id: 5
    },
    {
        title: '保险到期日',
        dataIndex: 'insExpiredTime',
        key: 'insExpiredTime',
        defaultSortOrder: 'descend',
        sorter: true,
        id: 6
    },
    {
        title: '脱保天数',
        dataIndex: 'days',
        key: 'days',
        defaultSortOrder: 'descend',
        sorter: true,
        id: 7
    },
    {
        title: '续保员',
        dataIndex: 'salesmanName',
        key: 'salesmanName',
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