import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Icon, Tag, Table, Row, Col, Popover, Spin, message } from 'antd';
import * as _ from 'lodash';
import * as moment from 'moment';
import { formatPrice, mappingValue } from 'src/service/common.fun';
import { tableColumns } from './saas-customer-list-budget-calculate-history-config';
import KISUREQrcode from 'src/components/qrcode/qrcode-component';
import KISURESMSQuotation from 'src/containers/saas-customer/saas-customer-modal/saas-customer-modal-sms-quotation/saas-customer-modal-sms-quotation';
import { api } from 'src/_mock/api';
import './saas-customer-list-budget-calculate-history.scss';

export default class SaaSCustomerListBudgetCalculateHistory extends React.PureComponent<any, any> {
    static propTypes = {
        insPlanList: PropTypes.array.isRequired,
        calculate: PropTypes.func.isRequired,
        taskID: PropTypes.any.isRequired,
        logList: PropTypes.array.isRequired,
        customerInfo: PropTypes.object.isRequired,
        dictionary: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        MktPlanList: PropTypes.array.isRequired
    }
    
    public config: any = {};
    public currentLog: any = {};
    
    constructor(public props: any) {
        super(props);

        this.state = {
            existHistory: this.props.logList.length > 0 ? true : false,
            logChangeCount: 1,
            weChartPriceLoading: false,
            smsQuotationVisible: false
        };

        this.config= {
            tableColumns: _.cloneDeep(tableColumns),
            logList: this.formatCalculateRecordList(this.props.logList),
            qrcodeUrl: ''
        };

        this.selectRecord(0, this.config['logList'], { needUpdateStatus: false});
        console.log('currentLog', this.currentLog); 
        console.log('customerInfo', this.props.customerInfo);
    }

    public componentDidMount() {

    }

    /** 
     * format历史记录
     */
    public formatCalculateRecordList = (recordList: any[]) => {
        const { energyType } = this.props.dictionary;

        return recordList.map((list: any, index: number) => {
            /** 商业险保费 交强险保费 */
            const tciDetail = list.calculatePricePlanInfoList.find((item: any) => item.insType === 2);
            const vciDetail = list.calculatePricePlanInfoList.find((item: any) => item.insType === 1);
            const createdTimeMap = moment(new Date(list.calculatePrice['createdTime'])).format('YYYY-MM-DD HH:mm:ss');
            const carDetail = { ...list.calculatePriceCarDetail };
            const costInsTotalCost = list.calculatePrice.insTotalCost;
            const nextList = recordList[index + 1];
            const lastPolicy = this.props.customerInfo['hasPreviousCalPriceInfo'] || null;
            const planList: any[] = [];
            const insPlanList: any[] = this.props.insPlanList.map((item: any) => {
                return {...item, ...{
                    name: item.insItemName,
                    value: item.insItemId
                }};
            });

            /** 对比上次 对比去年 */
            let totalCostWithPre: any = 0;
            let totalCostWithLast: any = null;
            let totalCostWithPreMap: string = '';

            if (costInsTotalCost && nextList && nextList['calculatePrice']['insTotalCost']) {
                totalCostWithPre = costInsTotalCost - nextList.calculatePrice.insTotalCost;
                totalCostWithPreMap = this.formatPrice(Math.abs(+(totalCostWithPre)));
            }

            if (costInsTotalCost)
                totalCostWithLast = costInsTotalCost - (lastPolicy && lastPolicy['insTotalCost'] || 0);

            if (tciDetail) {
                tciDetail['insPlanCostMap'] = this.formatPrice((tciDetail['insPlanCost'] || 0));
                tciDetail['insStartTimeMap'] = tciDetail['insStartTime'] ? moment(new Date(tciDetail['insStartTime'])).format('YYYY-MM-DD HH:mm:ss') : '';
                tciDetail['insEndTimeMap'] = tciDetail['insEndTime'] ? moment(new Date(tciDetail['insEndTime'])).format('YYYY-MM-DD HH:mm:ss') : '';
            }

            if (vciDetail) {
                vciDetail['insPlanCostMap'] = this.formatPrice((vciDetail['insPlanCost'] || 0));
                vciDetail['insStartTimeMap'] = vciDetail['insStartTime'] ? moment(new Date(vciDetail['insStartTime'])).format('YYYY-MM-DD HH:mm:ss') : '';
                vciDetail['insEndTimeMap'] = vciDetail['insEndTime'] ? moment(new Date(vciDetail['insEndTime'])).format('YYYY-MM-DD HH:mm:ss') : '';
            }

            if (carDetail.purchasePrice || carDetail.purchasePrice === 0)
                carDetail['purchasePriceMap'] = formatPrice(carDetail['purchasePriceMap']);

            if (carDetail['engineCapacity'] || carDetail['engineCapacity'] === 0)
                carDetail['engineCapacityMap'] = mappingValue([...energyType], carDetail['engineCapacity']);

            [ tciDetail && tciDetail['hapiCalculatePriceDetailList'], 
                vciDetail && vciDetail['hapiCalculatePriceDetailList']].filter((item) => item).forEach((plans: any[]) => {
                plans.forEach((plan: any) => {
                    planList.push({
                        name: mappingValue(insPlanList, plan.policyItemId),
                        value: this.formatPolicyItemValue(plan),
                        key: plan['policyItemId']
                    });
                });
            });

            return {...list, ...{
                insTotalCostMap: this.formatPrice(+(list['calculatePrice']['insTotalCost'])),
                offerStatusMap: list['calculatePrice']['offerStatus'] === 1 ? '已报价' : '未报价',
                sameLastMap: list['calculatePrice']['sameLast'] === 1 ? '同上期险种' : '',
                insStandardCostMap: tciDetail ? this.formatPrice(+(tciDetail.insStandardCost)) : '',
                insDiscountMap: (list['calculatePrice']['insDiscount'] || 0) / 1000000,
                totalCostWithPre,
                totalCostWithPreMap,
                totalCostWithLast,
                noCompensationRatio: list['calculatePrice']['noCompensationRatio'],
                independentChannelRatio: list['calculatePrice']['independentChannelRatio'],
                autoUnderwritingRatio: list['calculatePrice']['autoUnderwritingRatio'],
                trafficViolationRatio: list['calculatePrice']['trafficViolationRatio'],
                tciDetail,
                vciDetail,
                createdTimeMap,
                carDetail,
                planList
            }};
        });
    }

