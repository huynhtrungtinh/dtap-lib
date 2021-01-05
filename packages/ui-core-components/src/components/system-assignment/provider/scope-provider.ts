import { IInputProvider, IProviderOutPut } from '@dtap/ui-scl';
import { getScope } from '../mokup';
// import {fetchJson, getApiUacURI} from '@dtap/ui-utils';
// import {getScope} from '../mokup';

const SCOPE_RESOURCE = "scope-root";
const scopeResource = (input: IInputProvider): IProviderOutPut => {
    const {typeRequest, apiURI, typeApi} = input;
    switch (typeRequest) {
        case typeApi.get:
            return {
                uri: `${apiURI.API_UAC_URI}/apps`,
                type: 'json',
                body: null,
                method: 'GET',
                response: {
                    blod: null,
                    data: getScope(),
                    headers: null,
                    response: null,
                    status: 200
                }
            }
        default:
            return {
                uri: '',
                response: {
                    blod: null,
                    data: [],
                    headers: null,
                    response: null,
                    status: 200
                }
            }
    }
}

export { scopeResource, SCOPE_RESOURCE };

