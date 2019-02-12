import * as Mock from 'mockjs';

const kisure_menu = Mock.mock({
    result: {
        slideMenu: [
            {
                title: 'SaaS Insurance',
                path: '/',
                key: '3',
                tags: 'appstore', 
                child: [
                    {
                        title: '保险业务',
                        path: '/',
                        tags: 'link',
                        key: '4',
                        child: [
                            {
                                title: '客户批量导入',
                                path: '/saas/customer/progress',
                                tags: 'link',
                                key: '5',
                            },
                            {
                                title: '客户管理',
                                path: '/saas/customer/list',
                                tags: 'link',
                                key: '6',
                            },
                            {
                                title: '续保战败审核', 
                                path: '/saas/customer/defeat',
                                tags: 'link',
                                key: '7',
                            },
                            {
                                title: '保险话单',
                                path: '/saas/customer/record',
                                tags: 'link',
                                key: '8',
                            },
                            {
                                title: '保险业务报表',
                                path: '/saas/customer/report',
                                tags: 'link',
                                key: '9',
                            },
                            {
                                title: '保单管理',
                                path: '/saas/customer/policy',
                                tags: 'link',
                                key: '10',
                            },
                            {
                                title: '保险设置',
                                path: '/',
                                tags: 'appstore', 
                                key: '11',
                                child: [
                                    {
                                        title: '保险规则设置',
                                        path: '/saas/customer/setting',
                                        tags: 'link',
                                        key: '12',
                                    },
                                    // {
                                    //     title: '保险线索设置',
                                    //     path: '/',
                                    //     tags: 'link',
                                    //     key: '13',
                                    // }
                                ]
                            },
                        ]
                    }
                ]
            },
            {
                title: '基础js',
                path: '/baseJs',
                key: '4',
                tags: 'appstore'
            }
        ],
    }
});

export const kisure_menu_api = Mock.mock('api/kisure/menu', 'post', () => {
    return kisure_menu;
});
