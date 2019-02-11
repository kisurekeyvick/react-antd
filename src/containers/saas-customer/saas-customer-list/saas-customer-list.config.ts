export const workspaceCfg: Array<{key: string, value: string, selected: boolean, formItemIdArr: number[],tableColumnsArr: number[], className?: string}> = [
    { key: 'all', value: '全部客户', selected: false,formItemIdArr:[1,2,3,4,5,6,7,8,9,10,11,15,16,17,18], tableColumnsArr: [1,2,3,4,5,6,7,8,9,13,14,15] },
    { key: 'inTheSolicitation', value: '招揽中客户', selected: false,formItemIdArr:[1,2,3,4,5,6,7,9,10,11,12,15,16,17,18,19], tableColumnsArr: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15] },
    { key: 'solicitationNotice', value: '今日招揽提醒', selected: false, formItemIdArr:[1,2,3,4,5,6,7,9,10,11,15,16,17,18,19], tableColumnsArr: [1,2,3,4,5,6,7,8,9,10,11,12,13,14] },
    { key: 'timeout', value: '招揽超时', selected: false, formItemIdArr:[1,2,3,4,5,6,7,9,10,11,15,16,17,18], tableColumnsArr: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], className: 'warn' },
    { key: 'willTuoBao', value: '将脱保', selected: false, formItemIdArr:[1,2,3,4,5,6,7,9,10,11,15,16,17,18], tableColumnsArr: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15] },
    { key: 'hadSingle', value: '已出单', selected: false, formItemIdArr:[1,2,3,4,5,6,7,9,10,11,15,16,17,18], tableColumnsArr: [1,2,3,4,5,6,7,8,9,13,14,17] },
    { key: 'success', value: '成单', selected: false, formItemIdArr:[1,2,3,4,5,6,7,9,10,11,13,15,16,17,18], tableColumnsArr: [1,2,3,4,5,6,7,8,9,13,14,16] },
    { key: 'failure', value: '战败', selected: false, formItemIdArr:[1,2,3,4,5,6,7,9,10,11,14,15,16,17,18], tableColumnsArr: [1,2,3,4,5,6,7,8,9,13,14,16] }
];

export interface IFormItems {
    key: string;
    id: number;
    label: string;
    type: string;
    [key: string]: any
}

export const formItems: IFormItems[] = [
    {
        key: 'QCustomerInfo',
        id: 1,
        label: '客户查询',
        placeholder: '请输入姓名/手机/车牌/vin后四位',
        type: 'inputText',
        config: {
            grid: {
                control: { 'sm': 20 }
            },
            initialValue: undefined,
        }
    },
    {
        key: 'QInsType',
        id: 2,
        label: '投保类型',
        placeholder: '全部',
        type: 'select',
        config: {
            options: [],
            grid: {
                control: { 'sm': 20 }
            },
            initialValue: undefined,
        },
    },
    {
        key: 'QInsIntention',
        id: 3,
        label: '意向程度',
        placeholder: '全部',
        type: 'select',
        config: {
            options: [],
            grid: {
                control: { 'sm': 20 }
            },
            initialValue: undefined,
        },
    },
    {
        key: 'QVciExpiredTime',
        id: 4,
        label: '交强险到期',
        type: 'rangePicker',
        config: {
            format: 'YYYY-MM-DD',
            grid: {
                control: { 'sm': 20 }
            },
            initialValue: undefined,
        },
    },
    {
        key: 'QTciExpiredTime',
        id: 5,
        label: '商业到期险',
        type: 'rangePicker',
        config: {
            format: 'YYYY-MM-DD',
            grid: {
                control: { 'sm': 20 }
            },
            initialValue: undefined,
        },
    },
    {
        key: 'QLastInsCompany',
        id: 6,
        label: '上期公司',
        placeholder: '请选择保险公司',
        type: 'select',
        config: {
            options: [

            ],
            grid: {
                control: { 'sm': 20 }
            },
            initialValue: undefined,
        },
    },
    {
        key: 'QSalesmanId',
        id: 7,
        label: '续保员',
        placeholder: '全部',
        type: 'select',
        config: {
            options: [

            ],
            grid: {
                control: { 'sm': 20 }
            },
            initialValue: undefined,
        },
    },
    {
        key: 'QProcessStatus',
        id: 8,
        label: '招揽状态',
        placeholder: '全部',
        type: 'select',
        config: {
            options: [],
            grid: {
                control: { 'sm': 20 }
            },
            initialValue: undefined,
        },
    },
    {
        key: 'QCarBrandType',
        id: 9,
        label: '车型',
        placeholder: '请选择车型',
        type: 'cascader',
        config: {
            options: [],
            loadData:()=> {

            },
            onChange: ()=> {

            },
            grid: {
                control: { 'sm': 20 }
            },
            initialValue: undefined,
        },
    },
    {
        key: 'QLoanStatus',
        id: 10,
        label: '贷款状态',
        placeholder: '全部',
        type: 'select',
        config: {
            options: [],
            grid: {
                control: { 'sm': 20 }
            },
            initialValue: undefined,
        },
    },
    {
        key: 'QIsContinueIns',
        id: 11,
        label: '是否连保',
        placeholder: '全部',
        type: 'checkbox',
        config: {
            name: '是',
            grid: {
                control: { 'sm': 20 }
            },
            initialValue: undefined,
        },
    },
    {
        key: 'QIsGroupPurchase',
        id: 12,
        label: '是否预约团购活动',
        type: 'checkbox',
        config: {
            name: '是',
            grid: {
                control: { 'sm': 20 }
            },
            initialValue: undefined,
        },
    },
    {
        key: 'QFinishedTime',
        id: 13,
        label: '成单日期',
        type: 'rangePicker',
        config: {
            format: 'YYYY-MM-DD',
            grid: {
                control: { 'sm': 20 }
            },
            initialValue: undefined,
        },
    },
    {
        key: 'QFinishedTime',
        id: 14,
        label: '战败日期',
        type: 'rangePicker',
        config: {
            format: 'YYYY-MM-DD',
            grid: {
                control: { 'sm': 20 }
            },
            initialValue: undefined,
        },
    },
    {
        key: 'QNextFollowTime',
        id: 15,
        label: '下次应跟进时间',
        type: 'rangePicker',
        config: {
            format: 'YYYY-MM-DD',
            grid: {
                control: { 'sm': 20 }
            },
            initialValue: undefined,
        },
        hide: true
    },
    {
        key: 'QPurchaseTime',
        id: 16,
        label: '本店投保次数',
        placeholder: '全部',
        type: 'select',
        config: {
            options: [],
            grid: {
                control: { 'sm': 20 }
            },
            initialValue: undefined,
        },
        hide: true
    },
    {
        key: 'QFrameTailNumber',
        id: 17,
        label: '车架号尾号',
        placeholder: '请输入最后一位尾号',
        type: 'inputNumber',
        config: {
            onChange: ()=> {},
            grid: {
                control: { 'sm': 20 }
            },
            initialValue: undefined,
        },
        hide: true
    },
    {
        key: 'QLicensePlatetime',
        id: 18,
        label: '上牌时间',
        type: 'rangePicker',
        config: {
            format: 'YYYY-MM-DD',
            grid: {
                control: { 'sm': 20 }
            },
            initialValue: undefined, 
        }, 
        hide: true
    },
    {
        key: 'QHasPolicyInfo',
        id: 19,
        label: '是否查询到在保',
        type: 'checkbox',
        config: {
            name: '是',
            grid: {
                control: { 'sm': 20 }
            },
            initialValue: undefined,
        },
    }
];

