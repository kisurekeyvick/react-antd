import * as React from 'react';
import { Button, Row, Col, message, Spin, Skeleton } from 'antd'; // Form
import { limitNumber } from '../../../../service/validate';
import { ISettingFormItems, insCompanyDiscountFormItems } from './saas-customer-setting-account-config';
import { KISUREPage, IPageInfo } from 'src/components/pagination/pagination-component';
import KISUREAccountForm from './saas-customer-setting-account-form';
import KISUREAccountDiscount from './saas-customer-setting-account-discount';
import { api } from 'src/_mock/api';
import './saas-customer-setting-account.scss';

export default class SaaSCustomerSettingAccount extends React.PureComponent<any, any> {
    public config: any;
    public accountInfo: any;
    public companyList: any[] = [];
    public currentCompany: any = {};
    public companyAccountList: any[] =[];
    public companyDiscountInfo: any = {};
    public accountExtModel: any;
    public pageInfo: IPageInfo;

    constructor(public props: any) {
        super(props);
 
        this.state = {
            isLoading: false,
            isLoadingDiscountInfo: false,
            saving: false,
            reset: false
        };

        this.config = {
            iConStyle: {
                opacity: 1,
                width: '25px'
            },
            buttonGroupStyle: {
                opacity: 0,
                width: 0
            },
            discountForm: this.rebuildDiscountForm(insCompanyDiscountFormItems),
        };

        this.pageInfo = {
            currentPage: 1,
            pageCount: 0,
            pageSize: 5,
            rowCount: 0,
            totalCount: 0,
            pageSizeOptions: ['5', '10', '15']
        };
    }

    public rebuildDiscountForm = (formItem: ISettingFormItems[]) => {
        return formItem.map(item => {
            const result  = item;

            switch(result.key) {
                case 'discount':
                    result.config.rule.push({
                        validator: this.limitNumber
                    });
                    break;
                default:
                    break;
            }

            return result;
        });
    }

    public componentDidMount() {
        this.initCompanyAccountInfo();
    }

    /**
     * 初始化加载数据
     */
    public initCompanyAccountInfo = () => {
        this.setState({
            isLoading: true
        });

        api.getInsCompanyList().then((res: any) => {
            if (res && res.status === 200) {
                this.companyList = res.data.result;
                if (this.companyList[0]) {
                    this.selectInsCompany(this.companyList[0]);
                }
            }

            this.setState({
                isLoading: false
            });
        });
    }

    /**
     * 切换保险公司，加载返点比例和账号拓展字段
     */
    public selectInsCompany = (compoany: any) => {
        this.currentCompany = compoany;

        this.setState({
            isLoading: true,
            isLoadingDiscountInfo: true
        });

        const param: any = {
            companyId: compoany.id
        };

        Promise.all([
            api.getStoreInsRebatePercent(param),
            api.getStoreAccountExtModel(param),
        ]).then((res: any) => {
            if (res && res.some((i: any) => i.status === 200)) {
                this.accountExtModel = res[1].data.result;
                this.companyDiscountInfo = res[0];
                this.setState({
                    isLoadingDiscountInfo: false
                });
                this.page(this.pageInfo.currentPage, this.pageInfo.pageSize);
            } else 
                this.setState({
                    isLoading: false,
                    isLoadingDiscountInfo: false
                });
        });
    }

    /**
     * 设为推广
     */
    public setPopular = () => {
        const params = this.currentCompany;

        this.setState({
            isLoading: true
        });

        api.setCompanyPopular(params).then((res: any) => {
            if (res && res.status === 200) {
                message.success('推广成功！');
                this.initCompanyAccountInfo();
            } else 
                this.setState({
                    isLoading: false
                });
        });
    }

    /**
     * 添加账号
     */
    public addAccount = () => {

    }

    /**
     * 数字验证
     */
    public limitNumber = (rule: any, value: any, callback: any) => {
        if (!limitNumber(value, false, 0))
            callback(`返点比例不可为负数`);

        callback();
    }

    /**
     * 编辑保险公司返点信息
     * @param type
     */
    public saveInsCompanyDisCountInfo = (type: string, params: any) => {
        this.setState({
            isLoading: true,
            isLoadingDiscountInfo: true
        });

        const companyParams = {
            company: this.currentCompany
        };

        api.saveStoreInsRebatePercent(params).then((res: any) => {
            if (res && res.status === 200) {
                message.success('店铺返点比例保存成功！');
                this.getStoreInsRebatePercent(companyParams);
            } else
                this.setState({
                    isLoading: false,
                    isLoadingDiscountInfo: false
                });
        });
    }

    /**
     * 加载保险公司返点比例
     */
    public getStoreInsRebatePercent = (param: any) => {
        this.setState({
            isLoading: true,
            isLoadingDiscountInfo: true
        });

        api.getStoreInsRebatePercent(param).then((res: any) => {
            if (res && res.status === 200) {
                this.companyDiscountInfo = res;
            }

            this.setState({
                isLoading: false,
                isLoadingDiscountInfo: false
            });
        });
    }

