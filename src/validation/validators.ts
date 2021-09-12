import {validator} from "./useValidation";
import {isArray, isObject} from "lodash";


const emailValidator: validator = (value: string) => {
    return value.match(/\w+@\w+\.\w+/) !== null || 'Не верный формат'
}
const requiredValidator: validator = (value: any) => {
    const errMessage = 'Обязательно для заполнение'

    if (isArray(value) && !value.length) { return errMessage }
    if (isObject(value) && !Object.keys(value)) { return errMessage }

    return !!value || errMessage
}

export {
    emailValidator,
    requiredValidator
}