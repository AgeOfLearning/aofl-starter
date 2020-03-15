import {environmentTypeEnumerate, getServerEnvironment} from '@aofl/server-environment';

const DEV_ENV_REGEX = /localhost/i;
const STAGE_DEV_REGEX = /stage/i;
const serverEnvironment = getServerEnvironment(DEV_ENV_REGEX, STAGE_DEV_REGEX);
const DEV = serverEnvironment === environmentTypeEnumerate.DEV;
const STAGE = serverEnvironment === environmentTypeEnumerate.STAGE;
const PROD = !DEV && ! STAGE;

const environment = {
  PUBLIC_PATH: __webpack_public_path__ === ''? '/': __webpack_public_path__, // eslint-disable-line
  STAGE,
  PROD
};

export {
  environment
};
