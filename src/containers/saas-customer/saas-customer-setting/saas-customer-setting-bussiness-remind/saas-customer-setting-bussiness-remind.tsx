import * as React from 'react';
import { Button, Form, Row, Col, InputNumber, Switch, message, Table, Spin } from 'antd';
import { limitNumber } from '../../../../service/validate';
import { formItems, ISettingFormItems, tableColumns, tableValue, ITableValue } from './saas-customer-setting-bussiness-remind-config';
import { api } from 'src/_mock/api';
import './saas-customer-setting-bussiness-remind.scss';

interface ITdType {
    dataIndex: string; 
    type: string;
}

const FormItem = Form.Item;

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

    public componentWillReceiveProps(nextProps: any) {
        const bussinessRemind = this.props.source;

        if (nextProps['reset'] && this.form && bussinessRemind) {
            const { getFieldsValue, setFieldsValue } = this.form;
            
            const fields = getFieldsValue();

            for(const item in fields) {
                if ({}.hasOwnProperty.call(fields, item)) {
                    if (fields[item] instanceof Array) {

                    } else {
                        switch(item) {
                            case 'day':
                                fields[item] = (()=> {
                                    const id: number = nextProps['record']['id'];
                                    if (id === 1)
                                        return bussinessRemind.firstFollowPeriod;
                                    if (id === 2)
                                        return bussinessRemind.highFollowPeriod;
                                    if (id === 3)
                                        return bussinessRemind.middleFollowPeriod;
                                    if (id === 4)
                                        return bussinessRemind.lowFollowPeriod;
                                })()
                                break;
                            default:
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
     * 输入回访周期(天),发生变化
     */
    public dayChange = (num: number, form: any, field: any, record: any) => {
        const { handleChange } = this.props;
        handleChange(num, record);
    }

    public buildTdContent = (tdType: ITdType, form: any): any => {
        const { 
            dataIndex,
            record,
            canDisable,
            limitNum,
            ...restProps
        } = this.props;

        let tdContent: any = null;

        switch(tdType.type) {
            case 'inputNumber':
                tdContent = <FormItem>
                    {
                        form.getFieldDecorator(dataIndex, {
                            initialValue: record[dataIndex],
                            rules: [{validator: limitNum}]
                        })( <InputNumber key={`inputNumber-` + record.id} min={0} onChange={(e: any) => this.dayChange(e, form, dataIndex, record)} disabled={canDisable}/>) 
                    }
                </FormItem>
                break;
            default:
                tdContent = restProps.children;
                break;
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

        delete restProps.handleChange;
        delete restProps.canDisable;
        delete restProps.limitNum;
        delete restProps.reset;
        delete restProps.source;

        return (
            <td {...restProps}>
                <EditableContext.Consumer>
                    {
                        (form) => {
                            this.form = form;
                            return (
                                tdType ? this.buildTdContent(tdType, form) : restProps.children
                            )
                        }
                    }
                </EditableContext.Consumer>
            </td>
        );
    }
}

class SaaSCustomerSettingBussinessRemind extends React.PureComponent<any, any> {
    public config: any;
    public bussinessRemind: any;
    /**
     * 数据备份
     */
    public backupRequestData: any;
    
    constructor(public props: any) {
        super(props);

        this.state = {
            isLoading: false,
            saving: false,
            canDisable: true,
            reset: false
        };

        this.config = {
            formItem: this.rebuildFormItem(formItems),
            tableColumns,
            tableValue: JSON.parse(JSON.stringify(tableValue))
        };
    }

    public componentDidMount() {
        this.loadBussinessRemind();
    }

    public rebuildFormItem = (formItem: ISettingFormItems[]) => {
        return formItem.map(item => {
            const result = item;

            switch(result.key) {
                case 'inputNumber':
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

    public loadBussinessRemind() {
        this.setState({
            isLoading: true
        });

        api.getBussinessRemind().then((res: any) => {
            if (res && res.status === 200) {
                this.bussinessRemind = res.data.result;

                this.resetForm(this.bussinessRemind);

                this.formatRequestData(this.bussinessRemind);

                this.backupRequestData = {
                    bussinessRemind: res.data.result
                };
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
                            case 'advanceFollowDays':
                                fields[item] = data[item];
                                break;
                            case 'activate':
                                fields[item] = data[item] ? true : false;
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
    public formatRequestData = (bussinessRemind: any): Promise<any> => {
        this.config.formItem.forEach((item: ISettingFormItems) => {
            switch(item.key) {
                case 'advanceFollowDays':
                    item.config.initialValue = bussinessRemind.advanceFollowDays;
                    break;
                case 'activate':
                    item.config.initialValue = bussinessRemind.activate ? true : false
                    break;
            }
        });

        this.config.tableValue.forEach((item: any) => {
            switch(item.id) {
                case 1: 
                    item.day = bussinessRemind.firstFollowPeriod;
                    break;
                case 2: 
                    item.day = bussinessRemind.highFollowPeriod;
                    break;
                case 3: 
                    item.day = bussinessRemind.middleFollowPeriod;
                    break;
                case 4: 
                    item.day = bussinessRemind.lowFollowPeriod;
                    break;
            }
        });

        return new Promise((resolve) => {
            resolve('success');
        });
    }

    /**
     * 数字验证
     */
    public limitNumber = (rule: any, value: any, callback: any) => {
        if (!limitNumber(value, false, 0))
            callback(`天数不可为负数`);

        callback();
    }

    /**
     * 创建formItem
     * @param form 
     */
    public createForm = (form: ISettingFormItems, getFieldDecorator:any): any => {
        let formItem: any;

        switch(form.type) {
            case 'inputNumber':
                formItem = getFieldDecorator(form.key, {
                    initialValue: form.config.initialValue,
                    rules: form.config.rule || []
                })( <InputNumber key={`input-` + form.id} placeholder={form.placeholder || ''} style={{width: '100px'}} disabled={this.state.canDisable}/> );
                break;
            case 'switch':
                const { getFieldsValue } = this.props.form;
                const field = getFieldsValue([form.key]);

                formItem = getFieldDecorator(form.key, { 
                    initialValue: form.config.initialValue,
                    rules: form.config.rule || []
                })( <Switch checkedChildren={form.config.checked} unCheckedChildren={form.config.unChecked} checked={field[form.key]} disabled={this.state.canDisable}/> );
                break;
            case 'table': 
                const components ={
                    body: {
                        row: EditableFormRow,
                        cell: EditableCell
                    }
                };

                const columns = this.config.tableColumns.map((col: any) => {
                    return {
                        ...col,
                        onCell: (record: any) => ({
                            record,
                            title: col.title,
                            dataIndex: col.dataIndex,
                            reRender: [
                                { dataIndex: 'day', type: 'inputNumber' }
                            ],
                            canDisable: this.state.canDisable,
                            limitNum: this.limitNumber,
                            source: this.backupRequestData && this.backupRequestData.bussinessRemind || null,
                            reset: this.state.reset,
                            handleChange: this.cycleChange
                        })
                    };
                }); 

                formItem = <Table key={`table-` + form.id}
                    components={components}
                    columns={columns}
                    dataSource={this.config.tableValue}
                    rowClassName={() => 'editable-day-row'}
                    pagination={false}/>
                break;
            default:
                formItem = null;
                break;
        }

        return formItem;
    }

    /**
     * 客户维护周期内部改变
     */
    public cycleChange = (value: any, record: any) => {
        const tableVal: ITableValue[] = this.config.tableValue;

        tableVal.forEach((item: ITableValue, index: number) => {
            if (item.id === record.id) {
                item.day = value;
                this.config.tableValue = tableVal.concat(tableVal.splice(index, tableVal.length-index));
            }
        });

        /**
         * 2018/12/11
         * forEach方法中做出类似break的效果，原理：改变数组的地址，就会跳出循环
         */
    }

    /**
     * 编辑
     */
    public edit = () => {
        this.setState({
            canDisable: false,
            reset: false
        });
    }

    /**
     * 取消
     */
    public cancel = () => {
        const { getFieldsValue, setFieldsValue } = this.props.form;
        const fields = getFieldsValue();

        for(const item in fields) {
            if ({}.hasOwnProperty.call(fields, item)) {
                if (fields[item] instanceof Array) {
                    fields[item] = [];
                } else {
                    switch(item) {
                        case 'advanceFollowDays': 
                            fields[item] = this.backupRequestData.bussinessRemind[item];
                            break;
                        case 'activate': 
                            fields[item] = this.backupRequestData.bussinessRemind[item] ? true : false;
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
            canDisable: true,
            reset: true
        });
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

            api.saveBussinessRemind(params).then((res: any) => {
                this.setState({
                    saving: false,
                    isLoading: false
                });

                if (res && res.status === 200) {
                    message.success('业务提醒设置成功');
                    this.loadBussinessRemind();
                }
            });
        });
    }    

    public render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className='kisure-saas-customer-setting-bussinessRemind'>
                <Form className='inline'>
                    <Spin tip='Loading...' spinning={this.state.isLoading}>
                        <div className='kisure-saas-customer-setting-bussinessRemind-title'>
                            <p>跟踪天数设置</p>
                        </div>
                        <div className='kisure-saas-customer-setting-bussinessRemind-content'>
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
                        <div className='kisure-saas-customer-setting-bussinessRemind-button'>
                            <Row>
                                <Col>
                                    <Button key='submit' type='primary' loading={this.state.saving} onClick={this.handleOk}>保存</Button>
                                    <Button key='edit' onClick={this.edit}>编辑</Button>
                                    <Button key='cancel' onClick={this.cancel}>取消</Button>
                                </Col>
                            </Row>
                        </div>
                    </Spin>
                </Form>
            </div>
        );
    }
}

export default Form.create()(SaaSCustomerSettingBussinessRemind);

/**
 * 2018/12/11
 * 此组件还存在一个问题，刷新页面进来，初始的时候启用的switch组件并未选中。但是重复点开此组件，却可以呈现选中状态，需要待解决
 * 
 * 2018/12/14
 * 今天无意间想到的，代码如下：
 * const { getFieldsValue } = this.props.form;
 * const field = getFieldsValue([form.key]);
 */
