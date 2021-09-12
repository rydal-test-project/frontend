import {FC, memo, ReactNode} from "react";
import cn from "classnames";
import css from "./form-filed.module.scss";


interface IProps {
    children?: ReactNode;
    isValid: boolean | null;
    errorMessage?: string
}

const FormField: FC<IProps> = memo(({ children, errorMessage, isValid }: IProps) => {
    const showError = isValid !== null && !isValid

    return (
        <div className={cn(css.formField, )}>
            <div className={cn(css.formField__field)}>
                {children}
            </div>
            <div className={cn(css.formField__errorWrapper)}>
                {
                    showError && (
                        <p className={cn(css.formField__error)}>{errorMessage}</p>
                    )
                }
            </div>
        </div>
    )
})

export {
    FormField
}