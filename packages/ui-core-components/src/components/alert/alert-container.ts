import { PageDecorator } from '@dtap/ui-core';
import { cloneDeep, get } from 'lodash';
import { setHiddenAlert, setHiddenAlertAll } from './alert-actions';
import AlertComponent from './alert-component';
import { PATH_TO_STORE_REDUX } from './alert-constants';
import reducers from './alert-reducers';

const mapStateToProps = (state: any) => {
  let stateRedux = get(state, `${PATH_TO_STORE_REDUX}`, {});
  const alertList = cloneDeep(stateRedux.alertList) || [];
  return {alertList};
};
const mapDispatchToProps = () => {
  return {
    setHiddenAlert,
    setHiddenAlertAll
  };
};

export default PageDecorator({
  resources: [reducers],
  actions: mapDispatchToProps(),
  mapState: (state: any) => mapStateToProps(state)
})(AlertComponent);