    /**
     * 加载保险公司账号
     */
    public loadCompanyAccountList = (param?: any) => {
        this.setState({ 
            isLoading: true,
            reset: true
        });

        api.queryStoreAccountList(param).then((res: any) => {
            if (res && res.status === 200) {
                const { list, pageInfo } = res.data.result;

                this.companyAccountList = list;

                this.pageInfo = {...this.pageInfo, ...{ totalCount: pageInfo.totalCount }};

                this.setState({
                    isLoading: false,
                    reset: false
                });
            } else 
                this.setState({
                    isLoading: false,
                    reset: false
                });
        });
    }

    /** 
     * 保存保险公司账号
     */
    public saveAccountForm = (params: any) => {
        this.setState({
            isLoading: true
        });

        api.saveCompanyAccountInfo(params).then((res: any) => {
            if (res && res.status === 200) {
                message.success('保险公司账号保存成功');
                const company = this.companyList.find((list: any) => list.id === this.currentCompany.id);
                this.selectInsCompany(company);
            } else {
                message.error('保存失败');
                this.setState({
                    isLoading: false
                });
            }  
        });
    }

    /** 
     * 删除保险公司账号
     */
    public deleteAccountForm = (params: any) => {
        this.setState({
            isLoading: true
        });

        api.deleteCompanyAccountInfo(params).then((res: any) => {
            if (res && res.status === 200) {
                message.success('保险公司账号删除成功');
                const company = this.companyList.find((list: any) => list.id === this.currentCompany.id);
                this.selectInsCompany(company);
            } else {
                message.error('删除失败');
                this.setState({
                    isLoading: false
                });
            }
        });
    }

    /**
     * 分页回调
     * @param currentPage 
     * @param pageSize 
     */
    public page = (currentPage:number, pageSize: number, isSearchCallBack: boolean = false) => {
        this.pageInfo = {...this.pageInfo, ...{
            currentPage: currentPage === 0 ? 1 : currentPage,
            pageSize
        }};

        const params: any = {
            pageInfo: {
                currentPage: currentPage === 0 ? 1 : currentPage,
                pageSize
            }
        };

        this.loadCompanyAccountList(params);
    }

    public render() {
        const insCompanyAccountProps = {
            save: this.saveInsCompanyDisCountInfo,
            discountInfo: {
                discount: 'data' in this.companyDiscountInfo && this.companyDiscountInfo['data']['result']['value']
            }
        };

        return (
            <div className='kisure-saas-customer-setting-account'>
                <Spin tip='Loading...' spinning={this.state.isLoading}>
                    <div className='kisure-saas-customer-setting-account-company'>
                        <Row gutter={48}>
                            <Col xs={24} sm={18}>
                                <div className='kisure-saas-customer-setting-account-company-list'>
                                    {
                                        this.companyList.map((list: any, index: number) => {
                                            return (
                                                <Button type={this.currentCompany['id'] === list['id'] ? 'primary' : 'default'} key={`button-` + index} onClick={() => this.selectInsCompany(list)}>
                                                    {list.shortName}
                                                    {list.isDefault === 0 ? '' : <span className='red'>(推广)</span>}
                                                </Button>
                                            )
                                        })
                                    }
                                </div>
                            </Col>
                            <Col xs={24} sm={6}>
                                <div className='kisure-saas-customer-setting-account-company-operation'>
                                    <Button key={`button-add-account`} type='primary' onClick={this.addAccount} disabled={this.companyAccountList.length > 0}>添加账户</Button>
                                    { this.currentCompany.isDefault === 1 ? null : <Button key={`button-popularize`} type='primary' onClick={this.setPopular}>设为推广</Button> }
                                </div>
                            </Col>
                        </Row>
                    </div>
                    {
                        this.state.isLoadingDiscountInfo ?
                        <div className='kisure-saas-customer-setting-account-discount-skeleton'>
                            <Skeleton active={true} paragraph={{ rows: 5 }} />
                        </div> :
                        <KISUREAccountDiscount {...insCompanyAccountProps}/>
                    }
                    <div className='kisure-saas-customer-setting-account-item'>
                        <Row>
                            {
                                this.companyAccountList.map((item: any, index: number) => {
                                    const props = {
                                        account: item,
                                        accountExtModel: this.accountExtModel,
                                        save: this.saveAccountForm,
                                        delete: this.deleteAccountForm
                                    };

                                    return <Col key={index} xs={24}>
                                                { this.state.reset ? 
                                                    <div className='kisure-saas-customer-setting-account-item-skeleton'>
                                                        <Row>
                                                            <Col xs={24} lg={12} xl={8}>
                                                                <Skeleton active={true} paragraph={{ rows: 5 }} />
                                                            </Col>
                                                        </Row>
                                                    </div> :
                                                    <KISUREAccountForm {...props}/> }
                                            </Col>
                                })
                            }
                        </Row>
                    </div>
                    <div className='kisure-saas-customer-setting-account-page'>
                        <KISUREPage pageChange={this.page} {...this.pageInfo}/>
                    </div>
                </Spin>
            </div>
        )
    }
}

// export default Form.create()(SaaSCustomerSettingAccount);
