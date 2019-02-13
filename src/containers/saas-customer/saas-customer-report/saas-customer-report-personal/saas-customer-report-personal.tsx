import * as React from 'react';
import { Row, Col, Radio, Spin, Alert, DatePicker, Table, Card, Icon } from 'antd';
import * as moment from 'moment';
import { tableColumns } from './saas-customer-report-personal-config';
import * as _ from 'lodash';
import { api } from 'src/_mock/api';
import * as echarts from 'echarts';
import './saas-customer-report-personal.scss';

interface IChartVal {
    xAxis: any[];
    yAxis: any[];
}

const { RangePicker } = DatePicker;
const { Grid } = Card;

export default class SaaSCustomerReportPersonal extends React.PureComponent<any, any> {
    public config: any;
    public chartRef: any;
    public echartsTarget: any;
    public gridStyle: any;

    constructor(public props: any) {
        super(props);

        this.state = {
            indicators: 'week',
            indicatorsData: [],
            loadingIndicators: false,
            chartsTime: 'week',
            chartsType: 'followUpMount',
            chartsData: [],
            loadingCharts: false,
            workDetailsTime: 'day',
            workDetailsDetailTime: null,
            workDetailsData: [],
            loadingWorkDetails: false
        };

        this.config = {
            tableColumns: _.cloneDeep(tableColumns)
        };

        this.chartRef = React.createRef();
        this.gridStyle = {
            width: '25%',
            textAlign: 'left',
        };
    }

    componentDidMount() {
        this.queryPersonalIndicators('week', {isInit: true});
        this.queryChartsDataForInsurance('week', 'chartsTime', {isInit: true});
        this.queryworkloadDetailsDataForInsurance('week', {isInit: true});

        const self = this;
        window.addEventListener('resize', function() {
            if (self.echartsTarget)
                self.echartsTarget.resize();
        });
    }

    /**
     * 加载核心指标
     * @param e 选项按钮的value/string传输
     */
    public queryPersonalIndicators = (e: any, otherArgs = {isInit: false}) => {
        const type: string = e.target && e.target.value || e;

        /* 
            这一步做优化，如果选择的按钮值还是之前的indicators，并且不是初次加载，那么久会加载数据
            如果是初次加载，则加载数据
        */
        if (otherArgs.isInit || this.state.indicators !== type && !otherArgs.isInit) {
            const params = {};

            this.setState({
                loadingIndicators: true
            });

            api.queryPersonalIndicators(params).then((res: any) => {
                const state = {
                    loadingIndicators: false,
                    indicators: type
                };
                
                if (res && res.status === 200) {
                    this.setState({...state, ...{
                        indicatorsData: res.data.result || []
                    }});
                } else
                    this.setState(state);
            });
        }
    }

    /** 
     * 加载走势图
     * @param e 选项按钮的value/string传输
     * @param paramType 参数类型：chartsTime/chartsType
     */
    public queryChartsDataForInsurance = (e: any, paramType: string, otherArgs = {isInit: false}) => {
        const type: string = e.target && e.target.value || e;

        /* 
            这一步做优化，如果选择的按钮值还是之前的indicators，并且不是初次加载，那么久会加载数据
            如果是初次加载，则加载数据
        */
        if (otherArgs.isInit || this.state[paramType] !== type && !otherArgs.isInit) {
            this.setState({
                loadingCharts: true,
            });
    
            const params = {
                type
            };
    
            api.queryPersonalCharts(params).then((res: any) => {
                const state = {
                    loadingCharts: false,
                    [paramType]: type
                };
    
                if (res && res.status === 200) {
                    const chartsData = res.data.result || { xAxis: [], yAxis: [] };

                    this.setState({...state, ...{
                        chartsData
                    }});

                    this.createChart('#chartsDataForIns', chartsData, 'line');
                } else {
                    this.setState(state);
                }
            });
        } 
    }