export interface ITableColumns {
    title: string;
    key: string;
    id: number;
    dataIndex?: string; 
    [key: string]: any;
}

export const tableColumns: ITableColumns[] = [
    {
        title: '客户名称',
        dataIndex: 'name',
        key: 'name',
        id: 1
    },
    {
        title: '车牌号',
        dataIndex: 'carNumber',
        key: 'carNumber',
        id: 2
    },
    {
        title: '车架号',
        dataIndex: 'carVinNumber',
        key: 'carVinNumber',
        id: 3
    },
    {
        title: '招揽状态',
        dataIndex: 'processStatusName',
        key: 'processStatusName',
        id: 4
    },
    {
        title: '投保类型',
        dataIndex: 'insuredTypeName',
        key: 'insuredTypeName',
        id: 5
    },
    {
        title: '意向',
        dataIndex: 'insIntentionName',
        key: 'insIntentionName',
        id: 6
    },
    {
        title: '交强险到期',
        dataIndex: 'vciExpiredTime',
        key: 'vciExpiredTime',
        defaultSortOrder: 'descend',
        sorter: true,
        id: 7
    },
    {
        title: '商业到期险',
        dataIndex: 'tciExpiredTime',
        key: 'tciExpiredTime',
        defaultSortOrder: 'descend',
        sorter: true,
        id: 8
    },
    {
        title: '上期公司',
        dataIndex: 'previousInsCompanyName',
        key: 'previousInsCompanyName',
        id: 9
    },
    {
        title: '上期(元)',
        dataIndex: 'policyInsTotalCostPrice',
        key: 'policyInsTotalCostPrice',
        defaultSortOrder: 'descend',
        sorter: true,
        id: 10
    },
    {
        title: '续期(元)',
        dataIndex: 'calculateInsTotalCostPrice',
        key: 'calculateInsTotalCostPrice',
        defaultSortOrder: 'descend',
        sorter: true,
        id: 11
    },
    {
        title: '差额(元)',
        dataIndex: 'preDiffPrice',
        key: 'preDiffPrice',
        defaultSortOrder: 'descend',
        sorter: true,
        id: 12
    },
    {
        title: '续保员',
        dataIndex: 'salesmanName',
        key: 'salesmanName',
        id: 13
    },
    {
        title: '最新跟进',
        dataIndex: 'lastFollowTime',
        key: 'lastFollowTime',
        defaultSortOrder: 'descend',
        sorter: true,
        id: 14
    },
    {
        title: '计划下次跟进',
        dataIndex: 'nextFollowTime',
        key: 'nextFollowTime',
        defaultSortOrder: 'descend',
        sorter: true,
        id: 15
    },
    {
        title: '成单时间',
        dataIndex: 'finishDefeatTime',
        key: 'finishDefeatTime',
        defaultSortOrder: 'descend',
        sorter: true,
        id: 16
    },
    {
        title: '操作',
        key: 'operation',
        render: ()=> {},
        id: 17
    }
];

