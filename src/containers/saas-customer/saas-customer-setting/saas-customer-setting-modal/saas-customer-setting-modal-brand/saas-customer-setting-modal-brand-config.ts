import { ISettingFormItems, ITableColumns } from '../../interface';

const formItems: ISettingFormItems[] = [
    {
        label: '',
        id: 1,
        key: 'searchInput',
        type: 'searchInput',
        config: {
            placeholder: '模糊搜索品牌',
            formItemLayout: {
                wrapperCol: {
                    xs: { span: 24 },
                }
            },
            initialValue: undefined
        }
    }
];

const tableColumns: ITableColumns[] = [
    {
        title: '品牌',
        dataIndex: 'brandTypeName',
        key: 'brandTypeName',
        id: 1
    }
];

export {
    ISettingFormItems,
    ITableColumns,
    formItems,
    tableColumns
}
