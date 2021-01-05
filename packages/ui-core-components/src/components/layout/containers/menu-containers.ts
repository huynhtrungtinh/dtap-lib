import {get} from 'lodash';
import {connect} from "react-redux";
// import { setOpenDialogChangePassword } from '../../components/change_password';
import {bindActionCreators} from "redux";
import {setOpenMenuProfile, setSignOut} from '../actions';
import {MenuComponent} from '../components';
import {PATH_TO_STORE_REDUX} from '../constants';

const mapStateToProps = (state: any) => {
  let stateRedux = get(state, `${PATH_TO_STORE_REDUX}`, {});
  return {
    anchorEl: stateRedux.profileAnchorEl,
    isOpen: stateRedux.isMenuProfileOpen,
    username: get(state, 'authentication.userInfo.username', ""),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setOpen: setOpenMenuProfile,
      // setOpenDialogChangePassword,
      setSignOut
    },
    dispatch
  )
};
export default connect(mapStateToProps, mapDispatchToProps)(MenuComponent);
