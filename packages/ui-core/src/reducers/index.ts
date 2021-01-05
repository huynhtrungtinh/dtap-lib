import { IAuthenProvider, IAuthenticationState } from '@dtap/ui-scl';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { i18nReducer } from "react-redux-i18n";
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import { combineReducers } from 'redux';
import authentication from './authentication';
import { resourcesReducer } from './resources';
interface IRootState {
  readonly i18n: any;
  readonly resources: any;
  readonly authentication: IAuthenticationState;
  readonly loadingBar: any;
  readonly [key: string]: any;
}

const rootReducer = (customReducers: any, authenProvider: IAuthenProvider, history: History) => {
  let newAuth: any = authentication;
  newAuth.authenProvider = authenProvider;
  return combineReducers<IRootState>({
    i18n: i18nReducer,
    authentication: newAuth,
    loadingBar,
    resources: resourcesReducer,
    router: connectRouter(history),
    ...customReducers
  });
}

export default rootReducer;
export { rootReducer };

