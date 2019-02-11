import * as React from 'react';
import { Button, Form, Row, Col, InputNumber, message, Table, Spin, Radio } from 'antd';
import { limitNumber } from '../../../../service/validate';
import { ISettingFormItems, formItems, tableColumns } from './saas-customer-setting-rule-assign-config';
import { KISUREPage, IPageInfo } from 'src/components/pagination/pagination-component';
import { api } from 'src/_mock/api';
import './saas-customer-setting-rule-assign.scss';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

class SaaSCustomerSettingRuleAssign extends React.PureComponent<any, any> {
    public config: any;
    public ruleAssign: any;
    public ratioList: any[] = [];
    public pageInfo: IPageInfo;
    /**
     * 数据备份
     */
    public backupRequestData: any;

    constructor(public props: any) {
        super(props);

        this.state = {
            isLoading: false,
            saving: false,
            reset: false
        };

        this.config = {
            formItem: this.rebuildFormItem(formItems),
            tableColumns: [...tableColumns],
            tableValue: []
        };

        this.pageInfo = {
            currentPage: 1,
            pageCount: 0,
            pageSize: 5,
            rowCount: 0,
            totalCount: 0,
            pageSizeOptions: ['5', '10', '15']
        };
    }

    public componentDidMount() {
        this.loadRuleAssign();
    }

    public loadRuleAssign() {
        this.setState({
            isLoading: true
        });

        const ratioListParams: any = {
            pageInfo: {
                currentPage: this.pageInfo.currentPage,
                pageSize: this.pageInfo.pageSize
            }
        };

        Promise.all([
            api.getRuleAssign(),
            api.getDistributionRatioList(ratioListParams),
        ]).then((res: any) => {
            if (res.some((i: any) => i.status === 200)) {
                this.ruleAssign = res[0].data.result;

                const { list, pageInfo } = res[1].data.result;

                this.resetForm(this.ruleAssign);

                this.formatRequestData(this.ruleAssign);

                this.ratioList = this.mapTableList(list);

                this.pageInfo = {...this.pageInfo, ...{ totalCount: pageInfo.totalCount }};

                this.backupRequestData = {
                    ruleAssign: res[0].data.result
                };
            }

            this.setState({
                isLoading: false
            });
        });
    }

    public rebuildFormItem = (formItem: ISettingFormItems[]) => {
        return formItem.map(item => {
            const result = item;

            switch(result.key) {
                case 'ratio':
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
                            case 'assign': 
                                fields[item] = data['distributionRule'];
                                break;
                            case 'ratio': 
                                fields[item] = data['distributionProportionRise'];
                                break;
                            default:
                                fields[item] = undefined;
                                break;
                        }
                    }
                }
            }
    
            setFieldsValue(fields);
            
