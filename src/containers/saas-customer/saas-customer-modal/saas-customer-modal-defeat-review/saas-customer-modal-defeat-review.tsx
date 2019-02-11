import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Modal, Button, Form, Row, Col, Input } from 'antd';
import { Iform } from '../interface';
import { api } from 'src/_mock/api';
import './saas-customer-modal-defeat-review.scss';

const FormItem = Form.Item;
const { TextArea } = Input;

class SaaSCustomerModalDefeatReview extends React.PureComponent<any, any> {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        handleOk: PropTypes.func.isRequired,
        handleCancel: PropTypes.func.isRequired,
        task: PropTypes.object.isRequired
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
                    label: '审核备注',
                    id: 1,
                    key: 'description',
                    type: 'textarea',
                    placeholder: '请输入',
                    config: {
                        rule: [
                            { required: true, message: '审核驳回时，审核备注为必填项' }
                        ],
                        formItemLayout: {
                            labelCol: {
                                xs: { span: 24 },
                            },
                            wrapperCol: {
                                xs: { span: 24 },
                            }
                        },
                        initialValue: undefined
                    }
                }
            ]
        };
    }

    public handleCancel = () => {
        this.props.handleCancel('cancel', false);
    }

    public handleReject = () => {
        this.props.form.validateFields((err: any, fieldsValue: any)=> {
            if(err)
                return;

            this.setState({
                loading: true
            });

            api.defeatTaskReject().then((res: any) => {
                this.setState({
                    loading: false
                });

                if (res && res.status === 200)
                    this.props.handleOk('reject', false);
            });
        });
    }

    public handleOk = () => {
        this.props.form.validateFields((err: any, fieldsValue: any)=> {
            this.setState({
                loading: true
            });

            api.defeatTaskReview().then((res: any) => {
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
            case 'textarea':
                formItem = getFieldDecorator(form.key, {
                    initialValue: form.config.initialValue,
                    rules: form.config.rule || []
                })(
                    <TextArea placeholder={form.placeholder || ''} autosize={{ minRows: 2, maxRows: 6 }}/>
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

        return  (
            <Form layout='inline'>
                <Modal 
                visible={this.props.visible}
                title={this.props.title}
                onCancel={this.handleCancel}
                footer={null}
                maskClosable={false}>
                    <div className='kisure-saas-customer-modal-defeatReview-content'>
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

                    <Row className='kisure-saas-customer-modal-defeatReview-button'>
                        <Col>
                            <Button key='cancel' onClick={this.handleReject}>审核驳回</Button>
                            <Button key='submit' className='red' type='primary' loading={this.state.loading} onClick={this.handleOk}>审核通过</Button>
                        </Col>
                    </Row>
                </Modal>
            </Form>
        )
    }
}

export default Form.create()(SaaSCustomerModalDefeatReview);