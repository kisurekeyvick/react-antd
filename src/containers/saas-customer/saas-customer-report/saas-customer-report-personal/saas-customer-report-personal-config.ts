import { ITableColumns } from '../saas-customer-report-interface';

export const tableColumns: ITableColumns[] = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '跟进量',
        dataIndex: 'mount',
        key: 'mount',
    },
    {
        title: '有效通话数',
        dataIndex: 'telephoneCount',
        key: 'telephoneCount',
    },
    {
        title: '续保期客户量',
        dataIndex: 'renewCount',
        key: 'renewCount',
    },
    {
        title: '创建客户数',
        dataIndex: 'customerCount',
        key: 'customerCount',
    },
    {
        title: '保险单数',
        dataIndex: 'policyCount',
        key: 'policyCount',
    },
    {
        title: '保费总额(元)',
        dataIndex: 'totalCost',
        key: 'totalCost',
    },
    {
        title: '任务完成率',
        dataIndex: 'rate',
        key: 'rate',
    },
];