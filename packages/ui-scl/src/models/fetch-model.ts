export interface Options {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  body?: FormData | string;
  headers?: Headers;
  isFile?: boolean;
  response?: IFetchJsonOutPut;
}

export interface IFetchJsonOutPut {
  status: number;
  headers: any;
  data: any;
  response: any;
  blod?: any;
}

export interface MetaDataFetchType {
  resource?: string;
  fetch?: string;
  keyId?: string;
  onResponse?: Function;
}

export interface DataActionResult {
  type: string;
  payload: object;
  meta: MetaDataFetchType;
}

export interface IOutPutCallApi {
  result: any;
  dispatch: any;
  getState: any;
}

export const CRUD_GET = '@DGS/API/CRUD/GET';
export const CRUD_CREATE = '@DGS/API/CRUD/CREATE';
export const CRUD_UPDATE = '@DGS/API/CRUD/UPDATE';
export const CRUD_DELETE = '@DGS/API/CRUD/DELETE';
export const CRUD_CUSTOM = '@DGS/API/CRUD/CUSTOM';

export const GET = '@DGS/DATA_FETCH/GET';
export const CREATE = '@DGS/DATA_FETCH/CREATE';
export const UPDATE = '@DGS/DATA_FETCH/UPDATE';
export const DELETE = '@DGS/DATA_FETCH/DELETE';
