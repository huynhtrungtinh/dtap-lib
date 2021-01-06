import {IInputProvider, IProviderOutPut} from '@dtap/ui-scl';
import {getProjectsOperation} from '../mokup';
const PROJECTS_OPERATION_RESOURCE = "projects-operation";
const projectsOperationResource = (input: IInputProvider): IProviderOutPut => {
    const {typeRequest, apiURI, typeApi} = input;
    switch (typeRequest) {
        case typeApi.get:
            return {
                uri: `${apiURI.API_URI}/apps`,
                type: 'json',
                body: null,
                method: 'GET',
                response: {
                    blod: null,
                    data: getProjectsOperation(),
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
export {projectsOperationResource, PROJECTS_OPERATION_RESOURCE};

