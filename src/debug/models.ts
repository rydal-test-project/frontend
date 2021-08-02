import debug from "debug";


const modelsLogger = debug('store')
const userModelLogger = modelsLogger.extend('app')


export {
  modelsLogger,
  userModelLogger
}
