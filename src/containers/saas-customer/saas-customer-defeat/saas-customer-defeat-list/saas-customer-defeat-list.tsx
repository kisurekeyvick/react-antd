import * as React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { Table, Spin, message, Skeleton, Icon, Tooltip } from 'antd';
import * as moment from 'moment';
import { getCustomerListInitData } from 'src/actions/saas-customer-action';
import { formItems, tableColumns, IFormItems, ITableColumns } from './saas-customer-defeat-list.config';
import KISURESearch from 'src/components/search/search-component'; 
import KISUREPhone from 'src/components/phone/phone-component';
import KISUREDefeatReview from 'src/containers/saas-customer/saas-customer-modal/saas-customer-modal-defeat-review/saas-customer-modal-defeat-review';
import { KISUREMessage } from 'src/components/message/message-list-component';
import { IurlParams, KisureSearchFormRoute } from 'src/service/router';
import { KISUREPage, IPageInfo } from 'src/components/pagination/pagination-component';
import { mappingValue } from 'src/service/common.fun';
import { api } from 'src/_mock/api';
import './saas-customer-defeat-list.scss';

class SaaSCustomerDefeat extends React.Component<any, any> {
    public config: any;
    public selectedTask: any;
    public searchUrlParams: IurlParams[] = [];
    public tableOrderUrlParams: IurlParams[] = [];
    public customerDefeatList: any[] = [];
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
            initComplete: false,
            defeatReviewVisible: false,
            phoneVisible: false
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
                case 1: result = {...result, ...{
                            render: (text: any, record: any) => (
                                <span className='customer-span-name-phone'>
                                    <a href="javascript:;" key={`skpi-a-` + record.id} onClick={() => this.skipPage(record)}>{text}</a>
                                    <Tooltip title="电话呼出">
                                        <Icon type="phone" key={`phone-icon-` + record.id} onClick={() => this.phoneCustomer(true, record)}/>
                                    </Tooltip>
                                </span>
                            )
                        }};
                    break;
                case 9: result = {...result, ...{
                            render: (text: any, record: any) => (
                                <span>
                                    <a onClick={() => this.defeatReview(text, record)}>审核</a>
                                </span>
                            )
                        }};
                    break;
                default:
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

    public componentWillReceiveProps(nextProps: any) {

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
    public searchCuistomerDefeatList(param?: any) {
        this.setState({ 
            isLoading: true
        });

        api.getCustomerDefeatList(param).then((res: any) => {
            const { list, pageInfo } = res.data.result;

            this.customerDefeatList = this.mapTableList(list);

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
    public skipPage = (text: any) => {
        console.log(text);
    }

    /**
     * table中给客户打电话
     */
    public phoneCustomer = (bool: boolean = true, record?: any, status?: string ) => {
        if(record)
            this.selectedTask = record;

        if (status && status === 'success')
            message.success('电话完成挂断');

        this.setState({
            phoneVisible: bool
        });
    }

    /**
     * table中的战败审核
     */
    public defeatReview = (text: any, record: any) => {
        this.selectedTask = text;
        this.defeatReviewToggle('open', true);
    }

    public defeatReviewToggle = (e: any, bool: boolean = true): any => {
        this.setState({
            defeatReviewVisible: bool
        });

        if (typeof(e) === 'string' && (e === 'success' || e === 'reject') ) {
            if (e === 'success')
                message.success('战败审核通过');

            if (e === 'reject')
                message.success('战败驳回');
            
            this.reloadInitCustomerDefeatData();
        }
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

        this.searchCuistomerDefeatList(params);
    }

    /**
     * 填充搜索表单选择项数据
     */
    public fillSearchFormOptions = () => {
        const { insType, auditStatus } = this.props.dictionary;

        const { renewalMan } = this.props;

        if(insType) {
            const formItem = [...formItems].map(item => {
                switch(item.id) {
                    case 2: item.config.options = [...auditStatus]; break;
                    case 3: item.config.options = [...(renewalMan || [])].map((i: any) => {
                                const value = {...i, ...{
                                    name: i.userName,
                                    value: +(i.userId)
                                }};

                                return value;
                            }); 
                        break;
                    case 6: item.config.options = [...insType]; break;
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
        const { insType, auditStatus } = this.props.dictionary;

        return list.map((item:any, index:number) => {
            const result = {...item, ...{
                name: item.carOwnerName,
                checkStatus: mappingValue(auditStatus, item['defeatCheckStatus']),
                insuredTypeName: mappingValue(insType, item['insType']),
                insExpiredTime: moment(new Date(item['insExpiredTime'])).format('YYYY-MM-DD HH:mm'),
                days: item['offAidDays'],
                key: `${item.carNumber + index}`
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

        const phoneProps = {
            task: this.selectedTask,
            title: `车主：${this.selectedTask ? this.selectedTask.name : ''}`,
            close: this.phoneCustomer,
        };

        const defeatReviewProps = {
            visible: this.state.defeatReviewVisible,
            title: '战败审核',
            handleOk: this.defeatReviewToggle,
            handleCancel: this.defeatReviewToggle,
            task: this.selectedTask
        };

        this.fillSearchFormOptions();

        this.customerDefeatList = this.mapTableList(this.customerDefeatList);

        return (
            <div>
                <Spin tip='Loading...' spinning={this.state.isLoading}>
                    <div className='customer-defeat-list-box'>
                        <div className='customer-list-search-control'>
                            <KISURESearch {...searchProps}/>
                        </div>

                        <div className='customer-defeat-list-tableInfo'>
                            {
                                this.state.initComplete ?
                                <div className='customer-defeat-list-tableInfo-msg'>
                                    <KISUREMessage {...messageProps}/>
                                </div> : <Skeleton active={true}/>
                            }
                            {
                                this.state.initComplete ?
                                <Table 
                                    columns={this.config.tableColumns} 
                                    dataSource={this.customerDefeatList} 
                                    onChange={this.handleTableChange} 
                                    pagination={false} 
                                    scroll={{x:1400}}/> : <Skeleton active={true}/>
                            }
                            {
                                this.state.initComplete ?
                                <div className='customer-defeat-list-pageInfo'>
                                    <KISUREPage pageChange={this.page} {...this.pageInfo}/>
                                </div> : <Skeleton active={true}/>
                            }

                            <div className='customer-defeat-list-modal'>
                                { this.state.phoneVisible && <KISUREPhone {...phoneProps} /> }
                                { this.state.defeatReviewVisible && <KISUREDefeatReview {...defeatReviewProps}/>}
                            </div>
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
)(SaaSCustomerDefeat);