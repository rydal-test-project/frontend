import cn from "classnames";
import css from './container.module.scss'
import {IComponentProps} from "@specs";

type TProps = {

} & IComponentProps
function Container(props: TProps) {
    const { className, children } = props

    return (
        <div className={cn([css.container, className])}>
            {children}
        </div>
    )
}

export {
    Container
}