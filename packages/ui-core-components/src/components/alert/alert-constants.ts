const TYPE_PREFIX = '@DGS/ALERT/';
export const UNMOUNT = `${TYPE_PREFIX}UNMOUNT`;
export const SHOW_ALERT = `${TYPE_PREFIX}SHOW_ALERT`;
export const HIDDEN_ALERT = `${TYPE_PREFIX}HIDDEN_ALERT`;
export const HIDDEN_ALERT_ALL = `${TYPE_PREFIX}HIDDEN_ALERT_ALL`;
export const NAME_REDUCER = 'alert';
export const PATH_TO_STORE_REDUX = `resources.${NAME_REDUCER}.data`;
export const ALERT_ITEM_DEFAULT = {message: '', type: 'info', timmeOut: 3000};
