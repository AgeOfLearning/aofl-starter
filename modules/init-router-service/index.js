import {routerInstance} from '@aofl/router';
import routesConfig from '@aofl/templating-plugin/routes.config';

const routes = routesConfig.routes;
const otherwise = '/'; /** @todo: change to 404 route */
const otherwiseExists = routes.some((item) => item.path === otherwise);

routerInstance.after((request, response, next) => {
  if (response.matchedRoute !== null) {
    next(response);
  } else if (otherwiseExists) {
    /** @todo: handle 404 page */
  }
});

routerInstance.init(routes);
routerInstance.navigate(location.pathname, true, true);

export default routerInstance;
