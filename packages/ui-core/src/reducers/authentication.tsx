import { CHECK_TOKEN, FAILURE, FETCH_END, FETCH_ERROR, FETCH_START, IAction, IAuthenticationState, LOGIN, LOGOUT, REFRESH_TOKEN, REQUEST, SET_ROUTERS, SHOW_SIGNIN_EXP_TIME, SUCCESS } from '@dtap/ui-scl';
import { authenProvider, checkTokenExpiration } from '../actions/authentication-actions';

const initialState: IAuthenticationState = {
  routers: [],
  loading: 0,
  isAuthenticatedStatusCode: null,
  isAuthenticated: !checkTokenExpiration().isReSingin,
  isCheckToken: false,
  userInfo: {} as any,
  authenProvider,
  openSigninExpirationTime: false
};

// Reducer
export default (state: IAuthenticationState = {...initialState}, {type, payload}: IAction): IAuthenticationState => {
  switch (type) {
    case REQUEST(LOGIN):
      return {
        ...state,
        loading: 0
      };
    case FAILURE(LOGIN):
      return {
        ...state,
        routers: [],
        loading: 0,
        isAuthenticatedStatusCode: null,
        isAuthenticated: false,
        isCheckToken: false,
        userInfo: {} as any,
      };
    case SHOW_SIGNIN_EXP_TIME:
    case SUCCESS(REFRESH_TOKEN):
    case SET_ROUTERS:
    case SUCCESS(CHECK_TOKEN):
    case SUCCESS(LOGIN): {
      return {
        ...state,
        ...payload
      };
    }
    case FETCH_START:
      return {
        ...state,
        loading: state.loading + 1
      };
    case FETCH_END:
    case FETCH_ERROR:
      return {
        ...state,
        loading: Math.max(state.loading - 1, 0)
      };
    case SUCCESS(LOGOUT): {
      return {...initialState, isAuthenticated: false, isCheckToken: false, };
    }
    default:
      return state;
  }
};
