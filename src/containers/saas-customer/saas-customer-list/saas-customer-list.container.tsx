import * as React from 'react';
// import { findDOMNode } from 'react-dom'
import * as PropTypes from 'prop-types';
import { Row, Col, Table, Divider, Spin, message, Skeleton, Icon, Tooltip } from 'antd';
import * as moment from 'moment';
import KISURESearch from 'src/components/search/search-component';
import { KISUREPage, IPageInfo } from 'src/components/pagination/pagination-component';
import KISUREOperation from './saas-customer-list.operation';
import { formItems, workspaceCfg, tableColumns, ITableColumns, IFormItems } from './saas-customer-list.config';
import { IurlParams, KisureSearchFormRoute } from 'src/service/router';
import KISUREDefeat from '../saas-customer-modal/saas-customer-modal-defeat/saas-customer-modal-defeat';
import KISURESuccessOrder from '../saas-customer-modal/saas-customer-modal-success-order/saas-customer-modal-success-order';
import KISUREPhone from 'src/components/phone/phone-component';
import * as _ from 'lodash';
import { api } from 'src/_mock/api';
import './saas-customer-list.container.scss';

export default class SaaSCustomerList extends React.Component<any, any> {
    static propTypes = {
        dictionary: PropTypes.object.isRequired,
        renewalMan: PropTypes.array.isRequired,
        shopSc: PropTypes.array.isRequired,
        company: PropTypes.array.isRequired,
        placeShortName: PropTypes.string.isRequired,
        provinces: PropTypes.object.isRequired
    };

    public config: any;
    public workspace: any;
    public customerList: any[] = [];
    public pageInfo: IPageInfo;
    public searchFormRoute: any;
    public searchUrlParams: IurlParams[] = [];
    public tableOrderUrlParams: IurlParams[] = [];
    public workspaceUrlParams: IurlParams[] = [];
    public selectedTask: any;

    /**
     * ref
     */
    public KISUREPhoneRef: any;

    constructor(
        public props: any,
    ) {
        super(props);

        this.config = {
            workspace: [...workspaceCfg],
            workspaceSelectedItem: {},
            formItem: [...formItems],
            currentFormItem: [],
            tableColumns: this.reRenderTableColumn(tableColumns),
            currentTableColumns: []
        };

        this.pageInfo = {
            currentPage: 1,
            pageCount: 0,
            pageSize: 10,
            rowCount: 0,
            totalCount: 0,
            pageSizeOptions: ['10', '20', '30', '40', '50']
        };

        this.KISUREPhoneRef = React.createRef();

        this.searchFormRoute = new KisureSearchFormRoute({
            history: this.props.history,
            location: this.props.location,
            match: this.props.match,
        });

        // this.drag = new DragService(findDOMNode(this.KISUREPhoneRef.current));
        this.selectWorkSpace = this.selectWorkSpace.bind(this);
        this.fillSearchFormOptions = this.fillSearchFormOptions.bind(this);

        this.state = {
            updateTable: false,
            loadingBaceInfo: true,
            selectedCustomers: [],
            defeatVisible: false,
            successOrderVisible: false,
            phoneVisible: false
        };
    }

    /**
     * 组件装载完成，开始请求数据
     */
    public componentDidMount() {
        // 初始状态，默认选中'招揽中客户'
        // 点击搜索时候，页面会重新渲染，进行查询
        console.log('customer-list组件加载完成');

        this.loadInitCustomerListData();
    }

    /**
     * 初始化以后加载客户列表数据
     */
    public loadInitCustomerListData() {
        Promise.all([
            api.getCustomerWorkSpaceData(),
        ]).then((res:any) => {
            this.workspace = res[0].data.result;

            this.initPageInfo().then((urlAnalysisParams) => {
                this.searchUrlParams = urlAnalysisParams.map((param: any) => {
                    const target = this.config.formItem.find((item: IFormItems) => item.key === param.key);
                    param.type = target && target['type'];
                    return param;
                }).filter((param: any) => param.key && param.type);

                let workspace: any;
                
                for(let i = 0; i< urlAnalysisParams.length; i++) {
                    const target = this.config.workspace.find((space: any) => space.key === urlAnalysisParams[i]['key']);
    
                    if (target) {
                        workspace = target;
                        break;
                    }
                }
                
                this.selectWorkSpace((workspace || [...workspaceCfg][1]), urlAnalysisParams, {init: workspace ? true : false});
            });
        });
    }

