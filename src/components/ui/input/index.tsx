import React, {
    ForwardedRef,
    forwardRef,
    memo,
    ReactNode, SyntheticEvent, useRef, useState, Validator
} from "react";
import {IComponentProps} from "../../../common/types";
import style from './style.module.scss'
import InputMask from 'react-input-mask';
import cn from 'classnames';


interface IInputProps extends IComponentProps {
    mask?: string;
    placeholder?: ReactNode;
    inputRef?: (el: HTMLInputElement) => void
}

const Input: React.NamedExoticComponent<IInputProps> = memo(({
                                                                 mask,
                                                                 placeholder,
                                                                 inputRef: inputRefSetter
}: IInputProps) => {
    const [isFocused, setIsFocused] = useState(false)
    const [value, setValue] = useState('')
    let inputRef = null as null | HTMLInputElement
    const handleBlur = () => {
        setIsFocused(false)
    }
    const handleClick = () => {
        setIsFocused(true)
        inputRef?.focus()
    }
    const setInputRef= (el: HTMLInputElement) => {
        inputRef = el;
        if (inputRefSetter) {
            inputRefSetter(el)
        }
    }
    const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return (
        <div className={style.input} onClick={handleClick}>
           <div>
               { placeholder && (
                   <div className={cn(style.input__placeholder, { [style.input__placeholder_toTop]: isFocused || value })}>
                       {placeholder}
                   </div>
               )}

               <InputMask
                   mask={mask || ''} inputRef={setInputRef} onBlur={handleBlur} onChange={handleChange} />
           </div>
            <div className={cn(style.input__underline, { [style.input__underline__active]: isFocused || value })} />
        </div>
    )
})

export {
    Input
}