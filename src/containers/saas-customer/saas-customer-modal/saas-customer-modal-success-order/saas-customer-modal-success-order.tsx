import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Modal, Button, Form, Row, Col, Input, Select, DatePicker, InputNumber, Spin, Table, Tabs, Skeleton, Checkbox } from 'antd';
import { Iform } from '../interface';
import { orderDetailFormItem, 
        giftDetailFormItem, 
        IFormItem,
        IOrderMethod, 
        giftTableColumns,
        successOrderMethod } from './saas-customer-modal-success-order-config';
import { limitNumber } from '../../../../service/validate';
import { IPageInfo } from '../../../../components/pagination/pagination-component';
import { api } from 'src/_mock/api';
import './saas-customer-modal-success-order.scss';

interface ITdType {
    dataIndex: string; 
    type: string;
}

const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;
const TabPane = Tabs.TabPane;

const EditableContext = React.createContext({});
const EditableRow: any = (({form, index, ...props}: any) => {
    return <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
});
const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.PureComponent<any, any> {
    public form: any;
    
    constructor(public props: any) {
        super(props);
    }

    public changeGiftMount = (num: number, form: any, field: any, record: any) => {
        const currentValue = form.getFieldsValue([field]);
        const { handleSave } = this.props;
        const value = {
            [field]: +(currentValue[field] ? currentValue[field] : 0) + num
        };
        
        form.setFieldsValue(value);
        handleSave({...record, ...value});
    }

    public buildTdContent = (tdType: ITdType, form: any): any => {
        const { 
            dataIndex,
            record,
            ...restProps
        } = this.props;
        let tdContent: any = null;

        switch(tdType.type) {
            case 'button-input-group':
                tdContent = <FormItem>
                    {
                        <ButtonGroup key={`buttonGroup-` + record.id}>
                            <Button key={`buttonMinus-` + record.id} onClick={()=> this.changeGiftMount(-1, form, dataIndex, record)}>-</Button>                   
                            { 
                                form.getFieldDecorator(dataIndex, {
                                    initialValue: record[dataIndex],
                                    rules: []
                                })( <InputNumber key={`inputNumber-` + record.id} min={0}/>) 
                            }
                            <Button key={`buttonPlus-` + record.id} onClick={()=> this.changeGiftMount(1, form, dataIndex, record)}>+</Button>
                        </ButtonGroup>
                    }
                </FormItem>
                break;
            default:
                tdContent = restProps.children;
                break
        }

        return tdContent;
    }

    public render() {
        const { 
            dataIndex,
            reRender,
            ...restProps
        } = this.props;

        const tdType: ITdType = reRender && reRender instanceof Array ? (() => {
            return reRender.find(i => i.dataIndex === dataIndex) || null;
        })(): null;

        delete restProps.handleSave;

        return (
            <td {...restProps}>
                <EditableContext.Consumer>
                    {(form: any)=> {
                        this.form = form;
                        return (
                            tdType ? this.buildTdContent(tdType, form) : restProps.children
                        )
                    }}
                </EditableContext.Consumer>
            </td>
        )
    }
}

