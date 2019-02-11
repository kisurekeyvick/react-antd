import * as React from 'react';
import { connect } from 'react-redux';
import { Tabs, Spin, Row, Col, Skeleton, Form, Icon, Button, Tag, Tooltip, message } from 'antd';
import { 
        ICustomerFormItems, 
        customerBaseForm,
        otherForm } from './saas-customer-list-budget-detail-config';
import * as _ from 'lodash';
import * as moment from 'moment';
import { api } from 'src/_mock/api';
import { mappingValue } from 'src/service/common.fun';
import KISURESuccessOrder from 'src/containers/saas-customer/saas-customer-modal/saas-customer-modal-success-order/saas-customer-modal-success-order';
import KISUREDefeat from 'src/containers/saas-customer/saas-customer-modal/saas-customer-modal-defeat/saas-customer-modal-defeat';
import KISUREReassignment from 'src/containers/saas-customer/saas-customer-modal/saas-customer-modal-reassignment/saas-customer-modal-reassignment';
import KISUREPhone from 'src/components/phone/phone-component';
import KISUREFollow from 'src/containers/saas-customer/saas-customer-modal/saas-customer-modal-follow/saas-customer-modal-follow';
import KISURERecord from 'src/containers/saas-customer/saas-customer-list/saas-customer-list-budget-detail/saas-customer-list-budget-record/saas-customer-list-budget-record';
import KISUREBudget from 'src/containers/saas-customer/saas-customer-list/saas-customer-list-budget-detail/saas-customer-list-budget-calculate/saas-customer-list-budget-calculate';
import './saas-customer-list-budget-detail.scss';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

class SaaSCustomerListBudgetDetail extends React.PureComponent<any, any> {
    public config: any ={};
    public params: any= {};
    public customerInfo: any = {};
    public renewalMan: any[] = [];
    public companyList: any[] = [];
    public insPlanList: any[] = [];
    public calculateRecordList: any[] = [];
    public MktPlanList: any[] = [];

    /**
     * ref
     */
    public KISUREPhoneRef: any;

    constructor(public props: any) {
        super(props);

        this.state = {
            isLoading: false,
            budgetLoading: false,
            recordLoading: false,
            defeatVisible: false,
            successOrderVisible: false,
            reassignmentVisible: false,
            phoneVisible: false,
            followVisible: false,
            recordVisible: false,
            budgetVisible: true
        };

        this.config = {
            customerBaseForm: _.cloneDeep(customerBaseForm),
            otherForm: _.cloneDeep(otherForm)
        };

        this.KISUREPhoneRef = React.createRef();

        const { match } = this.props;
        this.params = 'params' in match && match['params'];
    }

    public componentDidMount() {
        this.loadBudgetBaseInfo();
    }

    public loadBudgetBaseInfo = () => {
        const params = {
            id: this.params
        };

        this.setState({
            isLoading: true
        });

        this.setState({
            isLoading: true
        });

        Promise.all([
            api.getCustomerBaseInfo(params),
            api.getSubordinateRenewalMan(),
            api.getInsCompanyList(),
            api.getInsPlanList(),
            api.getCustomerCalculateRecord(params),
            api.getMktPlanList()
        ]).then((res: any) => {
            if (res && res.some((i: any) => i.status === 200)) {
                this.customerInfo = res[0]['data']['result'];
                this.renewalMan = res[1]['data']['result'].map((person: any) => {
                    return {...person, ...{
                        value: person.userId,
                        name: person.userName
                    }};
                });
                this.companyList = res[2]['data']['result'].map((company: any) => {
                    return {...company, ...{
                        name: company.shortName,
                        value: company.id
                    }};
                });
                this.insPlanList = res[3]['data']['result'];
                this.calculateRecordList = res[4]['data']['result'];
                this.MktPlanList = res[5]['data']['result']['list'];
                this.formatCustomerBaseInfo(this.customerInfo);
            } else
                this.setState({
                    isLoading: false
                });
        });
    }

