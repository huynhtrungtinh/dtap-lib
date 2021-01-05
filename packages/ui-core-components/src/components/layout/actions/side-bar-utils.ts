import {get, orderBy, set} from 'lodash';
import {I18n} from 'react-redux-i18n';
import {IApps, IFunction, IProject, ISideBar, KEY_TRANSLATE, OPERATION_KEY, PROJECTS_OPERATION_KEY, PROJECTS_TRAINING_KEY} from '../constants';
import {getPathPrefix, mergePath} from './common-actions';


interface IFunctions2SideBar {
  sideBarData: ISideBar[];
  path: string[];
  functions: IFunction[];
  ids: number;
  routers: any;
  projectId: string;
  projectName: string;
}

function convertFunctionsOperation2SideBar(input: IFunctions2SideBar) {
  let {sideBarData = [], path = '', functions = [], ids = 1, routers = {}, projectId, projectName} = input;
  let outPut: any = {
    data: sideBarData,
    routers,
    ids: 0
  };
  let scopes: any = {}
  functions.map((f: IFunction) => {
    if (!scopes[f.root_app]) {
      scopes[f.root_app] = [];
    }
    scopes[f.root_app].push(f)
  })

  const scopesKey = Object.keys(scopes);
  const parentId = get(sideBarData, [...path, 'nodeIds'])
  const rootItem = get(sideBarData, path[0])
  const pathPrefix = getPathPrefix();
  let newFunctions: any = []
  let idChild = ids + scopesKey.length;
  for (let index = 0; index < scopesKey.length; index++) {
    const key = scopesKey[index];
    const values = scopes[key];
    if (values[0]) {
      let childrens: any = {
        "root_app": values[0].root_app,
        "display_root_app": values[0].display_root_app,
        "name": values[0].root_app,
        "display_name": I18n.t(`${KEY_TRANSLATE}.${values[0].root_app}`),
        "path": null,
        "nodeIds": [...parentId, `${ids}`],
        "id": `${ids++}`,
        "pathFocus": [...path, 'children', index],
        "info": values.length,
        "children": []
      }
      orderBy(values, ["sub_app"]).map((f: IFunction, iFunc: any) => {
        let pathItem = mergePath({path1: f.path_prefix, path2: f.path, projectId, appName: rootItem.name, pathPrefix});
        let ff: any = {
          ...f,
          "root_app": rootItem.name,
          "display_root_app": rootItem.display_name,
          "projectId": projectId,
          "projectName": projectName,
          "path": pathItem,
          "pathFocus": [...childrens.pathFocus, 'children', iFunc],
          "nodeIds": [...childrens.nodeIds, `${idChild}`],
          "id": `${idChild++}`,
          "children": []
        }
        if (f.type === "workflow") {
          ff.info = 100000
        }
        childrens.children.push(ff);
        if (!outPut.routers[rootItem.name]) {
          outPut.routers[rootItem.name] = []
        }
        outPut.routers[rootItem.name].push(pathItem);
      })
      newFunctions.push(childrens)
    }
  }
  outPut.ids = idChild;
  set(outPut.data, [...path, 'children'], newFunctions)
  set(outPut.data, [...path, 'info'], newFunctions.length)
  return outPut;
}

function convertFunctionsTraining2SideBar(input: IFunctions2SideBar) {
  let {sideBarData = [], path = '', functions = [], ids = 1, routers = {}, projectId, projectName} = input;
  let outPut: any = {
    data: sideBarData,
    routers,
    ids
  };
  const pathPrefix = getPathPrefix();
  let newFunctions: any = [];
  const parentId = get(sideBarData, [...path, 'nodeIds'])
  for (let index = 0; index < functions.length; index++) {
    const values = functions[index];
    if (values) {
      let pathItem = mergePath({path1: values.path_prefix, path2: values.path, projectId, appName: values.root_app, pathPrefix});
      let childrens: any = {
        "root_app": values.root_app,
        "display_root_app": values.display_root_app,
        "name": values.name,
        "display_name": I18n.t(`${KEY_TRANSLATE}.${values.root_app}`),
        // "display_name": values.display_name,
        "path": pathItem,
        "path_prefix": values.path_prefix,
        "projectId": projectId,
        "projectName": projectName,
        "nodeIds": [...parentId, `${ids}`],
        "id": `${ids++}`,
        "pathFocus": [...path, 'children', index],
        "children": []
      }
      newFunctions.push(childrens);
      if (!outPut.routers[values.root_app]) {
        outPut.routers[values.root_app] = []
      }
      outPut.routers[values.root_app].push(pathItem);
    }
  }
  outPut.ids = ids;
  set(outPut.data, [...path, 'children'], newFunctions)
  set(outPut.data, [...path, 'info'], newFunctions.length)
  return outPut;
}

