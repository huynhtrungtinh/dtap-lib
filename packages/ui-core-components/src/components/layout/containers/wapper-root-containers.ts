import { PageDecorator } from '@dtap/ui-core';
import { PATH_TO_STORE_AUTH } from '@dtap/ui-scl';
import { get } from 'lodash';
import { getDataForReady, setBreakpoints } from '../actions';
import { WapperRootComponent } from '../components';
import { PATH_TO_STORE_REDUX } from '../constants';
import { getLayoutRootProvider } from '../provider';
import reducers from '../reducers';

const mapStateToProps = (state: any) => {
  let stateRedux = get(state, `${PATH_TO_STORE_REDUX}`, {});
  const authentication = get(state, PATH_TO_STORE_AUTH, {});
  const {isAuthenticated = false, isCheckToken = false} = authentication || {};
  return {
    isAuthenticated,
    isCheckToken,
    breakpoint: stateRedux.breakpoint,
    heightRoot: stateRedux.height,
    isReady: stateRedux.isReady,
    widthRoot: stateRedux.width
  };
};
const mapDispatchToProps = () => {
  return {
    setBreakpoints,
    getDataForReady
  };
};

export default PageDecorator({
  resources: [reducers],
  dataProvider: getLayoutRootProvider(),
  actions: mapDispatchToProps(),
  mapState: (state: any) => mapStateToProps(state)
})(WapperRootComponent);
