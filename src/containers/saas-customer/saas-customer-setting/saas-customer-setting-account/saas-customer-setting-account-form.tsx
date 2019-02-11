import * as React from 'react';
import { Button, Form, Row, Col, Input, Icon } from 'antd';
import { ISettingFormItems } from '../interface';
import * as PropTypes from 'prop-types';
import './saas-customer-setting-account-form.scss';

const FormItem = Form.Item;

class SaaSCustomerSettingAccountForm extends React.PureComponent<any, any> {
    static propTypes = {
        account: PropTypes.object.isRequired,
        accountExtModel: PropTypes.object.isRequired,
        save: PropTypes.func.isRequired,
        delete:PropTypes.func.isRequired
    }

    constructor(public props: any) {
        super(props);

        this.state = {
            isLoading: false,
            toggle: false,
        };
    }

    public componentDidMount() {
        
    }

    // public resetForm = () => {
    //     const { getFieldsValue, setFieldsValue } = this.props.form;
    //     const modelValue = this.props.account['proxyTerminalInfo'] && JSON.parse(this.props.account['proxyTerminalInfo']) || {};

    //     if (getFieldsValue && setFieldsValue) {
    //         const fields = getFieldsValue();

    //         for(const item in fields) {
    //             if ({}.hasOwnProperty.call(fields, item)) {
    //                 if (fields[item] instanceof Array) {
    //                     fields[item] = [];
    //                 } else {
    //                     switch(item) {
    //                         case 'account':
    //                             fields[item] = this.props.account.account;
    //                             break;
    //                         case 'password':
    //                             fields[item] = '**********';
    //                             break;
    //                         default:
    //                             fields[item] = modelValue[item];
    //                             break;
    //                     }
    //                 }
    //             }
    //         }
    
    //         setFieldsValue(fields);
    //         this.setState({
    //             reset: true
    //         });
    //     }
    // }

    /** 
     * 保险公司拓展字段下拉开关
     */
    public toggleAccountForm = () => {
        this.setState({
            toggle: !this.state.toggle
        });
    }

    /** 
     * 保存账号信息
     */
    public saveAccountForm = () => {
        const { getFieldsValue } = this.props.form;
        const params = getFieldsValue();
        this.props.save(params);
    }

    /** 
     * 删除账号信息
     */
    public deleteAccountForm = () => {
        const params = this.props.account;
        this.props.delete(params);
    }

    /** 
     * 创建保险公司基础账号表单
     */
    public createAccountForm = (item: any) => {
        const { getFieldDecorator } = this.props.form;
        const forms: ISettingFormItems[] = [
            {
                label: '账号',
                id: 1,
                key: 'account',
                type: 'text',
                placeholder: `请输入账号`,
                config: {
                    initialValue: item.account,
                    formItemLayout: {
                        wrapperCol: {
                            xs: { span: 15 },
                        }
                    },
                }
            },
            {
                label: '密码',
                id: 2,
                key: 'password',
                type: 'text',
                placeholder: '请输入密码',
                config: {
                    initialValue: '**********',
                    type: 'password',
                    formItemLayout: {
                        wrapperCol: {
                            xs: { span: 15 },
                        }
                    },
                }
            },
            {
                label: '',
                id:3,
                key:'',
                type:'button-group'
            }
        ];

        return (
            <div className='accountForm-item'>
                <Row>
                    <Col xs={24} lg={12} xl={8}>
                        <div className='accountForm-item-account'>
                            <Row>
                                {
                                    forms.map((form: ISettingFormItems, index: number) => {
                                        return <Col key={`col-` + index} xs={24}>
                                                    {
                                                       form.type === 'button-group' ?
                                                       this.createForm(form, getFieldDecorator):
                                                       <FormItem
                                                            key={form.key + 'account' + form.id}
                                                            {...form.config.formItemLayout}
                                                            label={form.label}>
                                                            { this.createForm(form, getFieldDecorator) }
                                                        </FormItem>
                                                    }
                                                </Col>
                                    })
                                }
                            </Row>
                        </div>
                    </Col>
                </Row>
                {
                    this.state.toggle ? 
                    <div className='accountForm-item-field-ext'>
                        <div className="company-account-title">
                            <label>账号拓展字段</label>
                        </div>
                        { this.buildAccountExtForm(getFieldDecorator) }
                    </div>
                    : null
                }
            </div>
        );
    }

    /** 
     * 创建保险公司账号拓展字段表单
     */
    public buildAccountExtForm = (getFieldDecorator: any) => {
        const form: ISettingFormItems[] = [];
        const accountExtModel = this.props.accountExtModel;
        const modelValue = this.props.account['proxyTerminalInfo'] && JSON.parse(this.props.account['proxyTerminalInfo']) || {};
        
        for(const key in accountExtModel) {
            form.push({
                label: accountExtModel[key],
                id: form.length,
                key,
                type: 'text',
                placeholder: `请输入${accountExtModel[key]}`,
                config: {
                    initialValue: modelValue[key],
                    formItemLayout: {
                        labelCol: {
                            xs: { span: 5 }
                        },
                        wrapperCol: {
                            xs: { span: 15 },
                        }
                    },
                }
            });
        }

        return (
            <div className='accountForm-item-field-ext-form'>
                <Row>
                    <Col>
                        {
                            form.map((item: ISettingFormItems, index: number) => {
                                return <Col key={index} xs={24} lg={12} xl={8}>
                                            <FormItem
                                                key={item.key + ' ext ' + item.id}
                                                {...item.config.formItemLayout}
                                                label={item.label}>
                                                { this.createForm(item, getFieldDecorator) }
                                            </FormItem>
                                        </Col>
                            })
                        }
                    </Col>
                </Row>
            </div>
        );
    }

    /** 
     * 创建表单
     */
    public createForm = (form: ISettingFormItems, getFieldDecorator:any): any => {
        let formItem: any;

        switch(form.type) {
            case 'text':
                formItem = getFieldDecorator(form.key, {
                    initialValue: form.config.initialValue,
                    rules: form.config.rule || []
                })( <Input key={`input-` + form.key + form.id} placeholder={form.placeholder || ''} type={form.config.type || 'text'}/> )
                break;
            case 'button-group':
                formItem = <div className='accountForm-item-button-group'>
                                <Button type="primary" size='small' onClick={() => this.toggleAccountForm()}>
                                    {
                                        !this.state.toggle ? 
                                        <React.Fragment>点击展开显示详情<Icon type="down" /></React.Fragment> :
                                        <React.Fragment>收起<Icon type="up" /></React.Fragment>
                                    }
                                </Button>
                                <Button type="primary" size='small' onClick={() => this.saveAccountForm()}>保存</Button>
                                <Button type="primary" size='small' onClick={() => this.deleteAccountForm()}>删除</Button>
                            </div>
                break;
            default:
                formItem = null;
                break;
        }

        return formItem;
    }

    public render() {
        return (
            <React.Fragment>
                { this.createAccountForm(this.props.account) }
            </React.Fragment>
        );
    }
}

export default Form.create()(SaaSCustomerSettingAccountForm);
