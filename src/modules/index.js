/**
 * module aofl-starter
 */
import {Polyfill} from '@aofl/polyfill-service';
import polyfills from './__config/polyfills';
import {environmentTypeEnumerate} from '@aofl/server-environment';

window.aofljsConfig = window.aofljsConfig || {};

/* istanbul ignore next */
if (process.env.NODE_ENV === environmentTypeEnumerate.DEV && typeof window.aoflDevtools === 'undefined') {
  window.aoflDevtools = {};
}

Polyfill.loadAll(polyfills)
  .then(() => {
    import(/* webpackMode: "eager" */'./app');
  });