function findSideBarItemByNodeId(data: ISideBar[], nodeId: string, path?: string[]) {
  let outPut: any = {
    path: path || [],
    data: null,
  };
  for (let index = 0; index < data.length; index++) {
    const element: ISideBar = data[index];
    if (!element) {continue;}
    if (!path) {
      outPut.path = [];
      outPut.path.push(index);
    }
    if (element.id === nodeId) {
      outPut.data = element;
      if (path) {
        outPut.path.push('children');
        outPut.path.push(index);
      }
      break;
    } else {
      if (path && path[0]) {
        outPut.path.push('children');
        outPut.path.push(index);
      }
      let newItem: any = findSideBarItemByNodeId(element.children, nodeId, outPut.path);
      if (newItem.data) {
        outPut = newItem;
        break;
      } else {
        if (path && path[1]) {
          outPut.path.pop();
          outPut.path.pop();
        }
      }
    }
  }
  return outPut;
}

function findSideBarItemByName(data: ISideBar[], name: string, path?: string[]) {
  let outPut: any = {
    path: path || [],
    data: null,
  };
  for (let index = 0; index < data.length; index++) {
    const element: ISideBar = data[index];
    if (!element) {continue;}
    if (!path) {
      outPut.path = [];
      outPut.path.push(index);
    }
    if (element.name === name) {
      outPut.data = element;
      if (path) {
        outPut.path.push('children');
        outPut.path.push(index);
      }
      break;
    } else {
      if (path && path[0]) {
        outPut.path.push('children');
        outPut.path.push(index);
      }
      let newItem: any = findSideBarItemByName(element.children, name, outPut.path);
      if (newItem.data) {
        outPut = newItem;
        break;
      } else {
        if (path && path[1]) {
          outPut.path.pop();
          outPut.path.pop();
        }
      }
    }
  }
  return outPut;
}

interface IFindSideBartemByName {
  data: ISideBar[];
  name: string;
  nextData?: any;
}

function findSideBarItemByDisplayName(input: IFindSideBartemByName) {
  const {data, name, nextData} = input;
  let outPut: any = nextData;
  if (data.length === 0) {
    return [];
  }
  for (let index = 0; index < data.length; index++) {
    const element: ISideBar = data[index];
    if (element.display_name.toLocaleLowerCase().search(name.toLocaleLowerCase()) !== -1) {
      set(outPut, element.pathFocus, {...element});
      if (element.children.length > 0) {
        let newItem: any = findSideBarItemByDisplayName({data: element.children, name, nextData: outPut});
        if (newItem.length > 0) {
          outPut = newItem;
        } else {
          if (element.pathFocus[element.pathFocus.length - 1] !== 'children') {
            set(outPut, element.pathFocus, null);
          }
        }
      }
    } else {
      let newItem: any = findSideBarItemByDisplayName({data: element.children, name, nextData: outPut});
      if (newItem.length > 0) {
        outPut = newItem;
      } else {
        if (element.pathFocus[element.pathFocus.length - 1] !== 'children') {
          set(outPut, element.pathFocus, null);
        }
      }
    }
  }
  return outPut;
}

function cloneSideBarData(data: ISideBar[], nextData?: ISideBar[]) {
  let outPut: any = nextData || data;
  if (data.length === 0) {
    return [];
  }
  for (let index = 0; index < data.length; index++) {
    const element: ISideBar = data[index];
    if (element.children.length > 0) {
      set(outPut, [...element.pathFocus, "children"], []);
    }
  }
  return outPut;
}

function convertTreeItemToSideBar(dataParent: ISideBar[], data: ISideBar[], pathNext?: any[], pathParent?: any[]) {
  let outPut: any = [];
  pathNext = pathNext || [];
  pathParent = pathParent || [];
  let indexNext = 0;
  let parent: any = {}
  for (let i = 0; i < data.length; i++) {
    let element: any = data[i];
    if (!element) {continue;}
    if (element.children.length > 0) {
      parent = {
        ...element,
        children: [],
      };
      if (!element.pathFocus) {
        parent = {
          ...get(dataParent, [...pathParent, 'children', i], {}),
          pathFocus: [...pathNext, 'children', indexNext],
          children: [],
        };
      }
      else if (element.pathFocus.length > 1) {
        parent.pathFocus = [...pathNext, 'children', indexNext];
      } else if (element.pathFocus.length === 1) {
        parent.pathFocus = [indexNext];
      }
      parent.children = convertTreeItemToSideBar(dataParent, element.children, parent.pathFocus, element.pathFocus);
      if (parent.children.length > 0) {
        outPut.push(parent);
        indexNext++;
      }
    } else if (element.pathFocus.length > 1) {
      parent = {...element};
      if (element.pathFocus.length > 1) {
        parent.pathFocus = [...pathNext, 'children', indexNext++];
      } else {
        parent.pathFocus = [indexNext++];
      }
      outPut.push(parent);
    }
  }
  return outPut;
}

function findSideBarItemByNameVsRootApp(data: ISideBar[], projectId: string, appName?: string) {
  let outPut: any = null;
  let items: any = data;
  if (appName) {
    const app: any = data.find((app: any) => app.root_app === appName);
    items = app.children;
  }
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    if (item.name === projectId) {
      outPut = item;
      break;
    } else if (item.children.length > 0) {
      outPut = findSideBarItemByNameVsRootApp(item.children, projectId);
      if (outPut) {
        break;
      }
    }
  }
  return outPut;
}

