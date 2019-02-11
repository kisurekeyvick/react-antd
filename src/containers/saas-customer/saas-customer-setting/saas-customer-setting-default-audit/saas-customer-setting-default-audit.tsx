import * as React from 'react';
import './saas-customer-setting-default-audit.scss';
import { Button, Form, Row, Col, message, Radio, Spin } from 'antd';
import { ISettingFormItems, formItems } from './saas-customer-setting-default-audit-config';
import { api } from 'src/_mock/api';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

class SaaSCustomerSettingDefaultAudit extends React.PureComponent<any, any> {
    public config: any;
    public defeatSetting: any;

    constructor(public props: any) {
        super(props);

        this.state = {
            isLoading: false,
            saving: false
        };

        this.config = {
            formItem: [...formItems]
        };
    }

    public componentDidMount() {
        this.loadDefeatSetting();
    }

    /**
     * 加载战败审核流程数据
     */
    public loadDefeatSetting = () => {
        this.setState({
            isLoading: true
        });

        api.getDefeatSetting().then((res: any) => {
            if (res && res.status === 200) {
                this.defeatSetting = res.data.result;
                this.resetForm(this.defeatSetting);
                this.config.formItem.map((item: ISettingFormItems) => {
                    switch(item.key) {
                        case 'defeatType':
                            item.config.initialValue = this.defeatSetting.defeatType;
                            break;
                    }
                });
            }

            this.setState({
                isLoading: false
            });
        });
    }

    /**
     * 重置表单中的数据
     */
    public resetForm = (data: any) => {
        const { getFieldsValue, setFieldsValue } = this.props.form;

        if (getFieldsValue && setFieldsValue) {
            const fields = getFieldsValue();

            for(const item in fields) {
                if ({}.hasOwnProperty.call(fields, item)) {
                    if (fields[item] instanceof Array) {
                        fields[item] = [];
                    } else {
                        switch(item) {
                            case 'defeatType':
                                fields[item] = data[item];
                                break;
                        }
                    }
                }
            }
    
            setFieldsValue(fields);
        }
    }

    /**
     * 创建formItem
     * @param item 
     */
    public createForm = (form: ISettingFormItems, getFieldDecorator:any): any => {
        let formItem: any;

        switch(form.type) {
            case 'radioGroup':
                formItem = getFieldDecorator(form.key, {
                    initialValue: form.config.initialValue,
                    rules: form.config.rule || []
                })( <RadioGroup key={`radioGroup-` + form.id}>
                        {
                            form.config.options.map((option: any, index: number) => {
                                return (
                                    <Radio key={`radio-` + index} style={{
                                        display: 'block',
                                        height: '30px',
                                        lineHeight: '30px',
                                      }} value={option.value}>{option.name}</Radio>
                                );
                            })
                        }
                    </RadioGroup> );
                break;
            default:
                formItem = null;
                break;
        }

        return formItem;
    }

    /**
     * 保存
     */
    public handleOk = () => {
        this.setState({
            isLoading: true,
            saving: true
        });

        const params = this.props.form.getFieldsValue();

        api.saveDefeatSetting(params).then((res: any) => {
            this.setState({
                isLoading: false,
                saving: false
            });

            if (res && res.status === 200) {
                message.success('审核流程设置成功');
                this.loadDefeatSetting();
            } else
                message.error('审核流程设置失败');
        });
    }

    public render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className='kisure-saas-customer-setting-defaultAudit'>
                <Form className='inline'>
                    <Spin tip='Loading...' spinning={this.state.isLoading}>
                        <div className='kisure-saas-customer-setting-defaultAudit-content'>
                            <Row>
                                <Col>
                                    {
                                        this.config.formItem.map((item: ISettingFormItems, index: number) => {
                                            return <Col key={index} xs={24}>
                                                        <FormItem
                                                            key={item.key + '' + item.id}
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
                        <div className='kisure-saas-customer-setting-defaultAudit-button'>
                            <Row>
                                <Col>
                                    <Button key='submit' type='primary' loading={this.state.saving} onClick={this.handleOk}>保存</Button>
                                </Col>
                            </Row>
                        </div>
                    </Spin>
                </Form>
            </div>
        );
    }
}

export default Form.create()(SaaSCustomerSettingDefaultAudit);
