import React, {memo, MouseEvent, ReactNode, SyntheticEvent, useEffect, useState} from "react";
import InputMask from 'react-input-mask';
import cn from 'classnames';

import {IComponentProps} from "@specs";
import style from './input.module.scss'


interface IInputProps extends IComponentProps {
    mask?: string;
    type?: string;
    placeholder?: ReactNode;
    inputRef?: (el: HTMLInputElement) => void;
    onChange?: (value: string) => void;
}

const Input: React.NamedExoticComponent<IInputProps> = memo(({
                                                                 type = 'text',
                                                                 mask,
                                                                 placeholder,
                                                                 onChange,
                                                                 inputRef: inputRefSetter
}: IInputProps) => {
    const [isFocused, setIsFocused] = useState(false)
    const [value, setValue] = useState('')
    const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null)

    const handleBlur = () => {
        setIsFocused(false)
    }
    const handleSetInputRef = (el: HTMLInputElement) => {
        setInputRef(el)
        inputRefSetter && inputRefSetter(el)
    }
    const handleClick = (e: MouseEvent<HTMLElement>) => {
        setIsFocused(true)
        inputRef?.focus()
        e.stopPropagation()
    }
    const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value

        setValue(newValue)
        onChange && onChange(newValue)
    }

    useEffect(() => {
        addEventListener('click',  handleBlur)

        return () => {
            removeEventListener('click',  handleBlur)
        }
    }, [])

    return (
        <div className={style.input} onClick={handleClick} title={(type !== 'password' && value) || ''}>
           <div className={cn(style.input__container)}>
               { placeholder && (
                   <div className={cn(style.input__placeholder, { [style.input__placeholder_toTop]: isFocused || value })}>
                       {placeholder}
                   </div>
               )}

               <InputMask type={type} mask={mask || ''} inputRef={handleSetInputRef} onBlur={handleBlur} onChange={handleChange} />
           </div>
            <div className={cn(style.input__underline, { [style.input__underline_active]: isFocused || value })} />
        </div>
    )
})

export {
    Input
}