    /** 
     * 整理客户详情信息
     */
    public formatCustomerBaseInfo = (res: any) => {
        const { insType, followWay, solicitStatus, customerIntentionFullName } = this.props.dictionary;

        for(const key in this.config.otherForm) {
            const formKey: any = this.config.otherForm[key]

            switch(key) { 
                case 'carNumber': formKey['value'] = res.renewalTaskCar['carNumber']; break;
                case 'carBrandType': formKey['value'] = res.renewalTaskCarDetail['carBrandType']; break;
                case 'processStatus': 
                    {
                        formKey['value'] = mappingValue([...solicitStatus], res.processStatus); 
                        const colorKey: any = this.config.otherForm[key];
                        switch(res.processStatus) {
                            case 1: colorKey['tagColor'] = 'gray'; break; 
                            case 2: colorKey['tagColor'] = 'blue'; break;
                            case 3: colorKey['tagColor'] = 'green'; break;
                            case 4:
                            case 7: colorKey['tagColor'] = 'red'; break;
                            case 5:
                            case 6: colorKey['tagColor'] = 'orange'; break;
                        }
                    }
                    break;
                case 'insIntention': 
                    {
                        formKey['value'] = mappingValue([...customerIntentionFullName], res.insIntention); 
                        const colorKey: string = this.config.otherForm[key];
                        switch(res.insIntention) {
                            case 'F': colorKey['tagColor']  = 'blue'; break;
                            case 'L': colorKey['tagColor']  = 'green'; break;
                            case 'M': colorKey['tagColor']  = 'orange'; break;
                            case 'H': colorKey['tagColor']  = 'red'; break;
                        }
                    }
                    break;
            }
        }

        this.config.customerBaseForm.forEach((form: ICustomerFormItems) => {
            switch(form.key) {
                case 'carOwnerName': 
                    form['value'] = res.renewalTaskCarOwner['carOwnerName']; 
                    form['config']['phone'] = res.renewalTaskCarOwner && res.renewalTaskCarOwner['carOwnerMobilePhoneNumber']
                    break;
                case 'backupManName': form['value'] = res.taskDetail['backupManName']; break;
                case 'insType': form['value'] = mappingValue([...insType], res.insType); break;
                case 'salesmanName': form['value'] = res.salesmanName; break;
                case 'nextFollowWayName': form['value'] = mappingValue([...followWay], (res.nextFollowRecord['nextFollowWay'] || '')); break;
                case 'nextFollowTime': 
                    form['value'] = res.nextFollowRecord['nextFollowTime'] ? `${moment(new Date(res.nextFollowRecord['nextFollowTime'])).format('YYYY-MM-DD HH:mm:ss')}` : ''; 
                    break;
                case 'lastFollowTime': 
                    form['value'] = res.lastFollowTime ? `${moment(new Date(res.lastFollowTime)).format('YYYY-MM-DD HH:mm:ss')}` : ''; 
                    break;
            }
        });

        this.setState({
            isLoading: false
        });
    }

    public tabChange = (key: any) => {
        if (key === '1')
            this.setState({
                recordVisible: false,
                budgetVisible: true
            });
        else if (key === '2')
            this.setState({
                recordVisible: true,
                budgetVisible: false 
            });
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
            case 'content-phone':
                {
                    formItem = <span className='customer-phone'>
                                {form.value}
                                {
                                    form['config']['phone'] ? 
                                    <span className='phone-action'>({form['config']['phone']})
                                        <Tooltip title="电话呼出">
                                            <Icon type="phone" onClick={() => this.phoneCustomer(true)}/>
                                        </Tooltip>
                                    </span> : null
                                }
                            </span>
                }
                break;
            default:
                formItem = null;
                break;
        }

