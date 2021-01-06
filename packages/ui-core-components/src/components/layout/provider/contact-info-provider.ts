import {IInputProvider, IProviderOutPut} from '@dtap/ui-scl';
import {getContactInfo} from '../mokup';
const CONTACT_INFO_RESOURCE = "contact-info-root";
const contactInfoResource = (input: IInputProvider): IProviderOutPut => {
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
                    data: getContactInfo(),
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
export {contactInfoResource, CONTACT_INFO_RESOURCE};

