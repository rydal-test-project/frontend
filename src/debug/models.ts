import debug from "debug";


const modelsLogger = debug('model');
const userModelLogger = modelsLogger.extend('user');


export {
  modelsLogger,
  userModelLogger
}
