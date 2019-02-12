import * as Mock from 'mockjs';

const common_mktPlanList = Mock.mock({
    result: {
        list: [
            {
                costDepartmentId: 543,
                costDepartmentName: '续保部',
                costPrice: 80000,
                createdTime: 1542785698929,
                id: 41,
                isOpen: 1,
                marketPrice: 100000,
                name: '加油卡',
                storeId: 4822,
                updatedTime: 1542785698929
            },
            {
                costDepartmentId: 539,
                costDepartmentName: '河南测试店铺',
                costPrice: 100000,
                createdTime: 1542373021675,
                id: 40,
                isOpen: 1,
                marketPrice: 70000,
                name: '团购卡',
                storeId: 4822,
                updatedTime: 1542785697025
            }
        ],
        page:{
            currentPage: 1,
            pageCount: 1,
            pageSize: 5,
            totalCount: 2,
        }
    },
    resultCode: '200',
    statusCode: '200'
});

export const common_mktPlanList_api = Mock.mock('/api/setting/mktPlanList', 'post', () => {
    return common_mktPlanList;
});

const common_organization:any = {
    department: [
        {
            createdTime: 1541056550547,
            department: [
                {
                    createdTime: 1541056550555,
                    deleted: 0,
                    department: [
                        {
                            createdTime: 1541056550558,
                            deleted: 0,
                            department: [],
                            departmentName: "新车展厅部",
                            departmentOrder: 1,
                            id: 541,
                            organizationId: 61,
                            parentId: 540,
                            serviceType: 1,
                            updatedTime: 1543990536552
                        },
                        {
                            createdTime: 1541056550586,
                            deleted: 0,
                            department: [],
                            departmentName: "网电销部",
                            departmentOrder: 1,
                            id: 542,
                            organizationId: 61,
                            parentId: 540,
                            serviceType: 1,
                            updatedTime: 1543989852182
                        },
                        {
                            createdTime: 1543560296808,
                            deleted: 0,
                            department: [],
                            departmentName: "前台展厅部",
                            departmentOrder: null,
                            id: 1066,
                            organizationId: 61,
                            parentId: 540,
                            serviceType: 1,
                            updatedTime: 1543990476957
                        }
                    ],
                    departmentName: "新车销售部",
                    departmentOrder: 1,
                    id: 540,
                    organizationId: 61,
                    parentId: 539,
                    serviceType: 1,
                    updatedTime: 1543990468044
                },
                {
                    createdTime: 1541056550663,
                    deleted: 0,
                    department: [
                        {
                            createdTime: 1543910081186,
                            deleted: 0,
                            department: [],
                            departmentName: "续保一部",
                            departmentOrder: null,
                            id: 1067,
                            organizationId: 61,
                            parentId: 543,
                            serviceType: 2,
                            updatedTime: 1543990491777
                        }
                    ],
                    departmentName: "续保部",
                    departmentOrder: 1,
                    id: 543,
                    organizationId: 61,
                    parentId: 539,
                    serviceType: 2,
                    updatedTime: 1543990484864
                },
                {
                    createdTime: 1541056550691,
                    deleted: 0,
                    department: [],
                    departmentName: "售后部",
                    departmentOrder: 1,
                    id: 544,
                    organizationId: 61,
                    parentId: 539,
                    serviceType: 3,
                    updatedTime: 1543490892877
                },
                {
                    createdTime: 1541056550707,
                    deleted: 0,
                    department: [],
                    departmentName: "客户部",
                    departmentOrder: 1,
                    id: 545,
                    organizationId: 61,
                    parentId: 539,
                    serviceType: 2,
                    updatedTime: null
                },
                {
                    createdTime: 1541056550716,
                    deleted: 0,
                    department: [],
                    departmentName: "财务部",
                    departmentOrder: 1,
                    id: 546,
                    organizationId: 61,
                    parentId: 539,
                    serviceType: 0,
                    updatedTime: null,
                },
                {
                    createdTime: 1541056550733,
                    deleted: 0,
                    department: [],
                    departmentName: "采购部",
                    departmentOrder: 1,
                    id: 547,
                    organizationId: 61,
                    parentId: 539,
                    serviceType: 0,
                    updatedTime: null
                },
                {
                    createdTime: 1541056550744,
                    deleted: 0,
                    department: [],
                    departmentName: "交车部",
                    departmentOrder: 1,
                    id: 548,
                    organizationId: 61,
                    parentId: 539,
                    serviceType: 0,
                    updatedTime: null
                }
            ],
            departmentName: "河南测试店铺",
            departmentOrder: 1,
            id: 539,
            organizationId: 61,
            parentId: 0,
            serviceType: null,
            updatedTime: null
        }
    ]
};

