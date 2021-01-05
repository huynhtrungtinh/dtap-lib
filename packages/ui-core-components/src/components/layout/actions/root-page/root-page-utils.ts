import {IFunction, ISideBar, LOCAL_STORAGE_STATUS_LAYOUT_ROOT} from '../../constants';
import {mergePath} from '../common-actions';

export function createOperatorProjectData(data: ISideBar[]) {
  let outPut: any = [];
  for (let i = 0; i < data.length; i++) {
    const el = data[i];
    const children1 = el.children;
    for (let j = 0; j < children1.length; j++) {
      const children2 = children1[j];
      outPut.push(children2)
    }
  }
  return outPut;
}

export function convertFunctions2ProjectData(datas: IFunction[], projectId: string) {
  let outPut: any = [];
  let datasObj: any = {};
  for (let i = 0; i < datas.length; i++) {
    const element = datas[i];
    if (!datasObj[element.root_app]) {
      datasObj[element.root_app] = []
    }
    datasObj[element.root_app].push(element);
  }
  let datasKeys: any = Object.keys(datasObj);
  for (let index = 0; index < datasKeys.length; index++) {
    const key = datasKeys[index];
    const value = datasObj[key];
    let items: any = [];
    for (let j = 0; j < value.length; j++) {
      const element = value[j];
      let pathItem = mergePath({path1: element.path_prefix, path2: element.path, projectId, appName: element.root_app, pathPrefix: element.path_prefix});
      const item = {
        "root_app": element.root_app,
        "display_root_app": element.display_root_app,
        "name": element.name,
        "display_name": element.display_name,
        "path": pathItem,
        "id": `${index}`,
        "indexItem": index,
        "pathFocus": [],
        "info": 0,
        "children": [],
        "type": element.type,
      }
      items.push(item);
    }
    outPut.push(items);
  }
  return outPut;
}

export function getLocalStorageLayoutRoot() {
  let outPut: any = localStorage.getItem(LOCAL_STORAGE_STATUS_LAYOUT_ROOT);
  if (outPut) {
    outPut = JSON.parse(outPut);
  } else {
    outPut = null;
  }
  return outPut;
}

export function setLocalStorageLayoutRoot(data: any) {
  localStorage.setItem(LOCAL_STORAGE_STATUS_LAYOUT_ROOT, JSON.stringify(data))
}

export function removeLocalStorageLayoutRoot() {
  localStorage.removeItem(LOCAL_STORAGE_STATUS_LAYOUT_ROOT);
}

export function clearLocalStorageLayoutRoot() {
  try {
    localStorage.removeItem(LOCAL_STORAGE_STATUS_LAYOUT_ROOT);
  } catch (error) {
    console.log('save local storage status layout root is error.')
  }
}