    /** 
     * format险种数据
     */
    public formatPolicyItemValue = (list: any): string => {
        if (list.policyItemId === 6) {
            const itemInfo = JSON.parse(list.insItemDetail);
            return `${itemInfo['key']}座*${formatPrice(itemInfo['value'])}`;
        }

        if (list.policyItemId === 8) {
            const itemInfo = JSON.parse(list.insItemDetail);
            return `${itemInfo['value']}`;
        }

       if(list.insItemValue) {
            return formatPrice(list.insItemValue) || '';
        } else
            return '投保';
    }

    /** 
     * format价格
     */
    public formatPrice = (value: number) => {
        if (value !== undefined && value !== null)
            return `${value / 100}元`;
    
        return '';
    }

    /** 
     * 切换询价历史记录
     */
    public selectRecord = (index: number, logList: any[], updateStatus = { needUpdateStatus: true}) => {
        logList.forEach((list: any, i: number)=> {
            i === index ? list['selected'] = true : list['selected'] = false;
        });

        this.currentLog = logList[index];

        if (updateStatus.needUpdateStatus) {
            this.setState({
                logChangeCount: this.state.logChangeCount + 1
            });
        }
    }

    /** 
     * 跳转详情界面
     */
    public skipPage = (e: any, record: any) => {
        e.preventDefault;
        const { history } = this.props;
        const to: string = `/saas/customer/enquiry/detail/${record['calculatePrice']['id']}`;
        history.push(to);
    }

    /** 
     * 二维码popover显示隐藏事件
     */
    public popoverVisibleChange = (e: boolean) => {
        if (e)
            this.getWeChatQuotedPrice();
    }

    /** 
     * 获取微信报价
     */
    public getWeChatQuotedPrice = () => {
        this.setState({
            weChartPriceLoading: true,
        });

        this.config.qrcodeUrl = '';

        api.weChatQuotedPrice().then((res: any) => {
            if (res && res.status === 200)
                this.config.qrcodeUrl = res['data']['result']['url'];

            this.setState({
                weChartPriceLoading: false,
            });
        });
    }

