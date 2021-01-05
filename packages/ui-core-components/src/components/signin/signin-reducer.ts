import { IAction } from '@dtap/ui-scl';
import { DEFAULT_ITEM, NAME_REDUCER, SET_MOFIFY_CHANGE, SET_SHOW_PASSWORD, SET_SUBMIT, UNMOUNT } from './signin-constants';

const initialState: any = {
  username: {...DEFAULT_ITEM},
  password: {...DEFAULT_ITEM, fieldType: 'password'},
  errorMessage: null
}
type ReducerState = Readonly<typeof initialState>;
export default {
  name: NAME_REDUCER,
  reducer: (state: ReducerState = initialState, actions: IAction) => {
    if (actions && actions.type) {
      const {type, payload} = actions;
      switch (type) {
        case SET_SHOW_PASSWORD:
        case SET_SUBMIT:
        case SET_MOFIFY_CHANGE:
          return {
            ...state,
            ...payload
          }
        case UNMOUNT:
          return {...initialState};
        default:
          return state;
      }
    }
    return state;
  }
};
