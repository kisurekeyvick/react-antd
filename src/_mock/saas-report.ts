import * as Mock from 'mockjs';

const personalIndicator = Mock.mock({
    result: [
        { name: "跟进量", firstValue: '6', secondValue: '5%' },
        { name: "有效通话量", firstValue: '12', secondValue: '10%' },
        { name: "成交单量", firstValue: '3', secondValue: '2%' },
        { name: "保费总额", firstValue: '0', secondValue: '0' },
        { name: "新增客户数", firstValue: '12', secondValue: '10%' },
        { name: "续保期客户量", firstValue: '24', secondValue: '20%' },
        { name: "续保率", firstValue: '34', secondValue: '20%' },
        { name: "任务达成率", firstValue: '12', secondValue: '12%' },
    ]
});

export const report_personalIndicator_api = Mock.mock('/api/customer/personalIndicator', 'post', (param: any) => {
    return personalIndicator;
});

const personalWorkDetails = Mock.mock({
    result: [
        {
            'salesmanId': 101262,
            'salesmanName': '李钢',
            'followCount': '33',
            'validCallCount': '0',
            'renewalCount': '357',
            'createCustomerCount': '0',
            'policyCount': '16.0',
            'totalPremium': '14172500.00',
            'taskCompletionRate': '0.0'
        },
        {
            'salesmanId': 101818,
            'salesmanName': '宋怡文',
            'followCount': '21',
            'validCallCount': '0',
            'renewalCount': '234',
            'createCustomerCount': '0',
            'policyCount': '5.0',
            'totalPremium': '2634800.0',
            'taskCompletionRate': '0.0'
        }
    ]
});

export const report_personalWorkDetails_api = Mock.mock('/api/customer/personalWorkDetails', 'post', (param: any) => {
    return personalWorkDetails;
});

const personalCharts = Mock.mock({
    result: {
        '1': '0',
        '2': '2',
        '3': '2',
        '44': '0',
        '45': '0',
        '46': '0',
        '47': '0',
        '48': '2',
        '49': '8',
        '50': '4',
        '51': '23',
        '52': '13'
    }
});

export const report_personalCharts_api = Mock.mock('/api/customer/personalCharts', 'post', (param: any) => {
    let type: string = '';
    const source: any = {
        xAxis: [],
        yAxis: []
    };

    if (param.hasOwnProperty('body')) {
        const obj = JSON.parse(param.body);
        type = obj['type'];
    }

    for (const key in personalCharts) {
        if (type === 'week')
            source['xAxis'].push(`第${key}周`);
        else if (type === 'month')
            source['xAxis'].push(`${key}月`);
        else
            source['xAxis'].push(key);

        source['yAxis'].push(+(personalCharts[key]));
    }

    return source;
});

const premiumSales = Mock.mock({
    result: {

    }
});

export const report_premiumSales_api = Mock.mock('/api/customer/premiumSales', 'post', (param: any) => {
    return premiumSales;
});

const carProportio = Mock.mock({
    result: {

    }
});

export const report_carProportio_api = Mock.mock('/api/customer/carProportio', 'post', (param: any) => {
    return carProportio;
});