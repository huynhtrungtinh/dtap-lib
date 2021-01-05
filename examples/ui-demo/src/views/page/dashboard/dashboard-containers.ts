import {PageDecorator} from '@dtap/ui-core';
import {callAPIGetApps, callAPIGetFile, callAPIGetFile2, setLogout} from './dashboard-actions';
import DashboardComponent from './dashboard-component';
import reducers from './dashboard-reducer';
import getLayoutRootProvider from './provider';
// import {cloneDeep, get} from 'lodash';
// import {DEFAULT_ITEM, PATH_TO_STORE_REDUX} from './dashboard-constants';

const mapStateToProps = (state: any) => {
  // let stateRedux = cloneDeep(get(state, `${PATH_TO_STORE_REDUX}`, {}));
  return {

  };
};
const mapDispatchToProps = () => {
  return {
    setLogout,
    callAPIGetApps,
    callAPIGetFile,
    callAPIGetFile2
  };
};

export default PageDecorator({
  resources: [reducers],
  dataProvider: getLayoutRootProvider(),
  actions: mapDispatchToProps(),
  mapState: (state: any) => mapStateToProps(state)
})(DashboardComponent);
