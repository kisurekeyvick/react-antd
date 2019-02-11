import * as React from 'react';
import { connect } from 'react-redux';
import { Spin, message, Form, Row, Col, Skeleton, Button, Table } from 'antd';
import * as _ from 'lodash';
import * as moment from 'moment';
import {
        ICustomerFormItems,
        customerForm,
        otherForm,
        carForm,
        personForm,
        compulsoryInsForm,
        bussinessInsForm,
        bussinessTableColums } from './saas-customer-list-enquiry-detail-config';
import { api } from 'src/_mock/api';
import { mappingValue } from 'src/service/common.fun';
import './saas-customer-list-enquiry-detail.scss';

const FormItem = Form.Item;

class SaaSCustomerListDetail extends React.PureComponent<any, any> {
    public params: any = {};
    public config: any = {};
    public insPlanList: any[] =[];
    public customerInfo: any = {};

    constructor(public props: any) {
        super(props);

        this.state = {
            isLoading: false
        };

        this.config = {
            customerForm: _.cloneDeep(customerForm),
            otherForm: _.cloneDeep(otherForm),
            carForm: _.cloneDeep(carForm),
            personForm: _.cloneDeep(personForm),
            compulsoryInsForm: _.cloneDeep(compulsoryInsForm),
            bussinessInsForm: _.cloneDeep(bussinessInsForm),
            bussinessList: [],
            bussinessTableColums: _.cloneDeep(bussinessTableColums)
        };
    }

    public componentDidMount() {
        const { match } = this.props;
        this.params = 'params' in match && match['params'];

        if (this.params) {
            this.setState({
                isLoading: true
            });

            Promise.all([
                api.getInsPlanList(),
                api.getCustomerListDetail()
            ]).then((res: any) => {
                if (res && res.some((i: any) => i.status === 200)) {
                    this.insPlanList = ( res[0]['data']['result'] || []).map((list: any) => {
                        return {
                            name: list.insItemName,
                            value: list.insItemId
                        };
                    });
                    this.customerInfo = res[1]['data']['result'];
                    this.formatResponse(this.customerInfo);
                } else
                    this.setState({
                        isLoading: false
                    });
            });
        } else
            message.error('无法获取任务ID，加载失败');
    }

