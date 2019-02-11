import * as React from 'react';
import { Modal, Button, Tabs, Form, Row, Col, Select, Input } from 'antd';
import { validateCarNumber, validateVinNumber, validatRestCertNum } from 'src/service/validate';
import * as PropTypes from 'prop-types';
import { Iform } from '../interface';
import { api } from 'src/_mock/api';
import './saas-customer-modal-new-customer.scss';

const FormItem = Form.Item;
const Option = Select.Option;

class SaaSCustomerModalNewCustomer extends React.PureComponent<any, any> {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        handleOk: PropTypes.func.isRequired,
        handleCancel: PropTypes.func.isRequired,
        defaultActiveKey: PropTypes.string,
        placeShortName: PropTypes.string,
        carNumber: PropTypes.array
    }

    static defaultProps = {
        defaultActiveKey: '1',
        placeShortName: '豫'
    }

    public config: any;
    public getFieldDecorator: any;
    public currentTabIndex: string;

    constructor(public props: any) {
        super(props);

        this.state = {
            loading: false,
        };

        this.config = {
            carNumForm: [
                {
                    label: '车牌号',
                    id: 1,
                    key: 'carNumber',
                    type: 'selectInputText',
                    placeholder: '请输入',
                    config: {
                        rule: [
                            { required: true, message: ' ' },
                            { validator: this.validateCarNumber }
                        ],
                        initialValue: undefined
                    }
                },
                {
                    label: '车主证件号',
                    id: 2,
                    key: 'certNum',
                    type: 'inputText',
                    placeholder: '证件号后六位,非必填，仅查询平安需要',
                    config: {
                        rule: [
                            { validator: this.validatCertNum }
                        ],
                        initialValue: undefined
                    }
                }
            ],
            certNumForm: [
                {
                    label: '车架号',
                    id: 3,
                    key: 'vinNumber',
                    type: 'inputText',
                    placeholder: '请输入车架号',
                    config: {
                        rule: [
                            { required: true, message: ' ' },
                            { validator: this.validateVinNumber }
                        ],
                        initialValue: undefined
                    }
                },
                {
                    label: '发动机号',
                    id: 4,
                    key: 'engineNumber',
                    type: 'inputText',
                    placeholder: '请输入(仅人保需要)',
                    config: {
                        initialValue: undefined
                    }
                }
            ],
            formItemLayout: {
                // labelCol: {
                //     xs: { span: 24 },
                //     sm: { span: 8 },
                //   },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 16 },
                }
            }
        };

        this.currentTabIndex = this.props.defaultActiveKey;
    }

    public handleCancel = () => {
        this.props.handleCancel('cancel', false);
    }

    public handleOk = () => {
        this.props.form.validateFields((err: any, fieldsValue: any) => {
            if (this.currentTabIndex === '1' && ('carNumber' in err || 'certNum' in err))
                return;

            if (this.currentTabIndex === '2' && 'vinNumber' in err)
                return;

            this.setState({
                loading: true
            });

            api.newCustomer({}).then((res: any) => {
                this.setState({
                    loading: false
                });

                if (res && res.status === 200)
                    this.props.handleOk('success', false);
            });
        });
    }

    /**
     * 车牌号验证
     */
    public validateCarNumber = (rule: any, value: any, callback: any) => {
        const { getFieldsValue } = this.props.form;

        if (!validateCarNumber(String(getFieldsValue(['prefix'])['prefix'] + value)))
            callback('请输入正确格式的车牌号');

        callback();
    }

    /**
     * 车架号验证
     */
    public validateVinNumber = (rule: any, value: any, callback: any) => {
        if (!validateVinNumber(value))
            callback('请输入正确格式的车架号');

        callback();
    }

    /**
     * 车主证件号后六位验证
     */
    public validatCertNum = (rule: any, value: any, callback: any) => {
        if(!validatRestCertNum(value, 6, 6, false))
            callback('请满足证件号后六位');

        callback();
    }

    /**
     * tab页面切换
     */
    public tabsChange = (e: string) => {
        this.currentTabIndex = e;
    }

    public componentWillUnmount() {
        
    }

    /**
     * 创建formItem
     * @param item 
     */
    public createForm = (form: Iform, getFieldDecorator:any): any => {
        let formItem: any;
        let prefixSelector: any;

        if (form.type === 'selectInputText') {
            prefixSelector = getFieldDecorator('prefix', {
                initialValue: this.props.placeShortName,
              })(
                <Select key={`select-` + form.id}>
                {
                    this.props.carNumber.map((option: any, index: number) => {
                        return <Option key={`option-` + index} value={option.value}>{option.name}</Option>
                    })
                }
                </Select>
            );
        }

        switch(form.type) {
            case 'selectInputText':
                formItem = getFieldDecorator(form.key, {
                    initialValue: form.config.initialValue,
                    rules: form.config.rule || []
                })( <Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder={form.placeholder || ''} />);
                break;
            case 'inputText':
                formItem = getFieldDecorator(form.key, {
                    initialValue: form.config.initialValue,
                    rules: form.config.rule || []
                })(<Input key={`input-` + form.id} placeholder={form.placeholder || ''} />);
                break;
            default:
                formItem = null;
                break;
        }

        return formItem;
    }

    public render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form layout='inline'>
                <Modal 
                    visible={this.props.visible}
                    title={this.props.title}
                    onCancel={this.handleCancel}
                    footer={null}
                    maskClosable={false}>
                    
                        <Tabs defaultActiveKey={this.props.defaultActiveKey} className='kisure-saas-customer-modal-new-customer-tabs' onChange={this.tabsChange}>
                            <Tabs.TabPane tab='车牌号' key='1'>
                                {
                                    this.config.carNumForm.map((item: Iform, index: number) => {
                                        return <FormItem 
                                                    key={item.key + '' + item.id} 
                                                    {...this.config.formItemLayout} 
                                                    label={item.label} 
                                                    hasFeedback={true}>
                                                    { this.createForm(item, getFieldDecorator) }
                                                </FormItem>
                                    })
                                }
                            </Tabs.TabPane>
                            <Tabs.TabPane tab='车架号、发动机号' key='2'>
                                {
                                    this.config.certNumForm.map((item: Iform, index: number) => {
                                        return <FormItem 
                                                    key={item.label + '' + item.id} 
                                                    {...this.config.formItemLayout} 
                                                    label={item.label} 
                                                    hasFeedback={true}>
                                                    { this.createForm(item, getFieldDecorator) }
                                                </FormItem>
                                    })
                                }
                            </Tabs.TabPane>
                        </Tabs>
    
                        <Row className='kisure-saas-customer-modal-new-customer-button'>
                            <Col>
                                <Button key='cancel' onClick={this.handleCancel}>取消</Button>
                                <Button key='submit' type='primary' loading={this.state.loading} onClick={this.handleOk}>查询</Button>
                            </Col>
                        </Row>
                        
                </Modal>
            </Form>
        )
    }
} 

export default Form.create()(SaaSCustomerModalNewCustomer);
