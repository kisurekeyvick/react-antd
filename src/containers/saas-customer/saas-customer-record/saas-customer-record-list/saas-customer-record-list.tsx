import * as React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { Table, Spin, Skeleton, Divider, Popover } from 'antd';
import * as moment from 'moment';
import { getCustomerListInitData } from 'src/actions/saas-customer-action';
import { formItems, tableColumns, IFormItems, ITableColumns } from './saas-customer-record-list-config';
import KISURESearch from 'src/components/search/search-component';
import { KISUREMessage } from 'src/components/message/message-list-component'; 
import { AudioComponent, ItemInfo } from 'src/components/audio/audio-component';
import { IurlParams, KisureSearchFormRoute } from 'src/service/router';
import { KISUREPage, IPageInfo } from 'src/components/pagination/pagination-component';
import { mappingValue, mappingTime } from 'src/service/common.fun';
import { api } from 'src/_mock/api';
import './saas-customer-record-list.scss';

class SaaSCustomerRecord extends React.Component<any, any> {
    public config: any;
    public selectedTask: any;
    public searchUrlParams: IurlParams[] = [];
    public tableOrderUrlParams: IurlParams[] = [];
    public customerRecordList: any[] = [];
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
            recordReviewVisible: false,
            audioVisible: true
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
                case 2: result = {...result, ...{
                            render: (text: any, record: any) => (
                                <a href="javascript:;" key={`skpi-a-` + record.id} onClick={() => this.skipPage(record)}>{text}</a>
                            )
                        }};
                    break;
                case 9: result = {...result, ...{
                            render: (text: any, record: any)=> {
                                const audioProps: ItemInfo = {
                                    name: record.carOwnerName,
                                    url: record.recordUrl,
                                    id: record.id
                                };

                                const Audio = this.state.audioVisible && <AudioComponent {...audioProps}/>;

                                return (
                                    <span>
                                        <Popover placement="left" content={Audio} trigger="click" onVisibleChange={this.popoverVisibleChange}>
                                            <a href="javascript:;">听录音</a>
                                        </Popover>
                                        <Divider type="vertical" />
                                        <a onClick={() => this.download(record)}>下载</a>
                                    </span>
                                )
                            }
                        }};
                    break;
                default:
                    break;
            }

            return result;
        });
    }

    public popoverVisibleChange = (e: boolean) => {
        this.setState({
            audioVisible: e
        });
    }

    public componentDidMount() {
        this.props.getCustomerListInitData();
        this.loadInitCustomerRecordData();
    }

    public shouldcomponentupdate(nextProps: any, nextState: any) {
        if (_.isEqual(this.props, nextProps) || !_.isEmpty(this.props)) {
            return false
        }
        return true
    }

    /**
     * 加载初始化数据
     */
    public loadInitCustomerRecordData = () => {
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

    public reloadInitCustomerRecordData = () => {
        this.loadInitCustomerRecordData();
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
    public searchCuistomerRecordList(param?: any) {
        this.setState({ 
            isLoading: true
        });

        api.getCustomerRecordList(param).then((res: any) => {
            const { list, pageInfo } = res.data.result;

            this.customerRecordList = this.mapTableList(list);

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

        this.searchCuistomerRecordList(params);
    }

    /**
     * 下载录音
     */
    public download = (record: any) => {

    }

    /**
     * 跳转页面
     * @param text 
     */
    public skipPage = (text: any) => {
        console.log(text);
    }

    /**
     * 填充搜索表单选择项数据
     */
    public fillSearchFormOptions = () => {
        const { insType, customerIntention, typeOfCall } = this.props.dictionary;

        const { renewalMan } = this.props;

        if(insType) {
            const formItem = [...formItems].map(item => {
                switch(item.id) {
                    case 2: item.config.options = [...customerIntention]; break;
                    case 3: item.config.options = [...typeOfCall]; break;
                    case 4: item.config.options = [...insType]; break;
                    case 5: item.config.options = [...(renewalMan || [])].map((i: any) => {
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
        const { insType, typeOfCall } = this.props.dictionary;

        return list.map((item:any, index:number) => {
            const result = {...item, ...{
                name: item.carOwnerName,
                insType: mappingValue(insType, item['insuranceType']),
                directionName: mappingValue(typeOfCall, item['direction']),
                billTime: mappingTime(item['billTimeSecond']),
                time: moment(new Date(item['answerStartTime'])).format('YYYY-MM-DD HH:mm'),
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
        }

        const messageProps = {
            totalCount: this.pageInfo.totalCount,
            hideSelectCount: true
        };

        this.fillSearchFormOptions();

        this.customerRecordList = this.mapTableList(this.customerRecordList);

        return (
            <div>
                <Spin tip='Loading...' spinning={this.state.isLoading}>
                    <div className='customer-record-list-box'>
                        <div className='customer-list-search-control'>
                            <KISURESearch {...searchProps}/>
                        </div>

                        <div className='customer-record-list-tableInfo'>
                            {
                                this.state.initComplete ?
                                <div className='customer-record-list-tableInfo-msg'>
                                    <KISUREMessage {...messageProps}/>
                                </div> : <Skeleton active={true}/>
                            }
                            {
                                this.state.initComplete ?
                                <Table 
                                    columns={this.config.tableColumns} 
                                    dataSource={this.customerRecordList} 
                                    onChange={this.handleTableChange} 
                                    pagination={false} 
                                    scroll={{x:1400}}/> : <Skeleton active={true}/>
                            }
                            {
                                this.state.initComplete ?
                                <div className='customer-record-list-pageInfo'>
                                    <KISUREPage pageChange={this.page} {...this.pageInfo}/>
                                </div> : <Skeleton active={true}/>
                            }

                            <div className='customer-record-list-modal'>
                                { 

                                }
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
)(SaaSCustomerRecord);
