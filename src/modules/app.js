import './init-router-service';
import './route-view-element';
import {environment} from './constants-enumerate';

/* istanbul ignore next */
if (location.protocol === 'https:' && environment.PROD && 'serviceWorker' in navigator &&
typeof aofljsConfig.__prerender__ === 'undefined') {
  navigator.serviceWorker.register(environment.protocol + 'sw.js', {
    scope: environment.protocol
  });
}
