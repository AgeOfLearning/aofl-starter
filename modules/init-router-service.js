import {routerInstance} from '@aofl/router';
import routesConfig from '@aofl/templating-plugin/routes.config';

const routes = routesConfig.routes;

routerInstance.init(routes);
routerInstance.navigate(location.pathname, true, true);

export default routerInstance;
