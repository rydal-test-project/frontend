import css from './skeletonImage.module.scss'
import {IComponentProps} from "@specs";
import cn from "classnames";


interface IProps extends IComponentProps {

}
const SkeletonImage = (props: IProps) => {
    const {className} = props

    return (
        <div className={cn(css.image, className)} />
    )
}

export {
    SkeletonImage
}