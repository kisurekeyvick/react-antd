import * as React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { Table, Spin, Skeleton } from 'antd';
import * as moment from 'moment';
import { getCustomerListInitData } from 'src/actions/saas-customer-action';
import { formItems, tableColumns, IFormItems, ITableColumns } from './saas-customer-policy-list-config';
import KISURESearch from 'src/components/search/search-component';
import { KISUREMessage } from 'src/components/message/message-list-component';
import { IurlParams, KisureSearchFormRoute } from 'src/service/router';
import { KISUREPage, IPageInfo } from 'src/components/pagination/pagination-component';
import { mappingValue } from 'src/service/common.fun';
import { api } from 'src/_mock/api';
import './saas-customer-policy-list.scss';

class SaaSCustomerPolicy extends React.Component<any, any> {
    public config: any;
    public selectedTask: any;
    public searchUrlParams: IurlParams[] = [];
    public tableOrderUrlParams: IurlParams[] = [];
    public customerPolicyList: any[] = [];
    public pageInfo: IPageInfo;
    public searchFormRoute: any;

    constructor(public props: any){
        super(props);

        this.config = {
            formItem: [...formItems],
            tableColumns: this.reRenderTableColumn(tableColumns)
        };

        this.pageInfo = {
            currentPage: 1,
            pageCount: 0,
            pageSize: 10,
            rowCount: 0,
            totalCount: 0,
            pageSizeOptions: ['10', '20', '30', '40', '50']
        };

        this.searchFormRoute = new KisureSearchFormRoute({
            history: this.props.history,
            location: this.props.location,
            match: this.props.match,
        });

        this.state = {
            isLoading: false,
            initComplete: false
        };
    }

    /**
     * 再次配置tableColumn
     * @param colums 
     */
    public reRenderTableColumn(colums: ITableColumns[]) {
        return colums.map((table: ITableColumns) => {
            let result: ITableColumns = table;

            switch(table.id) {
                case 9: result = { ...result, ...{
                            render: (text: any, record: any) => (
                                <a href="javascript:;" key={`skpi-a-` + record.id} onClick={(e: any) => this.skipPage(e, record)}>详情</a>
                            )
                        }};
                break;
            }

            return result;
        });
    }

    public componentDidMount() {
        this.props.getCustomerListInitData();
        this.loadInitCustomerDefeatData();
    }

    public shouldcomponentupdate(nextProps: any, nextState: any) {
        if (_.isEqual(this.props, nextProps) || !_.isEmpty(this.props)) {
            return false;
        }
        return true;
    }

    /**
     * 加载初始化数据
     */
    public loadInitCustomerDefeatData = () => {
        this.initPageInfo().then((urlAnalysisParams) => {
            this.searchUrlParams = urlAnalysisParams.map((param: any) => {
                const target = this.config.formItem.find((item: IFormItems) => item.key === param.key);
                param.type = target && target['type'];
                return param;
            }).filter((param: any) => param.key && param.type);

            this.giveValueToSearchFormItem({init: true}, urlAnalysisParams);
            this.page(this.pageInfo.currentPage, this.pageInfo.pageSize, false);
        });
    }

    public reloadInitCustomerDefeatData = () => {
        this.loadInitCustomerDefeatData();
    }

    /**
     * 根据url解析分页信息
     */
    public initPageInfo():Promise<any> {
        const params = this.searchFormRoute.urlAnalysis(this.config.formItem) || [];

        params.forEach((item: any) => {
            if (item.key === 'page')
                this.pageInfo = {...this.pageInfo, ...{ currentPage: +(item.value) }};

            if (item.key === 'pageSize')
                this.pageInfo = {...this.pageInfo, ...{ pageSize: +(item.value) }};
        });

        return new Promise((resolve)=> {
            resolve(params);
        });
    }

    /**
     * 将url中的参数获取到，赋值给this.config.formItem
     * 如果是初始化(init为true)，则不需要清除searchForm中的数据，否则清空searchForm中的数据
     */
    public giveValueToSearchFormItem(params:{'init': boolean}, urlAnalysisParams: any[]) {
        params.init ?
        (urlAnalysisParams || this.searchFormRoute.urlAnalysis(this.config.formItem)).forEach((param: any) => {
            const target = this.config.formItem.find((item: any) => item.key === param.key);

            if (target)
                target.config.initialValue = param.value;
        }):
        this.config.formItem.forEach((item: any) => {
            if ('initialValue' in item.config)
                item.config['initialValue'] = undefined;
        });
    }

    /**
     * 搜索回调
     * @param params 
     */
    public submitSearchForm = (params: any) => {
        const urlParams: IurlParams[] = [];

        for(const key in params) {
            const target = this.config.formItem.find((item: IFormItems) => item.key === key);

            if (target)
                urlParams.push({
                    key: target.key,
                    value: params[key],
                    type: target.type
                });
        }

        this.searchUrlParams = urlParams;
        this.page(this.pageInfo.currentPage, this.pageInfo.pageSize, true);
    }

    /**
     * 获取customer list数据
     */
    public searchCuistomerPolicyList(param?: any) {
        this.setState({ 
            isLoading: true
        });

        api.getCustomerPolicyList(param).then((res: any) => {
            const { list, pageInfo } = res.data.result;

            this.customerPolicyList = this.mapTableList(list);

            this.pageInfo = {...this.pageInfo, ...{ totalCount: pageInfo.totalCount }};

            this.setState({ 
                isLoading: false,
                initComplete: true 
            });
        });
    }

