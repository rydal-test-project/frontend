import {Debugger} from "debug";
import {fetchDebugger} from "@debug";
import {ServerActionModel} from "@models";
import {isArray} from "lodash";


const adaptOptions = (options: IServiceFetchDecoratorOptions, methodName: string): AdaptedOptions => {
    return {
        debuggerName: options.debuggerName || methodName,
        serverAction: options.serverAction ? isArray(options.serverAction) ? options.serverAction : [options.serverAction] : []
    }
}

interface IServiceFetchDecoratorOptions {
    debuggerName?: string,
    serverAction?: ServerActionModel | ServerActionModel[]
}

const _debuggers: { [key: string]: Debugger } = {

}

const makeDebugger = (key: string) => {
    if (_debuggers.hasOwnProperty(key)) { return _debuggers[key] }
    else { return fetchDebugger.extend(key) }
}

const makeDescriptor = (method: any, context: any, args: any, options: AdaptedOptions) => {
    const debuggerInst = makeDebugger(options.debuggerName)
    const serverAction = options.serverAction
    let res: any;

    debuggerInst('started ...')
    serverAction.forEach(action => action.setPending())
    res = method.call(context, args)

    res.then((res: any) => {
        debuggerInst('finished %o', res)
    }).catch((e: any) => {
        debuggerInst('failure %o', e)
    }).finally(() => {
        serverAction.forEach(action => action.setFinished())

    })

    return res
}

type AdaptedOptions = Omit<IServiceFetchDecoratorOptions, 'debuggerName' | 'serverAction'> & {
    debuggerName: string,
    serverAction: ServerActionModel[]
}
const serviceFetch = (options: IServiceFetchDecoratorOptions) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        Object.defineProperty(target, propertyKey, {
            ...descriptor,
            value: function (args: any) { return makeDescriptor(descriptor.value, this, args, adaptOptions(options, propertyKey)) }
        });

        return target;
    };
}
export {
    serviceFetch
}