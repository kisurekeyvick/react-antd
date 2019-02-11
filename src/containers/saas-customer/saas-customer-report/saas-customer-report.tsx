import * as React from 'react';
import { connect } from 'react-redux';
import { Row, Button, Col } from 'antd';
import KISUREReportCar from './saas-customer-report-car/saas-customer-report-car';
import KISUREReportCompany from './saas-customer-report-company/saas-customer-report-company';
import KISUREReportPersonal from './saas-customer-report-personal/saas-customer-report-personal';
import './saas-customer-report.scss';

class SaaSCustomerReport extends React.PureComponent<any, any> {
    constructor(public props: any) {
        super(props);

        this.state = {
            baseInfo: {},
            dimension: 'personal'
        };
    }

    /**
     * 切换维度
     * @param dimension 
     */
    public switchDimension = (dimension: string) => {
        this.setState({
            dimension
        });
    }

    public render() {
        return (
            <div className='kisure-antd-report-container'>
                <div className='kisure-antd-report-head'>
                    <Row>
                        <Col>
                            <p className='kisure-antd-report-title'>用户名</p>
                            <p className='kisure-antd-report-store-info'>店铺信息：</p>
                            <div className='kisure-antd-report-btn-group'>报表类型：
                                <Button type={this.state.dimension === 'personal' ? 'primary' : 'dashed'} onClick={() => this.switchDimension('personal')}>个人维度</Button>
                                <Button type={this.state.dimension === 'company' ? 'primary' : 'dashed'} onClick={() => this.switchDimension('company')}>保险公司维度</Button>
                                <Button type={this.state.dimension === 'car' ? 'primary' : 'dashed'} onClick={() => this.switchDimension('car')}>车系维度</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className='kisure-antd-report-content'>
                    { this.state.dimension === 'car' && <KISUREReportCar /> }
                    { this.state.dimension === 'company' && <KISUREReportCompany /> }
                    { this.state.dimension === 'personal' && <KISUREReportPersonal /> }
                </div>
            </div>
        );
    }
}

function mapStateToprops(state: any) {
    return {
        dictionary: state.saasCommon.dictionary,
    }
}

export default connect(
    mapStateToprops
)(SaaSCustomerReport);
