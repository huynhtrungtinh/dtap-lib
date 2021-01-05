import { IInputProvider, IProviderOutPut } from '@dtap/ui-scl';
import { getApps } from '../mokup';
const APPS_RESOURCE = "apps-root";
const appsResource = (input: IInputProvider): IProviderOutPut => {
    const {typeRequest, apiURI, typeApi} = input;
    switch (typeRequest) {
        case typeApi.get:
            return {
                uri: `${apiURI.API_UAC_URI}/apps`,
                type: 'json',
                body: null,
                method: 'GET',
                ignoreToken: true,
                response: {
                    blod: null,
                    data: getApps(),
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
export { appsResource, APPS_RESOURCE };

