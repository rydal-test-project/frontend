import debug from "debug";


const storeLogger = debug('store')
const appStoreLogger = storeLogger.extend('app')


export {
  storeLogger,
  appStoreLogger
}