        return formItem;
    }

    /**
     * 成单
     */
    public successOrder = () => {
        this.successOrderToggle('open', true);
    }

    public successOrderToggle = (e: any, bool: boolean = true): any => {
        this.setState({
            successOrderVisible: bool
        });

        if(typeof(e) === 'string' && e === 'success') {
            message.success('成单成功');
            this.loadBudgetBaseInfo();
        }
    }

    /**
     * 战败
     */
    public defeat = () => {
        this.defeatToggle('open', true);
    }

    public defeatToggle = (e: any, bool: boolean = true): any => {
        this.setState({
            defeatVisible: bool
        });

        if (typeof(e) === 'string' && e === 'success') {
            message.success('完成战败');
            this.loadBudgetBaseInfo();
        }
    }

    /**
     * 重新分配
     */
    public reassign = () => {
        this.reassignToggle('open', true);
    }

    public reassignToggle = (e: any, bool: boolean = true): any => {
        this.setState({
            reassignmentVisible: bool
        });

        if (typeof(e) === 'string' && e === 'success') {
            message.success('重新分配完成');
            this.loadBudgetBaseInfo();
        }
    }

    /** 
     * 新建跟进
     */
    public follow = () => {
        this.followToggle('open', true);
    }

    public followToggle = (e: any, bool: boolean = true): any => {
        this.setState({
            followVisible: bool
        });

        if (typeof(e) === 'string' && e === 'success') {
            message.success('新建跟进完成');
            this.loadBudgetBaseInfo();
        }
    }

    /**
     * 打电话
     */
    public phoneCustomer = (bool: boolean = true, record?: any, status?: string ) => {
        if (status && status === 'success')
            message.success('电话完成挂断');

        this.setState({
            phoneVisible: bool
        });
    }

    public render() {
        const otherForms = this.config.otherForm;
        const { followResult, customerIntentionFullName } = this.props.dictionary;

        const taskSuccessOrderProps = {
            visible: this.state.successOrderVisible,
            title: '成单',
            handleOk: this.successOrderToggle,
            handleCancel: this.successOrderToggle,
            task: this.customerInfo,
            company: this.props.company
        };

        const taskDefeatProps = {
            visible: this.state.defeatVisible,
            title: '战败',
            handleOk: this.defeatToggle,
            handleCancel: this.defeatToggle,
            task: this.customerInfo
        };

        const reassignmentProps = {
            visible: this.state.reassignmentVisible,
            title: '重新分配',
            handleOk: this.reassignToggle,
            handleCancel: this.reassignToggle,
            task: this.customerInfo,
            renewalMan: this.renewalMan
        };

        const phoneProps = {
            task: this.customerInfo,
            title: `车主：${'renewalTaskCarOwner' in this.customerInfo ? this.customerInfo.renewalTaskCarOwner['carOwnerName'] : ''}`,
            close: this.phoneCustomer,
        };

        const followProps = {
            visible: this.state.followVisible,
            title: '新建跟进',
            handleOk: this.followToggle,
            handleCancel: this.followToggle,
            task: this.customerInfo,
            customerIntention: customerIntentionFullName,
            followResult
        };

        const recordProps = {
            history: this.props.history,
            taskID: this.params
        };

        const budgetProps = {
            insPlanList: this.insPlanList,
            customerInfo: this.customerInfo,
            dictionary: this.props.dictionary,
            companyList: this.companyList,
            reloadCustomerInfo: this.loadBudgetBaseInfo,
            taskID: this.params,
            calculateRecordList: this.calculateRecordList || [],
            history: this.props.history,
            MktPlanList: this.MktPlanList || []
        };

        return (
            <div className='kisure-customer-list-budget-detail'>
                <Spin tip='Loading...' spinning={this.state.isLoading}>
                    <div className='kisure-customer-list-budget-detail-baseInfo'>
                        {
                            this.state.isLoading ?
                            <Skeleton active={true} paragraph={{ rows: 4 }}/> :
                            <React.Fragment>
                                <div className='baseInfo-box'>
                                    <Row gutter={16}>
                                        <Row>
                                            <Col sm={24} lg={12}>
                                                <div className='baseInfo-carInfo'>
                                                    <div>
                                                        <label className='Plabel highlighted'>车辆</label>
                                                        <span className='highlighted'>{this.config.otherForm['carNumber']['value']}</span>
                                                        {
                                                            this.config.otherForm['carBrandType']['value'] ?
                                                            <span className='carBrandType'>{this.config.otherForm['carBrandType']['value']}</span> : null
                                                        }
                                                        {
                                                            otherForms['processStatus']['value'] ? 
                                                            <Tag color={otherForms['processStatus']['tagColor']}>{otherForms['processStatus']['value']}</Tag> : null
                                                        }
                                                        {
                                                            otherForms['insIntention']['value'] ? 
                                                            <Tag color={otherForms['insIntention']['tagColor']}>{otherForms['insIntention']['value']}</Tag> : null
                                                        }
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col sm={24} lg={12}>
                                                <div className='baseInfo-button-group'>
                                                    <Button type='primary' onClick={this.follow}>新建跟进</Button>
                                                    <Button type='primary'>保费试算</Button>
                                                    <Button type='primary' className='defeat' onClick={this.defeat}>战败</Button>
                                                    <Button type='default' onClick={this.successOrder}>成单</Button>
                                                    <Button type='default' onClick={this.reassign}>重新分配</Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Row>
                                </div>
                                <div>
                                    <Row>
                                        {
                                            this.config.customerBaseForm.map((form: ICustomerFormItems, index: number) => {
                                                return <Col key={`customerBaseForm-` + index} {...form.config.formItemLayout}>
                                                            <div className={form.config.className || ''}>
                                                                { 
                                                                    <FormItem
                                                                        key={`customerBaseForm-formItem-` + index}
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
                            </React.Fragment>
                        }
                    </div>
                    <div className='kisure-customer-list-budget-detail-tabs'>
                        <Tabs defaultActiveKey="1" onChange={this.tabChange}>
                            <TabPane tab="保费试算" key="1">
                                <Spin tip='Loading...' spinning={this.state.budgetLoading}>
                                    { 
                                        this.state.budgetVisible && !this.state.isLoading ? 
                                        <KISUREBudget {...budgetProps}/> :
                                        <Skeleton active={true} paragraph={{ rows: 12 }}/>
                                    }
                                </Spin>
                            </TabPane>
                            <TabPane tab="跟进记录" key="2">
                                <Spin tip='Loading...' spinning={this.state.recordLoading}>
                                    { this.state.recordVisible && <KISURERecord {...recordProps}/> }
                                </Spin>
                            </TabPane>
                        </Tabs>
                    </div>
                    <div className='kisure-customer-list-budget-detail-modal'>
                        { this.state.defeatVisible && <KISUREDefeat {...taskDefeatProps}/> }
                        { this.state.successOrderVisible && <KISURESuccessOrder {...taskSuccessOrderProps}/> }
                        { this.state.reassignmentVisible && <KISUREReassignment {...reassignmentProps}/> }
                        { this.state.phoneVisible && <KISUREPhone {...phoneProps} ref={this.KISUREPhoneRef}/> }
                        { this.state.followVisible && <KISUREFollow {...followProps}/> }
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

function mapDispatchToProps() {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps()
)(SaaSCustomerListBudgetDetail)