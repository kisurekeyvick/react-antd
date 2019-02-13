import * as React from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import SlideLayout from '../layouts/slider/sider';
import * as _ from 'lodash';
import { routeConfig, ILoadableRoute } from './router';

export default class GuardRoute extends React.Component<any, any> {
    public config: any;

    constructor(public props: any) {
        super(props);

        this.config = {
            routes: _.cloneDeep(routeConfig)
        };
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
            true ? <SlideLayout location={location}>
                <div>   
                    <Switch>
                        { routes }
                    </Switch>
                </div>
            </SlideLayout> : <Redirect from='/' to='/user/login'/>
        )
    }
}
