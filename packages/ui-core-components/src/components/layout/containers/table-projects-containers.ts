import {cloneDeep, get} from 'lodash';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getDataRootPage, setClickItemOprTrai} from '../actions';
import {TableProjectsComponent} from '../components';
import {PATH_TO_STORE_REDUX} from '../constants';

const mapStateToProps = (state: any) => {
  let stateRedux = get(state, `${PATH_TO_STORE_REDUX}`, {});
  return {
    columns: stateRedux.columnProject,
    rows: stateRedux.rowsProjectView,
    rowsParent: stateRedux.rowsProjectParent,
    rowsSelected: stateRedux.rowsProjectSelected,
    searchKeyWords: stateRedux.searchProjectKeyWords,
    isViewTable: stateRedux.isViewTable,
    isSelectedTab: stateRedux.isSelectedTab,
    page: stateRedux.pageProject,
    rowsPerPage: stateRedux.rowsPerPageProject,
    sideBarData: cloneDeep(stateRedux.sideBarDataSearch),
    height: stateRedux.height,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      getData: getDataRootPage,
      setClick: setClickItemOprTrai
    },
    dispatch
  )
};
export default connect(mapStateToProps, mapDispatchToProps)(TableProjectsComponent);