    public reloadInitCustomerListData = () => {
        this.loadInitCustomerListData();
    }

    public shouldcomponentupdate(nextProps: any, nextState: any) {
        if (_.isEqual(this.props, nextProps) || !_.isEmpty(this.props)) {
            return false
        }
        return true
    }

    /**
     * 再次配置tableColumn
     */
    public reRenderTableColumn(colums: ITableColumns[]) {
        return colums.map((table: ITableColumns) => {
            let result: ITableColumns = table;

            switch(table.id) {
                case 1: result = {...result, ...{
                            render: (text: any, record: any) => (
                                <span className='customer-span-name-phone'>
                                    <a href="javascript:;" key={`skpi-a-` + record.id} onClick={(e) => this.skipPage(e, record)}>{text}</a>
                                    <Tooltip title="电话呼出">
                                        <Icon type="phone" key={`phone-icon-` + record.id} onClick={() => this.phoneCustomer(true, record)}/>
                                    </Tooltip>
                                </span>
                            )
                        }};
                    break;
                case 17: result = {...result, ...{
                            render: (text: any, record: any)=> (
                                <span>
                                    <a onClick={() => this.successOrder(text, record)}>成单</a>
                                    <Divider type="vertical" />
                                    <a onClick={() => this.defeat(text, record)}>战败</a>
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
     * 点击工作台，切换搜索项
     * @param item item为当前选中的workspace中的某一项
     */
    public selectWorkSpace(item: any, urlAnalysisParams: any[] = [], params?:{'init': boolean}) {
        let target: any;

        this.config.workspace.forEach((space: any) => {
            space.key === item.key ? target = space : space.selected = false;
        });

        const format = (idArray: number[], source: any): any[] => idArray.map((id: number) => {
            return source.find((i: any) => i.id === id);
        }).filter((i: any) => i);

        this.giveValueToSearchFormItem(params|| {init: false}, urlAnalysisParams);

        if (params && params['init'] === false) {
            this.pageInfo = {...this.pageInfo, ...{
                currentPage: 1
            }};
        }

        if (target) {
            this.config = Object.assign(this.config, {
                currentFormItem: format(target.formItemIdArr, this.config.formItem),
                currentTableColumns: format(target.tableColumnsArr, this.config.tableColumns),
                workspaceSelectedItem: {
                    key: item.key,
                    value: item.value
                }
            });

            this.workspaceUrlParams = [{
                key: item.key,
                value: item.value,
                type: 'string'
            }];
        }

       this.page(this.pageInfo.currentPage, this.pageInfo.pageSize, false);
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
            const target = this.config.currentFormItem.find((item: IFormItems) => item.key === key);

            if (target)
                urlParams.push({
                    key: target.key,
                    value: params[key],
                    type: target.value
                });
        }

        this.searchUrlParams = urlParams;
        this.page(this.pageInfo.currentPage, this.pageInfo.pageSize, true);
    }

    /**
     * 获取customer list数据
     */
    public searchCuistomerList(param?: any) {
        this.setState({ loadingBaceInfo: true });
        
        api.getCustomerList(param).then((res: any) => {
            const { list, pageInfo } = res.data.result;

            this.customerList = this.mapTableList(list);

            this.pageInfo = {...this.pageInfo, ...{ totalCount: pageInfo.totalCount }};

            this.setState({ loadingBaceInfo: false });
        });
    }

    /**
     * 返回映射值
     * @param source 映射数据源
     * @param value 要映射的值
     */
    public mappingValue(source: Array<{name: string, value: any}>, value: any) {
        let find: boolean = false;

        if (!source)
            return value;

        for (let i = 0; i < source.length; i++) {
            if (value === source[i].value) {
                find = true;
                return source[i].name;
            }
        }

        if (!find)
            return value;
    }

    /**
     * 点击table分页或者filter或者sorter 发生回调
     */
    public handleTableChange = (pagination: any, filters: any, sorter: any) => {
        this.tableOrderUrlParams = [];

        for(let i =0; i< this.config.currentTableColumns.length; i++) {
            if ('sorter' in tableColumns[i] && tableColumns[i]['sorter'] && sorter.field === tableColumns[i]['key']) {
                this.tableOrderUrlParams = [
                    { key: sorter.columnKey, value: sorter.order, type: 'string'}
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
        const to: string = `/saas/customer/budget/detail/${text.id}`;
        history.push(to);
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
     * 电话组件拖动
     */
    // public phoneCustomerDrag = (e: any) => {
    //     const component = findDOMNode(this.KISUREPhoneRef.current);
    //     console.log(`鼠标点击事件`, e);
    //     console.log(`组件ref`, component);
    // }

    /**
     * table中的战败
     */
    public defeat = (text: any, record: any) => {
        this.selectedTask = text;
        this.defeatToggle('open', true);
    }

    public defeatToggle = (e: any, bool: boolean = true): any => {
        this.setState({
            defeatVisible: bool
        });

        if (typeof(e) === 'string' && e === 'success') {
            message.success('完成战败');
            this.reloadInitCustomerListData();
        }
    }

    /**
     * table中的成单
     */
    public successOrder = (text: any, record: any) => {
        this.selectedTask = text;
        this.successOrderToggle('open', true);
    }

    public successOrderToggle = (e: any, bool: boolean = true): any => {
        this.setState({
            successOrderVisible: bool
        });

        if(typeof(e) === 'string' && e === 'success') {
            message.success('成单成功');
            this.reloadInitCustomerListData();
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

        const params = {
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

        this.searchFormRoute.changeUrl([...this.workspaceUrlParams, ...this.searchUrlParams, 
            ...this.tableOrderUrlParams, ...pageUrlParams], false);

        this.searchCuistomerList(params);
    }

    /**
     * table处checkbox联动选择框
     */
    public rowSelection: any = {
        onChange: (selectedRowKeys: string[], selectedRows: any[]) => {
            const initArr:any[] = [...this.state.selectedCustomers, ...selectedRows];
            const formatArr: any[] = [];

            selectedRowKeys.forEach(item => {
                const target = initArr.find(i => i['key'] === item);
                formatArr.push(target);
            });

            this.setState({
                selectedCustomers: formatArr
            });
        }
    }

    /**
     * 填充搜索表单选择项数据
     */
    public fillSearchFormOptions() {
        const { insType,
                customerIntention,
                solicitStatus,
                loansStatus,
                insuredCount }: any = this.props.dictionary;

        const { company, renewalMan } = this.props;

        if(insType) {
            const formItem = [...formItems].map(item => {
                switch(item.id) {
                    case 2: item.config.options = [...insType]; break;
                    case 3: item.config.options = [...customerIntention]; break;
                    case 6: item.config.options = [...company].map((i: any) =>{
                                const value = {...i, ...{
                                    name: i.shortName,
                                    value: i.id
                                }};

                                return value;
                            });
                        break;
                    case 7: item.config.options = [...renewalMan].map((i: any) => {
                                const value = {...i, ...{
                                    name: i.userName,
                                    value: +(i.userId)
                                }};

                                return value;
                            }); 
                        break;
                    case 8: item.config.options = [...solicitStatus]; break;
                    case 9: break;  // 车型
                    case 10: item.config.options = [...loansStatus]; break;
                    case 16: item.config.options = [...insuredCount]; break;
                }
    
                return item;
            });
     
            this.config.formItem = [...formItem];
        }
    }

    /**
     * 映射列表数据
     * @param list 
     */
    public mapTableList = (list: any[]): any[] => {
        const { solicitStatus, insType, customerIntention } = this.props.dictionary;

        return list.map((item:any, index:number) => {
            const result = {...item, ...{
                name: item.carOwnerName,
                processStatusName: this.mappingValue(solicitStatus, item['processStatus']),
                insuredTypeName: this.mappingValue(insType,item['insType']),
                insIntentionName: this.mappingValue(customerIntention, item['insIntention']),
                vciExpiredTime: moment(new Date(item['vciExpiredTime'])).format('YYYY-MM-DD HH:mm'),
                tciExpiredTime: moment(new Date(item['tciExpiredTime'])).format('YYYY-MM-DD HH:mm'),
                policyInsTotalCostPrice: +(item['policyInsTotalCost'])/100,
                calculateInsTotalCostPrice: +(item['calculateInsTotalCost'])/100,
                preDiffPrice: +(item['preDiff']) / 100,
                lastFollowTime: moment(new Date()).format('YYYY-MM-DD HH:mm'),
                nextFollowTime: moment(new Date()).format('YYYY-MM-DD HH:mm'),
                key: `${item.carNumber + index}`
            }};
            return result;
        });
    }

    public componentWillReceiveProps(nextProps: any) {
    }

    public render() {
        const workspace: any[] = [];

        const searchFormRouteProps = {
            history: this.props.history,
            location: this.props.location,
            match: this.props.match,
            otherParam: [...this.tableOrderUrlParams,
                ...[
                    {
                        key: this.config.workspaceSelectedItem.key,
                        value: this.config.workspaceSelectedItem.value,
                        type: 'string'
                    },
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

        const kisureOperationProps = {
            totalCount: this.pageInfo.totalCount,
            customers: this.state.selectedCustomers,
            dictionary: this.props.dictionary,
            placeShortName: this.props.saasCustomer,
            reloadEmitter: this.reloadInitCustomerListData,
            renewalMan: this.props.renewalMan
        };

        const taskDefeatProps = {
            visible: this.state.defeatVisible,
            title: '战败',
            handleOk: this.defeatToggle,
            handleCancel: this.defeatToggle,
            task: this.selectedTask
        };

        const taskSuccessOrderProps = {
            visible: this.state.successOrderVisible,
            title: '成单',
            handleOk: this.successOrderToggle,
            handleCancel: this.successOrderToggle,
            task: this.selectedTask,
            company: this.props.company
        };

        const phoneProps = {
            task: this.selectedTask,
            title: `车主：${this.selectedTask ? this.selectedTask.name : ''}`,
            close: this.phoneCustomer,
        };

        this.fillSearchFormOptions();

        this.customerList = this.mapTableList(this.customerList);

        if (this.workspace) {
            for (const key in this.workspace) {
                const target = this.config.workspace.find((item: any) => item['key' ]=== key || key.includes(item['key' ]));
                const targetVal: any = {
                    name: (() => {
                        if(target)
                            return target.value
                    })(),
                    value: this.workspace[key],
                    key: target.key
                }

                if (target && target.className)
                    targetVal.className = target.className;

                workspace.push(targetVal);
            }
        }

        return (
            <div>
                <div className="head-workspace">
                    {
                        workspace.length > 0 ?
                        <Row>
                        { 
                            workspace.map((item: any, index: number) => {
                                return <Col className={`head-workspace-item ${ this.config.workspaceSelectedItem.key === item.key ? 'selected' : ''}`} key={index} xs={12} sm={6} lg={3} onClick={() => this.selectWorkSpace(item)}>
                                        <p>{item.name}</p>
                                        <p className={ item.className ? `head-workspace-item-value ${item.className}`: 'head-workspace-item-value' }>{item.value}</p>
                                    </Col>
                            })
                        }
                        </Row>:
                        <Skeleton active={true}/>
                    }
                </div>

                <Spin tip='Loading...' spinning={this.state.loadingBaceInfo}> 
                    <div className='customer-list-content kisure-content-layout'>
                        <div className='customer-list-search-control'>
                            <KISURESearch formItem={this.config.currentFormItem} submit={this.submitSearchForm} {...searchFormRouteProps} />
                        </div>

                        { workspace.length > 0 ? <KISUREOperation {...kisureOperationProps}/> : <Skeleton active={true}/> }

                        { workspace.length > 0 ? 
                            <div className='customer-list-tableInfo'>
                                <Table 
                                    rowSelection={this.rowSelection}
                                    columns={this.config.currentTableColumns} 
                                    dataSource={this.customerList} 
                                    onChange={this.handleTableChange} 
                                    pagination={false} 
                                    scroll={{x:1400}}/>
                                <div className='customer-list-pageInfo'>
                                    <KISUREPage pageChange={this.page} {...this.pageInfo}/>
                                </div>
                                <div className='customer-list-modal'>
                                    { this.state.defeatVisible && <KISUREDefeat {...taskDefeatProps}/> }
                                    { this.state.successOrderVisible &&  <KISURESuccessOrder {...taskSuccessOrderProps}/> }
                                    { this.state.phoneVisible && <KISUREPhone {...phoneProps} ref={this.KISUREPhoneRef}/> }
                                </div>
                            </div> : <Skeleton active={true}/>
                        }
                    </div>
                </Spin>
            </div>
        );
    }
}

/**
 * 2018/11/30
 * (1)findDOMNode
 */
