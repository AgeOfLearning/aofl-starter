import './init-router-service';
import './route-view-element';
import {environment} from './constants-enumerate';

if ((environment.DEV || environment.STAGE || environment.DEV_BUILD) && typeof window.aoflDevtools === 'undefined') {
  window.aoflDevtools = {};
}

/* istanbul ignore next */
if (location.protocol === 'https:' && environment.PROD && 'serviceWorker' in navigator &&
typeof aofljsConfig.__prerender__ === 'undefined') {
  navigator.serviceWorker.register(__webpack_public_path__ + 'sw.js', { // eslint-disable-line
    scope: __webpack_public_path__
  });
}