    /**
     * 点击table分页或者filter或者sorter 发生回调
     */
    public handleTableChange = (pagination: any, filters: any, sorter: any) => {
        this.tableOrderUrlParams = [];

        for (let i = 0; i < tableColumns.length; i++) {
            if ('sorter' in tableColumns[i] && tableColumns[i]['sorter'] && sorter.field === tableColumns[i]['key']) {
                this.tableOrderUrlParams = [
                    { key: sorter.columnKey, value: sorter.order, type: 'string' }
                ];
                break;
            }
        }

        if (this.tableOrderUrlParams.length === 1)
            this.page(this.pageInfo.currentPage, this.pageInfo.pageSize, false);
    }

    /**
     * 跳转页面
     * @param text 
     */
    public skipPage = (e: any, text: any) => {
        e.preventDefault;
        const { history } = this.props;
        const to: string = `${history.location.pathname}/detail/${text.id}`;
        history.push(to);
    }

    /**
     * 分页回调
     * @param currentPage 
     * @param pageSize 
     */
    public page = (currentPage:number, pageSize: number, isSearchCallBack: boolean = false) => {
        this.pageInfo = {...this.pageInfo, ...{
            currentPage,
            pageSize
        }};

        const params: any = {
            pageInfo: {
                currentPage,
                pageSize
            }
        };

        const pageUrlParams: IurlParams[] = [
            {
                key: 'page',
                value: this.pageInfo.currentPage,
                type: 'number'
            },
            {
                key: 'pageSize',
                value: this.pageInfo.pageSize,
                type: 'number'
            }
        ];

        this.searchFormRoute.changeUrl([...this.searchUrlParams, ...this.tableOrderUrlParams
        , ...pageUrlParams], false);

        this.searchCuistomerPolicyList(params);
    }

    /**
     * 填充搜索表单选择项数据
     */
    public fillSearchFormOptions = () => {
        const { insType } = this.props.dictionary;

        const { renewalMan, company } = this.props;

        if(insType) {
            const formItem = [...formItems].map(item => {
                switch(item.id) {
                    case 2: item.config.options = [...(company || [])].map((i: any) =>{
                                const value = {...i, ...{
                                    name: i.shortName,
                                    value: i.id
                                }};

                                return value;
                            }); 
                        break;
                    case 3: item.config.options = [...insType]; break;
                    case 4: item.config.options = [...(renewalMan || [])].map((i: any) => {
                                const value = {...i, ...{
                                    name: i.userName,
                                    value: +(i.userId)
                                }};

                                return value;
                            }); 
                        break;
                }

                return item;
            });
    
            this.config.formItem = [...formItem];
        }
    };

    /**
     * 映射列表数据
     * @param list 
     */
    public mapTableList = (list: any[]): any[] => {
        let { company } = this.props;

        company = company.map((item: any) => {
            item.name = item.shortName;
            item.value = item.id;
            return item;
        });

        return list.map((item:any, index:number) => {
            const result = {...item, ...{
                name: item.customerName,
                policyCompany: mappingValue(company, item['policyCompanyId']),
                cost: +(item.insTotalCost) / 100,
                insureTime: moment(new Date(item['insureTime'])).format('YYYY-MM-DD HH:mm'),
                key: `${item.id + index}`
            }};
            return result;
        });
    }

    public render() {
        const searchProps = {
            formItem: this.config.formItem,
            submit: this.submitSearchForm,
            history: this.props.history,
            location: this.props.location,
            match: this.props.match,
            otherParam: [...this.tableOrderUrlParams, 
                ...[
                    {
                        key: 'page',
                        value: this.pageInfo.currentPage,
                        type: 'number'
                    },
                    {
                        key: 'pageSize',
                        value: this.pageInfo.pageSize,
                        type: 'number'
                    }
                ]
            ],
            resetParam: () => { this.searchUrlParams = [] }
        };

        const messageProps = {
            totalCount: this.pageInfo.totalCount,
            hideSelectCount: true
        };

        this.fillSearchFormOptions();

        this.customerPolicyList = this.mapTableList(this.customerPolicyList);

        return (
            <div>
                <Spin tip='Loading...' spinning={this.state.isLoading}>
                    <div className='customer-policy-list-box'>
                        <div className='customer-list-search-control'>
                            <KISURESearch {...searchProps}/>
                        </div>

                        <div className='customer-policy-list-tableInfo'>
                            {
                                this.state.initComplete ?
                                <div className='customer-policy-list-tableInfo-msg'>
                                    <KISUREMessage {...messageProps}/>
                                </div> : <Skeleton active={true}/>
                            }
                            {
                                this.state.initComplete ?
                                <Table 
                                    columns={this.config.tableColumns} 
                                    dataSource={this.customerPolicyList} 
                                    onChange={this.handleTableChange} 
                                    pagination={false} 
                                    scroll={{x:1400}}/> : <Skeleton active={true}/>
                            }
                            {
                                this.state.initComplete ?
                                <div className='customer-policy-list-pageInfo'>
                                    <KISUREPage pageChange={this.page} {...this.pageInfo}/>
                                </div> : <Skeleton active={true}/>
                            }
                        </div>
                    </div>
                </Spin>
            </div>
        );
    }
}

function mapStateToprops(state: any) {
    return {
        dictionary: state.saasCommon.dictionary,
        renewalMan: state.saasCustomer.renewalMan,
        company: state.saasCustomer.company,
    }
}

function mapDispatchToProps() {
    return {
        getCustomerListInitData
    }
}

export default connect(
    mapStateToprops,
    mapDispatchToProps()
)(SaaSCustomerPolicy);