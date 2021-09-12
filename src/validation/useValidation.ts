import {useCallback, useEffect, useState} from "react";
import {isString, isEqual} from "lodash";


export type validationResult = boolean | string
export type validator = (value: any) => validationResult;
type fields = {
    [key: string]: {
        validators: validator[],
        get?: any
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

const useValidation = (fields: fields, options?: validatorOptions) => {
    const [results, setResults] = useState<fieldsValidationStates>(makeResults(fields, options))

    const validate: (name: string, value?: any, options?: {
        allowValidate: boolean
    }) => fieldValidationState | null = useCallback((name: string, value?: any, options?) => {
        const { validators, get } = fields[name]
        const { allowValidate } = options || {}
        const fieldResult = results[name]
        const valueForValidation = get || (value !== undefined && value) || ''
        let currentResult = null as null | validationResult;

        if (allowValidate !== undefined) { fieldResult.allowValidate = allowValidate }
        if (!fieldResult.allowValidate) { return null }

        fieldResult.dirty = true

        validators.forEach(validator => {
            if (currentResult === null || currentResult === true) {
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
    }, [fields, results])


    const isValid = useCallback((name: string) => results[name].valid, [results])
    const isInvalid = useCallback((name: string) => results[name].invalid, [results])
    const isDirty = useCallback((name: string) => results[name].dirty, [results])
    const result = useCallback((name: string) => results[name], [results])
    const error = useCallback((name: string) => results[name].error, [results])
    const reset = useCallback(() => setResults(makeResults(fields)), [fields])
    const validateAll = useCallback(() => Object.keys(fields).map(name => validate(name)), [fields, validate])
    const totalIsValid = useCallback(() => {
        const totalCHeck = Object.values(results).reduce((acc, fieldState) => {
            return [ ...acc, fieldState.valid ]
        }, [] as Array<boolean | null>)

        if (totalCHeck.find(res => res === null) !== undefined) { return null }

        return totalCHeck.every(res => res)
    }, [results])
    const allowValidate = useCallback((name?: string) => {
        if (name) {
            validate(name, undefined, { allowValidate: true })
        }  else {
            Object.keys(results).forEach(name => validate(name, undefined, { allowValidate: true }))
        }
    }, [results, validate])

    useEffect(() => {
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