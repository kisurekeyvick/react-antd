import * as React from 'react';
import { connect } from 'react-redux';
import { Collapse, Spin, Skeleton } from 'antd';
import { getCustomerListInitData } from 'src/actions/saas-customer-action';
import KISUREBussinessRemind from './saas-customer-setting-bussiness-remind/saas-customer-setting-bussiness-remind';
import KISUREDefaultAudit from './saas-customer-setting-default-audit/saas-customer-setting-default-audit';
import KISURERuleAssign from './saas-customer-setting-rule-assign/saas-customer-setting-rule-assign';
import KISUREServiceBrand from './saas-customer-setting-service-brand/saas-customer-setting-service-brand';
import KISUREMarket from './saas-customer-setting-market/saas-customer-setting-market';
import KISUREAccount from './saas-customer-setting-account/saas-customer-setting-account';
import { api } from 'src/_mock/api';
import './saas-customer-setting-index.scss';

const Panel = Collapse.Panel;

class SaaSCustomerSetting extends React.Component<any, any> {
    public organization: any[] = [];
    public roleGroup: any[] = [];

    constructor(public props: any) {
        super(props);

        this.state = {
            isLoading: false,
            initComplete: false,
            businessReminderVisible: false,
            insAccountMaintenanceVisible: false,
            marketingPlanVisible: false,
            defeatAuditVisible: false,
            rulesAssignVisible: false,
            serviceBrandVisible: false
        };
    }

    public componentDidMount() {
        this.setState({
            isLoading: true
        });

        Promise.all([
            api.getWebOrganization(),
            api.getRoleGroup()
        ]).then(res => {
            this.setState({
                isLoading: false,
                initComplete: true
            });

            if (res.some((r: any) => r.status === 200)) {
                this.organization = res[0]['data']['department'];
                this.roleGroup = res[1]['data']['user'];
            }
        })
    }

    /**
     * 折叠面板切换panel事件
     */
    public collapseCallback = (e: string[]) => {
        this.setState({
            businessReminderVisible: e.findIndex(i => i ==='1') > -1 ? true : false,
            insAccountMaintenanceVisible: e.findIndex(i => i ==='2') > -1 ? true : false,
            marketingPlanVisible: e.findIndex(i => i ==='3') > -1 ? true : false,
            defeatAuditVisible: e.findIndex(i => i ==='4') > -1 ? true : false,
            rulesAssignVisible: e.findIndex(i => i ==='5') > -1 ? true : false,
            serviceBrandVisible: e.findIndex(i => i ==='6') > -1 ? true : false
        });
    }

    public render() {
        const mktPlanProps = {
            department: this.organization
        };

        return (
            <div className='customer-progress-list-box'>
                <Spin tip='Loading...' spinning={this.state.isLoading}>
                    {
                        this.state.initComplete === true ?
                        <Collapse bordered={false} onChange={this.collapseCallback}>
                            {/* defaultActiveKey={['1']}  */}
                            <Panel header="1.业务提醒设置" key="1">
                                { this.state.businessReminderVisible && <KISUREBussinessRemind /> }
                            </Panel>
                            <Panel header="2.合作保险公司账号维护" key="2">
                                { this.state.insAccountMaintenanceVisible && <KISUREAccount /> }
                            </Panel>
                            <Panel header="3.营销方案设置" key="3">
                                { this.state.marketingPlanVisible && <KISUREMarket {...mktPlanProps}/> }
                            </Panel>
                            <Panel header="4.战败客户审核流程" key="4">
                                { this.state.defeatAuditVisible && <KISUREDefaultAudit /> }
                            </Panel>
                            <Panel header="5. 续保客户分配规则" key="5">
                                { this.state.rulesAssignVisible && <KISURERuleAssign /> }
                            </Panel>
                            <Panel header="6. 服务品牌" key="6">
                                { this.state.serviceBrandVisible && <KISUREServiceBrand /> }
                            </Panel>
                        </Collapse> : <Skeleton active={true} paragraph={{ rows: 10 }}/>
                    }  
                </Spin>
            </div>
        )
    }
}

function mapStateToProps(state: any) {
    return {
        dictionary: state.saasCommon.dictionary,
    }
}

function mapDispatchToProps() {
    return {
        getCustomerListInitData
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps()
)(SaaSCustomerSetting);