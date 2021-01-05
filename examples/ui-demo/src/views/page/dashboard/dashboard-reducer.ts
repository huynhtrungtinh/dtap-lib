import { IAction } from '@dtap/ui-scl';
import { NAME_REDUCER, UNMOUNT } from './dashboard-constants';

export const initialState: any = {

}
type ReducerState = Readonly<typeof initialState>;
export default {
  name: NAME_REDUCER,
  reducer: (state: ReducerState = initialState, actions: IAction) => {
    if (actions && actions.type) {
      const {type} = actions;
      switch (type) {
        case UNMOUNT:
          return {...initialState};
        default:
          return state;
      }
    }
    return state;
  }
};
