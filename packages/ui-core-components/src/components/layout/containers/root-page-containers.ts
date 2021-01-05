import {get} from 'lodash';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setTab} from '../actions';
import {RootPageComponent} from '../components';
import {PATH_TO_STORE_REDUX} from '../constants';
const mapStateToProps = (state: any) => {
  let stateRedux = get(state, `${PATH_TO_STORE_REDUX}`, {});
  return {
    sideBarData: stateRedux.sideBarDataSearch,
    isSelectedTab: stateRedux.isSelectedTab,
    rowsProjectSelected: stateRedux.rowsProjectSelected,
    tabsSelected: stateRedux.tabsSelected,
    // subTabsSelected: stateRedux.subTabsSelected,
    // subTabsSelected: {},
    // breakpoint: stateRedux.breakpoint,
    // sideBarSelectedItem: stateRedux.sideBarSelectedItem
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setTab
    },
    dispatch
  )
};
export default connect(mapStateToProps, mapDispatchToProps)(RootPageComponent);
