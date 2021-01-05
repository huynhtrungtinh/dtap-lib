import { contantsTable } from '@dtap/ui-scl';
import { get } from 'lodash';
import { COLUMNS_PROJECT, DISPLAY_KEY_CLOSE, DISPLAY_KEY_OPEN, OPERATION_KEY, PATH_TO_STORE_REDUX, SET_BACK_PROJECT_TABLE, SET_DATA_PROJECT_TABLE, SET_ROW_SELECTED_PROJECT_TABLE, SET_SUB_TAB_NAME_PROJECT_TABLE, SET_TAB_NAME_PROJECT_TABLE, TRAINING_KEY } from '../../constants';
import { callAPIGetFunctionsOperation } from '../call-api';
import { executeActionReducer } from '../common-actions';
import { convertFunctions2ProjectData, getLocalStorageLayoutRoot, setLocalStorageLayoutRoot } from './root-page-utils';

export const getDataRootPage = () => async (dispatch: any, getState: any) => {
  const state = get(getState(), PATH_TO_STORE_REDUX, {});
  const rowsTraining = state.rowsProjectTrainingParent || [];
  const rowsOperator = state.rowsProjectOperatorParent || [];
  const page = state.pageProject;
  const rowsPerPage = state.rowsPerPageProject || contantsTable.ROWS_PER_PAGE_OPTIONS[0];
  let payload: any = {};
  let tabsSelectedLocal = getLocalStorageLayoutRoot();
  if (tabsSelectedLocal) {
    payload.tabsSelected = tabsSelectedLocal.tabsSelected;
    payload.subTabsSelected = tabsSelectedLocal.subTabsSelected;
  } else {
    payload.tabsSelected = {
      [TRAINING_KEY]: rowsTraining.length > 0 ? DISPLAY_KEY_CLOSE : DISPLAY_KEY_OPEN,
      [OPERATION_KEY]: rowsTraining.length > 0 ? DISPLAY_KEY_OPEN : DISPLAY_KEY_CLOSE,
    }
    setLocalStorageLayoutRoot({
      tabsSelected: payload.tabsSelected,
      subTabsSelected: {}
    })
  }
  if (payload.tabsSelected[TRAINING_KEY] === DISPLAY_KEY_OPEN) {
    payload.rowsProjectParent = rowsTraining;
    payload.rowsProjectView = rowsTraining.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    payload.columnProject = [COLUMNS_PROJECT[0]];
    payload.tabsSelected = {...payload.tabsSelected, [OPERATION_KEY]: DISPLAY_KEY_CLOSE};
  } else if (payload.tabsSelected[OPERATION_KEY] === DISPLAY_KEY_OPEN) {
    payload.rowsProjectParent = rowsOperator;
    payload.rowsProjectView = rowsOperator.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    payload.columnProject = COLUMNS_PROJECT;
    payload.tabsSelected = {...payload.tabsSelected, [TRAINING_KEY]: DISPLAY_KEY_CLOSE};
  }
  dispatch(executeActionReducer(SET_DATA_PROJECT_TABLE, payload));
}

export const setTab = (tabName: any) => async (dispatch: any, getState: any) => {
  const state = get(getState(), PATH_TO_STORE_REDUX, {});
  const rowsTraining = state.rowsProjectTrainingParent || [];
  const rowsOperator = state.rowsProjectOperatorParent || [];
  const tabsSelected = state.tabsSelected;
  const subTabsSelected = state.subTabsSelected;
  const page = state.pageProject;
  const rowsPerPage = state.rowsPerPageProject || contantsTable.ROWS_PER_PAGE_OPTIONS[0];
  let payload: any = {};
  if (!tabsSelected[tabName]) {
    tabsSelected[tabName] = DISPLAY_KEY_CLOSE;
  } else if (tabsSelected[tabName] === DISPLAY_KEY_CLOSE) {
    tabsSelected[tabName] = DISPLAY_KEY_OPEN;
  } else {
    tabsSelected[tabName] = DISPLAY_KEY_CLOSE;
  }
  setLocalStorageLayoutRoot({
    tabsSelected,
    subTabsSelected
  })
  switch (tabName) {
    case OPERATION_KEY: {
      payload.rowsProjectParent = rowsOperator;
      payload.rowsProjectView = rowsOperator.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
      payload.columnProject = COLUMNS_PROJECT;
      payload.rowsProjectSelected = {};
      tabsSelected[TRAINING_KEY] = DISPLAY_KEY_CLOSE;
      break;
    }
    case TRAINING_KEY: {
      payload.rowsProjectParent = rowsTraining;
      payload.rowsProjectView = rowsTraining.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
      payload.columnProject = [COLUMNS_PROJECT[0]];
      payload.rowsProjectSelected = {};
      tabsSelected[OPERATION_KEY] = DISPLAY_KEY_CLOSE;
      break;
    }
    default:
      break;
  }
  dispatch(executeActionReducer(SET_TAB_NAME_PROJECT_TABLE, payload));
}

export const setSubTab = (tabName: any) => async (dispatch: any, getState: any) => {
  const state = get(getState(), PATH_TO_STORE_REDUX, {});
  const tabsSelected = state.tabsSelected;
  let payload: any = {};
  payload.subTabsSelected = {[tabName]: DISPLAY_KEY_OPEN}
  setLocalStorageLayoutRoot({
    tabsSelected: tabsSelected,
    subTabsSelected: payload.subTabsSelected
  })
  dispatch(executeActionReducer(SET_SUB_TAB_NAME_PROJECT_TABLE, payload));

}

export const setClickItemOprTrai = (row: any, history: any) => async (dispatch: any, getState: any) => {
  const state = get(getState(), PATH_TO_STORE_REDUX, {});
  const rowsTraining = state.rowsProjectTrainingParent || [];
  const rowsOperator = state.rowsProjectOperatorParent || [];
  const tabsSelected = state.tabsSelected;
  const sideBarDataSearch = state.sideBarDataSearch || [];
  let payload: any = {};
  let project: any = null;
  payload.rowsProjectSelected = row;
  if (tabsSelected[TRAINING_KEY] === DISPLAY_KEY_OPEN) {
    project = rowsTraining[row.indexItem];
  } else if (tabsSelected[OPERATION_KEY] === DISPLAY_KEY_OPEN) {
    project = rowsOperator[row.indexItem];
  }
  if (project) {
    const rootApp = sideBarDataSearch[project.pathFocus[0]];
    const functions: any = await dispatch(callAPIGetFunctionsOperation(project.name, rootApp.name));
    if (functions.error) {
      console.log('get functions data is error.');
    } else {
      const dataFinal = convertFunctions2ProjectData(functions.data, project.name);
      row.children = dataFinal;
    }
  }
  dispatch(executeActionReducer(SET_ROW_SELECTED_PROJECT_TABLE, payload));
}

export const setBackOprTrai = () => async (dispatch: any, getState: any) => {
  let payload: any = {};
  payload.rowsProjectSelected = {};
  dispatch(executeActionReducer(SET_BACK_PROJECT_TABLE, payload));
}

