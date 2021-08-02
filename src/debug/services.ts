import debug from "debug";


const serviceLogger = debug('service');
const authServiceLogger = serviceLogger.extend('auth');


export {
  authServiceLogger,
  serviceLogger
}