    public formatResponse = (res: any) => {
        const { plateType, energyType, plateColor, ownerProp, certType } = this.props.dictionary;
        this.config.otherForm['carOwnerName']['value'] = res.carOwnerName;
        this.config.otherForm['insTotalCost']['value'] = `${res.calculatePrice.insTotalCost / 100}`;
        this.config.otherForm['policyCompany']['value'] = res.calculatePrice.policyCompany;

        this.config.customerForm.forEach((form: ICustomerFormItems) => {
            switch(form.key) {
                case 'carNumber':  form['value'] = res.calculatePriceCar['carNumber']; break;
                case 'vinNumber':  form['value'] = res.calculatePriceCar['vinNumber']; break;
                case 'salesmanName':  form['value'] = res.calculatePrice['salesmanName']; break;
                case 'updatedTime':  form['value'] = res.calculatePrice['updatedTime']; break;
                case 'quotationNumber':  form['value'] = res.calculatePrice['quotationNumber']; break;
            }
        });

        if (res.calculatePricePlanInfoList && res.calculatePricePlanInfoList.length > 0) {
            res.calculatePricePlanInfoList.forEach((item: any) => {
                if (item.insType === 1) {
                    // 强制险
                    const list = item.hapiCalculatePriceDetailList;
                    const compulsory = list.find((i: any) => i.policyItemId === 1);
                    const tax = list.find((i: any) => i.policyItemId === 2);
                    this.config.otherForm['compulsoryInsPlanCost']['value'] = `${item.insPlanCost / 100}`;
                    this.config.compulsoryInsForm.forEach((form: ICustomerFormItems) => {
                        switch(form.key) {
                            case 'compulsoryCost': form['value'] = compulsory ? `${compulsory.insItemCost / 100}元` : `0元`; break;
                            case 'insTime': form['value'] = form['value'] = item.insStartTime && item.insEndTime ?
                            `${moment(new Date(item.insStartTime)).format('YYYY-MM-DD HH:mm:ss')}~${moment(new Date(item.insEndTime)).format('YYYY-MM-DD HH:mm:ss')}` : ''; break;
                            case 'taxAmount': form['value'] = tax ? `${tax.insItemCost / 100}元` : `0元`; break;
                        }
                    });
                } else if (item.insType === 2) {
                    // 商业险
                    this.config.otherForm['bussinessInsPlanCost']['value'] = `${item.insPlanCost / 100}`;
                    this.config.bussinessInsForm.forEach((form: ICustomerFormItems) => {
                        switch(form.key) {
                            case 'insDiscount': form['value'] = ''; break;
                            case 'insTime': form['value'] = form['value'] = item.insStartTime && item.insEndTime ?
                            `${moment(new Date(item.insStartTime)).format('YYYY-MM-DD HH:mm:ss')}~${moment(new Date(item.insEndTime)).format('YYYY-MM-DD HH:mm:ss')}` : ''; break;
                        }
                    });

                    this.config.bussinessList = item.hapiCalculatePriceDetailList.map((plan: any, index: number) => {
                        plan = {...plan, ...{
                            policyItemMapName: mappingValue([...this.insPlanList], plan.policyItemId),
                            insItemValue: this.formatInsItemValue(plan),
                            insItemCost: this.formatPrice(plan.insItemCost),
                            noReduceCost: this.formatPrice(plan.isNoReduceCost),
                            key: index
                        }};
                        return plan;
                    });
                }
            });
        }

        this.config.carForm.forEach((form: ICustomerFormItems) => {
            switch(form.key) {
                case 'carNumber': form['value'] = res.calculatePriceCar['carNumber']; break;
                case 'vinNumber': form['value'] = res.calculatePriceCar['vinNumber']; break;
                case 'engineNumber': form['value'] = res.calculatePriceCar['engineNumber']; break;
                case 'plateType': form['value'] = mappingValue([...plateType], res.calculatePriceCar['plateType']); break;
                case 'energyTypeCode': form['value'] = mappingValue([...energyType], res.calculatePriceCarDetail['energyTypeCode']); break;
                case 'startRegisterDate': 
                    form['value'] = res.calculatePriceCar['startRegisterDate'] && moment(new Date(res.calculatePriceCar['startRegisterDate'])).format('YYYY-MM-DD HH:mm:ss') || '无'; 
                    break;
                case 'modelType': form['value'] = res.calculatePriceCarDetail['modelType']; break;
                case 'seatCount': form['value'] = res.calculatePriceCarDetail['seatCount']; break;
                case 'negotiatedValue': 
                    form['value'] = res.calculatePriceCarExtInfo['negotiatedValue'] ? `${res.calculatePriceCarExtInfo['negotiatedValue'] / 100}元` : '0元'; 
                    break;
                case 'plateColorType': form['value'] = mappingValue([...plateColor], res.calculatePriceCar['plateColorType']); break;
                case 'loanTransferFlag': form['value'] = mappingValue([{name: '是', value: 1}, {name: '否', value: 0}], res.calculatePriceCarDetail['loanTransferFlag']); break;
                case 'transferTime': 
                    form['value'] = res.calculatePriceCarDetail['transferTime'] && moment(new Date(res.calculatePriceCarDetail['transferTime'])).format('YYYY-MM-DD HH:mm:ss') || '无'; 
                    break;
            }
        });

        this.config.personForm.forEach((form: ICustomerFormItems) => {
            switch(form.key) {
                case 'name': form['value'] = res.calculatePriceOwner['name']; break;
                case 'ownerProp': form['value'] = mappingValue([...ownerProp], res.calculatePriceCarDetail['ownerProp']); break;
                case 'certType': form['value'] = mappingValue([...certType], res.calculatePriceOwner['certType']); break;
                case 'certNum': form['value'] = res.calculatePriceOwner['certNum']; break;
                case 'insuredMan': form['value'] = res.calculatePriceOwner['beinsuredOwnerName']; break;
                case 'beinsuredOwnerMobilePhone': form['value'] = res.calculatePriceOwner['beinsuredOwnerMobilePhone']; break;
            }
        });

        this.setState({
            isLoading: false
        });
    }

