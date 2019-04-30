import {routerInstance} from '@aofl/router';
import routesConfig from './__config/routes';

const routes = routesConfig.routes;

routerInstance.init(routes);
routerInstance.navigate(location.pathname, true, true);

export default routerInstance;
