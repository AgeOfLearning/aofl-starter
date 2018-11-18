import {Polyfill} from '@aofl/polyfill-service';
import polyfills from './__config/polyfills';

window.aofljsConfig = window.aofljsConfig || {};

Polyfill.loadAll(polyfills)
.then(() => {
  import(/* webpackMode: "eager" */'./app');
});
