import { config } from '@dtap/ui-utils';
import { cloneDeep, get } from 'lodash';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setClickSideBarItem, setOpenSideBar, setSearchSideBar } from '../actions';
import { SideBarComponent } from '../components';
import { PATH_TO_STORE_REDUX } from '../constants';

const mapStateToProps = (state: any) => {
  let stateRedux = get(state, `${PATH_TO_STORE_REDUX}`, {});
  return {
    isOpen: stateRedux.isSideBarOpen,
    routers: stateRedux.routers,
    routeFocus: stateRedux.routeFocus,
    version: config.getAppVersion(),
    sideBarData: cloneDeep(stateRedux.sideBarDataSearch),
    sideBarSearchValue: stateRedux.sideBarSearchValue,
    breakpoint: stateRedux.breakpoint,
    sideBarSelectedItem: stateRedux.sideBarSelectedItem
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      setOpen: setOpenSideBar,
      setClickItem: setClickSideBarItem,
      setSearch: setSearchSideBar
    },
    dispatch
  )
};
export default connect(mapStateToProps, mapDispatchToProps)(SideBarComponent);
