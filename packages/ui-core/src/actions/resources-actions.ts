import { REGISTER_RESOURCE, Resource, UNREGISTER_RESOURCE } from '@dtap/ui-scl';

const registerResource = (resources: Resource[] | any[], guid: string) => ({
  type: REGISTER_RESOURCE,
  payload: resources,
  guid
});

const unregisterResource = (resourceNames: Resource[] | any[], guid: string) => ({
  type: UNREGISTER_RESOURCE,
  payload: resourceNames,
  guid
});

export { registerResource, unregisterResource };

