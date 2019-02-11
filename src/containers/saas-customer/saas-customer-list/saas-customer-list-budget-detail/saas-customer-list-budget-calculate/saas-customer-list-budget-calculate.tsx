import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Spin, Form, Alert, Icon, Row, Col, Input, Select, DatePicker, InputNumber, Radio, Button, message } from 'antd'; 
import * as _ from 'lodash';
import { ItemInfo,
        insInfo,
        carDetailInfo,
        carOwnerDetailInfo } from './saas-customer-list-budget-calculate-config';
import * as moment from 'moment';
import { mappingValue } from 'src/service/common.fun';
import KISUREPrevious from './saas-customer-list-budget-calculate-previous/saas-customer-list-budget-calculate-previous';
import KISUREHistory from './saas-customer-list-budget-calculate-history/saas-customer-list-budget-calculate-history';
import { api } from 'src/_mock/api';
import './saas-customer-list-budget-calculate.scss';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class SaaSCustomerListBudgetCalculate extends React.PureComponent<any, any> {
    static propTypes = {
        insPlanList: PropTypes.array.isRequired,
        customerInfo: PropTypes.object.isRequired,
        dictionary: PropTypes.object.isRequired,
        companyList: PropTypes.array.isRequired,
        reloadCustomerInfo: PropTypes.func.isRequired,
        taskID: PropTypes.any.isRequired,
        calculateRecordList: PropTypes.array.isRequired,
        history: PropTypes.object.isRequired,
        MktPlanList: PropTypes.array.isRequired
    }

    public config: any = {};

    constructor(public props: any) {
        super(props);

        this.state = {
            isLoading: false,
            completeFormatCustomerInfo: false,
            insFormItemVisible: false,
            carDetailFormItemVisible: false,
            carOwnerDetailFormItemVisible: false,
            calculateDrawerVisible: false
        };

        this.config = {
            alert: {},
            insInfo: _.cloneDeep(insInfo),
            carDetailInfo: _.cloneDeep(carDetailInfo),
            carOwnerDetailInfo: _.cloneDeep(carOwnerDetailInfo),
            form: []
        };
    }

    public componentDidMount() {
        this.formatCustomerInfoProps();
    }

    public formatCustomerInfoProps = () => {
        const res = this.props.customerInfo;

        if ('renewalTaskCar' in res) {
            this.formatSectionInfo(res);
            this.calclateOverdueDays(res);

            const { form } = this.props;
            this.config.form = [
                { 
                    title: '在保信息：', 
                    form: this.config.insInfo, 
                    expand: () => this.editInsInfo(true), 
                    cancel: () => this.editInsInfo(false),
                    save: () => this.saveInsInfo(form),
                    tag: 'insInfo',
                    visible: 'insFormItemVisible'
                },
                { 
                    title: '车辆信息：', 
                    form: this.config.carDetailInfo, 
                    expand: () => this.editCarDetailInfo(true), 
                    cancel: () => this.editCarDetailInfo(false), 
                    save: () => this.saveCarDetailInfo(form),
                    tag: 'carDetailInfo',
                    visible: 'carDetailFormItemVisible'
                },
                { 
                    title: '关系人信息：', 
                    form: this.config.carOwnerDetailInfo, 
                    expand: () => this.editCarOwnerDetailInfo(true), 
                    cancel: () => this.editCarOwnerDetailInfo(false),
                    save: () => this.saveCarOwnerDetailInfo(form),
                    tag: 'carOwnerDetailInfo',
                    visible: 'carOwnerDetailFormItemVisible'
                }
            ];
    
            this.setState({
                completeFormatCustomerInfo: true
            });
        }
    }

    /** 
     * 整理：在保信息  车辆信息  关系人信息
     */
    public formatSectionInfo = (res: any) => {
        const { ownerProp, certType, relationship, usage, plateType, energyType, 
            loansStatus, plateColor, insType } = this.props.dictionary;

        this.config.insInfo.forEach((item: ItemInfo) => {
            switch(item.key) {
                case 'previousInsCompany': 
                    item['value'] = res['taskDetail']['previousInsCompanyName'];
                    item['actualValue'] = res['taskDetail']['previousInsCompanyId'];
                    item['config']['options'] = [...this.props.companyList];
                    break;
                case 'vciExpiredTime': 
                    item['value'] = res['vciExpiredTime'] ? `${moment(new Date(res['vciExpiredTime'])).format('YYYY-MM-DD HH:mm:ss')}` : '';
                    item['vciEndDays'] = res['vciExpiredTime'] ? Math.floor((res['vciExpiredTime'] - new Date().getTime()) / 1000 / 3600 / 24) : '';
                    item['actualValue'] = res['vciExpiredTime'];
                    break;
                case 'tciExpiredTime': 
                    item['value'] = res['tciExpiredTime'] ? `${moment(new Date(res['tciExpiredTime'])).format('YYYY-MM-DD HH:mm:ss')}` : ''; ;
                    item['tciEndDays'] = res['tciExpiredTime'] ? Math.floor((res['tciExpiredTime'] - new Date().getTime()) / 1000 / 3600 / 24) : '';
                    item['actualValue'] = res['tciExpiredTime'];
                    break;
            }
        });

        const carDetail: any = {
            ...res.renewalTaskCar,
            ...res.renewalTaskCarDetail,
            insType: res.insType
        };

        this.config.carDetailInfo.forEach((item: ItemInfo) => {
            switch(item.key) {
                case 'carNumber': 
                    item['value'] = carDetail['carNumber'];
                    item['actualValue'] = carDetail['carNumber']; 
                    break;
                case 'carVinNumber': 
                    item['value'] = carDetail['carVinNumber']; 
                    item['actualValue'] = carDetail['carVinNumber']; 
                    break;
                case 'carEngineNumber': 
                    item['value'] = carDetail['carEngineNumber']; 
                    item['actualValue'] = carDetail['carEngineNumber']; 
                    break;
                case 'usage': 
                    item['value'] = mappingValue([...usage], carDetail['usage']); 
                    item['actualValue'] = carDetail['usage'];
                    item['config']['options'] = [...usage];
                    break;
                case 'carPlateType': 
                    item['value'] = mappingValue([...plateType], carDetail['carPlateType']); 
                    item['actualValue'] = carDetail['carPlateType'];
                    item['config']['options'] = [...plateType];
                    break;
                case 'energyType': 
                    item['value'] = mappingValue([...energyType], carDetail['energyType']); 
                    item['actualValue'] = carDetail['energyType'];
                    item['config']['options'] = [...energyType];
                    break;
                case 'startRegisterDate': 
                    item['value'] = carDetail['startRegisterDate'] ? `${moment(new Date(carDetail['startRegisterDate'])).format('YYYY-MM-DD HH:mm:ss')} 初登` : ''; 
                    item['actualValue'] = carDetail['startRegisterDate'] || undefined;
                    break;
                case 'carModelNum': 
                    item['value'] = carDetail['carModelNum']; 
                    item['actualValue'] = carDetail['carModelNum'];
                    break;
                case 'seatCount': 
                    item['value'] = carDetail['seatCount'] ? `${carDetail['seatCount']}座` : ''; 
                    item['actualValue'] = carDetail['seatCount'];
                    break;
                case 'loanTransferFlag': 
                    item['value'] = carDetail['loanTransferFlag'] === '1' ? '过户车' : '非过户车'; 
                    item['actualValue'] = carDetail['loanTransferFlag'];
                    break;
                case 'transferTime': 
                    item['value'] = carDetail['transferTime'] ? `${moment(new Date(carDetail['transferTime'])).format('YYYY-MM-DD HH:mm:ss')}` : ''; 
                    item['actualValue'] = carDetail['transferTime'] || null;
                    break;
                case 'loanStatus': 
                    item['value'] = mappingValue([...loansStatus], carDetail['loanStatus']); 
                    item['actualValue'] = carDetail['loanStatus'];
                    item['config']['options'] = [...loansStatus];
                    break;
                case 'carPlateColor': 
                    item['value'] = `${mappingValue([...plateColor], carDetail['carPlateColor'])}色号牌`;
                    item['actualValue'] = carDetail['carPlateColor'];
                    item['config']['options'] = [...plateColor];
                    break;
                case 'insType': 
                    item['value'] = mappingValue([...insType], carDetail['insType']);
                    item['actualValue'] = carDetail['insType'];
                    item['config']['options'] = [...insType];
                    break;
            }
        });

        const carOwnerDetail: any = {
            ...res.renewalTaskCarOwner,
            backupManName: res.taskDetail.backupManName,
            backupManPhoneNumber: res.taskDetail.backupManPhoneNumber
        };

        this.config.carOwnerDetailInfo.forEach((item: ItemInfo) => {
            switch(item.key) {
                case 'carOwnerName': 
                    item['value'] = carOwnerDetail['carOwnerName'];
                    item['actualValue'] = carOwnerDetail['carOwnerName'];
                    break;
                case 'carOwnerMobilePhoneNumber': 
                    item['value'] = carOwnerDetail['carOwnerMobilePhoneNumber']; 
                    item['actualValue'] = carOwnerDetail['carOwnerMobilePhoneNumber'];
                    break;
                case 'carOwnerProp': 
                    item['value'] = mappingValue([...ownerProp], carOwnerDetail['carOwnerProp']);
                    item['actualValue'] = carOwnerDetail['carOwnerProp'];
                    item['config']['options'] = [...ownerProp];
                    break;
                case 'carOwnerCertType': 
                    item['value'] = mappingValue([...certType], carOwnerDetail['carOwnerCertType']);
                    item['actualValue'] = carOwnerDetail['carOwnerCertType'];
                    item['config']['options'] = [...certType];
                    break;
                case 'carOwnerCertNum': 
                    item['value'] = carOwnerDetail['carOwnerCertNum'];
                    item['actualValue'] = carOwnerDetail['carOwnerCertNum'];
                    break;
                case 'beinsuredmanCarRelation': 
                    item['value'] = mappingValue([...relationship], carOwnerDetail['beinsuredmanCarRelation']);
                    item['actualValue'] = carOwnerDetail['beinsuredmanCarRelation'];
                    item['config']['options'] = [...relationship];
                    break;
                case 'beinsuredOwnerName': 
                    item['value'] = carOwnerDetail['beinsuredOwnerName'];
                    item['actualValue'] = carOwnerDetail['beinsuredOwnerName'];
                    break;
                case 'beinsuredManProp': 
                    item['value'] = mappingValue([...ownerProp], carOwnerDetail['beinsuredManProp']);
                    item['actualValue'] = carOwnerDetail['beinsuredManProp']; 
                    item['config']['options'] = [...ownerProp];
                    break;
                case 'beinsuredOwnerCertType': 
                    item['value'] = mappingValue([...certType], carOwnerDetail['beinsuredOwnerCertType']);
                    item['actualValue'] = carOwnerDetail['beinsuredOwnerCertType']; 
                    item['config']['options'] = [...certType];
                    break;
                case 'beinsuredOwnerCertNum': 
                    item['value'] = carOwnerDetail['beinsuredOwnerCertNum'];
                    item['actualValue'] = carOwnerDetail['beinsuredOwnerCertNum']; 
                    break;
                case 'backupManName': 
                    item['value'] = carOwnerDetail['backupManName'];
                    item['actualValue'] = carOwnerDetail['backupManName']; 
                    break;
                case 'backupManPhoneNumber': 
                    item['value'] = carOwnerDetail['backupManPhoneNumber'];
                    item['actualValue'] = carOwnerDetail['backupManPhoneNumber'];
                    break;
            }
        });
    }

    /**
     * 车型是否到期
     */
    public calclateOverdueDays = (res: any) => {
        const insExpiration: any = res.insExpiredTime ? Math.floor(
            (res.insExpiredTime - new Date().valueOf()) / 1000 / 60 / 60 / 24
        ) : 0;

        if (insExpiration && insExpiration > 0)
            this.config.alert = {
                message: <p className='p-warn'><span>{insExpiration}天</span>后车险到期</p>,
                type: 'warning',
                icon: <Icon type="clock-circle" />
            };
        else
            this.config.alert = {
                message: <p className='p-error'>已脱保<span>{Math.abs(insExpiration)}天</span></p>,
                type: 'error',
                icon: <Icon type="clock-circle" />
            };
    }

    /** 
     * 直观的显示数据
     */
    public createInfoItem = (info: ItemInfo, index: number, tag: string): any => {
        let Item: any = '';

        const result = info.value !== '' && info.value !== undefined && info.value !==  null ? true : false;

        switch(info.key) {
            case 'vciExpiredTime':
                {
                    const VciEndDays = <span className={info.vciEndDays > 0 ? 'blue': 'red'}>
                                            { info.vciEndDays ? `剩余${info.vciEndDays}天`: `已脱保${Math.abs(info.vciEndDays)}天` }
                                        </span>;
                    Item = result ? <span key={`${tag}-span-`+ index} className='item-info'>{info.value}({VciEndDays})</span> : null;
                }
                break;
            case 'tciExpiredTime': 
                {
                    const TciEndDays = <span className={info.tciEndDays > 0 ? 'blue': 'red'}>
                                            { info.tciEndDays ? `剩余${info.tciEndDays}天`: `已脱保${Math.abs(info.tciEndDays)}天` }
                                        </span>;
                    Item = result ? <span key={`${tag}-span-`+ index} className='item-info'>{info.value}({TciEndDays})</span> : null;
                }
                break;
            default: 
                Item = result ? <span key={`${tag}-span-`+ index} className='item-info'>{info.value}</span> : null;
                break;
        }

        return Item;
    }

    /** 
     * 编辑在保信息
     */
    public editInsInfo = (bool: boolean) => {
        this.setState({
            insFormItemVisible: bool,
        });
    }

    public saveInsInfo = (form: any) => {
        const { getFieldsValue } = form;
        const params = getFieldsValue();

        this.setState({
            isLoading: true
        });

        api.saveCustomerListDetail(params).then((res: any) => {
            this.setState({
                isLoading: false
            });

            if (res && res.status === 200) {
                message.success('在保信息编辑成功');
                this.props.reloadCustomerInfo();
            } else
                message.error('在保信息编辑失败');
        });
    }

    /** 
     * 编辑车辆信息
     */
    public editCarDetailInfo = (bool: boolean) => {
        this.setState({
            carDetailFormItemVisible: bool,
        });
    }

    public saveCarDetailInfo = (form: any) => {
        const { getFieldsValue } = form;
        const params = getFieldsValue();

        this.setState({
            isLoading: true
        });

        api.saveCustomerListDetail(params).then((res: any) => {
            this.setState({
                isLoading: false
            });

            if (res && res.status === 200) {
                message.success('车辆信息编辑成功');
                this.props.reloadCustomerInfo();
            } else
                message.error('车辆信息编辑失败');
        });
    }

    /** 
     * 编辑关系人信息
     */
    public editCarOwnerDetailInfo = (bool: boolean) => {
        this.setState({
            carOwnerDetailFormItemVisible: bool,
        });
    }

    public saveCarOwnerDetailInfo = (form: any) => {
        const { getFieldsValue } = form;
        const params = getFieldsValue();

        this.setState({
            isLoading: true
        });

        api.saveCustomerListDetail(params).then((res: any) => {
            this.setState({
                isLoading: false
            });

            if (res && res.status === 200) {
                message.success('关系人信息编辑成功');
                this.props.reloadCustomerInfo();
            } else
                message.error('关系人信息编辑失败');
        });
    }

    /** 
     * 创建表单
     */
    public createForm = (form: ItemInfo, getFieldDecorator:any): any => {
        let formItem: any;

        switch(form.type) {
            case 'select':
                formItem = getFieldDecorator(form.key, {
                    initialValue: form.actualValue,
                    rules: form.config.rule || []
                })(
                    <Select key={`select-` + form.key} style={{ width: '100%' }}>
                    {
                        form.config.options.map((option: any, index: number) => {
                            return <Option key={`option-${form.key}-` + index} value={option.value}>{option.name}</Option>
                        })
                    }
                    </Select>
                );
                break;
            case 'datePicker':
                formItem = getFieldDecorator(form.key, {
                    initialValue: moment(new Date(form.actualValue)),
                    rules: form.config.rule || []
                })( <DatePicker key={`datePicker-` + form.key} format={form.config.format || 'YYYY-MM-DD HH:mm:ss'} style={{'minWidth': '60%', 'marginRight':'10%'}}/>);
                break;
            case 'input':
                formItem = getFieldDecorator(form.key, {
                    initialValue: form.actualValue,
                    rules: form.config.rule || []
                })( <Input key={`input-` + form.key} placeholder={form.placeholder || ''}/> );
                break;
            case 'radio':
                formItem = getFieldDecorator(form.key, {
                    initialValue: form.actualValue,
                    rules: form.config.rule || []
                })( <RadioGroup key={`radioGroup-` + form.id}>
                        {
                            form.config.options.map((option: any, index: number) => {
                                return (
                                    <Radio key={`radio-` + index} style={{
                                        height: '30px',
                                        lineHeight: '30px',
                                    }} value={option.value}>{option.name}</Radio>
                                );
                            })
                        }
                    </RadioGroup> )
                break;
            case 'inputNumber':
                formItem = getFieldDecorator(form.key, {
                    initialValue: form.actualValue,
                    rules: form.config.rule || []
                })( <InputNumber key={`inputNumber-` + form.key} placeholder={form.placeholder || ''} style={{width: '100%'}}/> );
                break;
            default:
                formItem = null;
                break;
        }

        return formItem;
    }

    public quickCalculate = (bool: boolean) => {
        this.setState({
            calculateDrawerVisible: bool
        });
    }

    public render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout: any = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 15 }
            }
        };

        const customerInfo = this.props.customerInfo;
        const previousProps: any = {
            insPlanList: this.props.insPlanList,
            calculate: this.quickCalculate,
            lastPolicy: customerInfo.hasPreviousCalPriceInfo ? 
            {...customerInfo.previousCalculatePriceInfo, ...{insTypeList: customerInfo.policyPlanDetailList}} : null
        };

        const historyProps: any = {
            insPlanList: this.props.insPlanList,
            calculate: this.quickCalculate,
            taskID: this.props.taskID,
            logList: this.props.calculateRecordList,
            customerInfo,
            dictionary: this.props.dictionary,
            history: this.props.history,
            MktPlanList: this.props.MktPlanList
        };

        return (
            <div className='kisure-customer-list-budget-calculate'>
                <Spin tip='Loading...' spinning={this.state.isLoading}>
                    <div className='kisure-customer-list-budget-calculate-title'>
                        <p>跟进记录</p>
                    </div>
                    <div className='kisure-customer-list-budget-calculate-content'>
                        <div className='kisure-customer-list-budget-calculate-alert'>
                            <Alert message={this.config.alert.message} type={this.config.alert.type} showIcon={true} icon={this.config.alert.icon}/>
                        </div>
                        {
                            this.config.form.map((item: any, index: number) => {
                                return (
                                    <div key={`div-${item.tag}-`+ index} className='kisure-customer-list-budget-calculate-sectionInfo'>
                                        <p key={`p-${item.tag}-`+ index} className='section-title'>{item.title}</p>
                                        <div className='section-show-box'>
                                            <Row>
                                                <Col>
                                                    <div className='section-item-box'>
                                                        {
                                                            item['form'].map((form: ItemInfo, i: number)=> {
                                                                return this.createInfoItem(form, i, item['tag']);
                                                            })
                                                        }
                                                    </div>
                                                    {
                                                        !this.state[item.visible] ?
                                                        <div className='section-operation-expand'><a onClick={item['expand']}>展开/编辑&nbsp;<Icon type="down" /></a></div> : null
                                                    }
                                                </Col>
                                                {
                                                    this.state[item.visible] ?
                                                    <Row gutter={48}>
                                                        {
                                                            item['form'].filter((form: ItemInfo) => !form.notEdit).map((form: ItemInfo, i: number) => {
                                                                return <Col key={`${item.tag}-form-col-` + i} xs={24} sm={12} lg={8}>
                                                                            <FormItem
                                                                                key={form.key + '' + form.id}
                                                                                {...formItemLayout}
                                                                                label={form.label}>
                                                                                { this.createForm(form, getFieldDecorator) }
                                                                            </FormItem>
                                                                        </Col>
                                                            })
                                                        }
                                                    </Row> : null
                                                }
                                                {
                                                    this.state[item.visible] ? 
                                                    <div className='section-operation-saveorcancel'>
                                                        <Button size='small' onClick={item['cancel']}>取消</Button>
                                                        <Button type='primary' size='small' onClick={item['save']}>保存</Button>
                                                    </div> : null
                                                }
                                            </Row>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <Row>
                            <div className='kisure-customer-list-budget-calculate-sectionInfo history'>
                                <Col>
                                    <div className='calaulate-history-container'>
                                        <KISUREHistory {...historyProps}/>
                                    </div>
                                </Col>
                                <Col>
                                    <div className='calculate-previous-container'>
                                        <KISUREPrevious {...previousProps}/>
                                    </div>
                                </Col>
                            </div>
                        </Row>
                    </div>
                </Spin>
            </div>
        );
    }
}

export default Form.create()(SaaSCustomerListBudgetCalculate);
