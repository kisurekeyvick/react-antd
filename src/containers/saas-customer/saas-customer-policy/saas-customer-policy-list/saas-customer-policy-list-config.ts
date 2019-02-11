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
        key: 'QInsCompany',
        id: 2,
        label: '保险公司',
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
        id: 3,
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
    {
        key: 'QSalesman',
        id: 4,
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
        key: 'QInsTime',
        id: 5,
        label: '下单日期',
        type: 'rangePicker',
        config: {
            format: 'YYYY-MM-DD',
            grid: {
                control: { 'sm': 20 }
            },
            initialValue: undefined,
        },
    }
];

const tableColumns: ITableColumns[] = [
    {
        title: '订单编号',
        dataIndex: 'orderNo',
        key: 'orderNo',
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
        dataIndex: 'vinNumber',
        key: 'vinNumber',
        id: 4
    },
    {
        title: '保险公司',
        dataIndex: 'policyCompany',
        key: 'policyCompany',
        id: 5
    },
    {
        title: '保费金额(元)',
        dataIndex: 'cost',
        key: 'cost',
        defaultSortOrder: 'descend',
        sorter: true,
        id: 6
    },
    {
        title: '下单日期',
        dataIndex: 'insureTime',
        key: 'insureTime',
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
