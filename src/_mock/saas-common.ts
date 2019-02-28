import * as Mock from 'mockjs';

const common_renewalMan = Mock.mock({
    result:[
        {userId: "1", userName: "王一"},
        {userId: "2", userName: "李二"}
    ]
});

const common_shopSc = Mock.mock({
    result: [
        {userId: "3", userName: "顾问一"},
        {userId: "4", userName: "顾问二"}
    ]
});

const common_company = Mock.mock({
    result: [
        {
            id: 1,
            fullName: "中国平安保险(集团)股份有限公司",
            shortName: "平安保险",
            isDefault: 0,
            isOpen: 1
        },
        {
            id: 2,
            fullName: "中国太平洋保险(集团)股份有限公司",
            shortName: "太平洋保险",
            isDefault: 1,
            isOpen: 1
        },
        {
            id: 3,
            fullName: "中国人民保险集团股份有限公司",
            shortName: "人保保险",
            isDefault: 0,
            isOpen: 1
        },
        {
            id: 4,
            fullName: "阳光保险集团股份有限公司",
            shortName: "阳光保险",
            isDefault: 0,
            isOpen: 1
        },
        {
            id: 5,
            fullName: "中国人寿财产保险股份有限公司",
            shortName: "人寿财险",
            isDefault: 0,
            isOpen: 1
        },
        {
            id: 6,
            fullName: "中国大地财产保险股份有限公司",
            shortName: "大地保险",
            isDefault: 0,
            isOpen: 0
        },
        {
            id: 7,
            fullName: "中华联合保险控股股份有限公司",
            shortName: "中华联合",
            isDefault: 0,
            isOpen: 0
        }
    ]
});

const common_placeShortName = Mock.mock({
    result: '沪'
});

const common_provinces = Mock.mock({
    result: {
        101: "京",
        102: "沪",
        103: "津",
        104: "渝",
        105: "皖",
        106: "闽",
        107: "甘",
        108: "粤",
        109: "桂",
        110: "黔",
        111: "琼",
        112: "冀",
        113: "豫",
        114: "黑",
        115: "鄂",
        116: "湘",
        117: "吉",
        118: "苏",
        119: "赣",
        120: "辽",
        121: "蒙",
        122: "宁",
        123: "青",
        124: "鲁",
        125: "晋",
        126: "陕",
        127: "川",
        128: "藏",
        129: "新",
        130: "滇",
        131: "浙"
    }
});

