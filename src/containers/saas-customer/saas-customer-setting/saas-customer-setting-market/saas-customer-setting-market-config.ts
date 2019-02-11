import { ITableColumns } from '../interface';

const tableColumns: ITableColumns[] = [
    {
        title: '优惠类型',
        id: 1,
        key: 'name',
        dataIndex: 'name',
        editable: true
    },
    {
        title: '面值(元)',
        id: 2,
        key: 'faceValue',
        dataIndex: 'faceValue',
        editable: true
    },
    {
        title: '成本(元)',
        id: 3,
        key: 'cost',
        dataIndex: 'cost',
        editable: true
    },
    {
        title: '成本部门',
        id: 4,
        key: 'department',
        dataIndex: 'department',
        editable: true
    },
    {
        title: '操作',
        id: 5,
        key: '',
    }
];

export {
    ITableColumns,
    tableColumns
}