    public formatPrice = (value: number): any => {
        if (value >= 10000 * 100) {
            return `${value * Math.pow(10, 4) / (100 * Math.pow(10, 8))}万`;
        }

        if (value < 10000 * 100) {
            return `${value / 100}元`;
        }
    }

    public formatInsItemValue = (plan: any): any => {
        let value: string | number;
    
        if (plan.policyItemId === 6) {
            const itemInfo = plan.insItemDetail && JSON.parse(plan.insItemDetail);
            value = `${itemInfo['key']}座*${this.formatPrice(itemInfo['value'])}`;
        } else if (plan.policyItemId === 8) {
            const json = JSON.parse(plan.insItemDetail);
            value = 'value' in json ? json['value'] :  this.formatPrice(plan.insItemValue);
        } else if (plan.policyItemId === 3 || plan.policyItemId === 7 || plan.policyItemId === 10 ||
            plan.policyItemId === 11 || plan.policyItemId === 19 || plan.policyItemId === 22 || plan.policyItemId === 15) {
            value = '投保';
        } else
            value = this.formatPrice(plan.insItemValue);

        return value;
    }

    /** 
     * 微信报价
     */
    public wechartQuote = () => {

    }

    /** 
     * 短信报价
     */
    public smsQuote = () => {

    }

    /** 
     * 创建内容信息dom
     */
    public createContent = (form: ICustomerFormItems): any => {
        let formItem: any;
        
        switch(form.type) {
            case 'content':
                formItem = <span>{form.value}</span>;
                break;
            default:
                formItem = null;
                break;
        }

        return formItem;
    }

