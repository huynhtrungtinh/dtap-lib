import {get} from 'lodash';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setOpenContactMenu, setOpenMenuProfile, setOpenMobileMenu, setOpenSideBar} from '../actions';
import {HeaderComponent} from '../components';
import {PATH_TO_STORE_REDUX} from '../constants';

const mapStateToProps = (state: any) => {
  let stateRedux = get(state, `${PATH_TO_STORE_REDUX}`, {});
  return {
    breakpoint: stateRedux.breakpoint,
    contactsData: stateRedux.contactsData,
    displayName: get(state, 'authentication.userInfo.display_name', ""),
    loading: get(state, 'authentication.loading', 0),
    isSideBarOpen: stateRedux.isSideBarOpen,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setOpenMenuProfile,
      setOpenContactMenu,
      setOpenMobileMenu,
      setOpenSideBar
    },
    dispatch
  )
};
export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