    /**
     * 加载工作量明细
     * @param e 选项按钮的value/string传输
     */
    public queryworkloadDetailsDataForInsurance = (e: any, otherArgs = {isInit: false}, paramsType?: string): any => {
        const value: any = e.target && e.target.value || e;

        if (value === 'custom' && this.state.workDetailsTime !== 'custom') {
            this.setState({
                workDetailsTime: value
            });
        }

        /* 
            这一步做优化，如果选择的按钮值还是之前的值，并且不是初次加载，那么久会加载数据
            如果是初次加载，则加载数据
        */
       if (otherArgs.isInit || this.state.workDetailsTime !== value && !otherArgs.isInit) {
            // 如果是自定义，如果没有值，则返回false
            if (value === 'custom') {
                return false
            }

            this.setState({
                loadingWorkDetails: true,
            });

            const params = { };

            api.queryPersonalWorkDetails(params).then((res: any) => {
                const state = {
                    loadingWorkDetails: false,
                    workDetailsTime: Object.prototype.toString.call(value) === '[object Array]' ? 'custom' : value
                };

                if (res && res.status === 200) {
                    this.setState({...state, ...{
                        workDetailsData: (res.data.result || []).map((item: any, index: number) => {
                            item['name'] = item['salesmanName'];
                            item['mount'] = item['followCount'];
                            item['telephoneCount'] = item['validCallCount'];
                            item['renewCount'] = item['renewalCount'];
                            item['customerCount'] = item['createCustomerCount'];
                            item['totalCost'] = item['totalPremium'];
                            item['rate'] = item['taskCompletionRate'];
                            item['key'] = index;
                            return item;
                        })
                    }});
                } else {
                    this.setState(state);
                }
            });
       } 
    }

    /**
     * 工作量明细 选择具体时间
     * @param e 日期控件返回的值
     */
    public selectWorkDetailsTime = (e: any) => {
        if (e instanceof Array && e.length > 0) {
            const startTime: string = moment(new Date(e[0].toDate())).format('YYYY-MM-DD HH:mm');
            const endTime: string = moment(new Date(e[1].toDate())).format('YYYY-MM-DD HH:mm');
            this.queryworkloadDetailsDataForInsurance([startTime, endTime], {isInit: false}, 'workDetailsDetailTime');
        }
    }

