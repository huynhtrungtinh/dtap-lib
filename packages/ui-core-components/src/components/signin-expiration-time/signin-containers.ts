import { PageDecorator } from '@dtap/ui-core';
import { AUTH_REDUCER_NAME } from '@dtap/ui-scl';
import { cloneDeep, get } from 'lodash';
import { setClose, setMofify, setShowText, setSubmit, setUnmount } from './signin-actions';
import SigninComponent from './signin-component';
import { DEFAULT_ITEM, PATH_TO_STORE_REDUX } from './signin-constants';
import reducers from './signin-reducer';

const mapStateToProps = (state: any) => {
  let stateRedux = cloneDeep(get(state, `${PATH_TO_STORE_REDUX}`, {}));
  return {
    open: state[AUTH_REDUCER_NAME].openSigninExpirationTime,
    errorMessage: stateRedux.errorMessage,
    username: stateRedux.username || {...DEFAULT_ITEM},
    password: stateRedux.password || {...DEFAULT_ITEM, fieldType: 'password'}
  };
};
const mapDispatchToProps = () => {
  return {
    setSubmit,
    setMofify,
    setShowText,
    setUnmount,
    setClose
  };
};

export default PageDecorator({
  resources: [reducers],
  actions: mapDispatchToProps(),
  mapState: (state: any) => mapStateToProps(state)
})(SigninComponent);
