import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Modal, Button, Form, Row, Col, Radio, Icon, Input, Spin } from 'antd';
import { Iform } from '../interface';
import { api } from 'src/_mock/api';
import './saas-customer-modal-batch-sms.scss';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

class SaaSCustomerModalBatchSMS extends React.PureComponent<any, any> {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        handleCancel: PropTypes.func.isRequired,
        handleOk: PropTypes.func.isRequired,
        customers: PropTypes.array.isRequired,
        smsTemplateType: PropTypes.array,
        smsInfo: PropTypes.object.isRequired
    }

    static defaultProps = {
        smsTemplateType: []
    }

    public config: any;
    public templateContent: any[] = [];
    
    constructor(public props: any) {
        super(props);

        this.state = {
            loading: false,
            templateLoading: false
        }

        this.config = {
            formItem: [
                {
                    label: '群发类型',
                    id: 1,
                    key: 'SMSTemplateType',
                    type: 'radio',
                    placeholder: '',
                    config: {
                        rule: [
                            { required: true, message: '群发类型为必填项' },
                        ],
                        options: [
                            ...this.props.smsTemplateType.filter((item: any) => item.value !== 0).map((item: any) => {
                                return {
                                    name: item.name,
                                    value: item.value
                                };
                            })
                        ],
                        formItemLayout: {
                            labelCol: {
                                xs: { span: 24 },
                                sm: { span: 4 },
                              },
                            wrapperCol: {
                                xs: { span: 24 },
                                sm: { span: 20 },
                            }
                        },
                        onChange: (e: any) => this.templateTypeChange(e),
                        initialValue: undefined,
                    }
                },
                {
                    label: '短信内容',
                    id: 2,
                    key:'SMSContent',
                    type:'textarea',
                    placeholder:'请输入内容',
                    config: {
                        rule: [
                            { required: true, message: '短信内容为必填项' },
                        ],
                        disabled: true,
                        formItemLayout: {
                            labelCol: {
                                xs: { span: 24 },
                                sm: { span: 4 },
                              },
                            wrapperCol: {
                                xs: { span: 24 },
                                sm: { span: 20 },
                            }
                        },
                        initialValue: undefined,
                    }
                }
            ]
        }
    }

    public componentDidMount() {
        this.setState({
            templateLoading: true
        });

        api.getSMSTemplate().then((res: any) => {
            this.setState({
                templateLoading: false
            });

            if (res && res.status === 200) {
                this.templateContent = res.data.result.filter((content: any) => content.templateType !== 0).map((item: any) => {
                    return Object.assign(item, {
                        content: this.embedInfo(item.content)
                    });
                });

                this.templateTypeChange({target: {value: 1}});
                this.props.form.setFieldsValue({
                    SMSTemplateType: 1
                });
            }
        });
    }

    /**
     * 把字段值嵌入到短信中
     */
    public embedInfo = (content: string): string => {
        const ignoreFieldArr: string[] = ['carNumber'];

        const filterField = (str: string, ignoreField: string[]): string => {
            ignoreField.forEach((field: string) => {
                str = str.replace(new RegExp('{'+ field +'}', 'g'), '');
            });

            return str;
        };

        content = filterField(content, ignoreFieldArr);
        
        for(let i = 0; i < content.length; i = 0){
            const start = content.indexOf('{');
            const end = content.indexOf('}', start);

            if(start === -1)
                break;

            const field = content.slice(start + 1, end);
            const value = field in this.props.smsInfo ? this.props.smsInfo[field] : ''; 
            content = content.replace(new RegExp('{'+ field +'}'), value);
        }

        return content;
    }

    public templateTypeChange = (e: any) => {
        const target = this.templateContent.find((content: any) => content.templateType === e.target.value);

        if (target)
            this.props.form.setFieldsValue({
                SMSContent: target.content
            });
    }

    public handleCancel = () => {
        this.props.handleCancel('cancel', false);
    }

    public handleOk = () => {
        this.props.form.validateFields((err: any, fieldsValue: any) => {
            if(err)
                return;

            this.setState({
                loading: true
            });

            api.batchSMS().then((res: any) => {
                this.setState({
                    loading: false
                });

                if (res && res.status === 200)
                    this.props.handleOk('success', false);
            });
        });
    }

    /**
     * 创建formItem
     * @param item 
     */
    public createForm = (form: Iform, getFieldDecorator:any): any => {
        let formItem: any;

        switch(form.type) {
            case 'radio':
                formItem = getFieldDecorator(form.key, {
                    initialValue: form.config.initialValue,
                    rules: form.config.rule || []
                })(
                    <RadioGroup style={{ width: '85%' }} onChange={form.config.onChange}>
                        {
                            form.config.options.map((option: any, index: number) => {
                                return <Radio key={`radio-` + index} value={option.value}>{option.name}</Radio>
                            })
                        }
                    </RadioGroup>
                );
                break;
            case 'textarea':
                formItem = getFieldDecorator(form.key, {
                    initialValue: form.config.initialValue,
                    rules: form.config.rule || []
                })(
                    <TextArea placeholder={form.placeholder || ''} autosize={{ minRows: 2, maxRows: 6 }} disabled={form.config.disabled}/>
                );
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
                    <Spin tip="Loading..." spinning={this.state.templateLoading}>
                        <div className='kisure-saas-customer-modal-batch-sms-content'>
                            <div className="kisure-message-box">
                                <p className="kisure-message-content">
                                    <Icon type="info-circle" />
                                    <span>
                                        此次群发已选中
                                        <span className='blue'>{this.props.customers.length}</span>
                                        个客户
                                    </span>
                                </p>
                            </div>
                            {
                                this.config.formItem.map((item: Iform, index: number) => {
                                    return <FormItem
                                            key={item.key + '' + item.id}
                                            {...item.config.formItemLayout}
                                            label={item.label}>
                                            { this.createForm(item, getFieldDecorator) }
                                            </FormItem>
                                })
                            }
                        </div>

                        <Row className='kisure-saas-customer-modal-batch-sms-button'>
                            <Col>
                                <Button key='cancel' onClick={this.handleCancel}>取消</Button>
                                <Button key='submit' type='primary' loading={this.state.loading} onClick={this.handleOk}>确定</Button>
                            </Col>
                        </Row>
                    </Spin>
                </Modal>
            </Form>
        )
    }
}

export default Form.create()(SaaSCustomerModalBatchSMS);
