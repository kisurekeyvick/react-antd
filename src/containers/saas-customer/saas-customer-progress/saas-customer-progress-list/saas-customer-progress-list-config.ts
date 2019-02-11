import { ITableColumns, IFormItems } from 'src/components/search/search-component-interface';

const tableColumns: ITableColumns[] = [
    {
        title: '创建时间',
        dataIndex: 'time',
        key: 'time',
        id: 1
    },
    {
        title: '操作人',
        dataIndex: 'operatorName',
        key: 'operatorName',
        id: 2
    },
    {
        title: '导入类型',
        dataIndex: 'importTypeName',
        key: 'importTypeName',
        id: 3
    },
    {
        title: '状态',
        dataIndex: 'importStatusName',
        key: 'importStatusName',
        id: 4
    },
    {
        title: '当前进度',
        dataIndex: 'importProgress',
        key: 'importProgress',
        render: ()=> {},
        id: 5
    },
    {
        title: '总计/成功/失败',
        dataIndex: 'detail',
        key: 'detail',
        id: 6
    },
    {
        title: '操作',
        key: 'operation',
        render: ()=> {},
        id: 7
    },
]

export {
    ITableColumns,
    tableColumns,
    IFormItems
}