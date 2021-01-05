import * as React from 'react';
import {setAuthRouters} from '../actions';
import PrivateRoute from './private-route';
import PublicRoute from './public-route';
export const renderRouterRoot = ({routeProvider, RootLayout, dispatch}: any) => {
    const publicR = routeProvider('public');
    const privateR = routeProvider('private');
    let routes: any = [];
    let routerArr: any = [];
    let indexArr = 0;
    publicR.map((r: any, index: any) => {
        const rcPublic = <PublicRoute path={r.path} component={r.component} key={`${r.name}-${index}`} />;
        routes.push(rcPublic);
        routerArr.push({
            exact: typeof r.exact === 'boolean' ? r.exact : false,
            name: r.name,
            auth: 'public'
        });
        if (r.path) {
            routerArr[indexArr].path = r.path;
        }
        indexArr = indexArr + 1;
    })
    privateR.map((r: any, index: any) => {
        const rcPrivate = <PrivateRoute path={r.path} component={r.component} RootLayout={RootLayout} key={`${r.name}-${index}`} />
        routes.push(rcPrivate);
        routerArr.push({
            exact: typeof r.exact === 'boolean' ? r.exact : false,
            name: r.name,
            auth: 'private'
        });
        if (r.path) {
            routerArr[indexArr].path = r.path;
        }
        indexArr = indexArr + 1;
    })
    dispatch(setAuthRouters(routerArr));
    return routes.map((item: any) => {
        return item;
    })
};
