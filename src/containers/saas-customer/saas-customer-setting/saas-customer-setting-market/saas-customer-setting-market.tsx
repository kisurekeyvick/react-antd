import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Button, Row, Col, message, Table, Spin, Divider, Input, InputNumber, Form, Icon } from 'antd';
import { ITableColumns, tableColumns } from './saas-customer-setting-market-config';
import { limitNumber } from '../../../../service/validate';
import { KISUREPage, IPageInfo } from 'src/components/pagination/pagination-component';
import KISUREDepartmentModal from '../saas-customer-setting-modal/saas-customer-setting-modal-department/saas-customer-setting-modal-department';
import { api } from 'src/_mock/api';
import './saas-customer-setting-market.scss';

const FormItem = Form.Item;
const EditableContext = React.createContext({});
const EditableRow = ({ form, index, ...props }: any) => {
    return (
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
    )
};
const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.PureComponent<any, any> {
    public form: any;
    public deptInfo: any;

    constructor(public props: any) {
        super(props);

        this.state = {
            modelVisible: false
        };
    }

    public getInput = () => {
        if (this.props.inputType === 'number')
            return <InputNumber min={0}/>;
        else if (this.props.inputType === 'department') {
            const deptModalProps: any = {
                department: this.props.department,
                visible: this.state.modelVisible,
                handleCancel: this.toggleDept,
                handleOk: this.toggleDept
            };

            const { getFieldsValue } = this.form;
            const dept = getFieldsValue(['department']);

            return (
                <div className='market-department'>
                    <span>{ dept && dept['department'] }</span>
                    <Icon type="usergroup-add" onClick={(e: any) => this.toggleDept(e, true)}/>
                    { this.state.modelVisible && <KISUREDepartmentModal {...deptModalProps}/> }
                </div>
            );
        } else
            return <Input />;
    }

    /**
     * 选择部门
     */
    public toggleDept = (e: any, bool: boolean, dept?: any) => {
        this.setState({
            modelVisible: bool
        });

        if (dept) {
            const { setFieldsValue, getFieldsValue } = this.form; 
            this.deptInfo = dept;
            const fields = getFieldsValue();
            fields['department'] = this.deptInfo['title'];
            this.props.deptSelectedEcho({departmentId: this.deptInfo['id']});
            setFieldsValue(fields);
        }
    }

    public render() {
        const { 
            editing,
            dataIndex,
            title,
            record,
            limitNum,
            ...restProps } = this.props;

        delete restProps.inputType;
        delete restProps.departmentId;
        delete restProps.deptSelectedEcho;

        const rules: any = [{required: true, message: `请输入${title}!`}];
        if (this.props.inputType === 'number')
            rules.push({validator: limitNum});

        return (
            <EditableContext.Consumer>
                {(form: any) => {
                    this.form = form;
                    const { getFieldDecorator } = form;
                    
                    return (
                        <td {...restProps}>
                            {
                                editing ?
                                (<FormItem style={{ margin: 0 }}>
                                        {
                                            getFieldDecorator(dataIndex, {
                                                initialValue: record[dataIndex],
                                                rules,
                                            })( this.getInput() )
                                        }
                                </FormItem>) : restProps.children
                            }
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

export default class SaaSCustomerSettingMarket extends React.PureComponent<any, any> {
    static propsType = {
        department: PropTypes.array.isRequired
    }

    public config: any;
    public pageInfo: IPageInfo;
    public mktPlanList: any[] = [];
    public modifyDeptInfo: any = {};
    
    constructor(public props: any) {
        super(props);

        this.config = {
            tableColumns: this.rebuildTableColumn(tableColumns)
        };

        this.state = {
            isLoading: false,
            checkOperationCount: 0,
            addMktPlanCount: 0
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

    /**
     * 重建tablecolumn
     */
    public rebuildTableColumn = (colums: ITableColumns[]) => {
        return colums.map((table: ITableColumns) => {
            let result: ITableColumns = table;

            switch(table.id) {
                case 5:
                    result = {...result, ...{
                        render: (text: any, record: any) => (
                            <span>
                                {
                                    record.showCancel ?
                                    <EditableContext.Consumer>
                                        {(form: any) => {
                                            return <React.Fragment>
                                                    <a href="javascript:;" onClick={() => this.saveMarket(form, record)}>确定</a>
                                                    <Divider type="vertical" />
                                                    <a href="javascript:;" onClick={() => this.cancelMarket(text, record)}>取消</a>
                                                    <Divider type="vertical" />
                                                    <a href="javascript:;" onClick={() => this.deleteMarket(text, record)}>删除</a>
                                                </React.Fragment>
                                        }}
                                    </EditableContext.Consumer> : 
                                    <React.Fragment>
                                        <a href="javascript:;" onClick={() => this.editMarket(text, record)}>编辑</a>
                                        <Divider type="vertical" />
                                        <a href="javascript:;" onClick={() => this.deleteMarket(text, record)}>删除</a>
                                    </React.Fragment>
                                }
                            </span>
                        )
                    }};
                    break;
                default: 
                    break;
            }

            return result;
        });
    }

    public componentDidMount() {
        this.page(this.pageInfo.currentPage, this.pageInfo.pageSize);
    }

    /**
     * 初始化所有营销方案配置及状态
     */
    public initMktPlanList = () => {
        this.setState({
            checkOperationCount: 0,
            addMktPlanCount: 0
        });

        this.pageInfo = {
            currentPage: 1,
            pageCount: 0,
            pageSize: 5,
            rowCount: 0,
            totalCount: 0,
            pageSizeOptions: ['5', '10', '15']
        };
    }

    /**
     * 加载营销方案列表
     */
    public loadMarketList = (params?: any) => {
        this.setState({
            isLoading: true
        });

        api.getMarketPlanList(params).then((res: any) => {
            const { list, pageInfo } = res.data.result;

            this.mktPlanList = this.mapTableList(list);

            this.pageInfo = {...this.pageInfo, ...{ totalCount: pageInfo.totalCount }};

            this.setState({
                isLoading: false
            });
        });
    }

    /**
     * 映射列表数据
     * @param list 
     */
    public mapTableList = (list: any[]): any[] => {
        return list.map((item:any, index:number) => {
            const result = {...item, ...{
                faceValue: item.marketPrice / 100,
                cost: item.costPrice / 100,
                department: item.costDepartmentName,
                departmentId: item.costDepartmentId,
                key: `${item.id}`
            }};
            return result;
        });
    }

    /**
     * 保存营销方案
     */
    public saveMarket = (form: any, record: any) => {
        form.validateFields((error: any, row: any) => {
            if (error)
                return;

            this.setState({
                isLoading: true
            });

            const target = this.mktPlanList.find((list: any) => list.id === row.id) || {};
            const params = {...target,...row, ...this.modifyDeptInfo};
    
            api.saveMarketPlan(params).then((res: any) => {
                if (res && res.status === 200) {
                    message.success('营销方案保存成功');
                    this.initMktPlanList();
                    this.page(this.pageInfo.currentPage, this.pageInfo.pageSize);
                } else
                    this.setState({
                        isLoading: false
                    });
            });
        });
    }

    /**
     * 取消编辑营销方案
     */
    public cancelMarket = (text: any, record?: any) => {
        const target = this.mktPlanList.find((list: any) => list.id === text.id);
        target['showCancel'] = false;
        this.setState({
            checkOperationCount: this.state.checkOperationCount + 1
        });
    }

    /** 编辑营销方案 */
    public editMarket = (text: any, record?: any) => {
        const target = this.mktPlanList.find((list: any) => list.id === text.id);
        target['showCancel'] = true;
        this.setState({
            checkOperationCount: this.state.checkOperationCount + 1
        });
    }

    /**
     * 删除营销方案
     */
    public deleteMarket = (text: any, record: any) => {
        if (!record.id) {
            const index: number = this.mktPlanList.findIndex((list: any) => list.key === record.key);
            this.mktPlanList.splice(index, 1);
            this.setState({
                checkOperationCount: this.state.checkOperationCount + 1
            });
        } else {
            this.setState({
                isLoading: true
            });

            const params = {};

            api.deleteMarketPlan(params).then((res: any) => {
                if (res && res.status === 200) {
                    message.success('营销方案删除成功');
                    this.initMktPlanList();
                    this.page(this.pageInfo.currentPage, this.pageInfo.pageSize);
                } else 
                    this.setState({
                        isLoading: false
                    });
            });
        }
    }

    /**
     * 数字验证
     */
    public limitNumber = (rule: any, value: any, callback: any) => {
        if (!limitNumber(value, false, 0))
            callback(`不可为负数`);

        callback();
    }

    /**
     * 部门选择
     */
    public deptSelectedEcho = (deptInfo: any) => {
        this.modifyDeptInfo = deptInfo;
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

        this.loadMarketList(params);
    }

    /**
     * 新增营销工具
     */
    public handleOk = () => {
        const item: any = {
            name: '',
            faceValue: 0,
            cost: 0,
            department: '',
            showCancel: true,
            key: 'time' + new Date().getTime()
        };

        this.mktPlanList.unshift(item);

        this.setState({
            addMktPlanCount: this.state.addMktPlanCount + 1
        });
    }

    public render() {
        const components = {
            body: {
              row: EditableFormRow,
              cell: EditableCell,
            },
        };

        const columns = this.config.tableColumns.map((col: any) => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: (record: any) => ({
                    record,
                    inputType: col.dataIndex === 'faceValue' || col.dataIndex === 'cost' ? 
                                'number' : col.dataIndex === 'department' ? 'department' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    limitNum: this.limitNumber,
                    department: this.props.department,
                    departmentId: record['departmentId'],
                    deptSelectedEcho: this.deptSelectedEcho,
                    editing: record.showCancel,
                })
            };
        });

        return (
            <Spin tip='Loading...' spinning={this.state.isLoading}>
                <div className='kisure-saas-customer-setting-market-table'>
                    <Table 
                        components={components}
                        columns={columns} 
                        dataSource={this.mktPlanList} 
                        pagination={false} 
                        rowClassName={() => 'editable-row'}/>
                </div>
                <div className='kisure-saas-customer-setting-market-page'>
                    <KISUREPage pageChange={this.page} {...this.pageInfo}/>
                </div>
                <div className='kisure-saas-customer-setting-market-button'>
                    <Row>
                        <Col>
                            <Button key='submit' type='primary' onClick={this.handleOk}>新增</Button>
                        </Col>
                    </Row>
                </div>
            </Spin>
        );
    }
}
