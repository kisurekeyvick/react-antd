import { ITableColumns } from '../../../interface';

const tableColumns: ITableColumns[] = [
    {
        title: '险种明细',
        key: 'name',
        id: 1,
        dataIndex: 'name'
    },
    {
        title: '保额',
        key: 'value',
        id: 2,
        dataIndex: 'value'
    },
];

export {
    ITableColumns,
    tableColumns
}