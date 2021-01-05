import {Column} from './models_constants';

export const NAME_REDUCER = 'layout_root';
export const KEY_TRANSLATE = 'layout_root';
export const PATH_TO_STORE_REDUX = `resources.${NAME_REDUCER}.data`;

export const HEIGHT_HEADER = 48;
export const ID_HEADER = 'header_root';
export const LOCAL_STORAGE_STATUS_LAYOUT_ROOT = 'status-root-layout';
export const DISPLAY_KEY_OPEN = 'flex';
export const DISPLAY_KEY_CLOSE = 'none';

export const MENU_ID = 'account menu';
export const CONTACT_MENU_ID = 'contact menu';
export const MOBILE_MENU_ID = 'mobile menu';
export const SCOPE_ROOT = ["system", "functional", "operation"]
export const PROJECTS_OPERATION_KEY = 'project-operation';
export const PROJECTS_TRAINING_KEY = 'project-training';
export const OPERATION_KEY = 'operation';
export const OPERATOR_KEY = 'operator';
export const TRAINING_KEY = 'training';
export const SYSTEM_KEY = 'system';
export const FUNCTIONAL_KEY = 'functional';
export const PATH_HOME_KEY = '/home';
export const APPS = [TRAINING_KEY, SYSTEM_KEY, FUNCTIONAL_KEY, OPERATION_KEY];
export const BREADCRUMB_HOME = {
  path: '/',
  name: 'home',
  index: 0
};
export const MATCH_DEFAULT = {
  isExact: false,
  params: {},
  path: "",
  url: ""
}

export const COLUMNS_PROJECT: Column[] = [
  {
    id: 'project',
    label: 'project_name',
    minWidth: 120,
    sortColumn: false,
    sortDirection: 'none',
    index: 0
  },
  {
    id: 'customer',
    label: 'customer_name',
    minWidth: 130,
    sortColumn: false,
    sortDirection: 'none',
    index: 1
  }
];
