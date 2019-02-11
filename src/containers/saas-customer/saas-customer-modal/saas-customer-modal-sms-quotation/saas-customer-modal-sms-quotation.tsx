import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Modal, Form, Button, Row, Col, AutoComplete, Select, Checkbox, Input, Icon, Tooltip, Spin } from 'antd';
import { Iform, formItems, IOption } from './saas-customer-modal-sms-quotation-config';
import * as _ from 'lodash';
import { api } from 'src/_mock/api';
import './saas-customer-modal-sms-quotation.scss';

const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

class SaaSCustomerModalSMSQuotation extends React.PureComponent<any, any> {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        handleCancel: PropTypes.func.isRequired,
        handleOk: PropTypes.func.isRequired,
        smsParams: PropTypes.object.isRequired,
        MktPlanList: PropTypes.array.isRequired
    };

    public config: any;

    constructor(public props: any) {
        super(props);

        this.state = {
            headContent: '',
            giftContent: '',
            discountContent: '',
            footContent: '',
            isLoading: false
        };

        this.config = {
            formItem: this.rebuildFormItem(_.cloneDeep(formItems)),
        };

        // this.initState();
    }

    /** 
     * 初始化状态
     */
    // public initState = () => {

    // }

    /** 
     * 重建form表单配置
     */
    public rebuildFormItem = (forms: Iform[]): Iform[] => {
        const smsParams = this.props.smsParams;

        return forms.map((form: Iform) => {
            switch(form.key) {
                case'sendMobilePhone': 
                    form.config.options = form.config.options.map((option: IOption) => {
                        switch(option.key) {
                            case 'carOnwer':
                                option.value = `${smsParams.carOnwerName && smsParams.carOnwerPhoneNumber ? 
                                    `${option.name}：${smsParams.carOnwerName}(${smsParams.carOnwerPhoneNumber})` : ''}`;
                                break;
                            case 'backupPerson':
                                option.value = `${smsParams.backupManName && smsParams.backupManPhoneNumber ?
                                `${option.name}：${smsParams.backupManName}(${smsParams.backupManPhoneNumber})` : ''}`;
                                break;
                        }
                        return option;
                    }).filter((option: IOption) => option.value);
                    break;
                case 'gift':
                    form.config.options = this.props['MktPlanList'].map((list: any) => {
                        return {
                            name: list.name,
                            value: list.name
                        };
                    });
                    break;
                default:
                    break;
            }

            return form
        });
    }

    public componentDidMount(){
        this.setState({
            isLoading: false
        });

        api.getSMSTemplate().then((res: any) => {
            if (res && res.status === 200) {
                const smsContent = (res['data']['result'] || []).filter((template: any) => {
                    return template.id === 2;
                });
                if (smsContent && smsContent.length === 1)
                    this.formatRequest(smsContent[0]['content']);
            }

            this.setState({
                isLoading: false
            });
        });
    }

    /** 
     * format短信内容
     */
    public formatRequest = (res: string) => {
        console.log(res);
    }

    public handleCancel = () => {
        this.props.handleCancel('cancel', false);
    }

    public handleOk = () => {
        this.props.form.validateFields((err: any, fieldsValue: any) => {
            if(err)
                return;

            this.setState({
                isLoading: true
            });

            api.smsQuotedPrice().then((res: any) => {
                this.setState({
                    isLoading: false
                });

                if (res && res.status === 200)
                    this.props.handleOk('success', false);
            });
        })
    }

    /** 
     * 商业险返点、交强险返点 发生变化触发事件
     */
    public autoCompleteChange = (key: string) => {
        console.log(key);
    }

    /**
     * 创建formItem
     * @param item 
     */
    public createForm = (form: Iform, getFieldDecorator:any): any => {
        let formItem: any;
        
        switch(form.type) {
            case 'autoComplete': 
                formItem = getFieldDecorator(form.key, {
                    rules: form.config.rule || []
                })( <AutoComplete
                    dataSource={form.config.options}
                    // style={{ width: 200 }}
                    onSelect={() => this.autoCompleteChange(form.key)}
                    // onSearch={this.handleSearch}
                    placeholder={form.placeholder}
                    style={{ width: '100%', 'marginRight':'30px' }}>
                        <Input className='autoComplete-input' suffix={<Icon type='down' className='autoComplete-select-icon'/>} />
                    </AutoComplete> );
                break;
            case 'select': 
                formItem = getFieldDecorator(form.key, {
                    rules: form.config.rule || []
                })(
                    <Select key={`select-` + form.id} mode={form.config.mode} style={{ width: '100%'}}>
                    {
                        form.config.options.map((option: any, index: number) => {
                            return <Option key={`option-` + index} value={option.value}>{option.name}</Option>
                        })
                    }
                    </Select>
                );
                break;
            case 'checkbox': 
                formItem = getFieldDecorator(form.key, {
                    initialValue: form.config.initialValue,
                    rules: form.config.rule || []
                })( 
                    <Tooltip title={form.config.tooltip}>
                        <Checkbox key={`checkbox-` + form.id}>{form.label}</Checkbox>
                    </Tooltip>
                )
                break;
            case 'checkbox-group': 
                {
                    const options: string[] = form.config.options.map((option: IOption): any => {
                        return option.value;
                    });
                    const defaultValue: string[] = [options[0]];
                    formItem = getFieldDecorator(form.key, {
                        initialValue: form.config.initialValue,
                        rules: form.config.rule || []
                    })( <CheckboxGroup options={options} value={defaultValue} style={{'marginRight':'30px'}}/> ) 
                }
                break;
            case 'div':
                formItem = <Spin tip='Loading...' spinning={this.state.isLoading}>
                                <div id='smsContent'>
                                    { this.state.headContent ? <span>{ this.state.headContent }</span> : null }
                                    { this.state.discountContent ? <span>{ this.state.discountContent }</span> : null }
                                    { this.state.giftContent ? <span>{ this.state.giftContent }</span> : null }
                                    { this.state.footContent ? <span>{ this.state.footContent }</span> : null }
                                </div>
                            </Spin>;
                        
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
                    maskClosable={false}
                    width={'700px'}>
                    <div className='kisure-saas-customer-modal-batch-sms-quotation-content'>
                        <Row gutter={24}>
                            {
                                this.config.formItem.map((item: Iform, index: number) => {
                                    return  <Col key={index} {...item.config.colLayOut}>
                                                <FormItem
                                                    key={item.key + '' + item.id}
                                                    {...item.config.formItemLayout}
                                                    label={item.label && item.type !== 'checkbox' ? item.label : ''}
                                                    hasFeedback={item.config.hasFeedback}>
                                                    { this.createForm(item, getFieldDecorator) }
                                                </FormItem>
                                            </Col>
                                })
                            }
                        </Row>
                    </div>

                    <Row className='kisure-saas-customer-modal-sms-quotation-button'>
                        <Col>
                            <Button key='cancel' onClick={this.handleCancel}>取消</Button>
                            <Button key='submit' type='primary' loading={this.state.isLoading} onClick={this.handleOk}>发送</Button>
                        </Col>
                    </Row>
                </Modal>
            </Form>
        )
    }
}

export default Form.create()(SaaSCustomerModalSMSQuotation);
