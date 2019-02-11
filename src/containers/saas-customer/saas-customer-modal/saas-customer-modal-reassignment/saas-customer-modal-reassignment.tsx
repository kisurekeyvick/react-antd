import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Modal, Button, Form, Row, Col, Select } from 'antd';
import * as _ from 'lodash';
import { Iform, formItems } from './saas-customer-modal-reassignment-config';
import { api } from 'src/_mock/api';
import './saas-customer-modal-reassignment.scss';

const FormItem = Form.Item;
const Option = Select.Option;

class SaaSCustomerModalReassignment extends React.PureComponent<any, any> {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        handleCancel: PropTypes.func.isRequired,
        handleOk: PropTypes.func.isRequired,
        task: PropTypes.object.isRequired,
        renewalMan: PropTypes.array,
    }

    static defaultProps = {
        renewalMan: []
    }

    public config: any ={};

    constructor(public props: any) {
        super(props);

        this.state = {
            isloading: false
        };

        this.config = {
            formItem: this.rebuildFormItem(_.cloneDeep(formItems))
        };
    }

    /**
     * 重建form
     */
    public rebuildFormItem = (formItem: Iform[]):Iform[] => {
        return formItem.map((form: Iform) => {
            switch(form.key) {
                case 'renewalMan': 
                    form.config.options = [...this.props.renewalMan];
                    break;
            }
            return form;
        });
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

            api.customerReassignment().then((res: any) => {
                this.setState({
                    loading: false
                });
                
                if (res && res.status === 200)
                    this.props.handleOk('success', false);
            });
        })
    }

    /**
     * 创建formItem
     * @param item 
     */
    public createForm = (form: Iform, getFieldDecorator:any): any => {
        let formItem: any;

        switch(form.type) {
            case 'tagsSelect':
                formItem = getFieldDecorator(form.key, {
                    initialValue: form.config.initialValue,
                    rules: form.config.rule || []
                })(
                    <Select
                        key={`select-` + form.id}
                        mode='tags'
                        style={{ width: '100%' }}
                        placeholder={form.placeholder || ''}>
                        {
                            form.config.options.map((option: any, index: number) => {
                                return <Option key={`option-` + index} value={option.value}>{option.name}</Option>
                            })
                        }
                    </Select>,
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
                    <div className='kisure-saas-customer-modal-reassignment-content'>
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
                    <Row className='kisure-saas-customer-modal-reassignment-button'>
                        <Col>
                            <Button key='cancel' onClick={this.handleCancel}>取消</Button>
                            <Button key='submit' type='primary' loading={this.state.isloading} onClick={this.handleOk}>确定</Button>
                        </Col>
                    </Row>
                </Modal>
            </Form>
        )
    }
}

export default Form.create()(SaaSCustomerModalReassignment); 
