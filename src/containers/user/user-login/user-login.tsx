import * as React from 'react';
import { Form, Input, Button, Checkbox, Icon, Tabs, Row, Col} from 'antd';
import * as _ from 'lodash';
import { IForm, loginFormItem, loginPhoneFormItem } from './user-login-config';
import { validTelePhone } from 'src/service/validate';
import './user-login.scss';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class UserLogin extends React.PureComponent<any, any> {
    public config: any;
    public interval: any;

    constructor(public props: any) {
        super(props);

        this.state = {
            seconds: 0
        };

        this.config = {
            loginFormItem: _.cloneDeep(loginFormItem),
            loginPhoneFormItem: this.rebuildFormItem(_.cloneDeep(loginPhoneFormItem))
        };
    }

    /**
     * 重新配置表单
     *
     * @memberof UserLogin
     */
    public rebuildFormItem = (formItems: IForm[]): IForm[] => {
        return formItems.map((item: IForm) => {
            switch(item.key) {
                case 'phone':
                    item.config.rule.push({ validator: this.validTelePhone });
                    break;
                default:
                    break;
            }

            return item;
        });
    }

    /**
     * 账号登录
     * @param e 
     * @memberof UserLogin
     */
    public handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFields((error: any, value: any) => {
            if (error) {

            }
        });
    }

    /**
     * tab切换
     * @param e tab切换返回默认参数key
     * @memberof UserLogin
     */
    public tabCallback = (e: string) => {

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
     * 手机号码验证
     *
     * @memberof UserLogin
     */
    public validTelePhone = (rule: any, value: any, callback: any) => {
        if (!validTelePhone(value) && value !== '' && value !== undefined)
            callback('请输入正确格式的手机号！');

        callback();
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
                })( <Input prefix={<Icon type={form.config.icon} style={{ color: 'rgba(0,0,0,.25)' }} />} size='large' key={`input-${form.id}`} placeholder={form.placeholder} type={form.config.type || 'text'}/> )

                if ( form.key === 'verificationCode' ) {
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
                } else 
                    formItem = inputItem;
                break;
            case 'checkbox-group':
                formItem = <div key={`checkbox-group-${form.id}`}>
                                {
                                    getFieldDecorator(form.key, {
                                        initialValue: form.config.initialValue,
                                        valuePropName: 'checked',
                                    })( <Checkbox className='checkbox-remember'>记住密码</Checkbox> )
                                }
                                <a href="javascript:;" key={`checkbox-group-a-${form.id}`} className="login-form-forgot">忘记密码?</a>
                                <Button size='large' type="primary" htmlType="submit" className="login-form-button">登录</Button>
                                <div className='other-login'>
                                    <span>其他登陆方式</span>
                                    <Icon type="alipay-circle" className='other-login-icon' theme="outlined" />
                                    <Icon type="taobao-circle" className='other-login-icon' theme="outlined" />
                                    <Icon type="weibo-circle" className='other-login-icon' theme="outlined" />
                                    <a href="javascript:;">注册账户</a>
                                </div>
                            </div>;
                break;
            default:
                formItem = null; 
                break;
        }

        return formItem;
    }

    public componentWillUnmount() {
        if (this.interval)
            clearInterval(this.interval);
    }

    public render() {
        const { getFieldDecorator } = this.props.form;

        return(
            <div className='user-login'>
                <Form className='user-login-form' onSubmit={this.handleSubmit}>
                    <Tabs defaultActiveKey='1' onChange={this.tabCallback}>
                        <TabPane tab='账号密码登录' key='1'>
                            {
                                this.config.loginFormItem.map((item: IForm, index: number) => {
                                    return <FormItem
                                            className='formItem-item'
                                            key={item.key + '' + item.id}
                                            hasFeedback={item.hasFeedback || false}>
                                            { this.createForm(item, getFieldDecorator) }
                                            </FormItem>
                                })
                            }
                        </TabPane>
                        <TabPane tab='手机号登录' key='2'>
                            {
                                this.config.loginPhoneFormItem.map((item: IForm, index: number) => {
                                    return <FormItem
                                            className='formItem-item'
                                            key={item.key + '' + item.id}
                                            hasFeedback={item.hasFeedback || false}>
                                            { this.createForm(item, getFieldDecorator) }
                                            </FormItem>
                                })
                            }
                        </TabPane>
                    </Tabs>
                </Form>
            </div>
        );
    }
}

export default Form.create()(UserLogin);
