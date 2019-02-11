interface ItemInfo {
    label: string;
    key: string;
    value: string;
    actualValue: any;
    type: string;
    [key: string]: any;
}

const insInfo: ItemInfo[] = [
    { 
        label: '保险公司', 
        key: 'previousInsCompany', 
        value: '', 
        actualValue: '', 
        type: 'select',
        placeholder: '请选择保险公司',
        config: {
            options: []
        }
    },
    { 
        label: '交强险到期', 
        key: 'vciExpiredTime', 
        value: '', 
        actualValue: '', 
        vciEndDays: '', 
        type: 'datePicker',
        config: {

        }
    },
    { 
        label: '商业险到期', 
        key: 'tciExpiredTime', 
        value: '', 
        actualValue: '', 
        tciEndDays: '',
        type: 'datePicker',
        config: {

        } 
    },
];

const carDetailInfo: ItemInfo[] = [
    { 
        label: '车牌号码', 
        key: 'carNumber', 
        value: '',
        actualValue: '',
        type: 'input',
        placeholder: '请输入车牌号码',
        config: {

        }
    },
    { 
        label: '车架号', 
        key: 'carVinNumber', 
        value: '',
        actualValue: '',
        type: 'input',
        placeholder: '请输入车架号',
        config: {

        }
    },
    { 
        label: '发动机号', 
        key: 'carEngineNumber', 
        value: '',
        actualValue: '',
        type: 'input',
        placeholder: '请输入发动机号',
        config: {

        }
    },
    { 
        label: '使用性质', 
        key: 'usage', 
        value: '',
        actualValue: '',
        type: 'select',
        placeholder: '请选择使用性质',
        config: {
            options: []
        }
    },
    { 
        label: '能源类型', 
        key: 'energyType', 
        value: '',
        actualValue: '',
        type: 'select',
        placeholder: '请选择能源类型',
        config: {
            options: []
        }
    },
    { 
        label: '初登日期', 
        key: 'startRegisterDate', 
        value: '',
        actualValue: '',
        type: 'datePicker',
        config: {

        }
    },
    { 
        label: '车型', 
        key: 'carModelNum', 
        value: '',
        actualValue: '',
        type: 'input',
        placeholder: '请输入车型',
        config: {

        }
    },
    { 
        label: '是否过户车辆', 
        key: 'loanTransferFlag', 
        value: '',
        actualValue: '',
        type: 'radio',
        config: {
            options: [
                { name: '是', value: 1 },
                { name: '否', value: 0 },
            ]
        }
    },
    { 
        label: '座位数', 
        key: 'seatCount', 
        value: '',
        actualValue: '',
        type: 'inputNumber',
        config: {

        }
    },
    { 
        label: '车牌颜色', 
        key: 'carPlateColor', 
        value: '',
        actualValue: '',
        type: 'select',
        placeholder: '请选择车牌颜色',
        config: {
            options: []
        }
    },
    { 
        label: '贷款状态', 
        key: 'loanStatus', 
        value: '',
        actualValue: '',
        type: 'select',
        placeholder: '请选择贷款状态',
        config: {
            options: []
        }
    },
    { 
        label: '客户类型', 
        key: 'insType', 
        value: '',
        actualValue: '',
        type: 'select',
        placeholder: '请选择客户类型',
        config: {
            options: []
        }
    },
    { 
        label: '过户日期', 
        key: 'transferTime', 
        value: '',
        actualValue: '',
        type: 'select',
        placeholder: '请选择过户日期',
        config: {

        },
        notEdit: true
    },
];

const carOwnerDetailInfo: ItemInfo[] = [
    { 
        label: '车主姓名', 
        key: 'carOwnerName', 
        value: '',
        actualValue: '',
        type: 'input',
        placeholder: '请输入车主姓名',
        config: {

        },
    },
    { 
        label: '手机号码', 
        key: 'carOwnerMobilePhoneNumber', 
        value: '',
        actualValue: '',
        type: 'input',
        placeholder: '请输入手机号码',
        config: {

        },
    },
    { 
        label: '车主性质', 
        key: 'carOwnerProp', 
        value: '',
        actualValue: '',
        type: 'select',
        placeholder: '请选择车主性质',
        config: {
            options: []
        },
    },
    { 
        label: '车主证件类型', 
        key: 'carOwnerCertType', 
        value: '',
        actualValue: '',
        type: 'select',
        placeholder: '请选择车主证件类型',
        config: {
            options: []
        }, 
    },
    { 
        label: '车主证件号', 
        key: 'carOwnerCertNum', 
        value: '',
        actualValue: '',
        type: 'input',
        config: {
        }, 
    },
    { 
        label: '被保险人与车辆关系', 
        key: 'beinsuredmanCarRelation', 
        value: '',
        actualValue: '',
        type: 'select',
        placeholder: '请选择被保险人与车辆关系',
        config: {
            options: []
        }, 
    },
    { 
        label: '被保险人姓名', 
        key: 'beinsuredOwnerName', 
        value: '',
        actualValue: '',
        type: 'input',
        placeholder: '请输入被保险人姓名',
        config: {
        }, 
    },
    { 
        label: '被保险人性质', 
        key: 'beinsuredManProp', 
        value: '',
        actualValue: '',
        type: 'select',
        placeholder: '请选择被保险人性质',
        config: {
            options: []
        },
    },
    { 
        label: '被保险人证件类型', 
        key: 'beinsuredOwnerCertType', 
        value: '',
        actualValue: '',
        type: 'select',
        placeholder: '请选择被保险人证件类型',
        config: {
            options: []
        },
    },
    { 
        label: '被保险人证件号', 
        key: 'beinsuredOwnerCertNum', 
        value: '',
        actualValue: '',
        type: 'input',
        placeholder: '请输入被保险人证件号',
        config: {
        },
    },
    { 
        label: '备用联系人姓名', 
        key: 'backupManName', 
        value: '',
        actualValue: '',
        type: 'input',
        placeholder: '请输入备用联系人姓名',
        config: {
        },
    },
    { 
        label: '备用联系人手机号', 
        key: 'backupManPhoneNumber', 
        value: '',
        actualValue: '',
        type: 'input',
        placeholder: '请输入备用联系人手机号',
        config: {
        },
    },
];

export {
    ItemInfo,
    insInfo,
    carDetailInfo,
    carOwnerDetailInfo
}
