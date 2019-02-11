import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Icon, Table } from 'antd';
import * as _ from 'lodash';
import * as moment from 'moment';
import { formatPrice, mappingValue } from 'src/service/common.fun';
import { tableColumns } from './saas-customer-list-budget-calculate-previous-config';
import './saas-customer-list-budget-calculate-previous.scss';

export default class SaaSCustomerListBudgetCalculatePrevious extends React.PureComponent<any, any> {
    static propTypes = {
        insPlanList: PropTypes.array.isRequired,
        calculate: PropTypes.func.isRequired,
        lastPolicy: PropTypes.any
    }

    public lastPolicyInfo: any = {};
    public config: any = {};

    constructor(public props: any) {
        super(props);

        this.config= {
            tableColumns: _.cloneDeep(tableColumns)
        };

        this.formatPreviousInfo();
    }

    public componentDidMount() {

    }

    public formatPreviousInfo = () => {
        const lastPolicy = this.props.lastPolicy;

        if (lastPolicy) {
            const targetPlan = lastPolicy.insTypeList.find((plan: any) => plan.policyItemId === 2);
            const insPlanList: any[] = this.props.insPlanList.map((list: any) => {
                return {...list, ...{
                    name: list.insItemName,
                    value: list.insItemId
                }};
            });

            this.lastPolicyInfo = {...lastPolicy, ...{
                insDiscountCost: formatPrice(lastPolicy.insDiscountCost),
                noCarTaxCost: targetPlan && !targetPlan.insItemCost ? true : false,
                vciEndTime: lastPolicy['vciEndTime'] ? `${moment(new Date(lastPolicy['vciEndTime'])).format('YYYY-MM-DD HH:mm:ss')}` : '',
                tciEndTime: lastPolicy['tciEndTime'] ? `${moment(new Date(lastPolicy['tciEndTime'])).format('YYYY-MM-DD HH:mm:ss')}` : '',
                planList: lastPolicy.insTypeList.map((list: any, index: number) => {
                    return {...list, ...{
                        name: mappingValue(insPlanList, list.policyItemId),
                        value: this.formatPolicyItemValue(list),
                        key: list.policyItemId
                    }};
                })
            }};
        }
    }

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

    public calculate = () => {
        this.props.calculate(true);
    }

    public render() {
        const lastPolicy = this.lastPolicyInfo;

        return (
            <div className='calaulate-previous-box'>
                <p className='calaulate-history-title'>上期保单</p>
                {
                    this.props.lastPolicy ?
                    <React.Fragment>
                        <div className='calaulate-history-content'>
                            <div className='company-info'>
                                <div className='company-logo'>
                                    <img src={lastPolicy.insCompanyLogoUrl} />
                                </div>
                                <div className='company-simple-detail'>
                                    <div className='company-name'>{lastPolicy.insCompanyName}</div>
                                    <div className='company-cost'>
                                        去年保费：<span className='mount'>{lastPolicy.insDiscountCost}元</span>
                                        {
                                            lastPolicy.noCarTaxCost ? 
                                            <span className='no-tax'>(不含税)</span> : null
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='company-time-detail'>
                                <div className='company-time-detail-item'>
                                    <label className="title">交强险到期时间：</label>
                                    <span>{lastPolicy.vciEndTime}</span>
                                </div>
                                <div className='company-time-detail-item'>
                                    <label className="title">商业险到期时间：</label>
                                    <span>{lastPolicy.tciEndTime}</span>
                                </div>
                            </div>
                            <div className='plan-table'>
                                <Table 
                                    columns={this.config.tableColumns} 
                                    dataSource={lastPolicy.planList}
                                    pagination={false}/>
                            </div>
                        </div>
                        <div className="calaulate-history-footer">
                            <a onClick={this.calculate}>修改险种重新计算</a>
                        </div>
                    </React.Fragment> :
                    <div className='nodata'>
                        <Icon type="frown" />
                        <span className="text">未查询到上期保单</span>
                    </div>
                }
            </div>
        )
    }
}
