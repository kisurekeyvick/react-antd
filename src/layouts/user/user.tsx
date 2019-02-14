import * as React from 'react';
import User from '../../containers/user/user';
import { config } from 'src/environment/environment';
import { Row, Col} from 'antd';
import BGParticle from 'src/service/BGParticle';
import './user.scss';

export default class UserLayout extends React.Component<any, any> {
    public config: any;

    constructor(public props: any) {
        super(props);

        this.state = {

        };

        this.config = {
            particle: null
        };
    }

    componentDidMount() {
        this.config.particle = new BGParticle('#gsapBox');
        this.config.particle.init();
    }

    componentWillUnmount() {
        this.config.particle.destory();
    }

    public render() {
        const userProps = {
            param: this.props.match.params['status'],
            history: this.props.history
        };

        return (
            <div className='layout-login-box' >
                <Row>
                    <Col span={24}>
                        <div className='layout-login-box-head'>
                            <img src={config.loginLogo} />
                        </div>
                    </Col>
                    <Col span={24}>
                        <User {...userProps}/>
                    </Col>
                </Row>
                <div id='gsapBox' />
            </div>
        );
    }
}