class SaaSCustomerModalSuccesOrder extends React.PureComponent<any, any> {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        handleOk: PropTypes.func.isRequired,
        handleCancel: PropTypes.func.isRequired,
        task: PropTypes.object.isRequired,
        company: PropTypes.array,
        defaultActiveKey: PropTypes.string
    }

    static defaultProps= {
        company: [],
        defaultActiveKey: '1'
    }

    public config: any;
    public mktPlanList: any[] = [];
    public pageInfo: IPageInfo;
    public currentFormItem: IFormItem[] = [];
    public insPlanList: any[] = [];

    constructor(public props: any) {
        super(props);

        this.state = {
            loading: false,
            loadingInfo: false,
            existSuccessOrderDetail: true,
            currentMethod: this.props.defaultActiveKey
        };

        this.config = {
            orderDetail: this.rebuildFormItem(orderDetailFormItem),
            giftDetail: this.rebuildFormItem(giftDetailFormItem),
            giftTableColumns
        };

        this.pageInfo = {
            currentPage: 1,
            pageCount: 0,
            pageSize: 5,
            rowCount: 0,
            totalCount: 0,
            pageSizeOptions: ['5', '10', '15', '20']
        };

        this.tabsChange('1', true);
    }

    /**
     * 重建formItem
     * @param formItem 
     */
    public rebuildFormItem = (formItem: IFormItem[]) => {
        return formItem.map(item => {
            const result = item;

            switch(result.key) {
                case 'insCompany': 
                    result.config = {...result.config, ...{
                        onChange: (e: any) => {
                            this.companyChange(e);
                        },
                        options: [
                            ...this.props.company.map((i: any) => {
                                return {...i, ...{
                                    name: i.shortName,
                                    value: i.id,
                                }};
                            })
                        ]
                    }};
                    break;
                case 'insCipremium': 
                case 'taxAmount': 
                case 'inputNumber': 
                case 'backAmount':
                    result.config.rule.push({
                        validator: this.limitNumber
                    });
                    break;
                default:
                    break;
            }

            return result;
        })
    }

    public componentDidMount() {
        this.setState({
            loadingInfo: true
        });

        Promise.all([
            api.getMktPlanList(),
            api.getTaskStatus(),
            api.getInsPlanList()
        ]).then((res: any) => {
            if (res) {
                this.mktPlanList = res[0].data.result.list.map((item: any, index: number)=> {
                    return {...item, ...{
                        costPrice: item.costPrice / 100,
                        marketPrice: item.marketPrice / 100,
                        mount: undefined,
                        key: `${item.id}`
                    }};
                });

                this.insPlanList = res[2].data.result;

                this.setState({
                    loadingInfo: false,
                    existSuccessOrderDetail: res[1].data.result
                });
            } else
                this.setState({
                    loadingInfo: false
                });
        });
    }

    /**
     * 切换保险公司，加载保险公司相关的险种
     * @param companyId 
     */
    public companyChange = (companyId: number) => {
        console.log(companyId);
    }

    /**
     * tab切换，切换成单方式
     * @param tabs
     */
    public tabsChange = (tabs: string, notSetState?: boolean) => {
        const target = successOrderMethod.find((order: any) => order.method === tabs);

        if (target) {
            const formItemId: any[] = target['formId'];
            this.currentFormItem = this.config.orderDetail.filter((order: Iform) => order['id'] in formItemId);
        }

        if (!notSetState)
            this.setState({
                currentMethod: tabs
            });
    }

    /**
     * 金额验证
     */
    public limitNumber = (rule: any, value: any, callback: any) => {
        if (!limitNumber(value, false, 0))
            callback('金额不能为负数');

        callback();
    }

    public handleCancel = () => {
        this.props.handleCancel('cancel', false);
    }
    
    public handleOk = () => {
        this.props.form.validateFields((err: any, fieldsValue: any) => {
            if(err)
                return

            this.setState({
                loading: true
            });

            api.successOrder().then((res: any) => {
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
            case 'inputText':
                formItem = getFieldDecorator(form.key, {
                    initialValue: form.config.initialValue,
                    rules: form.config.rule || []
                })( <Input key={`input-` + form.id} placeholder={form.placeholder || ''}/> );
                break;
            case 'inputNumber':
                formItem = getFieldDecorator(form.key, {
                    initialValue: form.config.initialValue,
                    rules: form.config.rule || []
                })( <InputNumber key={`input-` + form.id} placeholder={form.placeholder || ''} style={{width: '100%'}}/> );
                break;
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
            case 'datePicker':
                formItem = getFieldDecorator(form.key, {
                    initialValue: form.config.initialValue,
                    rules: form.config.rule || []
                })( <DatePicker key={`datePicker-` + form.id} format={form.config.format || 'YYYY-MM-DD'} style={{'minWidth': '60%', 'marginRight':'10%'}}/>);
                break;
            default:
                formItem = null;
                break;
        }

        return formItem;
    }

    /**
     * 创建保险公司险种
     */
    public createInsPlanForm = (insPlanList: any[], getFieldDecorator: any): any => {
        const planList = JSON.parse(JSON.stringify(insPlanList));
        planList.splice(7, 0, {title: '附加险'});

        return planList.map((plan: any, index: number) => {
            if (plan.id !== 1 && plan.id !== 2 && 'id' in plan) {
                let formItem: any[] = [];
                const type = plan.insItemTypeToPc ? JSON.parse(plan.insItemTypeToPc) : plan.insItemTypeToPc;
                const str: string = type && type instanceof Array ? (() => {
                    let val: string = '';
                    type.forEach((key)=> {
                        val += key['key']
                    });
                    return val;
                })() : '';

                switch(str) {
                    case '2':
                    case '42':
                    case '2424':
                        formItem = [
                            getFieldDecorator(`insItemId-checkbox-${plan.insItemId}`, {
                                initialValue: undefined,
                                rule: []
                            })(<Checkbox key={`checkbox-` + plan.id}>{plan.insItemName}</Checkbox>),
                            getFieldDecorator(`insItemId-input-${plan.insItemId}`, {
                                initialValue: undefined,
                                rule: []
                            })(<Input key={`input-` + plan.id} placeholder={'请输入'}/>),
                            plan.isNoReduce ?
                                getFieldDecorator(`insItemId-isNoReduce-${plan.insItemId}`, {
                                    initialValue: undefined,
                                    rule: []
                                })(<Checkbox key={`checkbox-isNoReduce` + plan.id}>不计免赔</Checkbox>): null
                        ];
                        break;
                    case '3':
                    case '43':
                    case '3424':
                        formItem = [
                            getFieldDecorator(`insItemId-checkbox-${plan.insItemId}`, {
                                initialValue: undefined,
                                rule: []
                            })(<Checkbox key={`checkbox-` + plan.id}>{plan.insItemName}</Checkbox>),
                            getFieldDecorator(`insItemId-select-${plan.insItemId}`, {
                                initialValue: undefined,
                                rule: []
                            })(
                                <Select  key={`select-` + plan.id} style={{width: '100px','margin': '0 16px'}}>
                                    {
                                        plan.optionValues.map((option: any, i: number)=> {
                                            if (!isNaN(+(option))) {
                                                const name = `${option / 100 > 9999 ? (option / 100 / 10000) + '万' : (option / 100) + '元'}`;
                                                return <Option key={`option-` + index} value={+(option)}>{name}</Option>
                                            } else
                                                return <Option key={`option-` + index} value={option}>{option}</Option>
                                        })
                                    }
                                </Select>
                            ),
                            plan.isNoReduce ?
                                getFieldDecorator(`insItemId-isNoReduce-${plan.insItemId}`, {
                                    initialValue: undefined,
                                    rule: []
                                })(<Checkbox key={`checkbox-isNoReduce` + plan.id}>不计免赔</Checkbox>): null
                        ];
                        break;
                    default:
                        formItem = [
                            getFieldDecorator(`insItemId-checkbox-${plan.insItemId}`, {
                                initialValue: undefined,
                                rule: []
                            })(<Checkbox key={`checkbox-` + plan.id}>{plan.insItemName}</Checkbox>)
                        ];
                        break;
                }

                return <Col key={index} xs={24} sm={12} lg={8}>
                            {
                                formItem.map((item: any, j: number) => {
                                    return <FormItem
                                                key={plan.insItemId + '' + j}>
                                                { item }
                                            </FormItem>
                                })
                            }
                        </Col>;
            } else if ('title' in plan)
                return <Col key={index} xs={24}>
                            <p className='insPlantitle'>附加险</p>
                        </Col>
            else
                return null;
        }).filter((plan: any) => plan);
    }
    
    /**
     * 改变产品方案数量
     */
    public getGiftList = (record: any) => {
        console.log(record);
    }

    public render() {
        const { getFieldDecorator } = this.props.form;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell
            }
        };
        const columns = this.config.giftTableColumns.map((col: any) => {
            return {
                ...col,
                onCell: (record: any) => ({
                    record,
                    title: col.title,
                    dataIndex: col.dataIndex,
                    reRender: [
                        { dataIndex: 'mount', type: 'button-input-group' }
                    ],
                    handleSave: this.getGiftList
                }),
            };
        });

        return (
            <Form layout='inline'>
                <Modal
                visible={this.props.visible}
                title={this.props.title}
                onCancel={this.handleCancel}
                footer={null}
                maskClosable={false}
                width={'90%'}>
                    <Spin tip='Loading...' spinning={this.state.loadingInfo}>
                        <div className='kisure-saas-customer-modal-success-order-content'>
                            {
                                !this.state.existSuccessOrderDetail ? <div>
                                    <div className='kisure-saas-customer-modal-content kisure-saas-customer-modal-order-detail'>
                                        <Tabs defaultActiveKey={this.props.defaultActiveKey} onChange={(e) => this.tabsChange(e)}>
                                            {
                                                successOrderMethod.map((order: IOrderMethod, i: number) => {
                                                    return <TabPane tab={order.describe} key={order.method}>
                                                                <Row gutter={48}>
                                                                    {
                                                                        this.state.currentMethod === order.method ? <div>
                                                                            {
                                                                                this.currentFormItem.map((item: Iform, index: number) => {
                                                                                    return <Col key={index} xs={24} sm={12} lg={8}>
                                                                                                <FormItem
                                                                                                    key={item.key + '' + item.id}
                                                                                                    {...item.config.formItemLayout}
                                                                                                    label={item.label}
                                                                                                    hasFeedback={true}>
                                                                                                    { this.createForm(item, getFieldDecorator) }
                                                                                                </FormItem>
                                                                                            </Col>
                                                                                })
                                                                            }
                                                                        </div> : null
                                                                    }
                                                                </Row>
                                                            </TabPane>
                                                })
                                            }
                                        </Tabs>
                                    </div>
                                </div> : null
                            }
                            
                            <p className='title'>险种内容</p>
                            <div className='kisure-saas-customer-modal-content kisure-saas-customer-modal-ins-detail'>
                                {
                                    this.state.loadingInfo ? 
                                    <Skeleton active={true}/> : 
                                    this.insPlanList.length > 0 ? 
                                    <Row gutter={48}>
                                       {  this.createInsPlanForm(this.insPlanList, getFieldDecorator) }
                                    </Row> : <p>暂无险种</p>
                                }
                            </div>
                            <p className='title'>赠品内容</p>
                            <div className='kisure-saas-customer-modal-content kisure-saas-customer-modal-gift-detail'>
                                <Row gutter={48}>
                                    {
                                        this.config.giftDetail.map((item: Iform, index: number) => {
                                            return <Col key={index} xs={24} sm={12} lg={8}>
                                                        <FormItem
                                                            key={item.key + '' + item.id}
                                                            {...item.config.formItemLayout}
                                                            label={item.label}
                                                            hasFeedback={true}>
                                                            { this.createForm(item, getFieldDecorator) }
                                                        </FormItem>
                                                    </Col>
                                        })
                                    }
                                </Row>

                                <div className='kisure-saas-customer-modal-gift-table'>
                                    <Table
                                        components={components}
                                        columns={columns}
                                        dataSource={this.mktPlanList}
                                        rowClassName={() => 'editable-row'}
                                        scroll={{x:1400}}/>
                                </div>
                            </div>
                        </div>

                        <Row className='kisure-saas-customer-modal-success-order-button'>
                            <Col>
                                <Button key='cancel' onClick={this.handleCancel}>取消</Button>
                                <Button key='submit' className='red' type='primary' loading={this.state.loading} onClick={this.handleOk}>确认</Button>
                            </Col>
                        </Row>
                    </Spin>
                </Modal>
            </Form>
        )
    }
}

export default Form.create()(SaaSCustomerModalSuccesOrder);
