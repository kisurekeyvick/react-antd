import { Iform } from '../interface';

const formItems:Iform[] = [
    {
        label: '选择跟进续保员',
        id: 2,
        key: 'renewalMan',
        type: 'tagsSelect',
        placeholder: '请选择',
        config: {
            rule: [
                { required: true, message: '跟进续保员为必填项' },
            ],
            options:[],
            initialValue: undefined,
            formItemLayout: {
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 14 },
                }
            }
        },
    }
];

export {
    Iform,
    formItems
}