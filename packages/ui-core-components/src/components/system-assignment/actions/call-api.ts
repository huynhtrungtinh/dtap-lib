import { api } from '@dtap/ui-core';
import { get } from 'lodash';
import { SCOPE_RESOURCE } from '../provider';

export const callAPIGetScope = () => async (dispatch: any) => {
    const data = await dispatch(api.get(SCOPE_RESOURCE));
    let outPut = {error: null, data: []}
    if (get(data, 'result.data', null)) {
        outPut.data = get(data, 'result.data', [])
    }
    return outPut;
}

