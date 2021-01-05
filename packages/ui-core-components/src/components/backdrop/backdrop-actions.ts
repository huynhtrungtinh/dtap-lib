import {get} from 'lodash';
import {BACKGROUND_DEFAULT, HIDDEN_BACKDROP, ICON_COLOR_PROGRESS, NAME_REDUCER, PATH_TO_STORE_REDUX, SHOW_BACKDROP, UNMOUNT} from './backdrop-constants';

export const setShowBackdrop = (background?: string, iconColor?: string) => async (dispatch: any, getState: any) => {
    const state = get(getState(), PATH_TO_STORE_REDUX, {});
    if (!state.isShowBackdrop) {
        dispatch(executeActionReducer(SHOW_BACKDROP, {
            isShowBackdrop: true,
            background: background || BACKGROUND_DEFAULT,
            iconColor: iconColor || ICON_COLOR_PROGRESS
        }));
    }
}

export const setHiddenBackdrop = () => async (dispatch: any, getState: any) => {
    const state = get(getState(), PATH_TO_STORE_REDUX, {});
    if (state.isShowBackdrop) {
        dispatch(executeActionReducer(HIDDEN_BACKDROP, {isShowBackdrop: false}));
    }
}

export const executeActionReducer = (type: string, payload: any) => {
    return {type, payload, meta: {resource: NAME_REDUCER}};
};

export const unmount = () => async (dispatch: any) => {
    dispatch(executeActionReducer(UNMOUNT, {}));
};
