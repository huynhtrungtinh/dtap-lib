import { IResourceRegistries } from '@dtap/ui-scl';
import { appsResource, APPS_RESOURCE } from './apps-provider';
import { exportFile1Resource, EXPORT_FILE_1_RESOURCE } from './export-file-1-provider';
import { exportFile2Resource, EXPORT_FILE_2_RESOURCE } from './export-file-2-provider';
const LAYOUT_ROOT_PROVIDER_RESOURCE: IResourceRegistries = {
  [EXPORT_FILE_1_RESOURCE]: exportFile1Resource,
  [APPS_RESOURCE]: appsResource,
  [EXPORT_FILE_2_RESOURCE]: exportFile2Resource,
};
function getLayoutRootProvider(): object {
  return LAYOUT_ROOT_PROVIDER_RESOURCE
}
export { getLayoutRootProvider, EXPORT_FILE_1_RESOURCE, APPS_RESOURCE, EXPORT_FILE_2_RESOURCE };
export default getLayoutRootProvider;
