import * as React from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';
import { getCustomerListInitData } from 'src/actions/saas-customer-action';
import SaaSCustomerList from './saas-customer-list.container';

class SaaSCustomerListIndex extends React.Component<any, any> {
    static propTypes = {
        getCustomerListInitData: PropTypes.func.isRequired,
        saasCommon: PropTypes.object.isRequired,
        saasCustomer: PropTypes.object.isRequired,
    };

    constructor(public props: any) {
        super(props);
    }

    public componentDidMount() {
        console.log('customer-index加载完成');
        this.props.getCustomerListInitData();
    }

    public shouldcomponentupdate(nextProps: any, nextState: any) {
        if (_.isEqual(this.props, nextProps) || !_.isEmpty(this.props)) {
            return false
        }
        return true
    }

    public render() {
        return (
            <SaaSCustomerList {...this.props}/>
        );
    }
}

/**
 * 使用react-redux，这里可以获取store里面你想要的数据，它会将值赋给props
 * @param state 
 */
function mapStateToProps(state: any) {
    return {
        dictionary: state.saasCommon.dictionary,
        renewalMan: state.saasCustomer.renewalMan,
        shopSc: state.saasCustomer.shopSc,
        company: state.saasCustomer.company,
        placeShortName: state.saasCustomer.placeShortName,
        provinces: state.saasCustomer.provinces,
        saasCommon: state.saasCommon,
        saasCustomer:state.saasCustomer
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
)(SaaSCustomerListIndex);