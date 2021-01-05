import { setAuthLogin, setAuthLogout, showSigninExpTime } from '@dtap/ui-core';
import { get, isEmpty } from 'lodash';
import { I18n } from 'react-redux-i18n';
import { setShowAlert } from '../alert';
import { setHiddenBackdrop, setShowBackdrop } from '../backdrop';
import { DEFAULT_ITEM, KEY_TRANSLATE, NAME_REDUCER, PATH_TO_STORE_REDUX, REGEX_EMPTY, SET_MOFIFY_CHANGE, SET_SHOW_PASSWORD, SET_SUBMIT, UNMOUNT } from './signin-constants';

export const executeActionReducer = (type: string, payload: any) => {
  return {type, payload, meta: {resource: NAME_REDUCER}};
};

export const setUnmount = () => async (dispatch: any) => {
  dispatch(executeActionReducer(UNMOUNT, {}));
};

export const setMofify = (name: string, value: string) => async (dispatch: any, getState: any) => {
  const state = get(getState(), PATH_TO_STORE_REDUX, {});
  const field = state[name] || '';
  const fieldName = I18n.t(`${KEY_TRANSLATE}.${name}`);
  let isValidate = validateRules(value, fieldName);
  let payload: any = {};
  payload[name] = {
    ...field,
    value,
    errorMessage: isValidate
  }
  dispatch(executeActionReducer(SET_MOFIFY_CHANGE, payload));
}

export const setShowText = (fieldKey: any) => async (dispatch: any, getState: any) => {
  const state = get(getState(), PATH_TO_STORE_REDUX, {});
  const field = state[fieldKey] || [];
  let payload: any = {
    [fieldKey]: {
      ...field,
      show_text: !field.show_text
    }
  };
  dispatch(executeActionReducer(SET_SHOW_PASSWORD, payload));
}

export const setSubmit = () => async (dispatch: any, getState: any) => {
  dispatch(setShowBackdrop());
  const state = get(getState(), PATH_TO_STORE_REDUX, {});
  const fields = {username: state.username, password: state.password};
  const isValidate = validateFields(fields);
  let payload: any = {};
  if (isValidate.isError) {
    payload = {...isValidate.fields}
    dispatch(executeActionReducer(SET_SUBMIT, payload));
  } else {
    const dataAPI: any = await dispatch(setAuthLogin(get(state, 'username.value', null), get(state, 'password.value', null)));
    if (dataAPI.status !== 200) {
      dispatch(setShowAlert(get(dataAPI, 'error.messageFromServer', I18n.t(`${KEY_TRANSLATE}.signup_error`)), 'error'))
    } else {
      dispatch(showSigninExpTime(false));
    }
  }
  dispatch(setHiddenBackdrop());
}

export const setClose = () => async (dispatch: any, getState: any) => {
  await dispatch(setAuthLogout())
}

function validateFields(fields: any) {
  let outPut: any = {
    isError: false,
    fields: {
      username: {...DEFAULT_ITEM},
      password: {...DEFAULT_ITEM, fieldType: 'password'}
    }
  };
  let fieldsArr = Object.keys(fields);
  for (let index = 0; index < fieldsArr.length; index++) {
    const key = fieldsArr[index];
    const field = fields[key];
    const fieldName = I18n.t(`${KEY_TRANSLATE}.${key}`);
    let isValidate = validateRules(field.value, fieldName);
    if (!outPut.isError && !isEmpty(isValidate)) {
      outPut.isError = true;
    }
    outPut.fields[key].errorMessage = isValidate;
  }
  return outPut;
}

function validateRules(value: any, fieldName: string) {
  let outPut: any = '';
  let emptyError = REGEX_EMPTY.test(value);
  let lengthError = value.length >= 100 ? false : true;
  if (!emptyError) {
    outPut = I18n.t(`${KEY_TRANSLATE}.empty_error`, {fieldName});
  } else if (!lengthError) {
    outPut = I18n.t(`${KEY_TRANSLATE}.length_error`, {fieldName});
  }
  return outPut;
}
