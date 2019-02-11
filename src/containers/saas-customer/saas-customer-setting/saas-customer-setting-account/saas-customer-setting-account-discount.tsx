import * as React from 'react';
import { Button, Form, Row, Col, Icon, Tooltip, InputNumber } from 'antd';
import * as PropTypes from 'prop-types';
import { ISettingFormItems, insCompanyDiscountFormItems } from './saas-customer-setting-account-config';
import { limitNumber } from '../../../../service/validate';
import './saas-customer-setting-account-discount.scss';

const FormItem = Form.Item;

class SaaSCustomerSettingAccountDiscount extends React.PureComponent<any, any> {
    static propTypes = {
        save: PropTypes.func.isRequired,
        discountInfo: PropTypes.object.isRequired
    }

    public config: any;

    constructor(public props: any) {
        super(props);

        this.config = {
            iConStyle: {
                opacity: 1,
                width: '25px'
            },
            buttonGroupStyle: {
                opacity: 0,
                width: 0
            },
            discountForm: this.rebuildDiscountForm(insCompanyDiscountFormItems)
        };

        this.state = {
            iConEditStatus: 'cancel'
        };
    }

    public componentWillReceiveProps(nextProps: any) {
        console.log(nextProps);
    }

    public rebuildDiscountForm = (formItem: ISettingFormItems[]) => {
        return formItem.map(item => {
            const result  = item;

            switch(result.key) {
                case 'discount':
                    result.config.rule.push({
                        validator: this.limitNumber
                    });
                    break;
                default:
                    break;
            }

            return result;
        });
    }

    /**
     * 数字验证
     */
    public limitNumber = (rule: any, value: any, callback: any) => {
        if (!limitNumber(value, false, 0))
            callback(`返点比例不可为负数`);

        callback();
    }

    /** 
     * 编辑保险公司返点信息
     */
    public edit = (type: string) => {
        this.config = {...this.config, ...{
            iConStyle: {
                opacity: type === 'expand' ? 0 : 1,
                width: type === 'expand' ? '0px' : '25px'
            },
            buttonGroupStyle: {
                opacity: type === 'expand' ? 1 : 0,
                width: type === 'expand' ? '105px' : '0px'
            }
        }};

        if (type === 'save') {
            const { getFieldsValue } = this.props.form;
            const fields = getFieldsValue()
            const params = {
                discount: fields['discount'],
            };
            console.log('请求的参数：', params);
            this.props.save(type, params);
        } else 
            this.setState({
                iConEditStatus: type
            });
    }

    /**
     * 初始化数据
     */
    public resetForm = () => {
        const { getFieldsValue, setFieldsValue } = this.props.form;

        if (getFieldsValue && setFieldsValue) {
            const fields = getFieldsValue();

            for(const item in fields) {
                if ({}.hasOwnProperty.call(fields, item)) {
                    if (fields[item] instanceof Array) {
                        fields[item] = [];
                    } else {
                        switch(item) {
                            case 'discount':
                                fields[item] = undefined;
                                break;
                        }
                    }
                }
            }

            setFieldsValue(fields);
        }
    }

    /**
     * 创建保险公司返点信息表单
     * @param form
     * @param getFieldDecorator
     */
    public createInsCompanyForm = (form: ISettingFormItems, getFieldDecorator:any): any => {
        let formItem: any;

        switch(form.type) {
            case 'inputNumber':
                const { getFieldsValue, setFieldsValue } = this.props.form;
                const field = getFieldsValue([form.key]);
                const initialValue = this.props.discountInfo[form.key] || undefined;

                if (!field[form.key] && initialValue) {
                    setFieldsValue({
                        [form.key]: initialValue
                    });
                }
 
                formItem = getFieldDecorator(form.key, {
                    initialValue,
                    rules: form.config.rule || []
                })( 
                    <div>
                    {
                        this.state.iConEditStatus === 'cancel' ?
                        <span>{field[form.key]}%</span> :
                        <div>
                            <InputNumber key={`input-` + form.id} placeholder={form.placeholder || ''} defaultValue={field[form.key]} style={{width: '100px'}} min={form.config.min}/> %
                        </div> 
                    }
                    </div>
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
            <div className='kisure-saas-customer-setting-account-discount'>
                <div className='title'>
                    <label>保险公司返点信息</label>
                    <span className='edit'>
                        <Tooltip title='点击编辑保险公司返点信息'>
                            <Icon type="edit" onClick={() => this.edit('expand')} style={this.config.iConStyle}/>
                        </Tooltip>
                        <span className='edit-operation' style={this.config.buttonGroupStyle}>
                            <Button type='default' size={'small'} onClick={() => this.edit('cancel')}>取消</Button>
                            <Button type='primary' size={'small'} onClick={() => this.edit('save')}>保存</Button>
                        </span>
                    </span>
                </div>
                <div className="kisure-saas-customer-setting-account-discount-form">
                    <Row>
                        <Col>
                            {
                                this.config.discountForm.map((item: ISettingFormItems, index: number) => {
                                    return <Col key={index} xs={24} sm={12} md={8}>
                                                <FormItem
                                                    key={item.key + '' + item.id}
                                                    {...item.config.formItemLayout}
                                                    label={item.label}>
                                                    { this.createInsCompanyForm(item, getFieldDecorator) }
                                                </FormItem>
                                            </Col>
                                })
                            }
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Form.create()(SaaSCustomerSettingAccountDiscount);
