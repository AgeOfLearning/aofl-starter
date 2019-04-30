export default {
  'fetch': () => import('isomorphic-fetch'),
  'Object.assign': () => import('@aofl/polyfill-service/modules/object-assign-polyfill'),
  'Map': () => import('@babel/polyfill')
};
