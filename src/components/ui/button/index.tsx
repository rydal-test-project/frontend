import {memo, ReactNode, MouseEvent} from "react";
import cn from "classnames";
import css from "./button.module.scss";


enum ButtonType {
    PRIMARY = 'primary'
}

interface IProps {
    disabled?: boolean;
    classNames?: string;
    children?: ReactNode;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    type?: ButtonType;
}
const Button = memo(({
                         disabled,
                         children,
                         classNames,
                         onClick,
                         type = ButtonType.PRIMARY,
                     }: IProps) => {
    return (
        <button disabled={disabled} className={cn(classNames, css.button, `${css.button}_${type}`)} onClick={onClick}>
            {children}
        </button>
    )
})

export {
    Button
}