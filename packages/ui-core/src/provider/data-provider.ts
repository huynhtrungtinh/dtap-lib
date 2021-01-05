
import { CREATE, DELETE, GET, IInputProvider, IProviderOutPut, IResourceProvider, IResourceRegistries, UPDATE } from '@dtap/ui-scl';
import { config, fetchJson } from '@dtap/ui-utils';
class DataProvider {
  private static instance: DataProvider;
  private resourceRegistries: IResourceRegistries;

  constructor() {
    this.resourceRegistries = {}
  }

  public static getInstance(): DataProvider {
    if (!DataProvider.instance) {
      DataProvider.instance = new DataProvider();
    }
    return DataProvider.instance;
  }

  public setResourceRegistries(dataProvider: IResourceRegistries = {}) {
    if (typeof dataProvider === 'object' && Object.keys(dataProvider).length > 0) {
      Object.keys(dataProvider).map((key: string) => {
        const resource = dataProvider[key];
        this.resourceRegistries[key] = resource;
      });
    }
    return this.resourceRegistries;
  }

  public getResourceRegistry(name: string): IResourceProvider {
    const resourceRegistries: IResourceRegistries = this.resourceRegistries;
    if (resourceRegistries[name]) {
      return resourceRegistries[name];
    }
    return (input: IInputProvider): IProviderOutPut => {
      return {
        uri: '',
        ignoreToken: false,
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

  public getDataProvider(type: string, resource: string, params: any): Promise<any> {
    const configReq: IProviderOutPut = this.getResourceRegistry(resource)({
      typeRequest: type,
      typeApi: {
        get: GET,
        create: CREATE,
        update: UPDATE,
        delete: DELETE
      }, apiURI: config.getConfig(), resource, params,
    });
    return fetchJson(
      configReq.uri,
      {
        method: configReq.method || 'GET',
        isFile: (configReq.type && configReq.type === 'file') ? true : false,
        body: configReq.body,
        response: configReq.response
      },
      configReq.ignoreToken
    );
  }
}
export { DataProvider };
export default DataProvider
