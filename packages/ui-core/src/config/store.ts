import { IAuthenProvider } from '@dtap/ui-scl';
import { History } from 'history';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { authenProvider as authProvider } from '../actions';
import { createAPIMiddleware, resourceManagement } from '../middlewares';
import rootReducer from '../reducers';

const defaultMiddlewares = [
  thunkMiddleware,
  loadingBarMiddleware(),
  resourceManagement
];
interface IComposedMiddlewares {
  middlewares?: any[];
  middlewaresDev?: any[];
}
const composedMiddlewares = (input: IComposedMiddlewares) => {
  const {middlewares = [], middlewaresDev = []} = input;
  if (process.env.NODE_ENV === 'development') {
    return compose(applyMiddleware(
      ...defaultMiddlewares,
      ...middlewares,
      createAPIMiddleware(),
      ...middlewaresDev,
      createLogger()
    ));
  }
  return compose(applyMiddleware(
    ...defaultMiddlewares,
    ...middlewares,
    createAPIMiddleware()
  ));
}

interface IInitializeStore {
  customReducers?: any;
  middlewares?: any[];
  middlewaresDev?: any[];
  authenProvider?: IAuthenProvider;
  historyApp: History;
}

const initializeStore: any = (input: IInitializeStore) => {
  const {customReducers, middlewares = [], middlewaresDev = [], authenProvider = authProvider, historyApp} = input;
  return createStore(rootReducer(customReducers, authenProvider, historyApp), composedMiddlewares({middlewares, middlewaresDev}));
}

export default initializeStore;
export { initializeStore };

