import * as React from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import SlideLayout from '../layouts/slider/sider';
import * as _ from 'lodash';
import { routeConfig, ILoadableRoute } from './router';
import { CookieService } from 'src/service/cookie';
import { api } from 'src/_mock/api';
import './guardsRouter.scss';

export default class GuardRoute extends React.Component<any, any> {
    public config: any;
    private _cookie: CookieService;

    constructor(public props: any) {
        super(props);

        this.state = {
            loading: true,
            authority: false
        };

        this.config = {
            routes: _.cloneDeep(routeConfig),
        };

        this._cookie = new CookieService();
    }

    public componentDidMount() {
        const token: string | null = this._cookie.getCookie('_token');

        if (token) {
            const params = {
                token
            };

            api.tokenLogin(params).then((res: any) => {
                if (res && res.status === 200) {
                    this.setState({
                        loading: false,
                        authority: res.data.result
                    });
                }
            }).catch(() => {
                this.setState({
                    loading: false,
                    authority: false
                });
            });
        } else
            this.setState({
                loading: false
            });
    }

    public render() {
        const { location } = this.props;
 
        const routes: any = this.config.routes.map((route: ILoadableRoute, index: number) => {
            const rest: any = { }; 
            if (route.exact)
                rest.exact = route.exact;

            return <Route key={`route-` + index} {...rest} path={route.path} component={route.component}/>;
        });

        return (
            this.state.loading === true ? 
            <div id="loading">
                <div id="loading-center">
                    <div id="loading-center-absolute">
                        <div className="object" id="object_four"/>
                        <div className="object" id="object_three"/>
                        <div className="object" id="object_two"/>
                        <div className="object" id="object_one"/>
                    </div>
                </div> 
            </div> :
            this.state.authority === true ? <SlideLayout location={location}>
                <div>   
                    <Switch>
                        { routes }
                    </Switch>
                </div>
            </SlideLayout> : <Redirect from='/' to='/user/login'/>
        )
    }
}
