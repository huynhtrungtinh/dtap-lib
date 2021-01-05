export const NAME_REDUCER = 'signin';
export const KEY_TRANSLATE = 'signin';
export const PATH_TO_STORE_REDUX = `resources.${NAME_REDUCER}.data`;
export const DEFAULT_ITEM = {
  value: '',
  errorMessage: '',
  show_text: false,
  fieldType: 'text'
};
export const REGEX_EMPTY = /^(?!\s*$).+/

const TYPE_PREFIX = '@DGS/SIGNIN/';
export const UNMOUNT = `${TYPE_PREFIX}UNMOUNT`;
export const SET_SHOW_PASSWORD = `${TYPE_PREFIX}SET_SHOW_PASSWORD`;
export const SET_SUBMIT = `${TYPE_PREFIX}SET_SUBMIT`;
export const SET_MOFIFY_CHANGE = `${TYPE_PREFIX}SET_MOFIFY_CHANGE`;
