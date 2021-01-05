export interface Resource {
  name: string;
  reducer?: any;
  refresh?: boolean;
  flush?: boolean;
  unregisterDuration?: number;
}
export interface ResourceDefinition {
  readonly name: string;
  readonly options?: any;
}
export interface RegisterResourceAction {
  readonly type: string;
  readonly payload: ResourceDefinition;
}
export interface UnregisterResourceAction {
  readonly type: string;
  readonly payload: string[];
}
export interface RegisterResourceAction {
  readonly type: string;
  readonly payload: ResourceDefinition;
}
export interface UnregisterResourceAction {
  readonly type: string;
  readonly payload: string[];
}
export interface RemovePropsManagerResources {
  guid: string;
  name: string;
  time?: number;
  func?: any;
}
export const REGISTER_RESOURCE = 'DGS/REGISTER_RESOURCE';
export const UNREGISTER_RESOURCE = 'DGS/UNREGISTER_RESOURCE';
export const CORE_RESOURCE = [REGISTER_RESOURCE, UNREGISTER_RESOURCE];

export interface IResource {
  name: string;
  reducer?: any;
  options?: any;
}

export interface IPageOptionProps {
  context?: string;
  resources?: IResource[];
  actions?: any;
  mapState?: any;
  dataProvider?: any;
}

export interface IPageOption {
  context: string;
  resources: IResource[];
  actions: any;
  mapState?: any;
  dataProvider?: any;
}

export class PageOption implements IPageOption {
  readonly context: string;
  readonly resources: IResource[];
  readonly dataProvider: any;
  readonly actions: any;
  readonly mapState?: any;
  constructor(props: IPageOption) {
    this.actions = props.actions || {};
    this.resources = props.resources || [];
    this.context = props.context || 'registration';
    this.mapState = props.mapState;
    this.dataProvider = props.dataProvider || {};
  }
}
