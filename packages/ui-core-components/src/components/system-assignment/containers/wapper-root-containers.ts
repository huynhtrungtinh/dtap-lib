import { PageDecorator } from '@dtap/ui-core';
import { get } from 'lodash';
import { PATH_TO_STORE_REDUX_LAYOUT_ROOT } from '../../layout';
import { getDataForReady } from '../actions';
import { WapperRootComponent } from '../components';
import { PATH_TO_STORE_REDUX } from '../constants';
import { getLayoutRootProvider } from '../provider';
import reducers from '../reducers';

const mapStateToProps = (state: any) => {
  let stateRedux = get(state, `${PATH_TO_STORE_REDUX}`, {});
  let stateLayoutRoot = get(state, `${PATH_TO_STORE_REDUX_LAYOUT_ROOT}`, {});
  return {
    breakpoint: stateLayoutRoot.breakpoint,
    heightRoot: stateLayoutRoot.height,
    isReady: stateRedux.isReady
  };
};
const mapDispatchToProps = () => {
  return {
    getDataForReady
  };
};

export default PageDecorator({
  resources: [reducers],
  dataProvider: getLayoutRootProvider(),
  actions: mapDispatchToProps(),
  mapState: (state: any) => mapStateToProps(state)
})(WapperRootComponent);
