import { ISettingFormItems, ITableColumns } from '../interface';

const formItems: ISettingFormItems[] = [
    {
        label: '确认客户战败方式',
        id: 1,
        key: 'defeatType',
        type: 'radioGroup',
        config: {
            options: [
                { name: '1.续保员直接标记战败即可', value: 0 },
                { name: '2.续保员标记战败，续保主管审核后方可战败', value: 1 }
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
    }
];

export {
    ISettingFormItems, 
    ITableColumns,
    formItems
}
