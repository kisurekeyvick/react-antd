import * as React from 'react';
import { Row, Col, Radio, Spin, Alert, DatePicker, Table, } from 'antd';
import * as moment from 'moment';
import * as _ from 'lodash';
import { api } from 'src/_mock/api';
import { tableColumns } from './saas-customer-report-car-config';
import './saas-customer-report-car.scss';

const { RangePicker } = DatePicker;

export default class SaaSCustomerReportCar extends React.PureComponent<any, any> {
    public config: any;
    
    constructor(public props: any) {
        super(props);

        this.state = {
            proportionTime: 'day',
            proportionDetailTime: null,
            proportionTimeData: null,
            proportionTimeTableData: [],
            loadingProportion: false
        };

        this.config = {
            tableColumns: _.cloneDeep(tableColumns)
        };
    }

    componentDidMount() {

    }

    /**
     * 加载续保车型占比
     *
     * @memberof SaaSCustomerReportCar
     */
    public queryRenewalCarProportion = (e: any, otherArgs = {isInit: false}, paramsType?: string): any => {
        const value: any = e.target && e.target.value || e;

        if (value === 'custom' && this.state.proportionTime !== 'custom') {
            this.setState({
                proportionTime: value
            });
        }

        /* 
            这一步做优化，如果选择的按钮值还是之前的值，并且不是初次加载，那么久会加载数据
            如果是初次加载，则加载数据
        */
       if (otherArgs.isInit || this.state.proportionTime !== value && !otherArgs.isInit) {
           // 如果是自定义，如果没有值，则返回false
           if (value === 'custom') {
                return false
            }

            this.setState({
                loadingProportion: true
            });

            const params = { };

            api.queryRenewalCarProportion(params).then((res: any) => {
                const state = {
                    loadingProportion: false,
                    proportionTime: Object.prototype.toString.call(value) === '[object Array]' ? 'custom' : value
                };

                if (res && res.status === 200) {
                    this.setState({...state, ...{
                        proportionTimeData: undefined// res.data.result
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
    public selectPCarProportionTime = (e: any) => {
        if (e instanceof Array && e.length > 0) {
            const startTime: string = moment(new Date(e[0].toDate())).format('YYYY-MM-DD HH:mm');
            const endTime: string = moment(new Date(e[1].toDate())).format('YYYY-MM-DD HH:mm');
            this.queryRenewalCarProportion([startTime, endTime], {isInit: false}, 'proportionDetailTime');
        }
    }

    public render() {
        return(
            <div className='kisure-antd-report-car-container'>
                <div className='kisure-antd-report-car-container-proportion'>
                    <div className='kisure-antd-report-car-container-proportion-head'>
                        <Row>
                            <Col span={6}>
                                <p className='kisure-antd-report-car-container-proportion-head-title'>续保车型占比</p>
                            </Col>
                            <Col span={18} className='kisure-antd-report-car-container-proportion-head-operation'>
                                <Radio.Group className='kisure-antd-report-company-container-btnGroup-proportion' value={this.state.proportionTime} onChange={(e) => this.queryRenewalCarProportion(e)}>
                                    <Radio.Button value='day'>本日</Radio.Button>
                                    <Radio.Button value='week'>本周</Radio.Button>
                                    <Radio.Button value='month'>本月</Radio.Button>
                                    <Radio.Button value='year'>本年</Radio.Button>
                                    <Radio.Button value='custom'>自定义</Radio.Button>
                                </Radio.Group>
                                {
                                    this.state.proportionTime === 'custom' ?
                                    <span className='kisure-antd-report-company-proportion-head-RangePicker'><RangePicker onChange={this.selectPCarProportionTime}/></span> : null
                                }
                            </Col>
                        </Row>
                    </div>
                    <div className='kisure-antd-report-car-container-proportion-content'>
                        <div>
                            <Row gutter={24}>
                                <Col xs={24} sm={12}>
                                    <Spin tip="Loading..." spinning={this.state.loadingProportion}>
                                        {
                                            !this.state.loadingProportion && !this.state.premiumData ? 
                                            <Alert className='kisure-antd-report-company-premiumType-warn' message='未查询到续保车型占比' type='warning' showIcon={true} /> : ''
                                        }
                                    </Spin>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <Table columns={this.config.tableColumns} dataSource={this.state.proportionTimeTableData}/>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
