import * as Mock from 'mockjs';

const saas_dictionary = Mock.mock({
    result: {
        /** 客户列表 客户意向 */
        customerIntention: [
            { name: '待定', value: 'F' },
            { name: '低', value: 'L' },
            { name: '中', value: 'M' },
            { name: '高', value: 'H' }
        ],
        customerIntentionFullName: [
            { name: '待定', value: 'F' },
            { name: '低意向', value: 'L' },
            { name: '中等意向', value: 'M' },
            { name: '高意向', value: 'H' }
        ],
        /** 贷款状态 */
        loansStatus: [
            { name: '全款', value: 1 },
            { name: '贷款未结清', value: 2 },
            { name: '贷款已结清', value: 3 }
        ],
        /** 本店投保次数 */
        insuredCount: [
            { name: '0次', value: 1 },
            { name: '1~2次', value: 2 },
            { name: '3~5次', value: 3 },
            { name: '5次以上', value: 4 }
        ],
        /** 短信模板类别 */
        smsTemplateType: [
            { name: '报价', value: 0 },
            { name: '车险到期提醒', value: 1 },
            { name: '促销活动', value: 2 }
        ],
        /** 批量分配 分配逻辑 */
        asignLogic: [
            { name: '按客户类型平均分配', value: 1 },
            { name: '按成交率分配', value: 2 }
        ],
        /** 车牌第一位 */
        carNumber: [
            { name: '京', value: '京' },
            { name: '津', value: '津' },
            { name: '沪', value: '沪' },
            { name: '渝', value: '渝' },
            { name: '冀', value: '冀' },
            { name: '吉', value: '吉' },
            { name: '辽', value: '辽' },
            { name: '黑', value: '黑' },
            { name: '湘', value: '湘' },
            { name: '鄂', value: '鄂' },
            { name: '甘', value: '甘' },
            { name: '晋', value: '晋' },
            { name: '陕', value: '陕' },
            { name: '豫', value: '豫' },
            { name: '川', value: '川' },
            { name: '云', value: '云' },
            { name: '桂', value: '桂' },
            { name: '蒙', value: '蒙' },
            { name: '贵', value: '贵' },
            { name: '青', value: '青' },
            { name: '藏', value: '藏' },
            { name: '新', value: '新' },
            { name: '宁', value: '宁' },
            { name: '粤', value: '粤' },
            { name: '琼', value: '琼' },
            { name: '闽', value: '闽' },
            { name: '苏', value: '苏' },
            { name: '浙', value: '浙' },
            { name: '赣', value: '赣' },
            { name: '鲁', value: '鲁' },
            { name: '皖', value: '皖' }
        ],
        /** 险种 */
        policyPlanMapping: [
            { name: 'checkbox', value: 1 },
            { name: 'input', value: 2 },
            { name: 'select', value: 3 },
            { name: 'label', value: 4 }
        ],
        /** 证件类型 */
        certType: [
            { name: '身份证', value: '1' },
            { name: '组织机构代码', value: '6' },
            { name: '社会信用代码', value: '18' }
        ],
        /** 投保类型 */
        insType: [
            { name: '新保', value: 1 },
            { name: '新转续', value: 2 },
            { name: '续转续', value: 3 },
            { name: '间转续', value: 4 },
            { name: '潜转续', value: 5 }
        ],
        /** 招揽状态 */
        solicitStatus: [
            { name: '待招揽', value: 1 },
            { name: '招揽中', value: 2 },
            { name: '成单', value: 3 }, 
            { name: '战败', value: 4 },
            { name: '已出单', value: 5 },
            { name: '战败审核', value: 7 }
        ],
        /** 跟进 */
        followWay: [
            { name: '电话', value: 1 },
            { name: '到店', value: 2 },
            { name: '短信', value: 3 },
            { name: '微信', value: 4 }
        ],
        /** 能源类型 */
        energyType: [
            { name: '燃油', value: 1 },
            { name: '纯电动', value: 2 },
            { name: '燃料电池', value: 3 },
            { name: '插电式混合动力', value: 4 },
            { name: '其他混合动力', value: 5 }
        ],
        /** 被保险人与车辆关系 */
        relationship: [
            { name: '车辆所有人', value: 1 },
            { name: '车辆管理人', value: 2 },
            { name: '保险人允许的合法驾驶员', value: 3 },
            { name: '其他', value: 4 }
        ],
        /** 车主性质 */
        ownerProp: [
            { name: '个人', value: 1 },
            { name: '企业', value: 2 },
            { name: '机关', value: 3 }
        ],
        /** 被保险人性质 */
        insuredmanProp: [
            { name: '个人', value: 1 },
            { name: '团体', value: 2 },
            { name: '单位', value: 3 }
        ],
        /** 审核状态 */
        auditStatus: [
            { name: '待审核', value: 0 },
            { name: '审核通过', value: 1 },
            { name: '驳回', value: 2 }
        ],
        /** 呼叫类型 */
        typeOfCall: [
            { name: '呼出', value: 0 },
            { name: '呼入', value: 1 }
        ],
        /** 添加跟进 跟进结果 */
        followResult: [
            { name: '电话接通', value: 1 },
            { name: '未接通', value: 2 },
            { name: '拒接', value: 3 },
            { name: '中途拒访', value: 4 },
            { name: '待跟进', value: 5 }
        ],
        /** 跟进记录 更新类型 */
        updateType: [
            { name: '新建任务', value: 1 },
            { name: '跟进', value: 2 },
            { name: '修改客户信息', value: 3 },
            { name: '报价', value: 4 },
            { name: '通话', value: 5 },
            { name: '战败驳回', value: 6 },
            { name: '重新分配', value: 7 }
        ],
        /** 使用性质 */
        usage: [
            { name: '家庭自用', value: 1 },
            { name: '企业营业', value: 4 },
            { name: '企业非营业', value: 10 }
        ],
        /** 导入状态 */
        importStatus: [
            { name: '等待中', value: 0 },
            { name: '进行中', value: 1 },
            { name: '已完成', value: 2 },
            { name: '失败', value: 3 }
        ],
        /** 导入类型 */
        importType: [
            { name: '查询在保', value: 1 }
        ],
        /** 车牌类型 */
        plateType: [
            { name: '大型汽车号牌', value: 1 },
            { name: '小型汽车号牌', value: 2 },
            { name: '使馆汽车号牌', value: 3 },
            { name: '领馆汽车号牌', value: 4 },
            { name: '境外汽车号牌', value: 5 },
            { name: '外籍汽车号牌', value: 6 },
            { name: '农用运输车号牌', value: 7 },
            { name: '挂车号牌', value: 8 },
            { name: '教练汽车号牌', value: 9 },
            { name: '试验汽车号牌', value: 10 },
            { name: '临时入境汽车号牌', value: 11 },
            { name: '临时行驶车号牌', value: 12 },
            { name: '公安警车号牌', value: 13 },
            { name: '其他车型', value: 14 },
            { name: '武警号牌', value: 15 },
            { name: '军队号牌', value: 16 },
            { name: '大型新能源汽车', value: 17 },
            { name: '小型新能源汽车', value: 18 }
        ],
        /** 车牌颜色 */
        plateColor: [
            { name: '蓝', value: 1 },
            { name: '黄', value: 2 },
            { name: '黑', value: 3 },
            { name: '其他', value: 4 },
            { name: '蓝M', value: 5 },
            { name: '黄D', value: 6 },
            { name: '黄M', value: 7 },
            { name: '黄N', value: 8 },
            { name: '黄T', value: 9 },
            { name: '黄J', value: 10 },
            { name: '白', value: 11 },
            { name: '白M', value: 12 },
            { name: '渐变绿', value: 13 },
            { name: '黄绿双拼', value: 14 }
        ]
    }
});

export const saas_dictionary_api = Mock.mock('/api/saas/dictionary', 'post' ,() => {
    return saas_dictionary;
})