function convertProjectsOperation2SideBar(sideBarData: ISideBar[], projects: IProject[], ids: number) {
  let outPut: any = {
    data: sideBarData,
    ids: 0
  };
  const operation: any = sideBarData.find((i: ISideBar) => i.name === OPERATION_KEY);
  const operationIndex: any = sideBarData.findIndex((i: ISideBar) => i.name === OPERATION_KEY);
  if (operation) {
    let customers: any = {}
    projects.map((p: IProject) => {
      if (!customers[p.customer_id]) {
        customers[p.customer_id] = [];
      }
      customers[p.customer_id].push(p)
    })
    const customersKey = Object.keys(customers);
    let indexItem = 0;
    let idChild = ids + customersKey.length;
    for (let index = 0; index < customersKey.length; index++) {
      const key = customersKey[index];
      const values = customers[key];
      if (values[0]) {
        let children: any = {
          "root_app": values[0].customer_id,
          "display_root_app": values[0].customer_name,
          "name": values[0].customer_id,
          "display_name": values[0].customer_name,
          "path": null,
          "nodeIds": [`${operation.id}`, `${ids}`],
          "id": `${ids++}`,
          "pathFocus": [...operation.pathFocus, 'children', index],
          "children": [],
          "info": values.length,
          "indexItem": indexItem
        }
        values.map((p: IProject, iProj: any) => {
          children.children.push(
            {
              "root_app": values[0].customer_id,
              "display_root_app": values[0].customer_name,
              "name": p.id,
              "display_name": p.name,
              "path": PROJECTS_OPERATION_KEY,
              "pathFocus": [...children.pathFocus, 'children', iProj],
              "nodeIds": [...children.nodeIds, `${idChild}`],
              "id": `${idChild++}`,
              "children": [],
              "indexItem": indexItem++
            }
          )
        })
        operation.children.push(children);
      }
    }
    outPut.ids = idChild;
    outPut.data[operationIndex] = operation;
  }
  return outPut;
}

function convertProjectsTraining2SideBar(sideBarData: ISideBar[], projects: IProject[], ids: number) {
  let outPut: any = {
    data: sideBarData,
    ids: 0
  };
  const training: any = sideBarData.find((i: ISideBar) => i.name === "training");
  const trainingIndex: any = sideBarData.findIndex((i: ISideBar) => i.name === "training");
  let indexItem = 0;
  if (training) {
    for (let index = 0; index < projects.length; index++) {
      const values = projects[index];
      let children: any = {
        "root_app": training.root_app,
        "display_root_app": training.display_name,
        "name": values.id,
        "display_name": values.name,
        "path": PROJECTS_TRAINING_KEY,
        "nodeIds": [...training.nodeIds, `${ids}`],
        "id": `${ids++}`,
        "pathFocus": [...training.pathFocus, 'children', index],
        "children": [],
        "indexItem": indexItem
      }
      training.children.push(children);
      indexItem++;
    }
    outPut.ids = ids;
    outPut.data[trainingIndex] = training;
  }
  return outPut;
}

function convertFunctionOtherApp2SideBar(apps: IApps[], datas: IFunction[]) {
  let outPut: any = {
    data: [],
    routers: {},
    ids: 0
  };
  let ids = apps.length + 1;
  const pathPrefix = getPathPrefix();
  apps.map((app: IApps, index: any) => {
    let item = datas.filter((i: IFunction) => i.root_app === app.app_name);
    outPut.data.push(
      {
        "root_app": app.app_name,
        "display_root_app": I18n.t(`${KEY_TRANSLATE}.${app.app_name}`),
        "name": app.app_name,
        "display_name": I18n.t(`${KEY_TRANSLATE}.${app.app_name}`),
        "path": null,
        "id": `${index + 1}`,
        "nodeIds": [`${index + 1}`],
        "children": [],
        "pathFocus": [index]
      }
    )
    if (item[0]) {
      let newItem: any = [];
      item.filter((i: IFunction, iFunc: any) => {
        let pathItem = mergePath({path1: i.path_prefix, path2: i.path, appName: app.app_name, pathPrefix});
        newItem.push(
          {
            ...i,
            "display_name": I18n.t(`${KEY_TRANSLATE}.${i.name}`),
            "path": pathItem,
            "pathFocus": [index, "children", iFunc],
            "nodeIds": [`${index + 1}`, `${ids++}`],
            "id": `${ids++}`,
            "children": []
          }
        )
        if (!outPut.routers[app.app_name]) {
          outPut.routers[app.app_name] = []
        }
        outPut.routers[app.app_name].push(pathItem);
      });
      outPut.data[index].children = newItem;
    }
  })
  outPut.ids = ids;
  return outPut;
}

export {convertFunctionsOperation2SideBar, convertProjectsOperation2SideBar, convertProjectsTraining2SideBar, convertFunctionOtherApp2SideBar, findSideBarItemByNameVsRootApp, convertFunctionsTraining2SideBar, findSideBarItemByNodeId, findSideBarItemByName, findSideBarItemByDisplayName, cloneSideBarData, convertTreeItemToSideBar};

