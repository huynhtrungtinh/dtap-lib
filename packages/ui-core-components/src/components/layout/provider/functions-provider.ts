import { IInputProvider, IProviderOutPut } from '@dtap/ui-scl';
import { OPERATION_KEY, TRAINING_KEY } from '../constants';
import { getFunctionsOperation, getFunctionsTraining } from '../mokup';
const FUNCTIONS_RESOURCE = "functions-root";
const functionsResource = (input: IInputProvider): IProviderOutPut => {
    const {typeRequest, params = {}, apiURI, typeApi} = input;
    const {appName} = params;
    switch (typeRequest) {
        case typeApi.get:
            if (appName === OPERATION_KEY) {
                return {
                    uri: `${apiURI.API_UAC_URI}/apps`,
                    type: 'json',
                    body: null,
                    method: 'GET',
                    response: {
                        blod: null,
                        data: getFunctionsOperation(),
                        headers: null,
                        response: null,
                        status: 200
                    }
                }
            } else if (TRAINING_KEY) {
                return {
                    uri: '',
                    response: {
                        blod: null,
                        data: getFunctionsTraining(),
                        headers: null,
                        response: null,
                        status: 200
                    }
                }
            }
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
export { functionsResource, FUNCTIONS_RESOURCE };

