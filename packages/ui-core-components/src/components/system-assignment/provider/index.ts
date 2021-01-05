import { IResourceRegistries } from '@dtap/ui-scl';
import { scopeResource, SCOPE_RESOURCE } from './scope-provider';
const LAYOUT_ROOT_PROVIDER_RESOURCE: IResourceRegistries = {
  [SCOPE_RESOURCE]: scopeResource
};
function getLayoutRootProvider(): object {
  return LAYOUT_ROOT_PROVIDER_RESOURCE
}
export { getLayoutRootProvider, SCOPE_RESOURCE };
export default getLayoutRootProvider;
