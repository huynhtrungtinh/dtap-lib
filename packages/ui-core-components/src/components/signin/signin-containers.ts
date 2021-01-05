import { PageDecorator } from '@dtap/ui-core';
import { cloneDeep, get } from 'lodash';
import { setMofify, setShowText, setSubmit, setUnmount } from './signin-actions';
import SigninComponent from './signin-component';
import { DEFAULT_ITEM, PATH_TO_STORE_REDUX } from './signin-constants';
import reducers from './signin-reducer';

const mapStateToProps = (state: any) => {
  let stateRedux = cloneDeep(get(state, `${PATH_TO_STORE_REDUX}`, {}));
  return {
    isAuthenticated: state.authentication.isAuthenticated,
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
    setUnmount
  };
};

export default PageDecorator({
  resources: [reducers],
  actions: mapDispatchToProps(),
  mapState: (state: any) => mapStateToProps(state)
})(SigninComponent);
