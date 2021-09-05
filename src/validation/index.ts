import {useCallback, useEffect, useState} from "react";
import {isString} from "lodash";
import {isEqual} from "lodash";

type validationResult = boolean | string
type validator = (value: any) => validationResult;
type fields = {
    [key: string]: {
        validators: validator[],
        get?: string
    }
}
type fieldValidationState = {
    dirty: null | boolean,
    valid: null | boolean,
    invalid: null | boolean,
    error: string,
    allowValidate: boolean
}
type fieldsValidationStates = { [key: string]: fieldValidationState }
type validatorOptions = {
    forceValidate?: boolean
}


const makeResults: (fields: fields, options?: validatorOptions) => fieldsValidationStates = (
    fields: fields,
    options?: validatorOptions
) => {
    const {forceValidate = false} = options || {}

    return Object.keys(fields).reduce((acc, name) => ({
        ...acc, [name]: {
            dirty: false,
            valid: null,
            invalid: null,
            allowValidate: forceValidate,
            error: ''
        }
    }), {} as fieldsValidationStates)
}
const makeResult: (result: validationResult) => fieldValidationState = (result: validationResult) => ({
    dirty: true,
    valid: !isString(result),
    invalid: isString(result),
    allowValidate: true,
    error: (isString(result) && result) || ''
})
const callValidator = (validator: validator, value: any) => {
    const validatorResult = validator(value)

    return validatorResult === '' || validatorResult
}
const makeFieldsValues = (fields: fields) => Object.keys(fields).reduce((acc, name) => ({ ...acc, [name]: fields[name].get}), {})

const useValidation = (fields: fields, options?: validatorOptions) => {
    const [results, setResults] = useState<fieldsValidationStates>(makeResults(fields, options))
    const [fieldsValues, setFieldsValues] = useState<{ [key: string]: any }>(makeFieldsValues(fields))

    const validate: (name: string, value?: any, options?: {
        allowValidate: boolean
    }) => fieldValidationState | null = (name: string, value?: any, options?) => {
        const { validators } = fields[name]
        const { allowValidate } = options || {}
        const fieldResult = results[name]
        const valueForValidation = fieldsValues[name] || (value !== undefined && value) || ''
        let currentResult = null as null | validationResult;

        if (allowValidate !== undefined) { fieldResult.allowValidate = allowValidate }
        if (!fieldResult.allowValidate) { return null }

        fieldResult.dirty = true

        validators.forEach(validator => {
            if (!currentResult) {
                currentResult = callValidator(validator, valueForValidation)
            }
        })

        if (currentResult !== null) {
            const newFieldResult = makeResult(currentResult)
            const mastUpdateComponent = !isEqual(newFieldResult, fieldResult)

            results[name] = newFieldResult

            if (mastUpdateComponent) {
                setResults({ ...results, [name]: newFieldResult})
            }
        }

        return fieldResult
    }


    const isValid = (name: string) => results[name].valid
    const isInvalid = (name: string) => results[name].invalid
    const isDirty = (name: string) => results[name].dirty
    const result = (name: string) => results[name]
    const error = (name: string) => results[name].error
    const reset = () => setResults(makeResults(fields))
    const validateAll = useCallback(() => Object.keys(fields).map(name => validate(name)), [])
    const totalIsValid = useCallback(() => {
        const totalCHeck = Object.values(results).reduce((acc, fieldState) => {
            return [ ...acc, fieldState.valid ]
        }, [] as Array<boolean | null>)

        if (totalCHeck.find(res => res === null) !== undefined) { return null }

        return totalCHeck.every(res => res)
    }, [])
    const allowValidate = (name?: string) => {
        if (name) {
            validate(name, undefined, { allowValidate: true })
        }  else {
            Object.keys(results).forEach(name => validate(name, undefined, { allowValidate: true }))
        }
    }

    useEffect(() => {
        const newValue = makeFieldsValues(fields)
        if (!isEqual(newValue, fieldsValues)) { setFieldsValues(newValue) }

        validateAll()
    } )

    return {
        validate,
        isDirty,
        isValid,
        isInvalid,
        result,
        error,
        reset,
        validateAll,
        allowValidate,
        totalIsValid
    }
}

export {
    useValidation
}