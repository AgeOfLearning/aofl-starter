import {getServerEnvironment} from '@aofl/server-environment';

const environment = getServerEnvironment(/localhost/, /stage-/);

export default environment;
