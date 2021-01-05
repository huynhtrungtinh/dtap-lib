
import {NAME_REDUCER, SET_DATA_READY, UNMOUNT} from '../constants';

export const executeActionReducer = (type: string, payload: any) => {
  return {type, payload, meta: {resource: NAME_REDUCER}};
};

export const unmount = () => async (dispatch: any) => {
  dispatch(executeActionReducer(UNMOUNT, {}));
};

export const getDataForReady = () => async (dispatch: any, getState: any) => {
  let payload: any = {}
  dispatch(executeActionReducer(SET_DATA_READY, payload));
}
