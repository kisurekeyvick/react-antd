import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as QRCode from 'qrcode.react';
import './qrcode-component.scss';

export default class QrcodeComponent extends React.PureComponent<any, any> {
    static propTypes = {
        url: PropTypes.string.isRequired,
        options: PropTypes.object
    };

    // static defaultProps = {
    //     options: {
    //         size: '150',
    //         bgColor: '#FFFFFF',
    //         level: '#000000'
    //     }
    // };

    constructor(public props: any) {
        super(props);
    }

    public render() {
        // {...this.props.options}
        return (
            <QRCode value={this.props.url} />
        );
    }
}