    /**
     * 创建图表
     * @param dom  图表嵌入目标
     * @param data 数据
     * @param type 图表种类
     */
    public createChart = (dom: string, source: IChartVal, type: string) => {
        const domTarget: any = this.chartRef['current'];
        this.echartsTarget = echarts.init(domTarget);
        this.echartsTarget.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer : {
                    type : 'shadow'
                },
                formatter: function(params: any) {
                    params = params[0];
                    return `
                        ${params['axisValue']}<br/>
                        值：${params['value']}
                    `;
                }
            },
            xAxis: {
                type: 'category',
                data: source['xAxis']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: source['yAxis'],
                type,
                areaStyle: {},
                smooth: true,
                label: {
                    normal: {
                        show: true,
                        textBorderColor: '#000',
                        textBorderWidth: 1
                    }
                },
            }]
        });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', () => {});
    }

    public render() {
        return(
            <div className='kisure-antd-report-personal-container'>
                <div className='kisure-antd-report-personal-indicators'>
                    <div className='kisure-antd-report-personal-indicators-head'>
                        <Row>
                            <Col span={12}>
                                <p className='kisure-antd-report-personal-indicators-head-title head-title'>核心指标</p>
                            </Col>
                            <Col span={12}>
                                <Radio.Group className='kisure-antd-report-personal-head-radioGroup' value={this.state.indicators} onChange={this.queryPersonalIndicators}>
                                    <Radio.Button value='week'>本周</Radio.Button>
                                    <Radio.Button value='month'>本月</Radio.Button>
                                </Radio.Group>
                            </Col>
                        </Row>     
                    </div>
                    <div className='kisure-antd-report-personal-indicators-content'>
                        <Spin tip="Loading..." spinning={this.state.loadingIndicators}>
                            <Row>
                                <Col>  
                                    {
                                        this.state.indicatorsData.length === 0 ? 
                                        <Alert className='kisure-antd-report-personal-indicators-warn' message='未查询到核心指标' type='warning' showIcon={true} /> : 
                                        <div className='kisure-antd-report-personal-indicators-card'>
                                            <Card>
                                                {
                                                    this.state.indicatorsData.map((indicator: any, index: number) => {
                                                        return (
                                                            <Grid key={index} style={this.gridStyle} className='kisure-antd-report-personal-indicators-card-grid'>
                                                                <p className='grid-title'><Icon type="book" /><span>{indicator.name}</span></p>
                                                                <p className='grid-firstValue'>{indicator.firstValue}</p>
                                                                {
                                                                    indicator.secondValue === '0' ? 
                                                                    <p className='grid-no-compare'>无环比结果</p> :
                                                                    <p className='grid-has-compare'>
                                                                        比同期
                                                                        {
                                                                            +(indicator.secondValue.replace('%', '')) > 0 ?
                                                                            <Icon type='caret-up' className='caret-up'/> :
                                                                            <Icon type='caret-down' className='caret-down' />
                                                                        }
                                                                        <span>{indicator.secondValue}</span>
                                                                    </p>
                                                                }
                                                            </Grid>
                                                        );  
                                                    })
                                                }
                                            </Card>
                                        </div> 
                                    }
                                </Col>
                            </Row>
                        </Spin>
                    </div>
                </div>
                <div className='kisure-antd-report-personal-charts'>
                    <div className='kisure-antd-report-personal-charts-head'>
                        <Row>
                            <Col span={12}>
                                <p className='kisure-antd-report-personal-charts-head-title'>走势图</p>
                            </Col>
                            <Col span={12}>
                                <Radio.Group className='kisure-antd-report-personal-charts-head-radioGroup' value={this.state.chartsTime} onChange={(e) => this.queryChartsDataForInsurance(e, 'chartsTime')}>
                                    <Radio.Button value='week'>本周</Radio.Button>
                                    <Radio.Button value='month'>本月</Radio.Button>
                                </Radio.Group>
                            </Col>
                        </Row>
                    </div>
                    <div className='kisure-antd-report-personal-charts-btnGroup'>
                        <Row>
                            <Col span={24}>
                                <Radio.Group value={this.state.chartsType} onChange={(e) => this.queryChartsDataForInsurance(e, 'chartsType')}>
                                    <Radio.Button value='followUpMount'>跟进量</Radio.Button>
                                    <Radio.Button value='effectivePhoneMount'>有效电话量</Radio.Button>
                                    <Radio.Button value='insPolicyMount'>保单数</Radio.Button>
                                    <Radio.Button value='totalPremium'>保费总额</Radio.Button>
                                </Radio.Group>
                            </Col>
                        </Row>
                    </div>
                    <div>
                        <Spin tip="Loading..." spinning={this.state.loadingCharts}>
                            <div id='charts' ref={this.chartRef} />
                        </Spin>
                    </div>
                </div>
                <div className='kisure-antd-report-personal-workDetails'>
                    <div className='kisure-antd-report-personal-workDetails-head'>
                        <Row>
                            <Col span={6}>
                                <p className='kisure-antd-report-personal-workDetails-head-title'>保险业务工作量明细</p>
                            </Col>
                            <Col span={18} className='kisure-antd-report-personal-workDetails-head-operation'>
                                <Radio.Group className='kisure-antd-report-personal-workDetails-head-radioGroup' value={this.state.workDetailsTime} onChange={(e) => this.queryworkloadDetailsDataForInsurance(e)}>
                                    <Radio.Button value='day'>本日</Radio.Button>
                                    <Radio.Button value='week'>本周</Radio.Button>
                                    <Radio.Button value='month'>本月</Radio.Button>
                                    <Radio.Button value='year'>本年</Radio.Button>
                                    <Radio.Button value='custom'>自定义</Radio.Button>
                                </Radio.Group>
                                {
                                    this.state.workDetailsTime === 'custom' ?
                                    <span className='kisure-antd-report-personal-workDetails-head-RangePicker'><RangePicker onChange={this.selectWorkDetailsTime}/></span> : null
                                }
                            </Col>
                        </Row>
                    </div>
                    <div className='kisure-antd-report-personal-workDetails-table'>
                        <Spin tip="Loading..." spinning={this.state.loadingWorkDetails}>
                            <Table columns={this.config.tableColumns} dataSource={this.state.workDetailsData} />
                        </Spin>
                    </div>
                </div>
            </div>
        )
    }
}