    public render() {
        return (
            <div className='kisure-customer-list-detail'>
                <Spin tip='Loading...' spinning={this.state.isLoading}>
                    <div className='kisure-customer-list-detail-customerInfo'>
                        {
                            this.state.isLoading ?
                            <Skeleton active={true} paragraph={{ rows: 4 }}/> :
                            <Row>
                                <div className='kisure-customer-list-detail-customerInfo-header'>
                                    <span className='customer'><label className='spanLabel'>客户</label><span>{this.config.otherForm['carOwnerName']['value']}</span></span>
                                    <span>
                                        <Button type='primary' onClick={this.wechartQuote}>微信报价</Button>
                                        <Button type='primary' onClick={this.smsQuote}>短信报价</Button>
                                    </span>
                                </div>
                                {
                                    this.config.customerForm.map((form: ICustomerFormItems, index: number) => {
                                        return <Col key={`customerForm-` + index} {...form.config.formItemLayout}>
                                                    <div className={form.config.className || ''}>
                                                        { 
                                                            <FormItem
                                                                key={`customerForm-formItem-` + index}
                                                                label={form.label}>
                                                                { this.createContent(form) }
                                                            </FormItem>
                                                        }
                                                    </div>
                                                </Col>;
                                    })
                                }
                            </Row>
                        }
                    </div>
                    <div className='kisure-customer-list-detail-content'>
                        <div className='kisure-customer-list-detail-calculatePriceInfo'>
                            <p className='title'>询价详情</p>
                            <div className='content'>
                                {
                                    this.state.isLoading ?
                                    <Skeleton active={true} paragraph={{ rows: 12 }}/> :
                                    <React.Fragment>
                                        <div className='kisure-customer-list-detail-baseInfo'>
                                            <p>
                                                <span><label className='Plabel'>保险公司</label><span>{this.config.otherForm['policyCompany']['value']}</span></span>
                                                <span><label className='Plabel'>保费合计(车船税)</label><span className='red'>{this.config.otherForm['insTotalCost']['value']}</span>元</span>
                                            </p>
                                        </div>
                                        <div className='kisure-customer-list-detail-compulsory'>
                                            <p className='subtitle'>强制保险<label><span className='red'>{this.config.otherForm['compulsoryInsPlanCost']['value']}</span>元</label></p>
                                            <div>
                                                <Row>
                                                    {
                                                        this.config.compulsoryInsForm.map((form: ICustomerFormItems, index: number) => {
                                                            return <Col key={`compulsoryInsForm-` + index} {...form.config.formItemLayout}>
                                                                        <div className={form.config.className || ''}>
                                                                            { 
                                                                                <FormItem
                                                                                    key={`compulsoryInsForm-formItem-` + index}
                                                                                    label={form.label}>
                                                                                    { this.createContent(form) }
                                                                                </FormItem>
                                                                            }
                                                                        </div>
                                                                    </Col>;
                                                        })
                                                    }
                                                </Row>
                                            </div>
                                        </div>
                                        <div className='kisure-customer-policy-detail-business'>
                                            <p className='subtitle'>商业保险<label><span className='red'>{this.config.otherForm['bussinessInsPlanCost']['value']}</span>元</label></p>
                                            <div>
                                                <Row>
                                                    {
                                                        this.config.bussinessInsForm.map((form: ICustomerFormItems, index: number) => {
                                                            return <Col key={`bussinessInsForm-` + index} {...form.config.formItemLayout}>
                                                                        <div className={form.config.className || ''}>
                                                                            { 
                                                                                <FormItem
                                                                                    key={`bussinessInsForm-formItem-` + index}
                                                                                    label={form.label}>
                                                                                    { this.createContent(form) }
                                                                                </FormItem>
                                                                            }
                                                                        </div>
                                                                    </Col>;
                                                        })
                                                    }
                                                </Row>
                                            </div>
                                            <div className='kisure-customer-policy-detail-business-table'>
                                                <Table 
                                                    columns={this.config.bussinessTableColums}
                                                    dataSource={this.config.bussinessList} 
                                                    pagination={false}
                                                    scroll={{x:1400}}/>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                }
                            </div>
                        </div>
                        <div className='kisure-customer-list-detail-carInfo'>
                            <p className='title'>车辆信息</p>
                            <div className='content'>
                                {
                                    this.state.isLoading ?
                                    <Skeleton active={true} paragraph={{ rows: 4 }}/> :
                                    <Row>
                                        {
                                            this.config.carForm.map((form: ICustomerFormItems, index: number) => {
                                                return <Col key={`carForm-` + index} {...form.config.formItemLayout}>
                                                            <div className={form.config.className || ''}>
                                                                { 
                                                                    <FormItem
                                                                        key={`carForm-formItem-` + index}
                                                                        label={form.label}>
                                                                        { this.createContent(form) }
                                                                    </FormItem>
                                                                }
                                                            </div>
                                                        </Col>;
                                            })
                                        }
                                    </Row>
                                }
                            </div>
                        </div>
                        <div className='kisure-customer-list-detail-personInfo'>
                            <p className='title'>人员信息</p>
                            <div className='content'>
                                {
                                    this.state.isLoading ?
                                    <Skeleton active={true} paragraph={{ rows: 4 }}/> :
                                    <Row>
                                        {
                                            this.config.personForm.map((form: ICustomerFormItems, index: number) => {
                                                return <Col key={`personForm-` + index} {...form.config.formItemLayout}>
                                                            <div className={form.config.className || ''}>
                                                                { 
                                                                    <FormItem
                                                                        key={`personForm-formItem-` + index}
                                                                        label={form.label}>
                                                                        { this.createContent(form) }
                                                                    </FormItem>
                                                                }
                                                            </div>
                                                        </Col>;
                                            })
                                        }
                                    </Row>
                                }
                            </div>
                        </div>
                    </div>
                </Spin>
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        dictionary: state.saasCommon.dictionary,
    };
}

export default connect(
    mapStateToProps
)(SaaSCustomerListDetail);