/**
 * excel头部说明
 */
export const excelInstructions: object = {
    '规范说明：续保顾问系统工作手机号': 'salesmanMobile',
    '规范说明：完整的车牌号码': 'carNumber',
    '规范说明：完整的车架号': 'carVinNumber',
    '规范说明：完整的发动号': 'carEngineNumber',
    '规范说明：YYYY/MM/DD': 'startRegisterDate',
    '规范说明："家庭自用"或"企业营业"或"企业非营业"': 'usage',
    '规范说明："是"或"否"': 'isStorePurchase',
    '规范说明：本店售卖该车的销售人员工作手机号': 'carSalesmanMobile',
    '规范说明：实际贷款年限': 'installmentYears',
    '规范说明："新转续"或续转续"或"间转续"或"潜转续"': 'insType',
    '规范说明："高"或"中"或"低"': 'insIntention',
    '规范说明：例"2018/05/01 15:00:00”': 'vciExpiredTime',
    '规范说明：例"2018/05/02 15:00:00”': 'tciExpiredTime',
    '规范说明：上期保险公司(请填写：人寿保险、太平洋保险、人保保险、阳光保险、人寿保险、大地保险、中华联合、平安保险)':
        'previousInsCompanyName',
    '规范说明：车主真实姓名': 'carOwnerName',
    '规范说明：车主真实身份证号': 'carOwnerCertNum',
    '规范说明：车主真实手机号': 'carOwnerMobilePhoneNumber',
    '规范说明："个人"或"机关"或"企业"': 'carOwnerProp',
    '规范说明：被保险人姓名': 'beinsuredOwnerName',
    '规范说明：被保险人身份证号': 'beinsuredOwnerCertNum',
    '规范说明：本店购买保险次数': 'insPurchaseTimes',
    '规范说明：其他联系人姓名': 'backupManName',
    '规范说明：其他联系人手机号': 'backupManPhoneNumber',
    '规范说明：预计下次跟进该客户的时间': 'nextFollowTime'
};

/**
 * excel下载模板字段
 */
export const excelKeyWord: any = {
    '*跟进续保员工作手机号': 'salesmanMobile',
    '*车牌': 'carNumber',
    '*车架号': 'carVinNumber',
    '*发动机号': 'carEngineNumber',
    初登时间: 'startRegisterDate',
    使用性质: 'usage',
    是否本店购买: 'isStorePurchase',
    汽车售卖员手机号: 'carSalesmanMobile',
    分期年限: 'installmentYears',
    客户类型: 'insType',
    意向级别: 'insIntention',
    交强险结束时间: 'vciExpiredTime',
    商业险结束时间: 'tciExpiredTime',
    上期保险公司: 'previousInsCompanyName',
    车主姓名: 'carOwnerName',
    车主身份证号: 'carOwnerCertNum',
    '*车主手机号': 'carOwnerMobilePhoneNumber',
    车主性质: 'carOwnerProp',
    被保险人姓名: 'beinsuredOwnerName',
    被保险人身份证号: 'beinsuredOwnerCertNum',
    本店购买次数: 'insPurchaseTimes',
    备用联系人姓名: 'backupManName',
    备用联系人手机号: 'backupManPhoneNumber',
    下次跟进时间: 'nextFollowTime'
};

/**
 * excel下载错误模板
 */
export const excelErrorKeyWord: any = {
    错误信息: 'errorInfo',
    '*跟进续保员工作手机号': 'salesmanMobile',
    '*车牌': 'carNumber',
    '*车架号': 'carVinNumber',
    '*发动机号': 'carEngineNumber',
    初登时间: 'startRegisterDate',
    使用性质: 'usage',
    是否本店购买: 'isStorePurchase',
    汽车售卖员手机号: 'carSalesmanMobile',
    分期年限: 'installmentYears',
    客户类型: 'insType',
    意向级别: 'insIntention',
    交强险结束时间: 'vciExpiredTime',
    商业险结束时间: 'tciExpiredTime',
    上期保险公司: 'previousInsCompanyName',
    车主姓名: 'carOwnerName',
    车主身份证号: 'carOwnerCertNum',
    '*车主手机号': 'carOwnerMobilePhoneNumber',
    车主性质: 'carOwnerProp',
    被保险人姓名: 'beinsuredOwnerName',
    被保险人身份证号: 'beinsuredOwnerCertNum',
    本店购买次数: 'insPurchaseTimes',
    备用联系人姓名: 'backupManName',
    备用联系人手机号: 'backupManPhoneNumber',
    下次跟进时间: 'nextFollowTime'
};