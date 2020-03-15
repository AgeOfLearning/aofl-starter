import {routerInstance} from '@aofl/router';
import routesConfig from './__config/routes';

const routes = routesConfig.routes;

routerInstance.init(routes);

routerInstance
  .navigate(location.href.replace(location.origin, '').replace('index.html', ''), {
    replaceState: true
  })
  .catch((e) => {});
