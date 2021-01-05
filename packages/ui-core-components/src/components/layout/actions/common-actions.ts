import { PATH_TO_STORE_AUTH } from '@dtap/ui-scl';
import { get } from 'lodash';
import { match } from 'react-router-dom';
import { APPS, ISideBar, MATCH_DEFAULT, NAME_REDUCER, OPERATION_KEY, PATH_TO_STORE_REDUX, SET_BREAKPOINT, SET_DATA_OPERATION, SET_DATA_READY, SET_DATA_TRAINING, TRAINING_KEY, UNMOUNT } from '../constants';
import { callAPIGetApps, callAPIGetFunctionOtherApp, callAPIGetProjectsOperation, callAPIGetProjectsTraining } from './call-api';
import { createBreadcrumbsByTreeNode } from './header';
import { createOperatorProjectData, getDataRootPage } from './root-page';
import { addTreeItemByTreeNode } from './side-bar-actions';
import { convertFunctionOtherApp2SideBar, convertProjectsOperation2SideBar, convertProjectsTraining2SideBar, findSideBarItemByName, findSideBarItemByNameVsRootApp } from './side-bar-utils';

export const executeActionReducer = (type: string, payload: any) => {
  return {type, payload, meta: {resource: NAME_REDUCER}};
};

export const unmount = () => async (dispatch: any) => {
  dispatch(executeActionReducer(UNMOUNT, {}));
};

export const setBreakpoints = (width: 'xs' | 'sm' | 'md' | 'lg' | 'xl', size: {height: 0, width: 0}) => async (dispatch: any, getState: any) => {
  const authentication = get(getState(), PATH_TO_STORE_AUTH, {});
  const {isAuthenticated = false, isCheckToken = false} = authentication || {};
  if (!isAuthenticated || !isCheckToken) {
    return;
  }
  let payload: any = {
    width: size.width,
    height: size.height,
    breakpoint: width,
    isReady: true
  };
  dispatch(executeActionReducer(SET_BREAKPOINT, payload));
}
interface IGetDataForReady {
  version: string;
  match: match;
  history: any;
}
export const getDataForReady = (input: IGetDataForReady) => async (dispatch: any, getState: any) => {
  const authentication = get(getState(), PATH_TO_STORE_AUTH, {});
  const {isAuthenticated = false, isCheckToken = false} = authentication || {};
  const state = get(getState(), PATH_TO_STORE_REDUX, {});
  const sideBarData = state.sideBarData || [];
  if (!isAuthenticated || !isCheckToken) {
    return;
  }
  const {
    // version = "0.0.1",
    match = MATCH_DEFAULT
  } = input;

  if (sideBarData.length > 0) {
    dispatch(getDataByPathName(match, history))
    return;
  }
  if (sideBarData.length > 0) {return;}
  let payload: any = {};
  const apps: any = await dispatch(callAPIGetApps());
  const appFinal: any = [];
  if (apps.error) {
    console.log('get contacts data is error.');
  } else {
    APPS.map((appName: any) => {
      const a = apps.data.find((app: any) => app.app_name === appName);
      if (a) {
        appFinal.push(a);
      }
    })
    const otherApp: any = await dispatch(callAPIGetFunctionOtherApp());
    if (otherApp.error) {
      console.log('get contacts data is error.');
      dispatch(getDataOperation(match, history));
    } else {
      const convert1: any = convertFunctionOtherApp2SideBar(appFinal, otherApp.data);
      payload.sideBarData = convert1.data;
      payload.sideBarDataSearch = convert1.data;
      payload.sideBarLastNodeId = convert1.ids;
      payload.routers = convert1.routers;
      dispatch(executeActionReducer(SET_DATA_READY, payload));
      dispatch(getDataOperation(match, history));
    }
  }
}

export const getDataOperation = (match: match, history: any) => async (dispatch: any, getState: any) => {
  const state = get(getState(), PATH_TO_STORE_REDUX, {});
  const sideBarData = state.sideBarData || [];
  const sideBarLastNodeId = state.sideBarLastNodeId;
  const projects: any = await dispatch(callAPIGetProjectsOperation());
  let payload: any = {}
  if (projects.error) {
    console.log('get projects data is error.');
    dispatch(getDataTraining(match, history));
  } else {
    const convert2: any = convertProjectsOperation2SideBar(sideBarData, projects.data, sideBarLastNodeId)
    payload.sideBarData = convert2.data;
    const operatorApp = convert2.data.find((i: ISideBar) => i.name === OPERATION_KEY)
    const rowsOperator = createOperatorProjectData(operatorApp && operatorApp.children || []);
    payload.rowsProjectOperatorParent = rowsOperator;
    payload.sideBarDataSearch = convert2.data;
    payload.sideBarLastNodeId = convert2.ids;
    payload.isReady = true;
    dispatch(executeActionReducer(SET_DATA_OPERATION, payload));
    dispatch(getDataTraining(match, history));
  }
}