            this.setState({
                reset: true
            });
        }
    }

    /**
     * format获取请求后的数据
     */
    public formatRequestData = (ruleAssign: any) => {
        this.config.formItem.forEach((item: ISettingFormItems) => {
            switch(item.key) {
                case 'assign':
                    item.config.initialValue = ruleAssign['distributionRule'];
                    break;
                case 'ratio':
                    item.config.initialValue = ruleAssign['distributionProportionRise'];
                    break;
            }
        });
    }

    /**
     * 映射列表数据
     * @param list 
     */
    public mapTableList = (list: any[]): any[] => {
        return list.map((item:any, index:number) => {
            const result = {...item, ...{
                rate: `${item.turnoverRate / 100}%`,
                assignRate: `${item.distributionRate / 100}%`,
                key: `${item.id}`
            }};
            return result;
        });
    }

    /**
     * 加载当前分配比例数据
     */
    public loadButionRatioList = (param?: any) => {
        this.setState({ 
            isLoading: true
        });

        api.getDistributionRatioList(param).then((res: any) => {
            const { list, pageInfo } = res.data.result;

            this.ratioList = this.mapTableList(list);

            this.pageInfo = {...this.pageInfo, ...{ totalCount: pageInfo.totalCount }};

            this.setState({ 
                isLoading: false,
            });
        });
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
            case 'inputNumber':
                const { getFieldsValue } = this.props.form;
                const field = getFieldsValue([form.key]);

                formItem = getFieldDecorator(form.key, {
                    initialValue: form.config.initialValue,
                    rules: form.config.rule || []
                })( <div>
                        <InputNumber key={`input-` + form.id} placeholder={form.placeholder || ''} value={ field[form.key] || form.config.initialValue} style={{width: '100px'}} min={form.config.min}/> %
                    </div> );
                break;
            case 'table':
                formItem = <React.Fragment>
                                <div className='kisure-saas-customer-setting-bussinessRemind-table'>
                                    <Table 
                                        columns={this.config.tableColumns} 
                                        dataSource={this.ratioList} 
                                        pagination={false} />
                                </div>
                                <div className='kisure-saas-customer-setting-bussinessRemind-page'>
                                    <KISUREPage pageChange={this.page} {...this.pageInfo}/>
                                </div>
                            </React.Fragment>
                break;
            case 'pureText':
                formItem = <p className='instructions'>{form.config.content}</p>;
                break;
            default:
                formItem = null;
                break;
        }

        return formItem;
    }

    /**
     * 数字限制
     */
    public limitNumber = (rule: any, value: any, callback: any) => {
        if (!limitNumber(value, false, 0))
            callback(`比例不可为负数`);

        callback();
    }

    /**
     * 分页回调
     * @param currentPage 
     * @param pageSize 
     */
    public page = (currentPage:number, pageSize: number, isSearchCallBack: boolean = false) => {
        this.pageInfo = {...this.pageInfo, ...{
            currentPage: currentPage === 0 ? 1 : currentPage,
            pageSize
        }};

        const params: any = {
            pageInfo: {
                currentPage: currentPage === 0 ? 1 : currentPage,
                pageSize
            }
        };

        this.loadButionRatioList(params);
    }

    /**
     * 取消
     */
    public cancel = () => {
        this.resetForm(this.backupRequestData.ruleAssign);
    }

    /**
     * 提交
     */
    public handleOk = () => {
        this.props.form.validateFields((err: any, fieldsValue: any) => {
            if(err)
                return;

            this.setState({
                saving: true,
                isLoading: true
            });

            const params = this.props.form.getFieldsValue();

            api.saveRuleAssign(params).then((res: any) => {
                this.setState({
                    saving: false,
                    isLoading: false
                });

                if (res && res.status === 200) {
                    message.success('分配规则设置成功');
                    this.loadRuleAssign();
                }
            });
        })
    }

    public render() {
        const { getFieldDecorator } = this.props.form;

        this.ratioList = this.mapTableList(this.ratioList);

        return (
            <div className='kisure-saas-customer-setting-ruleAssign'>
                <Form className='inline'>
                    <Spin tip='Loading...' spinning={this.state.isLoading}>
                        <div className='kisure-saas-customer-setting-bussinessRemind-form'>
                            <Row>
                                <Col>
                                    {
                                        this.config.formItem.map((item: ISettingFormItems, index: number) => {
                                            return <Col key={index} xs={24}>
                                                        <FormItem
                                                            key={item.key + '' + item.id}
                                                            {...item.config.formItemLayout}
                                                            label={item.label}
                                                            hasFeedback={item.config.hasFeedback}>
                                                            { this.createForm(item, getFieldDecorator) }
                                                        </FormItem>
                                                    </Col>
                                        })
                                    }
                                </Col>
                            </Row>
                        </div>
                        
                        <div className='kisure-saas-customer-setting-ruleAssign-button'>
                            <Row>
                                <Col>
                                    <Button key='submit' type='primary' loading={this.state.saving} onClick={this.handleOk}>保存</Button>
                                    <Button key='cancel' onClick={this.cancel}>取消</Button>
                                </Col>
                            </Row>
                        </div>
                    </Spin>
                </Form>
            </div>
        )
    }
};

export default Form.create()(SaaSCustomerSettingRuleAssign);