export const common_organization_api = Mock.mock('/api/setting/getWebOrganization', 'post', () => {
    return common_organization;
});

const common_roleGroup: any = {
    user: [
        {
            realName: "测试",
            roleName: "续保顾问",
            roleid: 61,
            userId: 100370
        },
        {
            realName: "老铁",
            roleName: "续保顾问",
            roleid: 61,
            userId: 101260
        },
        {
            realName: "李钢",
            roleName: "续保顾问",
            roleid: 61,
            userId: 101262
        },
        {
            realName: "测试",
            roleName: "续保顾问",
            roleid: 61,
            userId: 101462
        },
        {
            realName: "李彬",
            roleName: "续保顾问",
            roleid: 61,
            userId: 101721
        },
        {
            realName: "宋怡文",
            roleName: "续保顾问",
            roleid: 61,
            userId: 101818
        },
        {
            realName: "测试宋",
            roleName: "续保顾问",
            roleid: 61,
            userId: 103600
        },
        {
            realName: "王盼",
            roleName: "续保顾问",
            roleid: 61,
            userId: 104400
        },
        {
            realName: "测试",
            roleName: "续保经理",
            roleid: 62,
            userId: 100370
        }
    ]
};

export const common_roleGroup_api = Mock.mock('/api/setting/roleGroup', 'post', () => {
    return common_roleGroup;
});

const setting_bussinessRemind = {
    result: {
        activate: 1,
        advanceFollowDays: 90,
        createdTime: null,
        firstFollowPeriod: 5,
        highFollowPeriod: 4,
        id: 4,
        lowFollowPeriod: 5,
        middleFollowPeriod: 5,
        resultCode: "200",
        storeId: 4822,
        updatedTime: 1543562672684
    }
};

export const setting_bussinessRemind_api = Mock.mock('/api/setting/bussinessRemind', 'post', () => {
    return setting_bussinessRemind;
});

const setting_defeatSetting = {
    result: {
        defeatType: 1,
        id: 4,
        storeId: 4822
    }
};

export const setting_defeatSetting_api = Mock.mock('/api/setting/defeatSetting', 'post', () => {
    return setting_defeatSetting;
});

const setting_ruleAssign = {
    result: {
        createdTime: 1541484479960,
        distributionProportionRise: 10,
        distributionRule: 2,
        id: 2,
        storeId: 4822,
        updatedTime: 1543907660510,
    }
};

export const setting_ruleAssign_api = Mock.mock('/api/setting/ruleAssign', 'post', () => {
    return setting_ruleAssign;
});

