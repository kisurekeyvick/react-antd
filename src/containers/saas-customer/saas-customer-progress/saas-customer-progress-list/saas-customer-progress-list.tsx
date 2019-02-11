import * as React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import * as moment from 'moment';
import { Progress, Table, Spin, Skeleton, Button, message } from 'antd';
import { getCustomerListInitData } from 'src/actions/saas-customer-action';
import { ITableColumns, tableColumns } from './saas-customer-progress-list-config';
import { IurlParams, KisureSearchFormRoute } from 'src/service/router';
import { KISUREPage, IPageInfo } from 'src/components/pagination/pagination-component';
import KISUREBatchImport from 'src/containers/saas-customer/saas-customer-modal/saas-customer-modal-batch-import/saas-customer-modal-batch-import';
import { mappingValue } from 'src/service/common.fun';
import { excelKeyWord, excelErrorKeyWord, excelInstructions } from 'src/containers/saas-customer/saas-customer-list/saas-customer-list.config';
import { api } from 'src/_mock/api';
import './saas-customer-progress-list.scss';

class SaaSCustomerProgress extends React.Component<any, any> {
    public config: any;
    public selectedTask: any;
    public searchUrlParams: IurlParams[] = [];
    public tableOrderUrlParams: IurlParams[] = [];
    public customerProgressList: any[] = [];
    public pageInfo: IPageInfo;
    public searchFormRoute: any;

    constructor(public props: any){
        super(props);

        this.config = {
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
            batchImportVisible: false
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
                case 5: result = {...result, ...{
                            render: (text: any, record: any) => {
                                const number = +(record.importProgress.replace('%', ''));
                                const status = number === 100 ? 'success' : number < 100 ? 'active' : 'exception';
                                return <Progress key={`progress-` + record.id} percent={number} status={status} size="small"/>
                            }
                        }};
                    break;
                default:
                    break;
            }

            return result;
        })
    }

    public componentDidMount() {
        this.props.getCustomerListInitData();
        this.loadInitCustomerProgressData();
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
    public loadInitCustomerProgressData = () => {
        this.initPageInfo().then((urlAnalysisParams) => {
            this.searchUrlParams = [];
            this.page(this.pageInfo.currentPage, this.pageInfo.pageSize, false);
        });
    }

    public reloadInitCustomerProgressData = () => {
        this.loadInitCustomerProgressData();
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
     * 获取customer list数据
     */
    public searchCuistomerProgressList(param?: any) {
        this.setState({ 
            isLoading: true
        });

        api.getImportBatchList(param).then((res: any) => {
            const { list, pageInfo } = res.data.result;

            this.customerProgressList = this.mapTableList(list);

            this.pageInfo = {...this.pageInfo, ...{ totalCount: pageInfo.totalCount }};

            this.setState({ 
                isLoading: false,
                initComplete: true,
                batchAssignVisible: false 
            });
        });
    }

    /**
     * 批量导入
     */
    public batchImportToggle = (e: any, bool: boolean = true): any => {
        this.setState({
            batchImportVisible: bool
        });

        if (typeof(e) === 'string' && e === 'success') {
            message.success('批量导入成功');
            this.props.reloadEmitter();
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

        this.searchCuistomerProgressList(params);
    }

    /**
     * 映射列表数据
     * @param list 
     */
    public mapTableList = (list: any[]): any[] => {
        const { importType, importStatus } = this.props.dictionary;

        return list.map((item:any, index:number) => {
            const result = {...item, ...{
                time: moment(new Date(item['createdTime'])).format('YYYY-MM-DD HH:mm'),
                importTypeName: mappingValue(importType, item['importType']),
                importStatusName: mappingValue(importStatus, item['importStatus']),
                detail: `${item.totalCount}/${item.successCount}/${item.failCount}`,
                key: `${item.createdTime}`
            }};
            return result;
        });
    }

    public render() {
        const batchImportProps = {
            visible: this.state.batchImportVisible,
            title: '批量导入',
            handleCancel: this.batchImportToggle,
            handleOk: this.batchImportToggle,
            rule: {
                maxCount: 1000,
                maxSize: 1024 * 1024,
                fileCount: 1,
                fileType: ['xlsx']
            },
            keywords: excelKeyWord,
            templateTitle: '客户模板.xlsx',
            errorKeywords: excelErrorKeyWord,
            errorTemplateTitle: '错误报告.xlsx',
            excelInstructions
        };

        this.customerProgressList = this.mapTableList(this.customerProgressList);

        return (
            <div>
                <Spin tip='Loading...' spinning={this.state.isLoading}>
                    <div className='customer-progress-list-box'>
                        <div className='customer-progress-list-tableInfo'>
                            <div className='customer-progress-list-operation'>
                                <Button className='customer-list-button' type="primary"  onClick={() => this.batchImportToggle(true)}>批量导入</Button>
                            </div>

                            {
                                this.state.initComplete ?
                                <Table 
                                    columns={this.config.tableColumns} 
                                    dataSource={this.customerProgressList} 
                                    pagination={false} 
                                    scroll={{x:1400}}/> : <Skeleton active={true}/>
                            }
                            {
                                this.state.initComplete ?
                                <div className='customer-progress-list-pageInfo'>
                                    <KISUREPage pageChange={this.page} {...this.pageInfo}/>
                                </div> : <Skeleton active={true}/>
                            }

                            <div className='customer-modal'>
                                { this.state.batchImportVisible && <KISUREBatchImport {...batchImportProps} /> }
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
)(SaaSCustomerProgress);