import { IAction } from '@dtap/ui-scl';
import { NAME_REDUCER, SET_DATA_READY, UNMOUNT } from '../constants';

export const initialState: any = {
    isReady: false,
}

type ReducerState = Readonly<typeof initialState>;
export default {
    name: NAME_REDUCER,
    reducer: (state: ReducerState = {...initialState}, actions: IAction) => {
        if (actions && actions.type) {
            const {type, payload} = actions;
            switch (type) {
                case SET_DATA_READY:
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

