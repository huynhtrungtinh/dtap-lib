/**
 * Appends REQUEST async action type
 */
export const REQUEST_KEY = "REQUEST";
export const REQUEST = (actionType: any) => `${actionType}_REQUEST`;

/**
 * Appends SUCCESS async action type
 */
export const SUCCESS_KEY = "SUCCESS";
export const SUCCESS = (actionType: any) => `${actionType}_SUCCESS`;

/**
 * Appends FAILURE async action type
 */
export const FAILURE_KEY = "FAILURE";
export const FAILURE = (actionType: any) => `${actionType}_FAILURE`;

export const FETCH_START = '@DGS/FETCH_START';
export const FETCH_END = '@DGS/FETCH_END';
export const FETCH_ERROR = '@DGS/FETCH_ERROR';
export const FETCH_CANCEL = '@DGS/FETCH_CANCEL';
