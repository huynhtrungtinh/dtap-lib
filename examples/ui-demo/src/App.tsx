import {CoreProvider} from '@dtap/ui-core';
import {LayoutRoot} from '@dtap/ui-core-components';
import '@dtap/ui-scl/css/root-css.css';
import {config} from '@dtap/ui-utils';
import React from 'react';
import {API_ENDPOINT, APP_NAME, APP_VERSION, CLIENT_ID, CLIENT_SECRET, OAUTH_FREFIX} from './config';
import i18n from './i18n';
import {routeProvider} from './providers';
import {rootReducer} from './reducers';

const baseHref = (document as any).querySelector('base').getAttribute('href').replace(/\/$/, '');
export default (props: any) => {
  config.initConfigApp({
    appName: APP_NAME,
    appVersion: APP_VERSION,
    appURL: baseHref || '/',
    apiURL: API_ENDPOINT,
    oauthFrefix: OAUTH_FREFIX,
    clientSecret: CLIENT_SECRET,
    clienId: CLIENT_ID,

  })

  return (
    <CoreProvider
      appURL={baseHref || '/'}
      RootLayout={LayoutRoot}
      i18n={i18n}
      reducers={rootReducer}
      routeProvider={routeProvider}
    />
  )
}
