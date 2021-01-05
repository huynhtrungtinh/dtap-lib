import {get} from 'lodash';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
// import {setOpenDialogChangePassword} from '../../components/change_password';
import {setOpenContactMenu, setOpenMobileMenu, setSignOut} from '../actions';
import {MobileMenuComponent} from '../components';
import {PATH_TO_STORE_REDUX} from '../constants';

const mapStateToProps = (state: any) => {
  let stateRedux = get(state, `${PATH_TO_STORE_REDUX}`, {});
  return {
    mobileMoreAnchorEl: stateRedux.mobileMoreAnchorEl,
    isMobileMenuOpen: stateRedux.isMobileMenuOpen,
    username: get(state, 'authentication.userInfo.username', ""),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setOpenMobileMenu,
      setOpenContactMenu,
      // setOpenDialogChangePassword,
      setSignOut
    },
    dispatch
  )
};
export default connect(mapStateToProps, mapDispatchToProps)(MobileMenuComponent);
