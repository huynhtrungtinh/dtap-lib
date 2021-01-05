import { api } from '@dtap/ui-core';
import { get } from 'lodash';
import { setShowAlert } from '../../alert';
import { APPS_RESOURCE, CONTACT_INFO_RESOURCE, FUNCTIONS_RESOURCE, OTHER_APPS_RESOURCE, PROJECTS_OPERATION_RESOURCE, PROJECTS_TRAINING_RESOURCE } from '../provider';

export const callAPIGetContactInfo = () => async (dispatch: any) => {
    const data = await dispatch(api.get(CONTACT_INFO_RESOURCE));
    let outPut = {error: null, data: []}
    if (get(data, 'result.data', null)) {
        outPut.data = get(data, 'result.data', [])
    }
    return outPut;
}

export const callAPIGetFunctionOtherApp = () => async (dispatch: any) => {
    const data = await dispatch(api.get(OTHER_APPS_RESOURCE));
    let outPut = {error: null, data: []}
    if (get(data, 'result.data', null)) {
        outPut.data = get(data, 'result.data', [])
    }
    return outPut;
}

export const callAPIGetApps = () => async (dispatch: any) => {
    const data = await dispatch(api.get(APPS_RESOURCE));
    let outPut = {error: null, data: []}
    if (get(data, 'result.data', null)) {
        outPut.data = get(data, 'result.data', [])
    }
    return outPut;
}

export const callAPIGetProjectsOperation = () => async (dispatch: any) => {
    const data = await dispatch(api.get(PROJECTS_OPERATION_RESOURCE));
    let outPut = {error: null, data: []}
    if (get(data, 'result.data', null)) {
        outPut.data = get(data, 'result.data', [])
    }
    return outPut;
}

export const callAPIGetProjectsTraining = () => async (dispatch: any) => {
    const data = await dispatch(api.get(PROJECTS_TRAINING_RESOURCE));
    let outPut = {error: null, data: []}
    if (get(data, 'result.data', null)) {
        outPut.data = get(data, 'result.data', [])
    }
    return outPut;
}

export const callAPIGetFunctionsOperation = (projectId: string | null, type: string) => async (dispatch: any) => {
    if (!projectId) {
        dispatch(setShowAlert('ProjectId is null', 'error'))
        return new Promise((resolve) => {
            resolve({
                error: {
                    code: 400,
                    messageViewClient: 'ProjectId is null',
                    messageFromServer: 'ProjectId is null',
                }
            });
        })
    }
    const data = await dispatch(api.get(FUNCTIONS_RESOURCE, {appName: type}));
    let outPut = {error: null, data: []}
    if (get(data, 'result.data', null)) {
        outPut.data = get(data, 'result.data', [])
    }
    return outPut;
}

