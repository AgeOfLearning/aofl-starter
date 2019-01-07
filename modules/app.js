import './init-router-service';
import './route-view-element';
import {environmentTypeEnumerate, getServerEnvironment} from '@aofl/server-environment';

const serverEnvironment = getServerEnvironment(/localhost/, /stage-/);

/* istanbul ignore next */
if (serverEnvironment !== environmentTypeEnumerate.DEV &&
typeof aofljsConfig.__prerender__ === 'undefined') {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register(__webpack_public_path__ + 'sw.js', { // eslint-disable-line
      scope: __webpack_public_path__
    });
  }
}
