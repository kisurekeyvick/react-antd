import axios from 'axios';
import './index';

export const api = {
    /** 用户登录 */
    userLogin: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/user/login', {}).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** token验证免登录 */
    tokenLogin: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/tokenLogin', {}).then(res => {
                window.setTimeout(() => {
                    resolve(res);
                },1000);
            }, error => {
                reject(error);
            });
        });
    },
    getCustomerWorkSpaceData: () => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/workspace', {}).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    getSaaSMenuData: () => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('api/kisure/menu', {}).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    getSaaSDictionary: () => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/saas/dictionary', {}).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    // customer部分
    /** 获取customer list数据 */
    getCustomerList: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/list', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    getCustomerBaseInfo: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/list/detail/baseInfo', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 获取客户详情数据 */
    getCustomerListDetail: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/list/detail', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 获取客户历史记录 */
    getCustomerHistoricalRecord: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/list/historicalRecord', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 获取客户询价历史记录 */
    getCustomerCalculateRecord: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/list/calculateRecord', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 微信询价 */
    weChatQuotedPrice: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/weChatQuotedPrice', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 短信报价 */
    smsQuotedPrice: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/mockRequest', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 保存客户详情数据 */
    saveCustomerListDetail: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/mockRequest', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 客户重新分配 */
    customerReassignment: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/mockRequest', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 添加跟进 */
    addCustomerFollowRecord: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/mockRequest', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 获取短信模板 */
    getSMSTemplate: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/smsTemplate', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    getTaskStatus: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/taskStatus', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },

    /** 新建用户 */
    newCustomer: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/mockRequest', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 批量分配 */
    batchAssign: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/mockRequest', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 批量短信营销 */
    batchSMS: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/mockRequest', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 单条任务战败 */
    defeatTask: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/mockRequest', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 订单成功 */
    successOrder: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/mockRequest', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    
    // setting部分
    /** 获取营销方案 */
    getMktPlanList: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/setting/mktPlanList', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },

    // common部分
    /** 获取续保员 */
    getSubordinateRenewalMan: () => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/common/renewalMan', {}).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 获取顾问 */
    getShopScUserRoleGroup: ()=> {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/common/shopSc', {}).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 获取保险公司 */
    getInsCompanyList: ()=> {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/common/company', {}).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 根据地理位置获取省简称 */
    getPlaceShortNameByLocation: ()=> {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/common/placeShortName', {}).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 获取所有省简称 */
    getPlaceAllShortName: ()=> {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/common/provinces', {}).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 获取保险公司险种 */
    getInsPlanList: ()=> {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/common/insPlanList', {}).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 打电话 */
    phoneCall: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/mockRequest', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 挂断电话 */
    handUpPhone: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/mockRequest', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 附件上传 */
    upload: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/common/upload', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    customRequest: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/common/customRequest', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },

    // 客户战败
    /** 获取战败数据 */
    getCustomerDefeatList: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/defeat', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 战败审核 审核通过 */
    defeatTaskReview: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/mockRequest', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 战败审核 审核驳回 */
    defeatTaskReject: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/mockRequest', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    // 客户保单
    /** 获取保单数据 */
    getCustomerPolicyList: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/policy', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 获取保单详情 */
    getCustomerPolicyDetail: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/policy/detail', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },

    // 客户话单
    getCustomerRecordList: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/record', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },

    // 客户批量导入
    /** 客户导入列表数据 */
    getImportBatchList: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/batch', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },

    // 保险设置
    /** 组织部门 */
    getWebOrganization: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/setting/getWebOrganization', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 当前店铺所有续保员 */
    getRoleGroup: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/setting/roleGroup', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 获取业务提醒设置 */
    getBussinessRemind: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/setting/bussinessRemind', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 保存业务提醒数据 */
    saveBussinessRemind: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/mockRequest', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 获取战败客户审核流程数据 */
    getDefeatSetting: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/setting/defeatSetting', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 保存战败客户审核流程数据 */
    saveDefeatSetting: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/mockRequest', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 获取客户分配规则 */
    getRuleAssign: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/setting/ruleAssign', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 获取当前分配比例列表 */
    getDistributionRatioList: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/setting/distributionRatioList', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 保存客户分配规则 */
    saveRuleAssign: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/mockRequest', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 获取服务品牌 */
    getBrandTypeListByStore: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/setting/brandTypeList', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 删除服务品牌 */
    deleteBrandTypeListByStore: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/mockRequest', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 查询服务品牌 */
    getBrandTypeByLike: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/setting/brandTypeByLike', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 保存服务品牌 */
    saveBrandTypeByLike: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/mockRequest', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 获取营销方案列表 */
    getMarketPlanList: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/setting/marketPlanList', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 保存营销方案设置 */
    saveMarketPlan: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/mockRequest', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 删除营销方案设置 */
    deleteMarketPlan: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/mockRequest', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 保险公司返点比例 */
    getStoreInsRebatePercent: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/setting/insRebatePercent', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 保存保险公司返点比例 */
    saveStoreInsRebatePercent: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/mockRequest', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 加载保险公司 账号展示的扩展字段 */
    getStoreAccountExtModel: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/setting/insCompanyAccountExtModel', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 加载店铺保险公司账号列表 */
    queryStoreAccountList: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/setting/insCompanyAccount', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 保险公司设为推广 */
    setCompanyPopular: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/mockRequest', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 保存保险公司账号 */
    saveCompanyAccountInfo: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/mockRequest', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 删除保险公司账号 */
    deleteCompanyAccountInfo: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/mockRequest', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 保险报表 个人维度核心指标 */
    queryPersonalIndicators: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/personalIndicator', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 保险报表 个人维度保险业务工作量明细查询 */
    queryPersonalWorkDetails: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/personalWorkDetails', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 保险报表 个人维度走势图查询 */
    queryPersonalCharts: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/personalCharts', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 保险报表 公司维度 加载保险公司保费销售额 */
    queryInsurancePremiumSales: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/premiumSales', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
    /** 保险报表 车系维度 加载续保车型占比 */
    queryRenewalCarProportion: (param?: any) => {
        return new Promise((resolve: any, reject: any) => {
            axios.post('/api/customer/carProportio', param).then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
        });
    },
};
 