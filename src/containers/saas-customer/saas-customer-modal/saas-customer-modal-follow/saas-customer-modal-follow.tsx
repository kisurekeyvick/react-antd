import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Modal, Button, Form, Row, Col, Input, Radio, Select, DatePicker, Checkbox, Icon, Tooltip } from 'antd';
import * as _ from 'lodash';
import { Iform, formItems } from './saas-customer-modal-follow-config';
import { api } from 'src/_mock/api';
import './saas-customer-modal-follow.scss';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class SaaSCustomerModalFollow extends React.PureComponent<any, any> {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        handleOk: PropTypes.func.isRequired,
        handleCancel: PropTypes.func.isRequired,
        task: PropTypes.object.isRequired,
        customerIntention: PropTypes.array.isRequired,
        followResult: PropTypes.array.isRequired
    }
    
    public config: any = {};

    constructor(public props: any) {
        super(props);

        this.state = {
            isLoading: false,
            selectCustomTime: false
        };

        this.config = {
            formItem: this.rebuildFormItems(_.cloneDeep(formItems))
        };
    }

    /** 
     * 重建表单
     */
    public rebuildFormItems = (items: Iform[]): Iform[] => {    
        return items.map((item: Iform) => {
            const reslut = item;
            
            switch(item.key) {
                case 'result':
                    item.config.options = [...this.props.followResult];
                    break;
                case 'intentionLevel':
                    item.config.options = [...this.props.customerIntention];
                    break;
                default:
                    break;
            }

            return reslut;
        });
    }

    public componentDidMount() {

    }

    public handleCancel = () => {
        this.props.handleCancel('cancel', false);
    }

    public handleOk = () => {
        this.props.form.validateFields((err: any, fieldsValue: any) => {
            if(err)
                return

            // const { getFieldsValue } = this.props.form;

            // console.log(getFieldsValue());

            this.setState({
                isloading: true
            });

            api.addCustomerFollowRecord().then((res: any) => {
                this.setState({
                    loading: false
                });

                if (res && res.status === 200)
                    this.props.handleOk('success', false);
            })
        })
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
                    <Select key={`select-` + form.id} mode={form.config.mode || ''} style={{ width: '100%', paddingRight: '30px' }}>
                    {
                        form.config.options.map((option: any, index: number) => {
                            return <Option key={`option-` + index} value={option.value}>{option.name}</Option>
                        })
                    }
                    </Select>
                );
                break;
            case 'button-group':
                formItem = getFieldDecorator(form.key, {
                    initialValue: form.config.initialValue,
                    rules: form.config.rule || []
                })(
                    <Radio.Group key={`button-group-` + form.id} size='small' className='button-group-formItem'>
                        {
                            form.config.options.map((option: any, index: number) => {
                                return <Radio.Button key={`button-` + index} value={option.value}>{option.name}</Radio.Button>
                            })
                        }
                    </Radio.Group>
                );
                break;
            case 'textarea':
                formItem = getFieldDecorator(form.key, {
                    initialValue: form.config.initialValue,
                    rules: form.config.rule || []
                })( <TextArea key={`textarea-` + form.id} placeholder={form.placeholder || ''} autosize={{ minRows: 2, maxRows: 6 }}/> );
                break;
            case 'button-group-custom-time':
                formItem = getFieldDecorator(form.key, {
                    initialValue: form.config.initialValue,
                    rules: form.config.rule || []
                })(
                    <div>
                        <Radio.Group key={`button-group-custom-time` + form.id} size='small' onChange={(e) => this.selectCustomTime(e, form)}>
                            {
                                form.config.options.map((option: any, index: number) => {
                                    return <Radio.Button key={`custom-button-` + index} value={option.value}>
                                                {option.name}
                                                
                                            </Radio.Button>;
                                })
                            }
                        </Radio.Group>
                        {
                            this.state.selectCustomTime ? 
                            <DatePicker key={`datePicker-` + form.id} onChange={this.datePickerChange} size='small'/> : null
                        }
                    </div>
                );
                break;
            case 'chexkbox':
                formItem = getFieldDecorator(form.key, {
                    valuePropName: 'checked',
                    initialValue: form.config.initialValue,
                    rules: form.config.rule || []
                })(  <Checkbox key={`checkbox-` + form.id}/> );
                break;
            default:
                formItem = null;
                break;
        }

        return formItem;
    }

    /** 
     * 选择自定义时间
     */
    public selectCustomTime = (e: any, form: Iform) => {
        this.setState({
            selectCustomTime: e.target.value === '' ? true : false
        });
    }

    /** 
     * 下次跟进 日期选择
     */
    public datePickerChange = (date: any, dateString: any) => {
        const { setFieldsValue } = this.props.form;
        setFieldsValue({
            'nextFollowway': date.toDate()
        });
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
                maskClosable={false}
                width={'800px'}>
                    <div className='kisure-saas-customer-modal-follow-content'>
                        <Row gutter={48}>
                            {
                                this.config.formItem.map((item: Iform, index: number) => {
                                    let Label: any;
                                    let className: string = '';
                                    if (item.key === 'remindMe')
                                        Label = <React.Fragment>
                                                    <span className='remind-span'>{item.label}</span>
                                                    <Tooltip title={item.config.icon && item.config.icon.content || ''}>
                                                        <Icon type="question-circle" className='remind-icon'/>
                                                    </Tooltip> 
                                                </React.Fragment>;

                                    if (item.type === 'textarea')
                                        className = 'textarea-formItem'

                                    return <Col key={index} xs={24} sm={item.config.row && item.config.row['sm'] || 12}>
                                                <FormItem
                                                    key={item.key + '' + item.id}
                                                    {...item.config.formItemLayout}
                                                    label={Label || item.label}
                                                    hasFeedback={item.config.hasFeedback}
                                                    className={className}>
                                                    { this.createForm(item, getFieldDecorator) }
                                                </FormItem>
                                            </Col>
                                })
                            } 
                        </Row>
                    </div>
                    <Row className='kisure-saas-customer-modal-follow-button'>
                        <Col>
                            <Button key='cancel' onClick={this.handleCancel}>取消</Button>
                            <Button key='submit' className='red' type='primary' loading={this.state.isloading} onClick={this.handleOk}>确认</Button>
                        </Col>
                    </Row>
                </Modal>
            </Form>
        )
    }
}

export default Form.create()(SaaSCustomerModalFollow);
