import {get} from 'lodash';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setOpenContactMenu} from '../actions';
import {ContactMenuComponent} from '../components';
import {PATH_TO_STORE_REDUX} from '../constants';

const mapStateToProps = (state: any) => {
  let stateRedux = get(state, `${PATH_TO_STORE_REDUX}`, {});
  return {
    anchorEl: stateRedux.contactAnchorEl,
    isOpen: stateRedux.isContactMenuOpen,
    datas: stateRedux.contactsData,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setOpen: setOpenContactMenu,
    },
    dispatch
  )
};
export default connect(mapStateToProps, mapDispatchToProps)(ContactMenuComponent);
