import { redirect } from '@dtap/ui-utils';
import { cloneDeep, get } from 'lodash';
import { ADD_TREE_ITEM_BY_TREE_NODE, ISideBar, PATH_TO_STORE_REDUX, PROJECTS_OPERATION_KEY, PROJECTS_TRAINING_KEY, SET_CLICK_SIDE_BAR_ITEM, SET_OPEN_SIDE_BAR, SET_SEARCH_SIDE_BAR } from '../constants';
import { callAPIGetFunctionsOperation } from './call-api';
import { executeActionReducer } from './common-actions';
import { createBreadcrumbsByTreeNode } from './header/breadcrumb-actions';
import { cloneSideBarData, convertFunctionsOperation2SideBar, convertFunctionsTraining2SideBar, convertTreeItemToSideBar, findSideBarItemByDisplayName, findSideBarItemByNodeId } from './side-bar-utils';

export const setOpenSideBar = (isOpen?: Boolean, route?: any) => async (dispatch: any, getState: any) => {
    const state = get(getState(), PATH_TO_STORE_REDUX, {});
    const routeFocus = state.routeFocus;
    let payload: any = {
        isSideBarOpen: false,
    };
    if (isOpen) {
        payload.isSideBarOpen = true;
    }
    if (!route) {
        payload.routeFocus = routeFocus;
    } else {
        payload.routeFocus = route;
    }
    dispatch(executeActionReducer(SET_OPEN_SIDE_BAR, payload));
};

export const setClickSideBarItem = (nodeId: any, history: any) => async (dispatch: any, getState: any) => {
    const state = get(getState(), PATH_TO_STORE_REDUX, {});
    const sideBarDataSearch = state.sideBarDataSearch || [];
    const sideBarSelectedItem = state.sideBarSelectedItem || {};
    let payload: any = {};
    if (sideBarSelectedItem.id === nodeId) {
        payload.sideBarSelectedItem = {};
        dispatch(executeActionReducer(SET_CLICK_SIDE_BAR_ITEM, payload));
        return;
    }
    const leftMenuItem = findSideBarItemByNodeId(sideBarDataSearch, nodeId);
    payload.sideBarSelectedItem = leftMenuItem.data;
    const path = get(leftMenuItem, 'data.path', '');
    if (get(leftMenuItem, 'data.children.length', 0) === 0 && [PROJECTS_OPERATION_KEY, PROJECTS_TRAINING_KEY].includes(path)) {
        dispatch(addTreeItemByTreeNode(leftMenuItem.data));
    } else if (path && ![PROJECTS_OPERATION_KEY, PROJECTS_TRAINING_KEY].includes(path)) {
        dispatch(createBreadcrumbsByTreeNode(leftMenuItem.data))
        dispatch(setOpenSideBar(false));
        if (!leftMenuItem.data.path_prefix) {
            history.push(leftMenuItem.data.path);
        } else {
            redirect(`${leftMenuItem.data.path}`)
        }
    } else {
        dispatch(executeActionReducer(SET_CLICK_SIDE_BAR_ITEM, payload));
    }
}

export const addTreeItemByTreeNode = (treeNode: ISideBar) => async (dispatch: any, getState: any) => {
    const state = get(getState(), PATH_TO_STORE_REDUX, {});
    const sideBarDataSearch = state.sideBarDataSearch || [];
    let routers = state.routers || {};
    const sideBarLastNodeId = state.sideBarLastNodeId;
    const path = get(treeNode, 'path', '');
    let payload: any = {};
    if (get(treeNode, 'children.length', 0) === 0 && [PROJECTS_OPERATION_KEY, PROJECTS_TRAINING_KEY].includes(path)) {
        payload.sideBarSelectedItem = treeNode;
        const projectId = treeNode.name;
        const projectName = treeNode.display_name;
        const rootApp = sideBarDataSearch[treeNode.pathFocus[0]];
        const functions: any = await dispatch(callAPIGetFunctionsOperation(projectId, rootApp.name));
        if (functions.error) {
            console.log('get functions data is error.');
        } else {
            payload.projectId = projectId;
            payload.projectName = projectName;
            if (path === PROJECTS_OPERATION_KEY) {
                const convertOperation = convertFunctionsOperation2SideBar({
                    sideBarData: sideBarDataSearch,
                    path: treeNode.pathFocus,
                    functions: functions.data,
                    ids: sideBarLastNodeId,
                    routers,
                    projectId, projectName
                });
                payload.sideBarDataSearch = convertOperation.data;
                payload.sideBarLastNodeId = convertOperation.ids;
                payload.routers = convertOperation.routers;
            } else if (path === PROJECTS_TRAINING_KEY) {
                const convertTraining = convertFunctionsTraining2SideBar({
                    sideBarData: sideBarDataSearch,
                    path: treeNode.pathFocus,
                    functions: functions.data,
                    ids: sideBarLastNodeId,
                    routers,
                    projectId, projectName
                });
                payload.sideBarDataSearch = convertTraining.data;
                payload.sideBarLastNodeId = convertTraining.ids;
                payload.routers = convertTraining.routers;
            }
        }
        dispatch(executeActionReducer(ADD_TREE_ITEM_BY_TREE_NODE, payload));
    }
}

export const setSearchSideBar = (name: string, value: string) => async (dispatch: any, getState: any) => {
    const state = get(getState(), PATH_TO_STORE_REDUX, {});
    const sideBarData = cloneDeep(state.sideBarData) || [];
    let sideBarDataClonelv1 = state.sideBarDataClonelv1;
    let isReady = state.isReady;
    if (!isReady) {return;}
    let payload: any = {};
    payload[name] = value;
    if (value.length === 0) {
        payload.sideBarDataSearch = sideBarData;
    } else {
        if (sideBarDataClonelv1.length === 0) {
            sideBarDataClonelv1 = cloneSideBarData(cloneDeep(sideBarData));
        }
        const treeItem = findSideBarItemByDisplayName({data: cloneDeep(sideBarData), nextData: sideBarDataClonelv1, name: value});
        const treeItemFinal = convertTreeItemToSideBar(sideBarData, treeItem);
        payload.sideBarDataSearch = treeItemFinal;
    }
    dispatch(executeActionReducer(SET_SEARCH_SIDE_BAR, payload));
}

