import {get} from 'lodash';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setClickBreadcrumbsItem} from '../actions';
import {BreadcrumbsComponent} from '../components';
import {PATH_TO_STORE_REDUX} from '../constants';
const mapStateToProps = (state: any) => {
  let stateRedux = get(state, `${PATH_TO_STORE_REDUX}`, {});
  return {
    breakpoint: stateRedux.breakpoint,
    tabs: stateRedux.breadcrumbsData,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setClickItem: setClickBreadcrumbsItem
    },
    dispatch
  )
};
export default connect(mapStateToProps, mapDispatchToProps)(BreadcrumbsComponent);
