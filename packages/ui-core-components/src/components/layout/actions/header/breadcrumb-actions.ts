import { redirectApp } from '@dtap/ui-utils';
import { BREADCRUMB_HOME, CREATE_BREADCRUMBS_BY_TREE_NODE, ISideBar, OPERATION_KEY, PATH_HOME_KEY } from '../../constants';
import { executeActionReducer } from '../common-actions';

export const createBreadcrumbsByTreeNode = (treeNode?: ISideBar) => async (dispatch: any, getState: any) => {
  let payload: any = {};
  payload.isSideBarOpen = false;
  if (!treeNode) {
    payload.breadcrumbsData = [BREADCRUMB_HOME];
    payload.sideBarSelectedItem = {};
  } else {
    payload.breadcrumbsData = createBreadcrumbsData(treeNode);
    payload.sideBarSelectedItem = treeNode;
  }
  dispatch(executeActionReducer(CREATE_BREADCRUMBS_BY_TREE_NODE, payload));
}

export function createBreadcrumbsData(data: ISideBar) {
  let outPut: any = [];
  if (data.projectId) {
    outPut.push({
      name: data.root_app,
      path: "/",
      index: 0
    })
    outPut.push({
      name: data.projectName,
      path: `/${data.root_app}/${data.projectId}/`,
      index: 1
    })
    let lastItem = {
      name: data.name,
      path: data.path,
      index: 2
    };
    if (data.root_app === OPERATION_KEY) {
      lastItem.name = data.display_name
    }
    outPut.push(lastItem)
  } else {
    outPut.push({
      name: data.root_app,
      path: "/",
      index: 0
    })
    outPut.push({
      name: data.name,
      path: data.path,
      index: 1
    })
  }
  return outPut;
}

export const setClickBreadcrumbsItem = (item: any, history: any) => async (dispatch: any, getState: any) => {
  // console.log('==========setClickBreadcrumbsItem=================');
  // console.log('item: ', item);
  // console.log('history: ', history);
  // console.log('====================================');
  // history.push(PATH_HOME_KEY);
  redirectApp(PATH_HOME_KEY);
}
