import * as React from 'react';
import { connect } from 'react-redux';
import { Spin, message, Form, Row, Col, Skeleton, Table } from 'antd';
import * as _ from 'lodash';
import * as moment from 'moment';
import { 
        IPolicyFormItems, 
        customerForm, 
        carForm, 
        personForm, 
        compulsoryInsForm, 
        bussinessInsForm, 
        bussinessTableColums,
        otherForm,
        giftTableColums,
        giftForm } from './saas-customer-policy-detail-config';
import { mappingValue } from 'src/service/common.fun';
import { api } from 'src/_mock/api';
import './saas-customer-policy-detail.scss';

const FormItem = Form.Item;

class SaaSCustomerPolicyDetail extends React.PureComponent<any, any> {
    public params: any = {};
    public config: any = {};
    public insPlanList: any[] =[];
    public policyInfo: any = {};
    
    constructor(public props: any) {
        super(props);

        this.state = {
            isLoading: false
        };

        this.config = {
            customerForm: _.cloneDeep(customerForm), // JSON.parse(JSON.stringify(customerForm))
            carForm: _.cloneDeep(carForm),
            personForm: _.cloneDeep(personForm),
            compulsoryInsForm: _.cloneDeep(compulsoryInsForm),
            bussinessInsForm: _.cloneDeep(bussinessInsForm),
            bussinessTableColums: _.cloneDeep(bussinessTableColums),
            bussinessList: [],
            otherForm: _.cloneDeep(otherForm),
            giftTableColums: _.cloneDeep(giftTableColums),
            giftList: [],
            giftForm: _.cloneDeep(giftForm)
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
                api.getCustomerPolicyDetail()
            ]).then((res: any) => {
                if (res && res.some((i: any) => i.status === 200)) {
                    this.insPlanList = ( res[0]['data']['result'] || []).map((list: any) => {
                        return {
                            name: list.insItemName,
                            value: list.insItemId
                        };
                    });
                    this.policyInfo = res[1]['data']['result'];
                    this.formatResponse(this.policyInfo);
                } else
                    this.setState({
                        isLoading: false
                    });
            });
        } else
            message.error('无法获取订单ID，加载失败');
    }

    public formatResponse = (res: any) => {
        const { plateType, energyType, plateColor, certType, ownerProp } = this.props.dictionary;
        
        this.config.customerForm.forEach((form: IPolicyFormItems) => {
            switch(form.key) {
                case 'carOwnerName': form['value'] = res.order.customerName; break;
                case 'carNumber': form['value'] = res.order.carNumber; break;
                case 'vinNumber': form['value'] = res.order.vinNumber; break;
                case 'salesmanName': form['value'] = res.order.salesmanName;break;
                case 'createdTime':
                    form['value'] = moment(new Date(res.order.createdTime)).format('YYYY-MM-DD HH:mm:ss');
                    break;
            }
        });

        this.config.otherForm['policyCompany']['value'] = res.order.policyCompany;
        this.config.otherForm['insTotalCost']['value'] = `${res.order.insTotalCost / 100}`;

        if (res.orderPlanInfos && res.orderPlanInfos.length > 0) {
            res.orderPlanInfos.forEach((item: any) => {
                if (item.insType === 1) {
                    // 强制险
                    this.config.otherForm['compulsoryInsPlanCost']['value'] = `${item.insPlanCost / 100}`;
                    const compulsoryInsurance = item.orderPlanDetails.find((plan: any) => plan.policyItemId === 1);
                    const tax = item.orderPlanDetails.find((plan: any) => plan.policyItemId === 2);
                    this.config.compulsoryInsForm.forEach((form: IPolicyFormItems) => {
                        switch(form.key) {
                            case 'compulsoryCost': form['value'] = compulsoryInsurance ? `${compulsoryInsurance.insItemCost / 100}元`: `0元`; break;
                            case 'insTime': form['value'] = item.insStartTime && item.insEndTime ?
                                `${moment(new Date(item.insStartTime)).format('YYYY-MM-DD HH:mm:ss')}~${moment(new Date(item.insEndTime)).format('YYYY-MM-DD HH:mm:ss')}` : ''; break;
                            case 'taxAmount': form['value'] = tax ? `${tax.insItemCost / 100}元` : `0元`; break;
                            case 'policyNum': form['value'] = item['policyNum']; break;
                        }
                    });
                } else if (item.insType === 2) {
                    // 商业险
                    this.config.otherForm['bussinessInsPlanCost']['value'] = `${item.insPlanCost / 100}`;
                    this.config.bussinessInsForm.forEach((form: IPolicyFormItems) => {
                        switch(form.key) {
                            case 'insDiscount': form['value'] = item.insDiscount; break;
                            case 'insTime': form['value'] = item.insStartTime && item.insEndTime ? 
                                `${moment(new Date(item.insStartTime)).format('YYYY-MM-DD HH:mm:ss')}~${moment(new Date(item.insEndTime)).format('YYYY-MM-DD HH:mm:ss')}` : ''; break;
                            case 'policyNum': form['value'] = item.policyNum; break;
                        }
                    });

                    this.config.bussinessList = item.orderPlanDetails.map((plan: any) => {
                        plan = {...plan, ...{
                            policyItemMapName: mappingValue([...this.insPlanList], plan.policyItemId),
                            insItemValue: plan.insItemValue / 100 || '投保',
                            insItemCost: plan.insItemCost / 100 || '--'
                        }};
                        return plan;
                    });
                }
            });
        }

        this.config.carForm.forEach((form: IPolicyFormItems) => {
            switch(form.key) {
                case 'carNumber': form['value'] = res.orderCar['carNumber']; break;
                case 'vinNumber': form['value'] = res.orderCar['vinNumber']; break;
                case 'engineNumber': form['value'] = res.orderCar['engineNumber']; break;
                case 'plateType': form['value'] = mappingValue([...plateType], res.orderCar['plateType']); break;
                case 'energyType': form['value'] = mappingValue([...energyType], res.orderCarDetail['energyTypeCode']); break;
                case 'startRegisterDate': 
                    form['value'] = res.orderCar['startRegisterDate'] && moment(new Date(res.orderCar['startRegisterDate'])).format('YYYY-MM-DD HH:mm:ss') || '无'; 
                    break;
                case 'modelType': form['value'] = res.orderCarDetail['modelType']; break;
                case 'seatCount': form['value'] = res.orderCarDetail['seatCount']; break;
                case 'negotiatedValue': form['value'] = res.orderCarExtInfo && res.orderCarExtInfo['negotiatedValue'] + '元' || '0元'; break;
                case 'plateColorType': form['value'] = mappingValue([...plateColor], res.orderCar['plateColorType']); break;
                case 'loanTransferFlag': 
                    form['value'] = mappingValue([{name: '是', value: 1}, {name: '否', value: 0}], (res.orderCarDetail['loanTransferFlag'] || 0)); 
                    break;
                case 'transferTime': 
                    form['value'] = res.orderCar['transferTime'] && moment(new Date(res.orderCar['transferTime'])).format('YYYY-MM-DD HH:mm:ss') || '无'; 
                    break;
            }
        });

        this.config.personForm.forEach((form: IPolicyFormItems) => {
            switch(form.key) {
                case 'name': form['value'] = res.orderOwner['name']; break;
                case 'ownerProp': form['value'] = mappingValue([...ownerProp], res.orderOwner['ownerProp']); break;
                case 'certType': form['value'] = mappingValue([...certType], res.orderOwner['certType']); break;
                case 'certNum': form['value'] = res.orderOwner['certNum']; break;
                case 'beinsuredOwnerName': form['value'] = res.orderOwner['beinsuredOwnerName']; break;
                case 'mobilePhone': form['value'] = res.orderOwner['mobilePhone']; break;
            }
        });

        let price: number = 0;
        this.config.giftList = (res.orderGifts || []).map((gift: any, index: number) => {
            gift = {...gift, ...{
                giftMarketPrice: (gift.giftMarketPrice || 0) / 100,
                giftCostPrice: (gift.giftCostPrice || 0) / 100,
                costDepartmentName: gift.costDepartmentName,
                key: index
            }};

            price += (gift.giftMarketPrice * gift.giftNumber);

            return gift;
        });

        this.config.giftForm.find((form: IPolicyFormItems) => form.key === 'cashback')['value'] = res.order.backAmount ? `${res.order.backAmount / 100}元` : `0元`;
        this.config.giftForm.find((form: IPolicyFormItems) => form.key === 'faceTotalAccount')['value'] = `${price}元`;

        this.setState({
            isLoading: false
        });
    }

    /** 
     * 映射值
     */
    public mappingValue = () => {

    }

    /** 
     * 创建内容信息dom
     */
    public createContent = (form: IPolicyFormItems): any => {
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
            <div className='kisure-customer-policy-detail'>
                <Spin tip='Loading...' spinning={this.state.isLoading}>
                    <div className='kisure-customer-policy-detail-customerInfo'>
                        {
                            this.state.isLoading ?
                            <Skeleton active={true} paragraph={{ rows: 4 }}/> :
                            <Row>
                                {
                                    this.config.customerForm.map((form: IPolicyFormItems, index: number) => {
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
                    <div className='kisure-customer-policy-detail-content'>
                        <div className='kisure-customer-policy-detail-policyInfo'>
                            <p className='title'>保单详情</p>
                            <div className='content'>
                                {
                                    this.state.isLoading ?
                                    <Skeleton active={true} paragraph={{ rows: 12 }}/> :
                                    <React.Fragment>
                                        <div className='kisure-customer-policy-detail-baseInfo'>
                                            <p>
                                                <span><label className='Plabel'>保险公司</label><span>{this.config.otherForm['policyCompany']['value']}</span></span>
                                                <span><label className='Plabel'>保费合计(车船税)</label><span className='red'>{this.config.otherForm['insTotalCost']['value']}</span>元</span>
                                            </p>
                                        </div>
                                        <div className='kisure-customer-policy-detail-compulsory'>
                                            <p className='subtitle'>强制保险<label><span className='red'>{this.config.otherForm['compulsoryInsPlanCost']['value']}</span>元</label></p>
                                            <div>
                                                <Row>
                                                    {
                                                        this.config.compulsoryInsForm.map((form: IPolicyFormItems, index: number) => {
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
                                                        this.config.bussinessInsForm.map((form: IPolicyFormItems, index: number) => {
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
                        <div className='kisure-customer-policy-detail-carInfo'>
                            <p className='title'>车辆信息</p>
                            <div className='content'>
                                {
                                    this.state.isLoading ?
                                    <Skeleton active={true} paragraph={{ rows: 4 }}/> :
                                    <Row>
                                        {
                                            this.config.carForm.map((form: IPolicyFormItems, index: number) => {
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
                        <div className='kisure-customer-policy-detail-personInfo'>
                            <p className='title'>人员信息</p>
                            <div className='content'>
                                {
                                    this.state.isLoading ?
                                    <Skeleton active={true} paragraph={{ rows: 4 }}/> :
                                    <Row>
                                        {
                                            this.config.personForm.map((form: IPolicyFormItems, index: number) => {
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
                        <div className='kisure-customer-policy-detail-giftInfo'>
                            <p className='title'>赠品详情</p>
                            <div className='content'>
                                {
                                    this.state.isLoading ?
                                    <Skeleton active={true} paragraph={{ rows: 6 }}/> :
                                    <React.Fragment>
                                        <Row>
                                            {
                                                this.config.giftForm.map((form: IPolicyFormItems, index: number) => {
                                                    return <Col key={`giftForm-` + index} {...form.config.formItemLayout}>
                                                                <div className={form.config.className || ''}>
                                                                    { 
                                                                        <FormItem
                                                                            key={`giftForm-formItem-` + index}
                                                                            label={form.label}>
                                                                            { this.createContent(form) }
                                                                        </FormItem>
                                                                    }
                                                                </div>
                                                            </Col>;
                                                })
                                            }
                                        </Row>
                                        <div className='kisure-customer-policy-detail-giftInfo-tableBox'>
                                            <Table 
                                                columns={this.config.giftTableColums}
                                                dataSource={this.config.giftList} 
                                                pagination={false}
                                                scroll={{x:1400}}/>
                                        </div>
                                    </React.Fragment>
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
)(SaaSCustomerPolicyDetail);
