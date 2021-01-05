import {cloneDeep, get} from 'lodash';
import {HIDDEN_ALERT, HIDDEN_ALERT_ALL, NAME_REDUCER, PATH_TO_STORE_REDUX, SHOW_ALERT, UNMOUNT} from './alert-constants';

export const setShowAlert = (message: string, type?: "error" | "warning" | "info" | "success", timmeOut?: number) => async (dispatch: any, getState: any) => {
  const state = get(getState(), PATH_TO_STORE_REDUX, {});
  let alertList = state.alertList || [];
  let timeoutGrow = state.timeoutGrow || 500;
  if (!type) {
    type = "info";
  }
  if (!timmeOut) {
    timmeOut = 3000;
  }
  timeoutGrow = timeoutGrow + 500;
  timmeOut = timmeOut + timeoutGrow;
  alertList.push({message, type, timmeOut})
  dispatch(executeActionReducer(SHOW_ALERT, {alertList, timeoutGrow}));
  setTimeout(() => {
    dispatch(setHiddenAlert())
  }, timmeOut)
}

export const setHiddenAlert = (zIndex?: number) => async (dispatch: any, getState: any) => {
  const state = get(getState(), PATH_TO_STORE_REDUX, {});
  let alertList = cloneDeep(state.alertList) || [];
  if (alertList.length > 0) {
    if (zIndex === null || zIndex === undefined) {
      alertList.splice(0, 1);
    } else {
      alertList.splice(zIndex, 1);
    }
  } else {
    alertList = [];
  }
  dispatch(executeActionReducer(HIDDEN_ALERT, {alertList}));
}

export const setHiddenAlertAll = () => async (dispatch: any, getState: any) => {
  dispatch(executeActionReducer(HIDDEN_ALERT_ALL, {alertList: []}));
}

export const executeActionReducer = (type: string, payload: any) => {
  return {type, payload, meta: {resource: NAME_REDUCER}};
};
export const unmount = () => async (dispatch: any) => {
  dispatch(executeActionReducer(UNMOUNT, {}));
};