const setting_distributionRatio_list_source:any[] = [
    {
        createdTime: 1543907660505,
        date: 1543852800000,
        distributionRate: 1571,
        id: 509,
        ranking: 1,
        salesmanId: 101721,
        salesmanName: "libin",
        storeId: 4822,
        turnoverRate: 0,
        updatedTime: 1543907660505
    },
    {
        createdTime: 1543907660506,
        date: 1543852800000,
        distributionRate: 1523,
        id: 510,
        ranking: 2,
        salesmanId: 103600,
        salesmanName: "测试宋",
        storeId: 4822,
        turnoverRate: 0,
        updatedTime: 1543907660506
    },
    {
        createdTime: 1543907660506,
        date: 1543852800000,
        distributionRate: 1476,
        id: 511,
        ranking: 3,
        salesmanId: 101818,
        salesmanName: "宋怡文",
        storeId: 4822,
        turnoverRate: 0,
        updatedTime: 1543907660506
    },
    {
        createdTime: 1543907660507,
        date: 1543852800000,
        distributionRate: 1428,
        id: 512,
        ranking: 4,
        salesmanId: 101262,
        salesmanName: "李钢",
        storeId: 4822,
        turnoverRate: 0,
        updatedTime: 1543907660507
    },
    {
        createdTime: 1543907660508,
        date: 1543852800000,
        distributionRate: 1380,
        id: 513,
        ranking: 5,
        salesmanId: 100370,
        salesmanName: "测试袁",
        storeId: 4822,
        turnoverRate: 0,
        updatedTime: 1543907660508
    },
    {
        createdTime: 1543907660508,
        date: 1543852800000,
        distributionRate: 1333,
        id: 514,
        ranking: 6,
        salesmanId: 101394,
        salesmanName: "测试王",
        storeId: 4822,
        turnoverRate: 0,
        updatedTime: 1543907660508
    },
    {
        createdTime: 1543907660509,
        date: 1543852800000,
        distributionRate: 1289,
        id: 515,
        ranking: 7,
        salesmanId: 101462,
        salesmanName: "测试",
        storeId: 4822,
        turnoverRate: 0,
        updatedTime: 1543907660509
    }
];

export const setting_distributionRatioList_api = Mock.mock('/api/setting/distributionRatioList', 'post', (param: any) => {
    const params: any = param.body && JSON.parse(param.body) || null;
    const start: number = (params.pageInfo.currentPage-1) * params.pageInfo.pageSize;
    const end: number = params.pageInfo.currentPage * params.pageInfo.pageSize;

    const result: any[] = setting_distributionRatio_list_source.slice(start, end);

    const setting_distributionRatio_list = Mock.mock({
        result: {
            list: result,
            pageInfo: {
                currentPage: 1,
                pageCount: 10,
                pageSize: 10,
                rowCount: 10,
                totalCount: setting_distributionRatio_list_source.length
            }
        }
    });

    return setting_distributionRatio_list;
});

const setting_brandType_list_source: any[] = [
    {
        brandTypeId: 621,
        brandTypeName: "上海大众",
        imgSrc: 'http://i5.hexunimg.cn/2012-01-17/137328530.jpg',
        createdTime: null,
        id: null,
        storeId: 4822,
        updatedTime: null
    },
    {
        brandTypeId: 1057,
        brandTypeName: "一汽大众",
        imgSrc: '//09.imgmini.eastday.com/mobile/20180202/20180202163040_b8cc9870f6f8ec0152c975df427aee3e_1.png',
        createdTime: null,
        id: null,
        storeId: 4822,
        updatedTime: null
    },
    {
        brandTypeId: 2688,
        brandTypeName: "进口大众",
        imgSrc: '//09.imgmini.eastday.com/mobile/20180202/20180202163040_b8cc9870f6f8ec0152c975df427aee3e_1.png',
        createdTime: null,
        id: null,
        storeId: 4822,
        updatedTime: null
    },
    {
        brandTypeId: 4596,
        brandTypeName: "国产奥迪",
        imgSrc: 'http://img.cheshi-img.com/sellernews/1057900/1057906/e33fe283670ea4e2.jpg',
        createdTime: null,
        id: null,
        storeId: 4822,
        updatedTime: null
    },
    {
        brandTypeId: 4823,
        brandTypeName: "进口奥迪",
        imgSrc: 'http://img.cheshi-img.com/sellernews/1057900/1057906/e33fe283670ea4e2.jpg',
        createdTime: null,
        id: null,
        storeId: 4822,
        updatedTime: null
    },
    {
        brandTypeId: 15039,
        brandTypeName: "保时捷",
        imgSrc: '//img0.pcauto.com.cn/pcauto/1108/03/1590745_6181d7edd0f04feeb31cb191.jpg',
        createdTime: null,
        id: null,
        storeId: 4822,
        updatedTime: null
    }
];

