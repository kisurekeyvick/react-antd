import * as React from 'react';
import { Form, Input, Button, Icon, Row, Col, Select, Popover, Progress} from 'antd';
import { Link } from "react-router-dom";
import * as _ from 'lodash';
import { validTelePhone, vaildEmail } from 'src/service/validate';
import { IForm, registerForm } from './user-register-config';
import './user-register.scss';

const FormItem = Form.Item;
const Option = Select.Option;

class UserRegister extends React.PureComponent<any, any> {
    public config: any;
    public interval: any;

    constructor(public props: any) {
        super(props);

        this.state = {
            seconds: 0,
            passwordProgress: 0,
            passwordStrength: '',
            passwordPopoverVisible: false,
            strokeColor: 'red'
        };

        this.config = {
            registerForm: this.rebuildFormItem(_.cloneDeep(registerForm))
        };
    }

    /**
     * 重新配置表单
     *
     * @memberof UserRegister
     */
    public rebuildFormItem = (formItems: IForm[]): IForm[] => {
        return formItems.map((item: IForm) => {
            switch(item.key) {
                case 'phone':
                    item.config.rule.push({ validator: this.validTelePhone });
                    break;
                case 'passwordAgain':
                    break;
                case 'email':
                    item.config.rule.push({ validator: this.vaildEmail });
                    break;
                default:
                    break;
            }

            return item;
        });
    }

    /**
     * 手机号码验证
     * @memberof UserLogin
     */
    public validTelePhone = (rule: any, value: any, callback: any) => {
        if (!validTelePhone(value) && value !== '' && value !== undefined)
            callback('请输入正确格式的手机号！');

        callback();
    }

    /**
     * 邮箱验证
     * @memberof UserRegister
     */
    public vaildEmail = (rule: any, value: any, callback: any) => {
        if (!vaildEmail(value) && value !== '')
            callback('请输入正确格式的邮箱！');

        callback();
    }

    /**
     * 短信验证码发送
     * @param e
     * @memberof UserLogin
     */
    public sendVerificationCode = (e: any) => {
        this.props.form.validateFields(['phone'], (error: any, value: any) => {
            if (!error)
                this.updateSeconds(120);
        });
    }

    /**
     * 更新seconds
     * @param num 设置秒数
     * @memberof UserLogin
     */
    public updateSeconds = (num: number) => {
        this.setState({ seconds: num });

        this.interval = setInterval(() => {
            num -= 1;
            this.setState({ seconds: num });
            if (num === 0)
                clearInterval(this.interval);
        }, 1000);
    }

    /**
     * 密码输入框内容改变事件
     * @param e
     * @memberof UserRegister
     */
    public passwordsChange = (e: any) => {
        if (e.target.value) {
            const length: number = String(e.target.value).length;
            const state = {
                passwordPopoverVisible: true,
                passwordProgress: length * 10
            };

            if(length < 6)
                this.setState({...state, ...{
                    passwordStrength: '弱',
                    strokeColor: '#f5222d'
                }});
            else if (length >= 6 && length < 10)
                this.setState({...state, ...{
                    passwordStrength: '中',
                    strokeColor: '#faad14'
                }});
            else if (length > 10)
                this.setState({...state, ...{
                    passwordStrength: '强',
                    strokeColor: '#52c41a'
                }});
        } else
            this.setState({
                passwordPopoverVisible: false
            });
    }

    /**
     * 创建formItem
     * @param item 
     * @memberof UserLogin
     */
    public createForm = (form: IForm, getFieldDecorator:any) => {
        let formItem: any;

        switch(form.type) {
            case 'input':
                const inputItem = getFieldDecorator(form.key, {
                    initialValue: form.config.initialValue,
                    rules: form.config.rule || []
                })( <Input prefix={<Icon type={form.config.icon} style={{ color: 'rgba(0,0,0,.25)' }} />} size='large' key={`input-${form.id}`} placeholder={form.placeholder} type={form.config.type || 'text'}/> );

                if ( form.key === 'phone' ) {
                    const addonBefore = <Select defaultValue='86' style={{ width: 80 }}>
                                            <Option value='86'>+86</Option>
                                            <Option value='87'>+87</Option>
                                        </Select>;

                    formItem = getFieldDecorator(form.key, {
                        initialValue: form.config.initialValue,
                        rules: form.config.rule || []
                    })( <Input addonBefore={addonBefore} prefix={<Icon type={form.config.icon} style={{ color: 'rgba(0,0,0,.25)' }} />} size='large' key={`input-${form.id}`} placeholder={form.placeholder} type={form.config.type || 'text'}/> );
                } else if ( form.key === 'verificationCode' ) {
                    formItem = <div key={`input-button-${form.id}`}>
                                    <Row gutter={8}>
                                        <Col span={16}>
                                            { inputItem }
                                        </Col>
                                        <Col span={8}>
                                            <Button style={{width: '100%'}} size='large' disabled={this.state.seconds > 0} onClick={this.sendVerificationCode}>
                                                { this.state.seconds > 0 ? `${this.state.seconds}秒` : '获取验证码' }
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                } else if (form.key === 'password') {
                    formItem = getFieldDecorator(form.key, {
                        initialValue: form.config.initialValue,
                        rules: form.config.rule || []
                    })( 
                        <div>
                            <Input prefix={<Icon type={form.config.icon} style={{ color: 'rgba(0,0,0,.25)' }} />} size='large' key={`input-${form.id}`} placeholder={form.placeholder} type={form.config.type || 'text'} onChange={this.passwordsChange}/> 
                            <Popover content={
                                <div style={{ padding: '4px 0' }}>
                                    <span style={{color: this.state.strokeColor}}>强度：{this.state.passwordStrength}</span>
                                    <div>
                                        <Progress percent={this.state.passwordProgress} strokeColor={this.state.strokeColor} showInfo={false}/>
                                    </div>
                                    <div style={{ 'marginTop': '10px'}}><span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span></div>
                                </div>
                            } 
                            overlayStyle={{ width: 240 }}
                            placement='right'
                            visible={this.state.passwordPopoverVisible}/>
                        </div>
                    );
                } else
                    formItem = inputItem;
                break;
            default:
                formItem = null; 
                break;
        }

        return formItem;
    }

    /**
     * 提交表单数据
     * @param e 
     * @memberof UserRegister
     */
    public handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFields((error: any, value: any) => {
            if (error) {

            }
        });
    }

    public componentWillUnmount() {
        if (this.interval)
            clearInterval(this.interval);
    }

    public render() {
        const { getFieldDecorator } = this.props.form;
        
        return (
            <div className='user-register'>
                <Form className='user-register-form' onSubmit={this.handleSubmit}>
                    {
                        this.config.registerForm.map((item: IForm, index: number) => {
                            return <FormItem className='formItem-item'
                                    key={item.key + '' + item.id}
                                    hasFeedback={item.hasFeedback || false}>
                                    { this.createForm(item, getFieldDecorator) }
                                    </FormItem>
                        })
                    }
                    <FormItem>
                        <Row gutter={8}>
                            <Col span={12}>
                                <Button type='primary' style={{width: '100%'}} size='large' htmlType="submit">注册</Button>
                            </Col>
                            <Col span={12} className='user-register-reLogin'>
                                <Link to='/user/login'>使用已有账户登录</Link>
                            </Col>
                        </Row>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default Form.create()(UserRegister);
