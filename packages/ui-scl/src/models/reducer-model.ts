export interface IMeta {
  resource: string;
  [key: string]: any;
}

export interface IAction {
  readonly type: string;
  readonly payload?: any;
  readonly meta: IMeta;
}
export declare interface TypedAction<T extends string> extends IAction {
  readonly type: T;
}
export type ActionCreator = TypedAction<string> | IAction | any;

export interface Props<T> {
  _as: 'props';
  _p: T;
}

export interface ActionReducer<T, V extends IAction = IAction> {
  (state: T | undefined, action: V): T;
}

export interface IParams {
  [key: string]: any
}

export interface IActionsCreator {
  params: IParams;
  state: any;
}
