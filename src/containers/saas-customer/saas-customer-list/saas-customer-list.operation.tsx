import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Button, message } from 'antd';
import { KISUREMessage } from 'src/components/message/message-list-component';
import KISURENewCustomer from '../saas-customer-modal/saas-customer-modal-new-customer/saas-customer-modal-new-customer';
import KISUREBatchAssign from '../saas-customer-modal/saas-customer-modal-batch-assign/saas-customer-modal-batch-assign';
import KISUREBatchSMS from '../saas-customer-modal/saas-customer-modal-batch-sms/saas-customer-modal-batch-sms';
import KISUREBatchImport from '../saas-customer-modal/saas-customer-modal-batch-import/saas-customer-modal-batch-import';
import { excelKeyWord, excelErrorKeyWord, excelInstructions } from './saas-customer-list.config';

export default class SaaSCustomerOperation extends React.PureComponent<any, any> {
    static propTypes = {
        totalCount: PropTypes.number.isRequired,
        customers: PropTypes.array.isRequired,
        dictionary: PropTypes.object.isRequired,
        reloadEmitter: PropTypes.func.isRequired,
        renewalMan: PropTypes.array
    }

    static defaultProps = {
        customers: [],
        renewalMan: []
    }

    public canBatchAssign: boolean = false;
    public canBatchSMS: boolean = false;

    constructor(public props: any) {
        super(props);

        this.state = {
            newCustomerVisible: false,
            batchAssignVisible: false,
            batchSMSVisible: false,
            batchImportVisible: false
        }
    }

    public componentWillReceiveProps(nextProps: any) {
        if ('customers' in nextProps && nextProps['customers'].length >0) {
            this.canBatchAssign = true;
            this.canBatchSMS = true;
        } else {
            this.canBatchAssign = false;
            this.canBatchSMS = false;
        }
    }

    /**
     * 新建客户
     */
    public newCustomerToggle = (e: any, bool: boolean = true): any => {
        this.setState({
            newCustomerVisible: bool
        });

        if (typeof(e) === 'string' && e === 'success') {
            message.success('创建用户成功');
            this.props.reloadEmitter();
        }
    }

    /**
     * 批量导入
     */
    public batchImportToggle = (e: any, bool: boolean = true): any => {
        this.setState({
            batchImportVisible: bool
        });

        if (typeof(e) === 'string' && e === 'success') {
            message.success('批量导入成功');
            this.props.reloadEmitter();
        }
    }

    /**
     * 批量分配
     */
    public batchAssignToggle = (e: any, bool: boolean = true): any => {
        this.setState({
            batchAssignVisible: bool
        });

        if (typeof(e) === 'string' && e === 'success') {
            message.success('批量分配成功');
            this.props.reloadEmitter();
        }
    }

    /**
     * 批量短信营销
     */
    public batchSMSToggle = (e: any, bool: boolean = true): any => {
        this.setState({
            batchSMSVisible: bool
        });

        if (typeof(e) === 'string' && e === 'success') {
            message.success('批量短信成功');
            this.props.reloadEmitter();
        }
    }

    public render() {
        const newCustomerProps = {
            visible: this.state.newCustomerVisible,
            title: '添加续保客户',
            defaultActiveKey: '1',
            handleOk: this.newCustomerToggle,
            handleCancel: this.newCustomerToggle,
            carNumber: this.props.dictionary.carNumber || []
        };

        const batchAssignProps = {
            visible: this.state.batchAssignVisible,
            title: '批量分配',
            handleOk: this.batchAssignToggle,
            handleCancel: this.batchAssignToggle,
            customers: this.props.customers,
            renewalMan: this.props.renewalMan,
            asignLogic: this.props.dictionary.asignLogic
        };

        const batchSMSProps = {
            visible: this.state.batchSMSVisible,
            title: '批量短信营销',
            handleCancel: this.batchSMSToggle,
            handleOk: this.batchSMSToggle,
            customers: this.props.customers,
            smsTemplateType: this.props.dictionary.smsTemplateType,
            smsInfo: {
                salesman: 'Kisure',
                salesmanPhoneNumber: '13785698561',
                shopAddress: 'Kisure店铺'
            }
        };

        const batchImportProps = {
            visible: this.state.batchImportVisible,
            title: '批量导入',
            handleCancel: this.batchImportToggle,
            handleOk: this.batchImportToggle,
            rule: {
                maxCount: 1000,
                maxSize: 1024 * 1024,
                fileCount: 1,
                fileType: ['xlsx']
            },
            keywords: excelKeyWord,
            templateTitle: '客户模板.xlsx',
            errorKeywords: excelErrorKeyWord,
            errorTemplateTitle: '错误报告.xlsx',
            excelInstructions
        };

        return (
            <React.Fragment>
                <div className='customer-list-button-control'>
                    <Button className='customer-list-button' type="primary" onClick={() => this.newCustomerToggle(true)}>新建</Button>
                    <Button className='customer-list-button' onClick={() => this.batchImportToggle(true)}>批量导入</Button>
                    <Button className='customer-list-button' disabled={!this.canBatchAssign} onClick={() => this.batchAssignToggle(true)}>批量分配</Button>
                    <Button className='customer-list-button' disabled={!this.canBatchSMS} onClick={() => this.batchSMSToggle(true)}>批量短信营销</Button>
                </div>
                <div className='customer-list-message'>
                    <KISUREMessage totalCount={this.props.totalCount} assignlength={this.props.customers.length}/>
                </div>
                <div className='customer-modal'>
                    { this.state.newCustomerVisible && <KISURENewCustomer {...newCustomerProps}/> }
                    { this.state.batchAssignVisible && <KISUREBatchAssign {...batchAssignProps}/> }
                    { this.state.batchSMSVisible && <KISUREBatchSMS {...batchSMSProps}/> }
                    { this.state.batchImportVisible && <KISUREBatchImport {...batchImportProps} /> }
                </div>
            </React.Fragment>
        )
    }
}

/**
 * (1)这里使用 React.Fragment 
 *      作用：可以让你将元素列表加到一个分组中，而不会增加额外的节点元素
 * 
 * (2)这里使用 React.PureComponent
 *      React.PureComponent与React.Component几乎完全相同，但是React.PureComponent是通过props和state的浅对比来实现shouldComponentUpate()
 * 
 *      如果React组件的render()函数在给定相同的props和state下渲染为相同的结果，在某些场景下你可以使用 React.PureComponent 来提升性能
 * 
 * 2018/11/23
 *  (1)this.state.newCustomerVisible && <KISURENewCustomer {...newCustomerProps}/>
 *      每一次更新state的属性值，可以起到初始化组件内中的数据的作用
 */
