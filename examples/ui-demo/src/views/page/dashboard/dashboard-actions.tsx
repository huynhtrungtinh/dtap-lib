import {api, setAuthLogout} from '@dtap/ui-core';
import {get} from 'lodash';
import {NAME_REDUCER, UNMOUNT} from './dashboard-constants';
import {APPS_RESOURCE, EXPORT_FILE_1_RESOURCE, EXPORT_FILE_2_RESOURCE} from './provider';

export const executeActionReducer = (type: string, payload: any) => {
  return {type, payload, meta: {resource: NAME_REDUCER}};
};

export const unmount = () => async (dispatch: any) => {
  dispatch(executeActionReducer(UNMOUNT, {}));
};

export const setLogout = () => async (dispatch: any, getState: any) => {
  const response = await dispatch(setAuthLogout());
  console.log('response: ', response);
  console.log('====================================');
  // if (response.status === 200) {

  // }
}

export const callAPIGetApps = () => async (dispatch: any) => {
  console.log('============callAPIGetApps==========');
  // return new Promise((resolve) => resolve([]))
  const data = await dispatch(api.get(APPS_RESOURCE));
  let outPut = {error: null, data: []}
  if (get(data, 'result.data', null)) {
    outPut.data = get(data, 'result.data', [])
  }
  return outPut;
}

export const callAPIGetFile = () => async (dispatch: any) => {
  console.log('============callAPIGetFile==========');
  const data = await dispatch(api.get(EXPORT_FILE_1_RESOURCE));
  let outPut = {error: null, data: []}
  if (get(data, 'result.data', null)) {
    outPut.data = get(data, 'result.data', [])
  }
  return outPut;
}

export const callAPIGetFile2 = () => async (dispatch: any) => {
  console.log('============callAPIGetFile2==========');
  const data = await dispatch(api.get(EXPORT_FILE_2_RESOURCE));
  let outPut = {error: null, data: []}
  if (get(data, 'result.data', null)) {
    outPut.data = get(data, 'result.data', [])
  }
  return outPut;
}
