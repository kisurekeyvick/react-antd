import { ITableColumns } from '../saas-customer-report-interface';

export const tableColumns: ITableColumns[] = [
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '保费金额',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: '占比',
        dataIndex: 'proportion',
        key: 'proportion',
    },
];