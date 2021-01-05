import {cloneDeep, get} from 'lodash';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setBackOprTrai, setSubTab} from '../actions';
import {FunctionsPageComponent} from '../components';
import {PATH_TO_STORE_REDUX} from '../constants';
const mapStateToProps = (state: any) => {
  let stateRedux = get(state, `${PATH_TO_STORE_REDUX}`, {});
  return {
    rowsSelected: cloneDeep(stateRedux.rowsProjectSelected),
    height: stateRedux.height,
    subTabsSelected: stateRedux.subTabsSelected,

  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setBack: setBackOprTrai,
      setSubTab
    },
    dispatch
  )
};
export default connect(mapStateToProps, mapDispatchToProps)(FunctionsPageComponent);
