import { REGISTER_RESOURCE, RemovePropsManagerResources, Resource, UNREGISTER_RESOURCE } from '@dtap/ui-scl';

class ManagerResources {
  awaitRemove: any = {};
  resources: any = {};
  add = (resources: string[], guid: string) => {
    resources.forEach(name => {
      this.resources[name] = this.resources[name] || {};
      this.resources[name][guid] = 1;
    });
  };
  remove = (props: RemovePropsManagerResources) => {
    delete this.resources[props.name][props.guid];
    if (props.func && Object.keys(this.resources[props.name]).length === 0) {
      this.awaitRemove[props.name] = setTimeout(() => {
        props.func();
        delete this.awaitRemove[props.name];
      }, props.time);
    }
  };
  clearRemove = (name: string) => {
    if (this.awaitRemove[name]) {
      clearTimeout(this.awaitRemove[name]);
      delete this.awaitRemove[name];
    }
  };
}

const createResourceManagement = (timeOutDefault = 3000) => {
  const manger = new ManagerResources();
  return ({dispatch, getState}: any) => (next: any) => (action: any) => {
    switch (action.type) {
      case REGISTER_RESOURCE: {
        const newPayload: any[] = [];
        const state = getState().resources || {};
        const resources = Object.keys(state);
        action.payload.forEach((res: Resource) => {
          if (!resources.includes(res.name)) {
            newPayload.push(res);
          } else {
            manger.clearRemove(res.name);
            if (res.refresh) {
              newPayload.push(res);
            }
          }
        });
        manger.add(
          action.payload.map((item: Resource) => item.name),
          action.guid
        );
        if (newPayload.length) {
          return next({type: action.type, payload: newPayload});
        }
        break;
      }
      case UNREGISTER_RESOURCE: {
        const newPayload: any[] = [];
        action.payload.forEach((res: any) => {
          const {name, flush, unregisterDuration} = res;
          if (flush) {
            manger.remove({guid: action.guid, name: res.name});
            newPayload.push(res.name);
          } else {
            const func = () => {
              dispatch({type: UNREGISTER_RESOURCE, payload: [{name, flush: true}]});
            };
            manger.remove({
              guid: action.guid,
              name,
              time: unregisterDuration || timeOutDefault,
              func
            });
          }
        });
        if (newPayload.length) {
          return next({type: action.type, payload: newPayload});
        }
        break;
      }
      default: {
        return next(action);
      }
    }
  };
};

const resourceManagement = createResourceManagement();
export default resourceManagement;
export { resourceManagement };