const common_insPlanList = Mock.mock({
    result: [
        {
            id: 1,
            insCategory: 3,
            insItemId: 1,
            insItemName: "交强险",
            insItemType: 0,
            insItemTypeToPc: "",
            insType: 1,
            isNoReduce: 0,
            level: 1,
            optionValues: [],
            relations: null,
            sort: 1
        },
        {
            id: 2,
            insCategory: 4,
            insItemId: 2,
            insItemName: "车船税",
            insItemType: 0,
            insItemTypeToPc: "",
            insType: 1,
            isNoReduce: 0,
            level: 1,
            optionValues: [],
            relations: null,
            sort: 2
        },
        {
            id: 3,
            insCategory: 1,
            insItemId: 3,
            insItemName: "机动车损失保险",
            insItemType: 1,
            insItemTypeToPc: "",
            insType: 2,
            isNoReduce: 1,
            level: 1,
            optionValues: [],
            relations: null,
            sort: 3
        },
        {
            id: 4,
            insCategory: 1,
            insItemId: 4,
            insItemName: "机动车第三者责任保险",
            insItemType: 0,
            insItemTypeToPc: '[{"key":3,"value":null}]',
            insType: 2,
            isNoReduce: 1,
            level: 1,
            optionValues: ["5000000", "10000000", "15000000", "20000000", "30000000", "50000000", "100000000", "150000000", "200000000", '300000000', '500000000'],
            relations: null,
            sort: 4
        },
        {
            id: 5,
            insCategory: 1,
            insItemId: 5,
            insItemName: "司机座位责任险",
            insItemType: 0,
            insItemTypeToPc: '[{"key":3,"value":null}]',
            insType: 2,
            isNoReduce: 1,
            level: 1,
            optionValues: ["1000000", "2000000", "3000000", "4000000", "5000000", "10000000", "20000000", "30000000", "100000000"],
            relations: null,
            sort: 5
        },
        {
            id: 6,
            insCategory: 1,
            insItemId: 6,
            insItemName: "乘客座位责任险",
            insItemType: 2,
            insItemTypeToPc: '[{"key":3,"value":null}, {"key":4,"value":"X"}, {"key":2,"value":null}, {"key":4,"value":"座"}]',
            insType: 2,
            isNoReduce: 1,
            level: 1,
            optionValues: ["1000000", "2000000", "3000000", "4000000", "5000000", "10000000", "20000000", "30000000", "100000000"],
            relations: null,
            sort: 6
        },
        {
            id: 7,
            insCategory: 1,
            insItemId: 7,
            insItemName: "机动车全车盗抢保险",
            insItemType: 0,
            insItemTypeToPc: "",
            insType: 2,
            isNoReduce: 1,
            level: 1,
            optionValues: [],
            relations: null,
            sort: 7
        },
        {
            id: 8,
            insCategory: 2,
            insItemId: 8,
            insItemName: "玻璃单独破碎险",
            insItemType: 1,
            insItemTypeToApp: 3,
            insItemTypeToPc: '[{"key":4,"value":"产地"}, {"key":3,"value":null}]',
            insType: 2,
            isNoReduce: 0,
            level: 1,
            optionValues: ["国产", "进口"],
            relations: ["3"],
            sort: 8
        },
        {
            id: 10,
            insCategory: 2,
            insItemId: 10,
            insItemName: "自燃损失险",
            insItemType: 0,
            insItemTypeToPc: "",
            insType: 2,
            isNoReduce: 1,
            level: 1,
            optionValues: [],
            relations: ["3"],
            sort: 10
        },
        {
            id: 11,
            insCategory: 2,
            insItemId: 11,
            insItemName: "发动机涉水损失险",
            insItemType: 0,
            insItemTypeToPc: "",
            insType: 2,
            isNoReduce: 1,
            level: 1,
            optionValues: [],
            relations: ["3"],
            sort: 12
        },
        {
            id: 18,
            insCategory: 2,
            insItemId: 18,
            insItemName: "车身划痕损失险",
            insItemType: 0,
            insItemTypeToPc: '[{"key":3,"value":null}]',
            insType: 2,
            isNoReduce: 1,
            level: 1,
            optionValues: ["200000", "500000", "1000000", "2000000"],
            relations: ["3"],
            sort: 19
        },
        {
            id: 19,
            insCategory: 2,
            insItemId: 19,
            insItemName: "三责险附加法定节假日限额翻倍险",
            insItemType: 0,
            insItemTypeToPc: "",
            insType: 2,
            isNoReduce: 0,
            level: 1,
            optionValues: [],
            relations: ["4"],
            sort: 20
        },
        {
            id: 20,
            insCategory: 2,
            insItemId: 20,
            insItemName: "精神损害抚慰金责任险",
            insItemType: 0,
            insItemTypeToApp: 3,
            insItemTypeToPc: '[{"key":3,"value":null}]',
            insType: 2,
            isNoReduce: 1,
            level: 0,
            optionValues: ["1000000", "2000000", "3000000", "4000000", "5000000"],
            relations: ["4", "5", "6"],
            sort: 21
        },
        {
            id: 21,
            insCategory: 2,
            insItemId: 21,
            insItemName: "修理期间费用补偿险",
            insItemType: 2,
            insItemTypeToApp: 4,
            insItemTypeToPc: '[{"key":3,"value":null}, {"key":4,"value":"X"}, {"key":2,"value":null}, {"key":4,"value":"天"}]',
            insType: 2,
            isNoReduce: 0,
            level: 0,
            optionValues: ["10000", "20000", "30000"],
            relations: ["3"],
            sort: 22
        },
        {
            id: 22,
            insCategory: 2,
            insItemId: 22,
            insItemName: "机动车损失保险无法找到第三方特约险",
            insItemType: 0,
            insItemTypeToPc: "",
            insType: 2,
            isNoReduce: 0,
            level: 1,
            optionValues: [],
            relations: [],
            sort: 23
        },
        {
            id: 15,
            insCategory: 2,
            insItemId: 15,
            insItemName: "不计免赔特约险",
            insItemType: 0,
            insItemTypeToApp: 0,
            insItemTypeToPc: "",
            insType: 2,
            isNoReduce: 0,
            level: 1,
            optionValues: [],
            relations: null,
            sort: 16
        }
    ] 
});


export const common_renewalMan_api = Mock.mock('/api/common/renewalMan', 'post' ,() => {
    return common_renewalMan;
});

export const common_shopSc_api = Mock.mock('/api/common/shopSc', 'post', () => {
    return common_shopSc;
});

export const common_company_api = Mock.mock('/api/common/company', 'post', () => {
    return common_company;
});

export const common_placeShortName_api = Mock.mock('/api/common/placeShortName', 'post', () => {
    return common_placeShortName;
});

export const common_provinces_api = Mock.mock('/api/common/provinces', 'post', () => {
    return common_provinces;
});

export const common_insPlanList_api = Mock.mock('/api/common/insPlanList', 'post', () => {
    return common_insPlanList;
});

export const common_upload_api = Mock.mock('/api/common/upload', 'post', () => {
    return Mock.mock({
        result: {
            failCount: 1
        }
    });
});

export const common_customRequest_api = Mock.mock('/api/common/customRequest', 'post', () => {
    return Mock.mock({
        result: 'success'
    });;
});