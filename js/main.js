import './init-router-service';
import '@aofl/aofl-samples/route-view-element';
import serverEnvironment from './server-environment';
import {environmentTypeEnumerate} from '@aofl/server-environment';

if (serverEnvironment !== environmentTypeEnumerate.DEV && typeof aofljsConfig.__prerender__ === 'undefined') {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    });
  }
}
