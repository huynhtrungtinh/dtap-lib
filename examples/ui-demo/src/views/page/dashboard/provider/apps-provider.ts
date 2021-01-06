import {IInputProvider, IProviderOutPut} from '@dtap/ui-scl';
const APPS_RESOURCE = "apps-dashbard";
const appsResource = (input: IInputProvider): IProviderOutPut => {
    const {typeRequest, apiURI, typeApi} = input;
    switch (typeRequest) {
        case typeApi.get:
            return {
                uri: `${apiURI.API_URI}/apps`,
                type: 'json',
                body: null,
                method: 'GET'
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
export {appsResource, APPS_RESOURCE};

