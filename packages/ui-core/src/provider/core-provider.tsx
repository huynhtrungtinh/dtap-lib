import { IAuthenProvider } from '@dtap/ui-scl';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { effectTokenExpiration } from '../actions';
import { initializeI18n, initializeStore } from '../config';
import { renderRouterRoot } from '../routers';
interface IAppProps {
  appURL: string;
  i18n?: object;
  RootLayout: React.Component | any;

  routeProvider?: any;
  authenProvider?: IAuthenProvider;
  reducers?: object;
  middlewares?: any[];
  middlewaresDev?: any[];
}
let historyApp: History;
export const getHistoryApp = () => {
  return historyApp;
}
const CoreProvider: React.StatelessComponent<IAppProps> = (props: IAppProps) => {
  let {
    appURL = '/',
    i18n = {},
    RootLayout,
    middlewares = [],
    middlewaresDev = [],
    reducers,
    routeProvider,
    authenProvider
  } = props;
  historyApp = createBrowserHistory({basename: appURL});
  middlewares = [...middlewares, routerMiddleware(historyApp)];
  const store = initializeStore({customReducers: reducers, middlewares, middlewaresDev, authenProvider, historyApp});
  initializeI18n(store, i18n);
  const actions = bindActionCreators({effectTokenExpiration}, store.dispatch);
  actions.effectTokenExpiration();
  return (
    <Provider store={store}>
      <ConnectedRouter history={historyApp}>
        {/* <BrowserRouter basename={appURL}> */}
        <Switch>
          {renderRouterRoot({routeProvider, RootLayout, dispatch: store.dispatch})}
        </Switch>
        {/* </BrowserRouter> */}
      </ConnectedRouter>
    </Provider>
  );
}

export default CoreProvider;
export { CoreProvider };

