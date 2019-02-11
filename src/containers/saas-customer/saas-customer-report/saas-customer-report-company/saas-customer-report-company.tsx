import * as React from 'react';
import { Row, Col, Radio, Spin, DatePicker, Alert, Table } from 'antd';
import * as moment from 'moment';
import { api } from 'src/_mock/api';
import * as _ from 'lodash';
import { tableColumns } from './saas-customer-report-company-config';
import './saas-customer-report-company.scss';

const { RangePicker } = DatePicker;

export default class SaaSCustomerReportCompany extends React.PureComponent<any, any> {
    public config: any;
    
    constructor(public props: any) {
        super(props);

        this.state = {
            premiumTime: 'day',
            premiumDetailTime: null,
            premiumType: 'totalCost',
            premiumData: null,
            premiumTableData: [],
            loadingPremium: false
        };

        this.config = {
            tableColumns: _.cloneDeep(tableColumns)
        };
    }

    componentDidMount() {
        this.queryPremiumSales('day', 'premiumTime', {isInit: true});
    }

    /**
     * 加载保险公司保费销售额
     * @param e 选项按钮的value/时间控件的值
     * @param stateName state的属性名字
     * @otherArgs 其他的参数
     * @memberof SaaSCustomerReportCompany
     */
    public queryPremiumSales = (e: any, stateName: string, otherArgs = {isInit: false}): any => {
        const value: any = Object.prototype.toString.call(e) === '[object String]' || 
                                Object.prototype.toString.call(e) === '[object Array]' ? e : e.target && e.target.value;

        /* 
            如果选择的是custom自定义，那么就更新state.premiumTime值，这样界面就能看到选中的样子
        */
        if (value === 'custom' && this.state[stateName] !== 'custom') {
            this.setState({
                [stateName]: value
            });
        }

        /* 
            这一步做优化，如果选择的按钮值还是之前的值，并且不是初次加载，那么久会加载数据
            如果是初次加载，则加载数据
        */
        if (otherArgs.isInit || this.state[stateName] !== value && !otherArgs.isInit) {
            // 如果是自定义，如果没有值，则返回false
            if (value === 'custom') {
                return false;
            }

            this.setState({
                loadingPremium: true
            });

            const params = {};

            api.queryInsurancePremiumSales(params).then((res: any) => {
                const state = {...{
                    loadingPremium: false,
                }, ...{[stateName]: value}}; 

                if (res && res.status === 200) {
                    this.setState({...state, ...{
                        premiumData:  undefined// res.data.result
                    }});
                } else
                    this.setState(state);
            });
        }
    }

    /**
     * 工作量明细 选择具体时间
     * @param e 日期控件返回的值
     */
    public selectPremiumSalesTime = (e: any) => {
        if (e instanceof Array && e.length > 0) {
            const startTime: string = moment(new Date(e[0].toDate())).format('YYYY-MM-DD HH:mm');
            const endTime: string = moment(new Date(e[1].toDate())).format('YYYY-MM-DD HH:mm');
            this.queryPremiumSales([startTime, endTime], 'premiumDetailTime', {isInit: false});
        }
    }

    public render() {
        return(
            <div className='kisure-antd-report-company-container'>
                <div className='kisure-antd-report-company-container-premium'>
                    <div className='kisure-antd-report-company-container-premium-head'>
                        <Row>
                            <Col span={6}>
                                <p className='kisure-antd-report-company-container-premium-head-title'>保险公司保费销售额</p>
                            </Col>
                            <Col span={18} className='kisure-antd-report-personal-premium-head-operation'>
                                <Radio.Group className='kisure-antd-report-company-container-btnGroup-premiumTime' value={this.state.premiumTime} onChange={(e) => this.queryPremiumSales(e, 'premiumTime')}>
                                    <Radio.Button value='day'>本日</Radio.Button>
                                    <Radio.Button value='week'>本周</Radio.Button>
                                    <Radio.Button value='month'>本月</Radio.Button>
                                    <Radio.Button value='year'>本年</Radio.Button>
                                    <Radio.Button value='custom'>自定义</Radio.Button>
                                </Radio.Group>
                                {
                                    this.state.premiumTime === 'custom' ?
                                    <span className='kisure-antd-report-company-premiumTime-head-RangePicker'><RangePicker onChange={this.selectPremiumSalesTime}/></span> : null
                                }
                            </Col>
                        </Row>
                    </div>
                    <div className='kisure-antd-report-company-container-premium-content'>
                        <div className='kisure-antd-report-company-container-premium-content-operation'>
                            <Row>
                                <Col>
                                    <Radio.Group className='kisure-antd-report-company-container-btnGroup-premiumType' value={this.state.premiumType} onChange={(e) => this.queryPremiumSales(e, 'premiumType')}>
                                        <Radio.Button value='totalCost'>保费总额</Radio.Button>
                                        <Radio.Button value='businessCost'>商业险</Radio.Button>
                                        <Radio.Button value='insCost'>交强险</Radio.Button>
                                        <Radio.Button value='tax'>车船税</Radio.Button>
                                    </Radio.Group>
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <Row gutter={24}>
                                <Col xs={24} sm={12}>
                                    <Spin tip="Loading..." spinning={this.state.loadingPremium}>
                                        {
                                            !this.state.loadingPremium && !this.state.premiumData ? 
                                            <Alert className='kisure-antd-report-company-premiumType-warn' message='未查询到保险公司保费销售额' type='warning' showIcon={true} /> : ''
                                        }
                                    </Spin>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Table columns={this.config.tableColumns} dataSource={this.state.premiumTableData}/>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