export const setting_brandType_list_api = Mock.mock('/api/setting/brandTypeList', 'post', (param: any) => {
    const params: any = param.body && JSON.parse(param.body) || null;
    const start: number = (params.pageInfo.currentPage-1) * params.pageInfo.pageSize;
    const end: number = params.pageInfo.currentPage * params.pageInfo.pageSize;

    const result: any[] = setting_brandType_list_source.slice(start, end);

    const setting_brandType_list = Mock.mock({
        result: {
            list: result,
            pageInfo: {
                currentPage: 1,
                pageCount: 10,
                pageSize: 10,
                rowCount: 10,
                totalCount: setting_brandType_list_source.length
            }
        }
    });

    return setting_brandType_list;
});

const setting_brandTypeByList_list_source: any[] = [
    {
        brandTypeId: 2,
        brandTypeName: "国产斯柯达",
        createdTime: null,
        id: null,
        storeId: 4822,
        updatedTime: null
    },
    {
        brandTypeId: 252,
        brandTypeName: "进口斯柯达",
        createdTime: null,
        id: null,
        storeId: 4822,
        updatedTime: null
    },
    {
        brandTypeId: 266,
        brandTypeName: "北京现代",
        createdTime: null,
        id: null,
        storeId: 4822,
        updatedTime: null
    },
    {
        brandTypeId: 621,
        brandTypeName: "上海大众",
        createdTime: null,
        id: null,
        storeId: 4822,
        updatedTime: null
    },
    {
        brandTypeId: 1057,
        brandTypeName: "一汽大众",
        createdTime: null,
        id: null,
        storeId: 4822,
        updatedTime: null
    },
    {
        brandTypeId: 1485,
        brandTypeName: "一汽丰田",
        createdTime: null,
        id: null,
        storeId: 4822,
        updatedTime: null
    },
    {
        brandTypeId: 1873,
        brandTypeName: "长安福特",
        createdTime: null,
        id: null,
        storeId: 4822,
        updatedTime: null
    },
    {
        brandTypeId: 2201,
        brandTypeName: "进口现代",
        createdTime: null,
        id: null,
        storeId: 4822,
        updatedTime: null
    },
    {
        brandTypeId: 2318,
        brandTypeName: "广汽丰田",
        createdTime: null,
        id: null,
        storeId: 4822,
        updatedTime: null
    },
    {
        brandTypeId: 2562,
        brandTypeName: "一汽马自达",
        createdTime: null,
        id: null,
        storeId: 4822,
        updatedTime: null
    },
    {
        brandTypeId: 2688,
        brandTypeName: "进口大众",
        createdTime: null,
        id: null,
        storeId: 4822,
        updatedTime: null
    },
    {
        brandTypeId: 2938,
        brandTypeName: "国产沃尔沃",
        createdTime: null,
        id: null,
        storeId: 4822,
        updatedTime: null
    },
    {
        brandTypeId: 3025,
        brandTypeName: "进口沃尔沃",
        createdTime: null,
        id: null,
        storeId: 4822,
        updatedTime: null
    },
    {
        brandTypeId: 3227,
        brandTypeName: "东风日产",
        createdTime: null,
        id: null,
        storeId: 4822,
        updatedTime: null
    },
    {
        brandTypeId: 3523,
        brandTypeName: "进口奔驰",
        createdTime: null,
        id: null,
        storeId: 4822,
        updatedTime: null
    },
    {
        brandTypeId: 3580,
        brandTypeName: "国产奔驰",
        createdTime: null,
        id: null,
        storeId: 4822,
        updatedTime: null
    },
    {
        brandTypeId: 3965,
        brandTypeName: "海马",
        createdTime: null,
        id: null,
        storeId: 4822,
        updatedTime: null
    }
];

export const setting_brandTypeByList_list_api = Mock.mock('/api/setting/brandTypeByLike', 'post', (param: any) => {
    const params: any = param.body && JSON.parse(param.body) || null;
    const start: number = (params.pageInfo.currentPage-1) * params.pageInfo.pageSize;
    const end: number = params.pageInfo.currentPage * params.pageInfo.pageSize;

    const result: any[] = setting_brandTypeByList_list_source.slice(start, end);

    const setting_brandType_list = Mock.mock({
        result: {
            list: result,
            pageInfo: {
                currentPage: 1,
                pageCount: 10,
                pageSize: 10,
                rowCount: 10,
                totalCount: setting_brandTypeByList_list_source.length
            }
        }
    });

    return setting_brandType_list;
});

