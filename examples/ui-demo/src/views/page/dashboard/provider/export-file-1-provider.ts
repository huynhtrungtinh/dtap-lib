import {IInputProvider, IProviderOutPut} from '@dtap/ui-scl';
const EXPORT_FILE_1_RESOURCE = "export_file_1_dashboard";

const exportFile1Resource = (input: IInputProvider): IProviderOutPut => {
    const {typeRequest, params, apiURI, typeApi} = input;
    const {projectId = '5de0a1527dabcc001e27c39f'} = params;
    switch (typeRequest) {
        case typeApi.get:
            return {
                uri: `${apiURI.API_URI}/apps/production-admin/projects/${projectId}/export?from_date=2020-10-01&to_date=2020-11-04&fields=date,assignee,section,pass`,
                type: 'file',
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
export {exportFile1Resource, EXPORT_FILE_1_RESOURCE};

