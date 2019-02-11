import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Button, Row, Col, Modal, Tree } from 'antd';
import './saas-customer-setting-modal-department.scss';

const { TreeNode } = Tree;

export default class SaaSCustomerSettingModalDepartment extends React.PureComponent<any, any> {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        handleCancel: PropTypes.func.isRequired,
        handleOk: PropTypes.func.isRequired,
        department: PropTypes.array.isRequired
    }

    public departmentInfo: any;

    constructor(public props: any) {
        super(props);
    }

    public createTreeNode = (department: any[]) => {
        let dom: any;

        const loop = (dept: any[]) => (
            dept.map((i: any) => {
                const result = {
                    title: i.departmentName,
                    id: i.id,
                };

                return i['department'] && i['department'] instanceof Array && i['department'].length > 0 ? 
                        <TreeNode title={i.departmentName} key={`${i.id}-${i.organizationId}-${i.parentId}`} value={result}>
                            {
                                loop(i['department'])
                            }
                        </TreeNode> : 
                        <TreeNode title={i.departmentName} key={`${i.id}-${i.organizationId}-${i.parentId}`} value={result} />
            })
        );

        dom = loop(department);

        return dom;
    }

    /**
     * 节点选择
     */
    public onSelect = (selectedKeys: any, info: any) => {
        this.departmentInfo = info.node.props.value;
    }

    /**
     * 取消
     */
    public handleCancel = () => {
        this.props.handleCancel('cancel', false);
    }

    /**
     * 确定
     */
    public handleOk = () => {
        this.props.handleCancel('success', false, this.departmentInfo);
    }

    public render() {
        return (
            <Modal
                visible={this.props.visible}
                title={'部门选择'}
                onCancel={this.handleCancel}
                footer={null}
                maskClosable={false}
                width={'650px'}>
                <div className='kisure-saas-customer-modal-department-content'>
                    <Tree
                        showLine={true}
                        onSelect={this.onSelect}>
                        { this.createTreeNode(this.props.department) }
                    </Tree>
                </div>
                <div className='kisure-saas-customer-modal-department-button'>
                    <Row>
                        <Col>
                            <Button key='cancel' onClick={this.handleCancel}>取消</Button>
                            <Button key='submit' className='red' type='primary' onClick={this.handleOk}>确认</Button>
                        </Col>
                    </Row>
                </div>
            </Modal>
        )
    }
}