export const getDataTraining = (match: match, history: any) => async (dispatch: any, getState: any) => {
  const state = get(getState(), PATH_TO_STORE_REDUX, {});
  const sideBarData = state.sideBarData || [];
  const sideBarLastNodeId = state.sideBarLastNodeId;
  const projects: any = await dispatch(callAPIGetProjectsTraining());
  let payload: any = {}
  if (projects.error) {
    console.log('get projects data is error.');
  } else {
    const convert2: any = convertProjectsTraining2SideBar(sideBarData, projects.data, sideBarLastNodeId)
    const rowsTraining = convert2.data.find((i: ISideBar) => i.name === TRAINING_KEY)
    payload.rowsProjectTrainingParent = rowsTraining && rowsTraining.children || [];
    payload.sideBarData = convert2.data;
    payload.sideBarDataSearch = convert2.data;
    payload.sideBarLastNodeId = convert2.ids;
    dispatch(executeActionReducer(SET_DATA_TRAINING, payload));
    dispatch(getDataByPathName(match, history))
    dispatch(getDataRootPage())
  }
}

export function getHref(path: string) {
  const baseHref = window.location.origin;
  return `${baseHref}${path}`;
}

export function getPathPrefix() {
  const pathName = window.location.pathname;
  let pathArr = pathName.split("/");
  return pathArr[0] !== "" ? pathArr[0] : pathArr[1];
}
interface IMergePath {
  path1: string | undefined;
  path2: string;
  projectId?: string;
  appName?: string;
  pathPrefix?: string;
}
export function mergePath(input: IMergePath) {
  let {path1, path2, projectId, appName = "", pathPrefix = null} = input;
  let outPut: string = "";
  if (!path1) {
    path1 = appName;
  }
  let path1Arr = path1.split("/");
  let path2Arr = path2.split("/");
  if (!pathPrefix) {
    for (let i = 0; i < path1Arr.length; i++) {
      const element = path1Arr[i];
      if (element !== "") {
        outPut = outPut + "/" + element;
      }
    }
  } else {
    outPut = "/" + appName;
  }
  if (process.env["NODE_ENV"] !== "production") {
    outPut = "/" + appName;
  }
  for (let j = 0; j < path2Arr.length; j++) {
    const element = path2Arr[j];
    if (element !== "") {
      if (element === ':projectId') {
        outPut = outPut + "/" + projectId;
      } else {
        outPut = outPut + "/" + element;
      }
    }
  }
  outPut = outPut + "/";
  return outPut;
}

const getDataByPathName = (match: match, history: any) => async (dispatch: any, getState: any) => {
  const state = get(getState(), PATH_TO_STORE_REDUX, {});
  const sideBarData = state.sideBarData || [];
  const projectId = get(match, 'params.projectId', null);
  const appName = get(match, 'params.appName', null);
  const taskKeyDef = get(match, 'params.taskKeyDef', null);
  const pathName = get(match, 'url', '');
  const pathRoute = get(match, 'path', '');
  let functionName: any = taskKeyDef;
  if (projectId && appName) {
    const treeNode: any = findSideBarItemByNameVsRootApp(sideBarData, projectId, appName);
    await dispatch(addTreeItemByTreeNode(treeNode));
    if (!functionName) {
      functionName = findFunctionNameByPathName(pathName, pathRoute, ":projectId")
    }
    const newLeftMenuData = get(getState(), `${PATH_TO_STORE_REDUX}.sideBarData`, []);
    const newTreeNode = get(newLeftMenuData, treeNode.pathFocus)
    const lastChild = findSideBarItemByName(newTreeNode.children, functionName);
    if (lastChild.data) {
      dispatch(createBreadcrumbsByTreeNode(lastChild.data))
    }
  } else if (appName) {
    functionName = findFunctionNameByPathName(pathName, pathRoute, ":appName");
    const treeNode: any = findSideBarItemByNameVsRootApp(sideBarData, functionName, appName);
    if (treeNode) {
      dispatch(createBreadcrumbsByTreeNode(treeNode))
    }
  } else {
    dispatch(createBreadcrumbsByTreeNode())
  }
}

function findFunctionNameByPathName(pathName: string, pathRoute: string, findKey: string) {
  const pathNameKeys = pathName.split("/");
  const pathRouteKeys = pathRoute.split("/");
  let outPut: any = null;
  for (let index = 0; index < pathNameKeys.length; index++) {
    if (pathRouteKeys[index] === findKey) {
      outPut = pathNameKeys[index + 1];
      break;
    }
  }
  return outPut;
}


