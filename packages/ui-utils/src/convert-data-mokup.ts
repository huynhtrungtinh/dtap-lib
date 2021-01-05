import {IProviderOutPut} from '@dtap/ui-scl';

function convertDataMokup(data: any, status?: number): IProviderOutPut {
  return {
    uri: '/apps',
    type: 'json',
    body: null,
    method: 'GET',
    response: {
      blod: null,
      data,
      headers: null,
      response: null,
      status: status || 200
    }
  }
}
export default convertDataMokup;
export {convertDataMokup};

