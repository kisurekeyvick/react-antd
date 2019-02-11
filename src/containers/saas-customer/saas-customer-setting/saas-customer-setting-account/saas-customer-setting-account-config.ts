import { ISettingFormItems } from '../interface';

const insCompanyDiscountFormItems: ISettingFormItems[] = [
    {
        label: '店铺返点比例',
        id: 1,
        key: 'discount',
        type: 'inputNumber',
        config: {
            rule:[],
            formItemLayout: {
                wrapperCol: {
                    xs: { span: 14 },
                }
            },
            min: 0,
            hasFeedback: true,
            initialValue: undefined
        }
    }
];

export {
    ISettingFormItems,
    insCompanyDiscountFormItems
};