    /** 
     * 短信报价
     */
    public smsQuotation = () => {
        this.smsQuotationToggle('open', true);
    }

    public smsQuotationToggle = (e: any, bool: boolean = true): any => {
        this.setState({
            smsQuotationVisible: bool
        });

        if(typeof(e) === 'string' && e === 'success') {
            message.success('短信报价成功');
            
        }
    }

    public render() {
        const url = this.config.qrcodeUrl;
        const Qrcode = this.state.weChartPriceLoading ?
                        <div className='loading-qrcode'><Spin tip="二维码加载中..." /></div>
                         : url && !this.state.weChartPriceLoading ? <KISUREQrcode {...{url}}/> : <p className='error'>微信报价失败</p>;
        const customerInfo = this.props.customerInfo;
        const SMSQuotationProps = {
            visible: this.state.smsQuotationVisible,
            title: '报价短信内容',
            handleCancel: this.smsQuotationToggle,
            handleOk: this.smsQuotationToggle, 
            smsParams: {
                backupManPhoneNumber: customerInfo && customerInfo.backupManPhoneNumber,
                backupManName: customerInfo && customerInfo.backupManName,
                carOnwerPhoneNumber: 'renewalTaskCarOwner' in customerInfo && customerInfo.renewalTaskCarOwner.carOwnerMobilePhoneNumber,
                carOnwerName: 'renewalTaskCarOwner' in customerInfo && customerInfo.renewalTaskCarOwner.carOwnerName
            },
            MktPlanList: this.props.MktPlanList
        };

        return (
            <div className='calaulate-history-box'>
                <p className='calaulate-history-title'>本期询价历史</p>
                {
                    this.state.existHistory ?
                    <div className='calaulate-log-history'>
                        <div className='log-list'> 
                            {
                                this.config.logList.map((log: any, index: number) => {
                                    return <div key={`log-` + index} className={log.selected ? 'log-company active' : 'log-company'} onClick={() => this.selectRecord(index, this.config.logList)}>
                                                <div className='log-company-logo'>
                                                    <img src={log.insLogoUrl}/>
                                                </div>
                                                <div className='log-company-info'>
                                                    <span className="name">{log.companyName}</span>
                                                    <span className="cost">{log.insTotalCostMap}</span>
                                                </div>
                                            </div>;
                                })
                            }
                        </div>
                        <div className='log-detail'>
                            <div className='log-detail-box'>
                                <div className='log-summary'>
                                    <div className='log-summary-detail'>
                                        <div className='price'>总价：<em className='mount'>{this.currentLog.insTotalCostMap}</em></div>
                                        <div className='tags'>
                                            { this.currentLog.sameLastMap ? <Tag color="blue">{this.currentLog.sameLastMap}</Tag> : null }
                                            <Tag color="blue">{ this.currentLog.offerStatusMap }</Tag>
                                        </div>                       
                                    </div>
                                    <div className='summary-list'>
                                        { this.currentLog.insStandardCostMap ? 
                                            <p className='summary-list-item'>标准商业保费：{this.currentLog.insStandardCostMap}（折扣：{this.currentLog.insDiscountMap}）</p> : null }
                                        { this.currentLog.totalCostWithPre ?
                                            <p className='summary-list-item'>比上次询价：
                                                <Icon 
                                                    className={ this.currentLog.totalCostWithPre > 0 ? 'icon-compare up' : 'icon-compare down' } 
                                                    type={this.currentLog.totalCostWithPre > 0 ? 'caret-up' : 'caret-down'}/>
                                                <span>{this.currentLog.totalCostWithPreMap}</span>
                                            </p> : null }
                                        { this.currentLog.noCompensationRatio ? <p className='summary-list-item'>无赔款优待系数：{this.currentLog.noCompensationRatio}</p> : null }
                                        { this.currentLog.independentChannelRatio ? <p className='summary-list-item'>自主渠道系数：{this.currentLog.independentChannelRatio}</p> : null }
                                        { this.currentLog.autoUnderwritingRatio ? <p className='summary-list-item'>自主核保优惠系数：{this.currentLog.autoUnderwritingRatio}</p> : null }
                                        { this.currentLog.trafficViolationRatio ? <p className='summary-list-item'>交通违法系数：{this.currentLog.trafficViolationRatio}</p> : null }
                                    </div>
                                </div>                      
                                <div className='log-plan-info'>
                                    <p className='log-plan-info-title'>询价明细</p>
                                    <div className='log-plan-info-list'>
                                        <div className='log-plan-info-list-item'>
                                            { this.currentLog.vciDetail ? <span><label className="title">交强险+车船税：</label><span>{this.currentLog.vciDetail['insPlanCostMap']}</span></span> : null }
                                            { this.currentLog.tciDetail ? <span className='span-tciInsPlanCost'><label className="title">商业保险费：</label><span>{this.currentLog.tciDetail['insPlanCostMap']}</span></span> : null }
                                        </div>
                                        {
                                            this.currentLog.vciDetail ?
                                            <div className='log-plan-info-list-item'>
                                                <label className="title">交强险期限：</label>
                                                <span>{`${this.currentLog.vciDetail['insStartTimeMap']} - ${this.currentLog.vciDetail['insEndTimeMap']}`}</span>
                                            </div> : null
                                        }
                                        {
                                            this.currentLog.tciDetail ?
                                            <div className='log-plan-info-list-item'>
                                                <label className="title">商业险期限：</label>
                                                <span>{`${this.currentLog.tciDetail['insStartTimeMap']} - ${this.currentLog.tciDetail['insEndTimeMap']}`}</span>
                                            </div>: null
                                        }
                                        <div className='log-plan-info-list-item'>
                                            <label className="title">询价时间：</label>
                                            <span>{ this.currentLog['createdTimeMap'] }</span>
                                        </div>
                                        <div className='log-plan-info-list-item'>
                                            <label className="title">询价车型：</label>
                                            <span>
                                                { this.currentLog.carDetail['brandModelName'] ? <span className='item'>{this.currentLog.carDetail['brandModelName']}</span> : null }
                                                { this.currentLog.carDetail['engineCapacityMap'] ? <span className='item'>{this.currentLog.carDetail['engineCapacityMap']}</span> : null }
                                                { this.currentLog.carDetail['seatCount'] ? <span className='item'>{this.currentLog.carDetail['seatCount']}座</span> : null }
                                                { this.currentLog.carDetail['purchasePriceMap'] ? <span className='item'>{this.currentLog.carDetail['purchasePriceMap']}</span> : null }
                                                { this.currentLog.carDetail['brandParaOutYear'] ? <span className='item'>{this.currentLog.carDetail['brandParaOutYear']}款</span> : null }
                                            </span>
                                        </div>
                                    </div>
                                    <div className='log-plan-info-table'>
                                        <Table 
                                            columns={this.config.tableColumns} 
                                            dataSource={this.currentLog.planList}
                                            pagination={false}/>
                                    </div>
                                </div>
                            </div>
                            <div className='log-foot'>
                                <Row>
                                    <Col xs={5}>
                                        <Popover content={Qrcode} trigger="click" onVisibleChange={this.popoverVisibleChange}>
                                            <a href="javascript:;" className='log-foot-menu border'>微信报价</a>
                                        </Popover>
                                    </Col>
                                    <Col xs={5}>
                                        <a href="javascript:;" className='log-foot-menu border' onClick={this.smsQuotation}>短信报价</a>
                                    </Col>
                                    <Col xs={9}>
                                        <a href="javascript:;" className='log-foot-menu border'>修改险种重新计算</a>
                                    </Col>
                                    <Col xs={5}>
                                        <a href="javascript:;" className='log-foot-menu' onClick={(e) => this.skipPage(e, this.currentLog)}>详情</a>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div> : 
                    <div className='nodata'>
                        <Icon type="frown" />
                        <span className="text">未查询到上期保单</span>
                    </div>
                }
                <div className='history-modal'>
                    { this.state.smsQuotationVisible && <KISURESMSQuotation {...SMSQuotationProps}/> }
                </div>
            </div>
        )
    }
}                                         
                                                