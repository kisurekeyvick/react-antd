import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Modal, Button, Form, Row, Col, Select, Radio, Icon } from 'antd';
import { Iform } from '../interface';
import { api } from 'src/_mock/api';
import './saas-customer-modal-batch-assign.scss';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class SaaSCustomerModalBatchAssign extends React.PureComponent<any, any> {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        handleCancel: PropTypes.func.isRequired,
        handleOk: PropTypes.func.isRequired,
        customers: PropTypes.array.isRequired,
        renewalMan: PropTypes.array,
        asignLogic: PropTypes.array
    }

    static defaultProps = {
        asignLogic: []
    }

    public config: any;

    constructor(public props: any) {
        super(props);

        this.state = {
            loading: false
        };

        this.config = {
            formItem: [
                {
                    label: '选择跟进续保员（可多选）',
                    id: 1,
                    key: 'assignRenewalMan',
                    type: 'select',
                    placeholder: '请选择',
                    config: {
                        rule: [
                            { required: true, message: '跟进续保员为必填项' },
                        ],
                        options: [
                            ...this.props.renewalMan.map((item: any) => {
                                return {
                                    name: item.userName,
                                    value: item.userId
                                };
                            })
                        ],
                        mode: 'multiple',
                        initialValue: undefined,
                        formItemLayout: {
                            labelCol: {
                                xs: { span: 24 },
                                sm: { span: 10 },
                              },
                            wrapperCol: {
                                xs: { span: 24 },
                                sm: { span: 14 },
                            }
                        }
                    }
                },
                {
                    label: '分配逻辑',
                    id: 2,
                    key: 'assignLogic',
                    type: 'radio',
                    placeholder: '',
                    config: {
                        rule: [
                            { required: true, message: '分配逻辑为必填项' },
                        ],
                        options: [
                            ...this.props.asignLogic
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
                        }
                    }
                }
            ]
        }
    }

    public handleCancel = () => {
        this.props.handleCancel('cancel', false);
    }

    public handleOk = () => {
        this.props.form.validateFields((err: any, fieldsValue: any) => {
            if (err)
                return

            this.setState({
                loading: true
            });

            api.batchAssign().then((res: any) => {
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
            case 'select':
                formItem = getFieldDecorator(form.key, {
                    initialValue: form.config.initialValue,
                    rules: form.config.rule || []
                })(
                    <Select key={`select-` + form.id} mode={form.config.mode} style={{ width: '100%' }}>
                    {
                        form.config.options.map((option: any, index: number) => {
                            return <Option key={`option-` + index} value={option.value}>{option.name}</Option>
                        })
                    }
                    </Select>
                );
                break;
            case 'radio':
                formItem = getFieldDecorator(form.key, {
                    initialValue: form.config.initialValue,
                    rules: form.config.rule || []
                })(
                    <RadioGroup style={{ width: '85%' }}>
                        {
                            form.config.options.map((option: any, index: number) => {
                                return <Radio key={`radio-` + index} value={option.value}>{option.name}</Radio>
                            })
                        }
                    </RadioGroup>
                );
                break;
            default:
                formItem = null;
                break;
        }

        return formItem;
    }

    public render(){
        const { getFieldDecorator } = this.props.form;

        return (
            <Form layout='inline'>
                <Modal
                    visible={this.props.visible}
                    title={this.props.title}
                    onCancel={this.handleCancel}
                    footer={null}
                    maskClosable={false}>
                    <div className='kisure-saas-customer-modal-batch-assign-content'>
                        <div className="kisure-message-box">
                            <p className="kisure-message-content">
                                <Icon type="info-circle" />
                                <span>
                                    此次批量分配共选中
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
                                        label={item.label}
                                        hasFeedback={true}>
                                        { this.createForm(item, getFieldDecorator) }
                                        </FormItem>
                            })
                        }
                    </div>

                    <Row className='kisure-saas-customer-modal-batch-assign-button'>
                        <Col>
                            <Button key='cancel' onClick={this.handleCancel}>取消</Button>
                            <Button key='submit' type='primary' loading={this.state.loading} onClick={this.handleOk}>确定</Button>
                        </Col>
                    </Row>
                </Modal>
            </Form>
        )
    }
}

export default Form.create()(SaaSCustomerModalBatchAssign);
