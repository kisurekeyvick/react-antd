import * as Loadable from 'react-loadable';

interface IBase {
    path: string;
    exact?: boolean;
}

interface ILoadableRoute extends IBase {
    component: any;
}

const userRouter: ILoadableRoute[] = [
    {
        path: '/user/:status',
        component:Loadable({
            loader: () => import('src/layouts/user/user'),
            loading: () => null,
            modules: ['user']
        }),
        exact: true
    },
];

const routeConfig: ILoadableRoute[] = [
    { 
        path: '/saas/customer/list',  
        component: Loadable({
            loader: () => import('src/containers/saas-customer/saas-customer-list/saas-customer-list.index'),
            loading: () => null,
            modules: ['saasCustomerList']
        }),
    },
    {
        path: '/saas/customer/budget/detail/:id',
        component: Loadable({
            loader: () => import('src/containers/saas-customer/saas-customer-list/saas-customer-list-budget-detail/saas-customer-list-budget-detail'),
            loading: () => null,
            modules: ['saasCustomerBudget']
        }),
        exact: true
    },
    {
        path: '/saas/customer/enquiry/detail/:id',
        component: Loadable({
            loader: () => import('src/containers/saas-customer/saas-customer-list/saas-customer-list-enquiry-detail/saas-customer-list-enquiry-detail'),
            loading: () => null,
            modules: ['saasCustomerDetail']
        }),
        exact: true
    },
    { 
        path: '/saas/customer/defeat', 
        component: Loadable({
            loader: () => import('src/containers/saas-customer/saas-customer-defeat/saas-customer-defeat-list/saas-customer-defeat-list'),
            loading: () => null,
            modules: ['saasCustomerDefeatList']
        }),
    },
    { 
        path: '/saas/customer/policy', 
        component: Loadable({
            loader: () => import('src/containers/saas-customer/saas-customer-policy/saas-customer-policy-list/saas-customer-policy-list'),
            loading: () => null,
            modules: ['saasCustomerPolicyList']
        }), 
        exact: true,
    },
    {
        path: '/saas/customer/policy/detail/:id',
        component: Loadable({
            loader: () => import('src/containers/saas-customer/saas-customer-policy/saas-customer-policy-detail/saas-customer-policy-detail'),
            loading: () => null,
            modules: ['saasCustomerPolicyDetail']
        }),
        exact: true,
    },
    { 
        path: '/saas/customer/record', 
        component: Loadable({
            loader: () => import('src/containers/saas-customer/saas-customer-record/saas-customer-record-list/saas-customer-record-list'),
            loading: () => null,
            modules: ['saasCustomerRecordList']
        }), 
        exact: true,
    },
    { 
        path: '/saas/customer/progress', 
        component: Loadable({
            loader: () => import('src/containers/saas-customer/saas-customer-progress/saas-customer-progress-list/saas-customer-progress-list'),
            loading: () => null,
            modules: ['saasCustomerProgressList']
        }), 
        exact: true,
    },
    { 
        path: '/saas/customer/setting', 
        component: Loadable({
            loader: () => import('src/containers/saas-customer/saas-customer-setting/saas-customer-setting-index'),
            loading: () => null,
            modules: ['saasCustomerSetting']
        }), 
        exact: true,
    },
    {
        path: '/saas/customer/report',
        component: Loadable({
            loader: () => import('src/containers/saas-customer/saas-customer-report/saas-customer-report'),
            loading: () => null,
            modules: ['sassCustomerReport']
        }),
        exact: true,
    }, 
    {
        path: '',
        component: Loadable({
            loader: () => import('src/containers/exception/exception'),
            loading: () => null,
            modules: ['404']
        })
    }
];


export {
    ILoadableRoute,
    routeConfig,
    userRouter
};

/** 
 * https://www.jianshu.com/p/697669781276
 * https://www.jianshu.com/p/462bb9d1c982
 * React Loadable - 以组件为中心的代码分割和懒加载
 * 当你有一个很大的应用，把所有代码打成一个单一的包那么应用的启动时间会成问题
 * 现在的前端打包工具在生产环境一般都是把所有 js 拼接压缩成一个长文件，css 拼接压缩成一个长文件，配合 source map 发到用户的浏览器。
 * 如果项目使用到的包很多，这个单一的 js 文件会很大，严重延迟网页的首次加载时间）。
 * 你需要开始分拆你的应用到分离的包，然后在需要的时候动态加载。
 * 
 * (1)React Loadable
 * React Loadable 是一个轻量级的代码分割组件
 * api:
 *      Loadable 是一个高阶组件(一个创建并返回组件的函数)，它能让你的应用程序在渲染之前动态的加载任何模块
 *      import() 在webpack2+中，当你使用import()的时候，它会为你自动代码分割，所以使用React Loadable和import()可以很快的实验出新的代码分割点来
 *      当loader加载失败，loading里面渲染的组件会接收一个'error'属性为true的prop
 *      当loader超时(有时候网络连接断开或者失败)，loading中渲染的组件将会接收到一个'timeOut'的prop
 * 
 *      loading: Loading
 *      
 *      const Loading = ({props}) => {
 *          if (props.error) {             // 加载失败
 *              return <div>Error!</div>;
 *          } else if (props.timedOut) {   // 超时 网络连接断开或者失败，或者永久性挂起，这时候网页无反应
 *              return <div>Taking a long time...</div>;
 *          } else if (props.pastDelay) {  // 当组件的加载时间比设置的delay时间长的时候
 *              return <div>Loading...</div>;
 *          } else {
 *              return null;
 *          }
 *      }
 */
