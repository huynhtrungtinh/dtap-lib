import { IAction, REGISTER_RESOURCE, UNREGISTER_RESOURCE } from '@dtap/ui-scl';

const getResources = (state: any) => {
  Object.keys(state).map(key => state[key].props);
};
const resourcesReducer = (previousState: any = {}, action: IAction) => {
  let newState: any = null;
  switch (action.type) {
    case REGISTER_RESOURCE: {
      newState = {...previousState};
      const {payload} = action;
      if (payload) {
        payload.forEach((element: any) => {
          if (typeof element.reducer === 'function') {
            const resourceState = {
              props: element,
              data: element.reducer(undefined, action)
            };
            newState = {
              ...newState,
              [element.name]: resourceState
            };
          } else {
            const resourceState = {
              props: element
            };
            newState = {
              ...newState,
              [element.name]: resourceState
            };
          }
        });
      }
      break;
    }
    case UNREGISTER_RESOURCE: {
      const {payload} = action;
      newState = Object.keys(previousState).reduce((acc, key) => {
        if (payload) {
          if (payload.includes(key)) {
            return acc;
          }
        }
        return {...acc, [key]: previousState[key]};
      }, {});
      break;
    }
    default: {
      if (!action.meta || !action.meta.resource) {
        newState = {...previousState};
      } else {
        const newResources = Object.keys(previousState);
        newState = newResources.reduce(
          (acc, resource) => ({
            ...acc,
            [resource]:
              action.meta.resource === resource
                ? previousState[resource].props.reducer
                  ? {
                    props: previousState[resource].props,
                    data: previousState[resource].props.reducer(previousState[resource].data, action)
                  }
                  : {
                    props: previousState[resource].props
                  }
                : previousState[resource]
          }),
          {}
        );
      }
      break;
    }
  }
  return newState;
};
export default resourcesReducer;
export { getResources, resourcesReducer };