const setting_marketPlanList_list_source: any[] = [
    {
        costDepartmentId: 543,
        costDepartmentName: "续保部",
        costPrice: 80000,
        createdTime: 1542785698929,
        id: 41,
        isOpen: 1,
        marketPrice: 100000,
        name: "加油卡",
        storeId: 4822,
        updatedTime: 1542785698929
    },
    {
        costDepartmentId: 539,
        costDepartmentName: "河南测试店铺",
        costPrice: 100000,
        createdTime: 1542373021675,
        id: 40,
        isOpen: 1,
        marketPrice: 70000,
        name: "团购卡",
        storeId: 4822,
        updatedTime: 1542785697025
    },
    {
        costDepartmentId: 539,
        costDepartmentName: "河南测试店铺",
        costPrice: 20000,
        createdTime: 1542364315104,
        id: 39,
        isOpen: 1,
        marketPrice: 50000,
        name: "saas",
        storeId: 4822,
        updatedTime: 1542596749654
    }
];

export const setting_marketPlanList_list_api = Mock.mock('/api/setting/marketPlanList', 'post', (param: any) => {
    const params: any = param.body && JSON.parse(param.body) || null;
    const start: number = (params.pageInfo.currentPage-1) * params.pageInfo.pageSize;
    const end: number = params.pageInfo.currentPage * params.pageInfo.pageSize;

    const result: any[] = setting_marketPlanList_list_source.slice(start, end);

    const setting_marketPlanList_list = Mock.mock({
        result: {
            list: result,
            pageInfo: {
                currentPage: 1,
                pageCount: 10,
                pageSize: 10,
                rowCount: 10,
                totalCount: setting_marketPlanList_list_source.length
            }
        }
    });

    return setting_marketPlanList_list;
});

const setting_insRebatePercent = Mock.mock({
    result: {
        value: 10
    }
});

export const setting_insRebatePercent_api = Mock.mock('/api/setting/insRebatePercent', 'post', (param: any) => {
    return setting_insRebatePercent;
});

const setting_insCompanyAccountExtModel = Mock.mock({
    result: {
        agentAgreementCode: "代理协议代码",
        brokerCode: "经纪人代码",
        dealerCode: "车商代码",
        dealerName: "车商名称"
    }
});

export const setting_insCompanyAccountExtModel_api = Mock.mock('/api/setting/insCompanyAccountExtModel', 'post', (param: any) => {
    return setting_insCompanyAccountExtModel;
});

const setting_insCompanyAccount_source: any = [
    {
        account: "ZZYZFT-00004",
        cityId: 11301,
        extInfo: null,
        id: 183,
        insCompanyId: 1,
        isOpen: 1,
        isQueryCar: 0,
        password: null,
        provinceId: 113,
        proxyTerminalInfo: '{"brokerCode":"123456","dealerName":"郑州豫中丰田汽车销售服务有限公司","dealerCode":"32090021","agentAgreementCode":"3209002118006 2"}',
        storeId: 4822,
    }
]

export const setting_insCompanyAccount_api = Mock.mock('/api/setting/insCompanyAccount', 'post', (param: any) => {
    const params: any = param.body && JSON.parse(param.body) || null;
    const start: number = (params.pageInfo.currentPage-1) * params.pageInfo.pageSize;
    const end: number = params.pageInfo.currentPage * params.pageInfo.pageSize;

    const result: any[] = setting_insCompanyAccount_source.slice(start, end);

    const setting_insCompanyAccount_list = Mock.mock({
        result: {
            list: result,
            pageInfo: {
                currentPage: 1,
                pageCount: 10,
                pageSize: 10,
                rowCount: 10,
                totalCount: setting_insCompanyAccount_source.length
            }
        }
    });

    return setting_insCompanyAccount_list;
});
